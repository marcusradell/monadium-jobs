import { db } from '@/db';
import { jobs } from '@/db/schema';
import { meiliClient, JOBS_INDEX, initializeJobsIndex } from './meilisearch';

export async function seedJobsToMeilisearch() {
  console.log('Seeding jobs to Meilisearch...');
  
  const jobsData = await db.select().from(jobs);
  
  await initializeJobsIndex();
  const index = meiliClient.index(JOBS_INDEX);
  
  // Transform jobs data for Meilisearch
  const jobsForSearch = jobsData.map(job => ({
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

  await index.addDocuments(jobsForSearch);
  console.log(`Seeded ${jobsForSearch.length} jobs to Meilisearch`);
}

// Run if called directly
if (require.main === module) {
  seedJobsToMeilisearch().catch(console.error);
}
