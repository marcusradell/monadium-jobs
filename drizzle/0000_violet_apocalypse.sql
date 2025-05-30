CREATE TABLE "jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"external_id" text,
	"original_id" text,
	"label" text,
	"webpage_url" text,
	"logo_url" text,
	"headline" text,
	"application_deadline" timestamp,
	"number_of_vacancies" integer,
	"description_text" text,
	"description_text_formatted" text,
	"description_company_information" text,
	"description_needs" text,
	"description_requirements" text,
	"description_conditions" text,
	"employment_type_concept_id" text,
	"employment_type_label" text,
	"employment_type_legacy_ams_taxonomy_id" text,
	"salary_type_concept_id" text,
	"salary_type_label" text,
	"salary_type_legacy_ams_taxonomy_id" text,
	"salary_description" text,
	"duration_concept_id" text,
	"duration_label" text,
	"duration_legacy_ams_taxonomy_id" text,
	"working_hours_type_concept_id" text,
	"working_hours_type_label" text,
	"working_hours_type_legacy_ams_taxonomy_id" text,
	"scope_of_work_min" integer,
	"scope_of_work_max" integer,
	"access" text,
	"employer_phone_number" text,
	"employer_email" text,
	"employer_url" text,
	"employer_organization_number" text,
	"employer_name" text,
	"employer_workplace" text,
	"application_details_information" text,
	"application_details_reference" text,
	"application_details_email" text,
	"application_details_via_af" boolean,
	"application_details_url" text,
	"application_details_other" text,
	"experience_required" boolean,
	"access_to_own_car" boolean,
	"driving_license_required" boolean,
	"driving_license" text,
	"occupation_concept_id" text,
	"occupation_label" text,
	"occupation_legacy_ams_taxonomy_id" text,
	"occupation_group_concept_id" text,
	"occupation_group_label" text,
	"occupation_group_legacy_ams_taxonomy_id" text,
	"occupation_field_concept_id" text,
	"occupation_field_label" text,
	"occupation_field_legacy_ams_taxonomy_id" text,
	"workplace_municipality" text,
	"workplace_municipality_code" text,
	"workplace_municipality_concept_id" text,
	"workplace_region" text,
	"workplace_region_code" text,
	"workplace_region_concept_id" text,
	"workplace_country" text,
	"workplace_country_code" text,
	"workplace_country_concept_id" text,
	"workplace_street_address" text,
	"workplace_postcode" text,
	"workplace_city" text,
	"workplace_coordinates_longitude" numeric(10, 5),
	"workplace_coordinates_latitude" numeric(10, 5),
	"must_have" json,
	"nice_to_have" json,
	"application_contacts" json,
	"publication_date" timestamp,
	"last_publication_date" timestamp,
	"removed" boolean,
	"removed_date" timestamp,
	"source_type" text,
	"timestamp" integer
);
