"use server";

import { db } from "@/db";
import { jobs } from "@/db/schema";

export default async function Home() {
  const jobsData = await db.select().from(jobs).limit(100);
  const jobsViewModel = jobsData.map(
    ({ id, headline, webpage_url, application_deadline }) => ({
      headline,
      id,
      webpage_url,
      application_deadline,
    }),
  );
  return (
    <>
      <h1>Monadium Jobs</h1>
      <pre>{JSON.stringify(jobsViewModel, null, 2)}</pre>
    </>
  );
}
