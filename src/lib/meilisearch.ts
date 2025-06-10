import { MeiliSearch } from 'meilisearch';

export const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_URL || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_MASTER_KEY || 'your-master-key-here',
});

export const JOBS_INDEX = 'jobs';

export async function initializeJobsIndex() {
  const index = meiliClient.index(JOBS_INDEX);
  
  // Configure searchable attributes
  await index.updateSearchableAttributes([
    'headline',
    'description_text',
    'employer_name',
    'workplace_municipality',
  ]);

  // Configure filterable attributes
  await index.updateFilterableAttributes([
    'occupation_group_concept_id',
    'application_deadline',
  ]);

  return index;
}
