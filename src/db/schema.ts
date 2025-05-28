import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  json,
  decimal,
  bigint,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: text("id").primaryKey(),
  external_id: text("external_id"),
  original_id: text("original_id"),
  label: text("label"),
  webpage_url: text("webpage_url"),
  logo_url: text("logo_url"),
  headline: text("headline"),
  application_deadline: timestamp("application_deadline", { mode: "string" }),
  number_of_vacancies: integer("number_of_vacancies"),

  // Description fields
  description_text: text("description_text"),
  description_text_formatted: text("description_text_formatted"),
  description_company_information: text("description_company_information"),
  description_needs: text("description_needs"),
  description_requirements: text("description_requirements"),
  description_conditions: text("description_conditions"),

  // Employment type
  employment_type_concept_id: text("employment_type_concept_id"),
  employment_type_label: text("employment_type_label"),
  employment_type_legacy_ams_taxonomy_id: text(
    "employment_type_legacy_ams_taxonomy_id",
  ),

  // Salary type
  salary_type_concept_id: text("salary_type_concept_id"),
  salary_type_label: text("salary_type_label"),
  salary_type_legacy_ams_taxonomy_id: text(
    "salary_type_legacy_ams_taxonomy_id",
  ),
  salary_description: text("salary_description"),

  // Duration
  duration_concept_id: text("duration_concept_id"),
  duration_label: text("duration_label"),
  duration_legacy_ams_taxonomy_id: text("duration_legacy_ams_taxonomy_id"),

  // Working hours
  working_hours_type_concept_id: text("working_hours_type_concept_id"),
  working_hours_type_label: text("working_hours_type_label"),
  working_hours_type_legacy_ams_taxonomy_id: text(
    "working_hours_type_legacy_ams_taxonomy_id",
  ),

  // Scope of work
  scope_of_work_min: integer("scope_of_work_min"),
  scope_of_work_max: integer("scope_of_work_max"),

  access: text("access"),

  // Employer details
  employer_phone_number: text("employer_phone_number"),
  employer_email: text("employer_email"),
  employer_url: text("employer_url"),
  employer_organization_number: text("employer_organization_number"),
  employer_name: text("employer_name"),
  employer_workplace: text("employer_workplace"),

  // Application details
  application_details_information: text("application_details_information"),
  application_details_reference: text("application_details_reference"),
  application_details_email: text("application_details_email"),
  application_details_via_af: boolean("application_details_via_af"),
  application_details_url: text("application_details_url"),
  application_details_other: text("application_details_other"),

  experience_required: boolean("experience_required"),
  access_to_own_car: boolean("access_to_own_car"),
  driving_license_required: boolean("driving_license_required"),
  driving_license: text("driving_license"),

  // Occupation
  occupation_concept_id: text("occupation_concept_id"),
  occupation_label: text("occupation_label"),
  occupation_legacy_ams_taxonomy_id: text("occupation_legacy_ams_taxonomy_id"),

  // Occupation group
  occupation_group_concept_id: text("occupation_group_concept_id"),
  occupation_group_label: text("occupation_group_label"),
  occupation_group_legacy_ams_taxonomy_id: text(
    "occupation_group_legacy_ams_taxonomy_id",
  ),

  // Occupation field
  occupation_field_concept_id: text("occupation_field_concept_id"),
  occupation_field_label: text("occupation_field_label"),
  occupation_field_legacy_ams_taxonomy_id: text(
    "occupation_field_legacy_ams_taxonomy_id",
  ),

  // Workplace address
  workplace_municipality: text("workplace_municipality"),
  workplace_municipality_code: text("workplace_municipality_code"),
  workplace_municipality_concept_id: text("workplace_municipality_concept_id"),
  workplace_region: text("workplace_region"),
  workplace_region_code: text("workplace_region_code"),
  workplace_region_concept_id: text("workplace_region_concept_id"),
  workplace_country: text("workplace_country"),
  workplace_country_code: text("workplace_country_code"),
  workplace_country_concept_id: text("workplace_country_concept_id"),
  workplace_street_address: text("workplace_street_address"),
  workplace_postcode: text("workplace_postcode"),
  workplace_city: text("workplace_city"),
  workplace_coordinates_longitude: decimal("workplace_coordinates_longitude", {
    precision: 10,
    scale: 5,
  }),
  workplace_coordinates_latitude: decimal("workplace_coordinates_latitude", {
    precision: 10,
    scale: 5,
  }),

  // Requirements - stored as JSON for flexibility
  must_have: json("must_have"),
  nice_to_have: json("nice_to_have"),

  // Application contacts - stored as JSON
  application_contacts: json("application_contacts"),

  // Dates
  publication_date: timestamp("publication_date", { mode: "string" }),
  last_publication_date: timestamp("last_publication_date", { mode: "string" }),
  removed: boolean("removed"),
  removed_date: timestamp("removed_date", { mode: "string" }),

  source_type: text("source_type"),
  timestamp: bigint("timestamp", { mode: "bigint" }),
});
