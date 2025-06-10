import { db } from "@/db";
import { jobs } from "@/db/schema";
import { meiliClient, jobsIndex, initializeJobsIndex } from "./meilisearch";

const batchSize = 1000; // Process jobs in batches of 1000

export async function seedJobsToMeilisearch() {
  console.log("Seeding jobs to Meilisearch...");

  try {
    // Delete the existing index completely to avoid primary key conflicts
    try {
      console.log("Deleting existing index...");
      const deleteIndexTask = await meiliClient.deleteIndex(jobsIndex);
      await meiliClient.tasks.waitForTask(deleteIndexTask.taskUid, { timeOutMs: 60000 });
      console.log("Existing index deleted");
    } catch (error: any) {
      // Index might not exist, which is fine
      if (!error.message?.includes("not found")) {
        console.error("Error deleting index:", error);
      }
    }

    await initializeJobsIndex();
    const index = meiliClient.index(jobsIndex);

    let offset = 0;
    let totalSeeded = 0;
    let hasMoreData = true;

    while (hasMoreData) {
      console.log(`Processing batch starting at offset ${offset}...`);

      try {
        // Fetch jobs in batches
        const jobsBatch = await db
          .select()
          .from(jobs)
          .limit(batchSize)
          .offset(offset);

        if (jobsBatch.length === 0) {
          hasMoreData = false;
          break;
        }

        // Transform jobs data for Meilisearch
        const jobsForSearch = jobsBatch.map((job) => ({
          id: job.id,
          headline: job.headline || "",
          description_text: job.description_text || "",
          employer_name: job.employer_name || "",
          workplace_municipality: job.workplace_municipality || "",
          occupation_group_concept_id: job.occupation_group_concept_id || "",
          application_deadline: job.application_deadline || null,
          webpage_url: job.webpage_url || null,
          description_text_formatted: job.description_text_formatted || "",
        }));

        // Add batch to Meilisearch and wait for completion
        console.log(
          `Adding ${jobsForSearch.length} documents to Meilisearch...`,
        );
        
        // Validate that documents have required id field
        const validDocuments = jobsForSearch.filter(doc => doc.id);
        if (validDocuments.length !== jobsForSearch.length) {
          console.warn(`Filtered out ${jobsForSearch.length - validDocuments.length} documents without valid IDs`);
        }
        
        if (validDocuments.length === 0) {
          console.warn("No valid documents to add in this batch, skipping...");
          offset += batchSize;
          continue;
        }

        const addTask = await index.addDocuments(validDocuments);
        console.log(`Task UID: ${addTask.taskUid}, waiting for completion...`);
        
        // Wait for the task and check its status
        const taskResult = await meiliClient.tasks.waitForTask(addTask.taskUid, { timeOutMs: 60000 });
        console.log(`Task status: ${taskResult.status}`);
        
        if (taskResult.status === 'failed') {
          console.error(`Task failed:`, taskResult.error);
          throw new Error(`MeiliSearch task failed: ${JSON.stringify(taskResult.error)}`);
        }

        totalSeeded += validDocuments.length;
        console.log(
          `Successfully seeded batch of ${validDocuments.length} jobs (total: ${totalSeeded})`,
        );

        // If we got fewer jobs than the batch size, we've reached the end
        if (jobsBatch.length < batchSize) {
          hasMoreData = false;
        } else {
          offset += batchSize;
        }
      } catch (batchError) {
        console.error(
          `Error processing batch at offset ${offset}:`,
          batchError,
        );
        throw batchError;
      }
    }

    // Verify the seeding worked
    const stats = await index.getStats();
    console.log(`Meilisearch index stats:`, stats);
    
    // Also check document count
    const documents = await index.getDocuments({ limit: 1 });
    console.log(`Sample document:`, documents.results[0]);
    console.log(`Total documents in index: ${stats.numberOfDocuments}`);
    console.log(`Completed seeding ${totalSeeded} jobs to Meilisearch`);
    
    if (stats.numberOfDocuments === 0) {
      throw new Error("No documents were successfully added to the index!");
    }
  } catch (error) {
    console.error("Error seeding jobs to Meilisearch:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedJobsToMeilisearch().catch(console.error);
}
