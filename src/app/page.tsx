"use server";

import { AvailableJobs, Search } from "@/kits/jobs";

export default async function Home() {
  return (
    <>
      <h1>Available Jobs</h1>
      <Search />
      <AvailableJobs />
    </>
  );
}
