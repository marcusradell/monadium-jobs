"use server";

import { db } from "@/db";
import { jobs } from "@/db/schema";

export default async function Home() {
  const jobsData = await db.select().from(jobs).limit(100);
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
  return (
    <>
      <h1>Monadium Jobs</h1>
      {jobsViewModel.map((job) => {
        return (
          <div key={job.id}>
            <h2>{job.headline}</h2>
            <h3>{job.id}</h3>
            <a href={job.webpage_url ?? ""}>{job.webpage_url}</a>
            <p className="wrap-anywhere">{job.description_text}</p>
          </div>
        );
      })}
    </>
  );
}
