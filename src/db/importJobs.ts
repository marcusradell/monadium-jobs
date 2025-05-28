import { db } from './index';
import { jobs } from './schema';
import fs from 'fs';
import readline from 'readline';
import { pipeline } from 'stream/promises';

/**
 * Streams job data from a file and inserts it into the database in chunks
 * @param filePath Path to the jobs.ts file
 * @param chunkSize Number of jobs to process in each batch (default: 100)
 * @returns Promise that resolves when all jobs are imported
 */
export async function importJobsFromFile(filePath: string, chunkSize = 100): Promise<void> {
  console.log(`Starting import from ${filePath} with chunk size ${chunkSize}`);
  
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let inJobsArray = false;
  let currentJob = '';
  let jobBuffer: any[] = [];
  let totalImported = 0;

  // Process the file line by line
  for await (const line of rl) {
    // Detect the start of the jobs array
    if (line.includes('const jobs = [')) {
      inJobsArray = true;
      continue;
    }
    
    // Detect the end of the jobs array
    if (inJobsArray && line.includes('];')) {
      inJobsArray = false;
      
      // Process any remaining jobs in the buffer
      if (jobBuffer.length > 0) {
        await insertJobsChunk(jobBuffer);
        totalImported += jobBuffer.length;
        jobBuffer = [];
      }
      continue;
    }

    // If we're in the jobs array, collect job objects
    if (inJobsArray) {
      // If line starts with '{', begin a new job object
      if (line.trim().startsWith('{')) {
        currentJob = line;
      } 
      // If we're already collecting a job object, append this line
      else if (currentJob) {
        currentJob += line;
      }

      // If line ends with '},' or '}', the job object is complete
      if (line.trim().endsWith('},') || line.trim().endsWith('}')) {
        try {
          // Convert the job string to an object
          // Remove trailing comma if present
          const jobStr = currentJob.endsWith(',') 
            ? currentJob.slice(0, -1) 
            : currentJob;
          
          // Use Function constructor to safely evaluate the job object
          // This is safer than eval() for parsing JavaScript objects
          const jobObject = new Function(`return ${jobStr}`)();
          
          // Add to buffer
          jobBuffer.push(jobObject);
          currentJob = '';
          
          // If buffer reaches chunk size, insert and clear
          if (jobBuffer.length >= chunkSize) {
            await insertJobsChunk(jobBuffer);
            totalImported += jobBuffer.length;
            jobBuffer = [];
            console.log(`Imported ${totalImported} jobs so far...`);
          }
        } catch (error) {
          console.error('Error parsing job object:', error);
          console.error('Problematic job string:', currentJob);
          currentJob = '';
        }
      }
    }
  }

  console.log(`Import complete. Total jobs imported: ${totalImported}`);
}

/**
 * Inserts a chunk of jobs into the database
 * @param jobsChunk Array of job objects to insert
 */
