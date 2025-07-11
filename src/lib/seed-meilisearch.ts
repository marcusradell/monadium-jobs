import { db } from "@/db";
import { jobs } from "@/db/schema";
import { meiliClient, jobsIndex, initializeJobsIndex } from "./meilisearch";
import { eq } from "drizzle-orm";

const batchSize = 1000;
const softwareDeveloperConceptId = "DJh5_yyF_hEM";

export async function seedJobsToMeilisearch() {
  console.log("Seeding jobs to Meilisearch...");

  try {
    // Delete the existing index completely to avoid primary key conflicts
    try {
      console.log("Deleting existing index...");
      const deleteIndexTask = await meiliClient.deleteIndex(jobsIndex);
      await meiliClient.tasks.waitForTask(deleteIndexTask.taskUid);
      console.log("Existing index deleted");
    } catch (error) {
      console.warn(error);
      // Index might not exist, which is fine
      // if (!error.message?.includes("not found")) {
      //   console.error("Error deleting index:", error);
      // }
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
          .where(
            eq(jobs.occupation_group_concept_id, softwareDeveloperConceptId),
          )
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
        const validDocuments = jobsForSearch.filter((doc) => doc.id);
        if (validDocuments.length !== jobsForSearch.length) {
          console.warn(
            `Filtered out ${jobsForSearch.length - validDocuments.length} documents without valid IDs`,
          );
        }

        if (validDocuments.length === 0) {
          console.warn("No valid documents to add in this batch, skipping...");
          offset += batchSize;
          continue;
        }

        await index.addDocuments(validDocuments).waitTask({ timeout: 0 });

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
  } catch (error) {
    console.error("Error seeding jobs to Meilisearch:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedJobsToMeilisearch().catch(console.error);
}
