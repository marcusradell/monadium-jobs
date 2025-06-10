"use client";

import { useState, useEffect } from 'react';

interface Job {
  id: string;
  headline: string;
  webpage_url: string | null;
  application_deadline: string | null;
  description_text: string | null;
  description_text_formatted: string | null;
}

interface AvailableJobsProps {
  searchQuery?: string;
}

export function AvailableJobs({ searchQuery = '' }: AvailableJobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) {
          params.set('q', searchQuery);
        }
        
        const response = await fetch(`/api/jobs/search?${params}`);
        const data = await response.json();
        
        setJobs(data.jobs || []);
        setTotalHits(data.totalHits || 0);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery]);

  if (loading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <>
      <p className="mb-4">
        Found <em className="font-bold">{totalHits}</em> jobs.
      </p>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{job.headline}</h2>
              {job.webpage_url && (
                <a
                  href={job.webpage_url}
                  className="link link-primary break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View job: ${job.headline}`}
                >
                  View Job Posting
                </a>
              )}
              {job.application_deadline && (
                <p className="text-sm text-base-content/70">
                  Deadline: {new Date(job.application_deadline).toLocaleDateString()}
                </p>
              )}
              {job.description_text_formatted && (
                <div
                  className="prose max-w-none break-words"
                  dangerouslySetInnerHTML={{
                    __html: job.description_text_formatted,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
