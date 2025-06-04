"use server";

import { AvailableJobs } from "@/kits/jobs/components/available-jobs";

export default async function Home() {
  return (
    <>
      <h1>Available Jobs</h1>
      <AvailableJobs />
    </>
  );
}