async function insertJobsChunk(jobsChunk: any[]): Promise<void> {
  try {
    // Map the job objects to match the schema structure
    const jobsToInsert = jobsChunk.map(job => ({
      id: job.id,
      external_id: job.external_id,
      original_id: job.original_id,
      label: job.label,
      webpage_url: job.webpage_url,
      logo_url: job.logo_url,
      headline: job.headline,
      application_deadline: job.application_deadline,
      number_of_vacancies: job.number_of_vacancies,
      
      // Description fields
      description_text: job.description?.text,
      description_text_formatted: job.description?.text_formatted,
      description_company_information: job.description?.company_information,
      description_needs: job.description?.needs,
      description_requirements: job.description?.requirements,
      description_conditions: job.description?.conditions,
      
      // Employment type
      employment_type_concept_id: job.employment_type?.concept_id,
      employment_type_label: job.employment_type?.label,
      employment_type_legacy_ams_taxonomy_id: job.employment_type?.legacy_ams_taxonomy_id,
      
      // Salary type
      salary_type_concept_id: job.salary_type?.concept_id,
      salary_type_label: job.salary_type?.label,
      salary_type_legacy_ams_taxonomy_id: job.salary_type?.legacy_ams_taxonomy_id,
      salary_description: job.salary_description,
      
      // Duration
      duration_concept_id: job.duration?.concept_id,
      duration_label: job.duration?.label,
      duration_legacy_ams_taxonomy_id: job.duration?.legacy_ams_taxonomy_id,
      
      // Working hours
      working_hours_type_concept_id: job.working_hours_type?.concept_id,
      working_hours_type_label: job.working_hours_type?.label,
      working_hours_type_legacy_ams_taxonomy_id: job.working_hours_type?.legacy_ams_taxonomy_id,
      
      // Scope of work
      scope_of_work_min: job.scope_of_work?.min,
      scope_of_work_max: job.scope_of_work?.max,
      
      access: job.access,
      
      // Employer details
      employer_phone_number: job.employer?.phone_number,
      employer_email: job.employer?.email,
      employer_url: job.employer?.url,
      employer_organization_number: job.employer?.organization_number,
      employer_name: job.employer?.name,
      employer_workplace: job.employer?.workplace,
      
      // Application details
      application_details_information: job.application_details?.information,
      application_details_reference: job.application_details?.reference,
      application_details_email: job.application_details?.email,
      application_details_via_af: job.application_details?.via_af,
      application_details_url: job.application_details?.url,
      application_details_other: job.application_details?.other,
      
      experience_required: job.experience_required,
      access_to_own_car: job.access_to_own_car,
      driving_license_required: job.driving_license_required,
      driving_license: job.driving_license,
      
      // Occupation
      occupation_concept_id: job.occupation?.concept_id,
      occupation_label: job.occupation?.label,
      occupation_legacy_ams_taxonomy_id: job.occupation?.legacy_ams_taxonomy_id,
      
      // Occupation group
      occupation_group_concept_id: job.occupation_group?.concept_id,
      occupation_group_label: job.occupation_group?.label,
      occupation_group_legacy_ams_taxonomy_id: job.occupation_group?.legacy_ams_taxonomy_id,
      
      // Occupation field
      occupation_field_concept_id: job.occupation_field?.concept_id,
      occupation_field_label: job.occupation_field?.label,
      occupation_field_legacy_ams_taxonomy_id: job.occupation_field?.legacy_ams_taxonomy_id,
      
      // Workplace address
      workplace_municipality: job.workplace_address?.municipality,
      workplace_municipality_code: job.workplace_address?.municipality_code,
      workplace_municipality_concept_id: job.workplace_address?.municipality_concept_id,
      workplace_region: job.workplace_address?.region,
      workplace_region_code: job.workplace_address?.region_code,
      workplace_region_concept_id: job.workplace_address?.region_concept_id,
      workplace_country: job.workplace_address?.country,
      workplace_country_code: job.workplace_address?.country_code,
      workplace_country_concept_id: job.workplace_address?.country_concept_id,
      workplace_street_address: job.workplace_address?.street_address,
      workplace_postcode: job.workplace_address?.postcode,
      workplace_city: job.workplace_address?.city,
      workplace_coordinates_longitude: job.workplace_address?.coordinates?.[0],
      workplace_coordinates_latitude: job.workplace_address?.coordinates?.[1],
      
      // Requirements - stored as JSON
      must_have: job.must_have,
      nice_to_have: job.nice_to_have,
      
      // Application contacts - stored as JSON
      application_contacts: job.application_contacts,
      
      // Dates
      publication_date: job.publication_date,
      last_publication_date: job.last_publication_date,
      removed: job.removed,
      removed_date: job.removed_date,
      
      source_type: job.source_type,
      timestamp: job.timestamp,
    }));

    // Insert the jobs into the database
    await db.insert(jobs).values(jobsToInsert);
  } catch (error) {
    console.error('Error inserting jobs chunk:', error);
    throw error;
  }
}

/**
 * Alternative function that takes an array of jobs directly
 * @param jobsArray Array of job objects
 * @param chunkSize Number of jobs to process in each batch (default: 100)
 */
export async function importJobsFromArray(jobsArray: any[], chunkSize = 100): Promise<void> {
  console.log(`Starting import of ${jobsArray.length} jobs with chunk size ${chunkSize}`);
  
  let totalImported = 0;
  
  // Process the array in chunks
  for (let i = 0; i < jobsArray.length; i += chunkSize) {
    const chunk = jobsArray.slice(i, i + chunkSize);
    await insertJobsChunk(chunk);
    totalImported += chunk.length;
    console.log(`Imported ${totalImported} of ${jobsArray.length} jobs...`);
  }
  
  console.log(`Import complete. Total jobs imported: ${totalImported}`);
}
