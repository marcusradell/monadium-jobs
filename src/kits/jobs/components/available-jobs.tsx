"use server";

import { db } from "@/db";
import { jobs } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

const softwareDeveloperConceptId = "DJh5_yyF_hEM";

export async function AvailableJobs() {
  const jobsData = await db
    .select()
    .from(jobs)
    .where(eq(jobs.occupation_group_concept_id, softwareDeveloperConceptId))
    .limit(100);

  const [{ count: jobsCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(jobs)
    .where(eq(jobs.occupation_group_concept_id, softwareDeveloperConceptId));

  const jobsViewModel = jobsData.map(
    ({
      id,
      headline,
      webpage_url,
      application_deadline,
      description_text,
      description_text_formatted,
    }) => ({
      headline,
      id,
      webpage_url,
      application_deadline,
      description_text,
      description_text_formatted,
    }),
  );

  return (
    <>
      <p>
        Found <em className="font-bold">{jobsCount} </em> jobs.
      </p>
      {jobsViewModel.map((job) => {
        return (
          <div key={job.id}>
            <h2>{job.headline}</h2>
            <h3>{job.id}</h3>
            <a href={job.webpage_url ?? ""}>{job.webpage_url}</a>
            <div
              className="wrap-anywhere"
              dangerouslySetInnerHTML={{
                __html: job.description_text_formatted!,
              }}
            />
          </div>
        );
      })}
    </>
  );
}
