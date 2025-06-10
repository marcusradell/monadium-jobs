"use client";

import { useState, useCallback } from 'react';
import { AvailableJobs, Search } from "./components";

export function AvailableJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <Search onSearch={handleSearch} />
      <AvailableJobs searchQuery={searchQuery} />
    </div>
  );
}
