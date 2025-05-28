import { 
  pgTable, 
  text, 
  integer, 
  boolean, 
  timestamp, 
  json, 
  varchar, 
  decimal
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: text("id").primaryKey(),
  external_id: text("external_id"),
  original_id: text("original_id"),
  label: text("label"),
  webpage_url: text("webpage_url"),
  logo_url: text("logo_url"),
  headline: text("headline"),
  application_deadline: timestamp("application_deadline"),
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
  employment_type_legacy_ams_taxonomy_id: text("employment_type_legacy_ams_taxonomy_id"),
  
  // Salary type
  salary_type_concept_id: text("salary_type_concept_id"),
  salary_type_label: text("salary_type_label"),
  salary_type_legacy_ams_taxonomy_id: text("salary_type_legacy_ams_taxonomy_id"),
  salary_description: text("salary_description"),
  
  // Duration
  duration_concept_id: text("duration_concept_id"),
  duration_label: text("duration_label"),
  duration_legacy_ams_taxonomy_id: text("duration_legacy_ams_taxonomy_id"),
  
  // Working hours
  working_hours_type_concept_id: text("working_hours_type_concept_id"),
  working_hours_type_label: text("working_hours_type_label"),
  working_hours_type_legacy_ams_taxonomy_id: text("working_hours_type_legacy_ams_taxonomy_id"),
  
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
  occupation_group_legacy_ams_taxonomy_id: text("occupation_group_legacy_ams_taxonomy_id"),
  
  // Occupation field
  occupation_field_concept_id: text("occupation_field_concept_id"),
  occupation_field_label: text("occupation_field_label"),
  occupation_field_legacy_ams_taxonomy_id: text("occupation_field_legacy_ams_taxonomy_id"),
  
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
  workplace_coordinates_longitude: decimal("workplace_coordinates_longitude", { precision: 10, scale: 5 }),
  workplace_coordinates_latitude: decimal("workplace_coordinates_latitude", { precision: 10, scale: 5 }),
  
  // Requirements - stored as JSON for flexibility
  must_have: json("must_have"),
  nice_to_have: json("nice_to_have"),
  
  // Application contacts - stored as JSON
  application_contacts: json("application_contacts"),
  
  // Dates
  publication_date: timestamp("publication_date"),
  last_publication_date: timestamp("last_publication_date"),
  removed: boolean("removed"),
  removed_date: timestamp("removed_date"),
  
  source_type: text("source_type"),
  timestamp: bigint("timestamp"),
});

