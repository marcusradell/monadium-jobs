import { db } from "@/db";
import { jobs } from "@/db/schema";
import { meiliClient, jobsIndex, initializeJobsIndex } from "./meilisearch";

const batchSize = 1000; // Process jobs in batches of 1000

export async function seedJobsToMeilisearch() {
  console.log("Seeding jobs to Meilisearch...");

  try {
    await initializeJobsIndex();
    const index = meiliClient.index(jobsIndex);

    // Clear existing documents first
    console.log("Clearing existing documents...");
    const deleteTask = await index.deleteAllDocuments();
    await meiliClient.tasks.waitForTask(deleteTask.taskUid);
    console.log("Existing documents cleared");

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
        const addTask = await index.addDocuments(jobsForSearch);
        await meiliClient.tasks.waitForTask(addTask.taskUid);

        totalSeeded += jobsBatch.length;
        console.log(
          `Successfully seeded batch of ${jobsBatch.length} jobs (total: ${totalSeeded})`,
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
    console.log(`Completed seeding ${totalSeeded} jobs to Meilisearch`);
  } catch (error) {
    console.error("Error seeding jobs to Meilisearch:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedJobsToMeilisearch().catch(console.error);
}
