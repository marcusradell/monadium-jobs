import { pipeline, Transform } from "node:stream";
import fs from "node:fs";
import { streamArray } from "stream-json/streamers/StreamArray";
import { parser } from "stream-json";
import { db } from "./db";
import { jobs } from "./db/schema";

async function seedJobs() {
  const transformer = new Transform({
    objectMode: true,
    transform: async (chunk, _encoding, cb) => {
      const job = chunk.value;

      await db.insert(jobs).values({
        id: job.id,
        external_id: job.external_id,
        original_id: job.original_id,
        label: job.label,
        webpage_url: job.webpage_url,
        logo_url: job.logo_url,
        headline: job.headline,
        application_deadline: job.application_deadline,
        number_of_vacancies: job.number_of_vacancies,

        description_text: job.description.text,
        description_text_formatted: job.description.text_formatted,
        description_company_information: job.description.company_information,
        description_needs: job.description.needs,
        description_requirements: job.description.requirements,
        description_conditions: job.description.conditions,

        employment_type_concept_id: job.employment_type.concept_id,
        employment_type_label: job.employment_type.label,
        employment_type_legacy_ams_taxonomy_id:
          job.employment_type.legacy_ams_taxonomy_id,

        salary_type_concept_id: job.salary_type.concept_id,
        salary_type_label: job.salary_type.label,
        salary_type_legacy_ams_taxonomy_id:
          job.salary_type.legacy_ams_taxonomy_id,
        salary_description: job.salary_description,

        duration_concept_id: job.duration.concept_id,
        duration_label: job.duration.label,
        duration_legacy_ams_taxonomy_id: job.duration.legacy_ams_taxonomy_id,

        working_hours_type_concept_id: job.working_hours_type.concept_id,
        working_hours_type_label: job.working_hours_type.label,
        working_hours_type_legacy_ams_taxonomy_id:
          job.working_hours_type.legacy_ams_taxonomy_id,

        scope_of_work_min: job.scope_of_work.min,
        scope_of_work_max: job.scope_of_work.max,

        access: job.access,

        employer_phone_number: job.employer.phone_number,
        employer_email: job.employer.email,
        employer_url: job.employer.url,
        employer_organization_number: job.employer.organization_number,
        employer_name: job.employer.name,
        employer_workplace: job.employer.workplace,

        application_details_information: job.application_details.information,
        application_details_reference: job.application_details.reference,
        application_details_email: job.application_details.email,
        application_details_via_af: job.application_details.via_af,
        application_details_url: job.application_details.url,
        application_details_other: job.application_details.other,

        experience_required: job.experience_required,
        access_to_own_car: job.access_to_own_car,
        driving_license_required: job.driving_license_required,
        driving_license: job.driving_license,

        occupation_concept_id: job.occupation.concept_id,
        occupation_label: job.occupation.label,
        occupation_legacy_ams_taxonomy_id:
          job.occupation.legacy_ams_taxonomy_id,

        occupation_group_concept_id: job.occupation_group.concept_id,
        occupation_group_label: job.occupation_group.label,
        occupation_group_legacy_ams_taxonomy_id:
          job.occupation_group.legacy_ams_taxonomy_id,

        occupation_field_concept_id: job.occupation_field.concept_id,
        occupation_field_label: job.occupation_field.label,
        occupation_field_legacy_ams_taxonomy_id:
          job.occupation_field.legacy_ams_taxonomy_id,

        workplace_municipality: job.workplace_address.municipality,
        workplace_municipality_code: job.workplace_address.municipality_code,
        workplace_municipality_concept_id:
          job.workplace_address.municipality_concept_id,
        workplace_region: job.workplace_address.region,
        workplace_region_code: job.workplace_address.region_code,
        workplace_region_concept_id: job.workplace_address.region_concept_id,
        workplace_country: job.workplace_address.country,
        workplace_country_code: job.workplace_address.country_code,
        workplace_country_concept_id: job.workplace_address.country_concept_id,
        workplace_street_address: job.workplace_address.street_address,
        workplace_postcode: job.workplace_address.postcode,
        workplace_city: job.workplace_address.city,
        workplace_coordinates_latitude:
          job.workplace_address.coordinates?.[1]?.toString(),
        workplace_coordinates_longitude:
          job.workplace_address.coordinates?.[0]?.toString(),

        must_have: job.must_have,
        nice_to_have: job.nice_to_have,

        application_contacts: job.application_contacts,

        publication_date: job.publication_date,
        last_publication_date: job.last_publication_date,
        removed: job.removed,
        removed_date: job.removed_date,

        source_type: job.source_type,
        timestamp: BigInt(job.timestamp),
      });

      cb();
    },
  });

  pipeline(
    fs.createReadStream("./src/jobs.json"),
    parser(),
    streamArray(),
    transformer,
    (err) => {
      console.log(err);
    },
  );
}

seedJobs();