// Example job data for reference
const job = {
  id: "29293122",
  external_id: "46-556284-2319-747481610",
  original_id: null,
  label: "[]",
  webpage_url: "https://arbetsformedlingen.se/platsbanken/annonser/29293122",
  logo_url:
    "https://arbetsformedlingen.se/rest/agas/api/v1/organisation/5562842319/logotyper/logo.png",
  headline: "Lösningsarkitekt Dynamics 365",
  application_deadline: "2025-05-31T23:59:59",
  number_of_vacancies: 1,
  description: {
    text: "Om rollen\nI rollen som arkitekt blir du länken mellan kunden och tekniken. Din uppgift blir att skapa lösningar som ger största möjliga värde för kundens verksamhet. Du får bryta ner komplexa problem och skapa lösningar till kunder med den allra senaste tekniken, med grund i Microsofts hela portfölj av tjänster. Du har ansvaret för den tekniska utvecklingen, leder det tekniska teamet och gör de prioriteringar som behövs för att lösningen ska levereras på bästa sätt.\nOm dig\n\n - Du har en akademisk utbildning inom relevant område\n\n - Minst 5 års erfarenhet som utvecklare mot Dynamics 365 CE eller med MS tjänster som bas\n\n - Du har gärna arbetat med Power Apps, Power Automate, Dataverse och andra kringliggande tjänster inom området.\n\n - Kommunicerar på svenska och engelska i tal och skrift\n\n - Meriterande om du har en eller ett par certifikat inom relevanta områden\n\n\n\nAnsökan\nAnsök genom att ladda upp ditt CV via ansökningsknappen. Vi tar inte emot ansökningar via email. Om du har frågor om tjänsten eller Sopra Steria som bolag är du välkommen att kontakta Johanna Romanoff, johanna.romanoff@soprasteria.com\n\n   \nVarför välja Sopra Steria\n\n - Livet är mer än bara jobb. Men jobbet är också en stor del av livet. För oss på Sopra Steria är det viktigt med hållbara medarbetare. Vi tror på frihet under ansvar, för en bra balans mellan jobb och fritid\n\n - Fokus på din kompetensutveckling och personlig tillväxt. När individen växer, växer bolaget!\n\n - Utsedda till Sveriges bästa arbetsplats av Great Place to Work, världens största medarbetarundersökning, där vi fått toppbetyg i kamratskap, arbetsglädje och stolthet!\n\n - Växande organisation med många karriärmöjligheter\n\n - Europas ledande konsultbolag inom digitalisering med global närvaro. Läs mer om oss här\n\n\n\nSopra Steria har kunder och projekt som kan kräva säkerhetsgodkännande på olika nivåer.\nYtterligare information\n\nSopra Steria är ett ledande internationellt konsultbolag inom digital transformation. Vi bygger samhället genom designdriven innovation, teknisk utveckling med kunskap om marknadens ledande plattformar och driftlösningar (managed services). Med modern teknologi och en gedigen affärsförståelse är vi en helhetspartner för våra kunder och deras digitala transformationsresa. Enligt Great Place To Work är vi en av Sveriges bästa arbetsplatser, vi har tilldelats utmärkelsen Karriärföretag flera år i rad och Gartner har listat oss som ett topp 5 bolag inom digital transformation.",
    text_formatted:
      "Om rollen\nI rollen som arkitekt blir du länken mellan kunden och tekniken. Din uppgift blir att skapa lösningar som ger största möjliga värde för kundens verksamhet. Du får bryta ner komplexa problem och skapa lösningar till kunder med den allra senaste tekniken, med grund i Microsofts hela portfölj av tjänster. Du har ansvaret för den tekniska utvecklingen, leder det tekniska teamet och gör de prioriteringar som behövs för att lösningen ska levereras på bästa sätt.\nOm dig\n\n - Du har en akademisk utbildning inom relevant område\n\n - Minst 5 års erfarenhet som utvecklare mot Dynamics 365 CE eller med MS tjänster som bas\n\n - Du har gärna arbetat med Power Apps, Power Automate, Dataverse och andra kringliggande tjänster inom området.\n\n - Kommunicerar på svenska och engelska i tal och skrift\n\n - Meriterande om du har en eller ett par certifikat inom relevanta områden\n\n\n\nAnsökan\nAnsök genom att ladda upp ditt CV via ansökningsknappen. Vi tar inte emot ansökningar via email. Om du har frågor om tjänsten eller Sopra Steria som bolag är du välkommen att kontakta Johanna Romanoff, johanna.romanoff@soprasteria.com\n\n   \nVarför välja Sopra Steria\n\n - Livet är mer än bara jobb. Men jobbet är också en stor del av livet. För oss på Sopra Steria är det viktigt med hållbara medarbetare. Vi tror på frihet under ansvar, för en bra balans mellan jobb och fritid\n\n - Fokus på din kompetensutveckling och personlig tillväxt. När individen växer, växer bolaget!\n\n - Utsedda till Sveriges bästa arbetsplats av Great Place to Work, världens största medarbetarundersökning, där vi fått toppbetyg i kamratskap, arbetsglädje och stolthet!\n\n - Växande organisation med många karriärmöjligheter\n\n - Europas ledande konsultbolag inom digitalisering med global närvaro. Läs mer om oss här\n\n\n\nSopra Steria har kunder och projekt som kan kräva säkerhetsgodkännande på olika nivåer.\nYtterligare information\n\nSopra Steria är ett ledande internationellt konsultbolag inom digital transformation. Vi bygger samhället genom designdriven innovation, teknisk utveckling med kunskap om marknadens ledande plattformar och driftlösningar (managed services). Med modern teknologi och en gedigen affärsförståelse är vi en helhetspartner för våra kunder och deras digitala transformationsresa. Enligt Great Place To Work är vi en av Sveriges bästa arbetsplatser, vi har tilldelats utmärkelsen Karriärföretag flera år i rad och Gartner har listat oss som ett topp 5 bolag inom digital transformation.",
    company_information: null,
    needs: null,
    requirements: null,
    conditions: "Heltid\r\nHeltidsanställning",
  },
  employment_type: {
    concept_id: "PFZr_Syz_cUq",
    label: "Vanlig anställning",
    legacy_ams_taxonomy_id: "1",
  },
  salary_type: {
    concept_id: "oG8G_9cW_nRf",
    label: "Fast månads- vecko- eller timlön",
    legacy_ams_taxonomy_id: "1",
  },
  salary_description: "Fast månadslön",
  duration: {
    concept_id: "a7uU_j21_mkL",
    label: "Tills vidare",
    legacy_ams_taxonomy_id: "1",
  },
  working_hours_type: {
    concept_id: "6YE1_gAC_R2G",
    label: "Heltid",
    legacy_ams_taxonomy_id: "1",
  },
  scope_of_work: {
    min: 100,
    max: 100,
  },
  access: null,
  employer: {
    phone_number: null,
    email: null,
    url: null,
    organization_number: "5562842319",
    name: "Sopra Steria Sweden AB",
    workplace: "Sopra Steria",
  },
  application_details: {
    information: null,
    reference: "00238718",
    email: null,
    via_af: false,
    url: "https://easyapply.jobs/r/CnGp42C23aAzTC4uzvkQ",
    other: null,
  },
  experience_required: true,
  access_to_own_car: false,
  driving_license_required: false,
  driving_license: null,
  occupation: {
    concept_id: "rQds_YGd_quU",
    label: "Mjukvaruutvecklare",
    legacy_ams_taxonomy_id: "80",
  },
  occupation_group: {
    concept_id: "DJh5_yyF_hEM",
    label: "Mjukvaru- och systemutvecklare m.fl.",
    legacy_ams_taxonomy_id: "2512",
  },
  occupation_field: {
    concept_id: "apaJ_2ja_LuF",
    label: "Data/IT",
    legacy_ams_taxonomy_id: "3",
  },
  workplace_address: {
    municipality: "Göteborg",
    municipality_code: "1480",
    municipality_concept_id: "PVZL_BQT_XtL",
    region: "Västra Götalands län",
    region_code: "14",
    region_concept_id: "zdoY_6u5_Krt",
    country: "Sverige",
    country_code: "199",
    country_concept_id: "i46j_HmG_v64",
    street_address: null,
    postcode: null,
    city: null,
    coordinates: [11.97456, 57.70887],
  },
  must_have: {
    skills: [],
    languages: [],
    work_experiences: [
      {
        weight: 10,
        concept_id: "rQds_YGd_quU",
        label: "Mjukvaruutvecklare",
        legacy_ams_taxonomy_id: "80",
      },
    ],
    education: [],
    education_level: [],
  },
  nice_to_have: {
    skills: [],
    languages: [],
    work_experiences: [],
    education: [],
    education_level: [],
  },
  application_contacts: [
    {
      name: null,
      description: "Johanna Romanoff",
      email: null,
      telephone: null,
      contact_type: "Talent Acquisition Partner",
    },
  ],
  publication_date: "2024-12-02T11:41:29",
  last_publication_date: "2025-05-31T23:59:59",
  removed: false,
  removed_date: null,
  source_type: "VIA_PLATSBANKEN_DXA",
  timestamp: 1733136089885,
};
