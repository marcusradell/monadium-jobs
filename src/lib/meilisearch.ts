import { MeiliSearch } from "meilisearch";

export const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_URL || "http://localhost:7700",
  apiKey: process.env.MEILISEARCH_MASTER_KEY || "your-master-key-here",
  timeout: 60000, // 60 seconds timeout
});

export const jobsIndex = "jobs";

export async function initializeJobsIndex() {
  try {
    // Create index if it doesn't exist
    const createTask = await meiliClient.createIndex(jobsIndex, { primaryKey: "id" });
    await meiliClient.tasks.waitForTask(createTask.taskUid);
    console.log(`Created index: ${jobsIndex}`);
  } catch (error: any) {
    // Index might already exist, which is fine
    if (!error.message?.includes("already exists")) {
      console.error("Error creating index:", error);
      throw error;
    }
    console.log(`Index ${jobsIndex} already exists`);
  }

  const index = meiliClient.index(jobsIndex);

  try {
    // Configure searchable attributes
    const searchableTask = await index.updateSearchableAttributes([
      "headline",
      "description_text",
      "employer_name",
      "workplace_municipality",
    ]);
    console.log("Updating searchable attributes...");
    await meiliClient.tasks.waitForTask(searchableTask.taskUid);

    // Configure filterable attributes
    const filterableTask = await index.updateFilterableAttributes([
      "occupation_group_concept_id",
      "application_deadline",
    ]);
    console.log("Updating filterable attributes...");
    await meiliClient.tasks.waitForTask(filterableTask.taskUid);

    console.log("Index configuration completed");
  } catch (error) {
    console.error("Error configuring index:", error);
    throw error;
  }

  return index;
}
