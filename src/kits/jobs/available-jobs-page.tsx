"use server";

import { AvailableJobs, Search } from "./components";

export async function AvailableJobsPage() {
  return (
    <>
      <h1>Available Jobs</h1>
      <Search />
      <AvailableJobs />
    </>
  );
}
