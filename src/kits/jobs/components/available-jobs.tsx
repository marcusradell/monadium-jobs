"use server";

import { db } from "@/db";
import { jobs } from "@/db/schema";
import { count } from "drizzle-orm";

export async function AvailableJobs() {
  const jobsData = await db.select().from(jobs).limit(100);
  const jobsCount = await db.$count(jobs);
  const jobsViewModel = jobsData.map(
    ({
      id,
      headline,
      webpage_url,
      application_deadline,
      description_text,
    }) => ({
      headline,
      id,
      webpage_url,
      application_deadline,
      description_text,
    }),
  );

  return jobsViewModel.map((job) => {
    return (
      <div key={job.id}>
        <p>
          Found <em className="font-bold">{jobsCount} </em> jobs.
        </p>
        <h2>{job.headline}</h2>
        <h3>{job.id}</h3>
        <a href={job.webpage_url ?? ""}>{job.webpage_url}</a>
        <p className="wrap-anywhere">{job.description_text}</p>
      </div>
    );
  });
}
