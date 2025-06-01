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
      const job = chunk.value as ExampleJob;

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

const exampleJob = {
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

type ExampleJob = typeof exampleJob;
