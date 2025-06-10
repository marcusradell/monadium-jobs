import { db } from '@/db';
import { jobs } from '@/db/schema';
import { meiliClient, JOBS_INDEX, initializeJobsIndex } from './meilisearch';

const BATCH_SIZE = 1000; // Process jobs in batches of 1000

export async function seedJobsToMeilisearch() {
  console.log('Seeding jobs to Meilisearch...');
  
  await initializeJobsIndex();
  const index = meiliClient.index(JOBS_INDEX);
  
  let offset = 0;
  let totalSeeded = 0;
  let hasMoreData = true;

  while (hasMoreData) {
    console.log(`Processing batch starting at offset ${offset}...`);
    
    // Fetch jobs in batches
    const jobsBatch = await db
      .select()
      .from(jobs)
      .limit(BATCH_SIZE)
      .offset(offset);

    if (jobsBatch.length === 0) {
      hasMoreData = false;
      break;
    }

    // Transform jobs data for Meilisearch
    const jobsForSearch = jobsBatch.map(job => ({
      id: job.id,
      headline: job.headline,
      description_text: job.description_text,
      employer_name: job.employer_name,
      workplace_municipality: job.workplace_municipality,
      occupation_group_concept_id: job.occupation_group_concept_id,
      application_deadline: job.application_deadline,
      webpage_url: job.webpage_url,
      description_text_formatted: job.description_text_formatted,
    }));

    // Add batch to Meilisearch
    await index.addDocuments(jobsForSearch);
    
    totalSeeded += jobsBatch.length;
    console.log(`Seeded batch of ${jobsBatch.length} jobs (total: ${totalSeeded})`);
    
    // If we got fewer jobs than the batch size, we've reached the end
    if (jobsBatch.length < BATCH_SIZE) {
      hasMoreData = false;
    } else {
      offset += BATCH_SIZE;
    }
  }

  console.log(`Completed seeding ${totalSeeded} jobs to Meilisearch`);
}

// Run if called directly
if (require.main === module) {
  seedJobsToMeilisearch().catch(console.error);
}
