import { NextRequest, NextResponse } from "next/server";
import { meiliClient, jobsIndex } from "@/lib/meilisearch";

const softwareDeveloperConceptId = "DJh5_yyF_hEM";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const hitsPerPage = parseInt(searchParams.get("limit") || "100");

  try {
    const index = meiliClient.index(jobsIndex);

    const searchResults = await index.search(query, {
      hitsPerPage,
      page: 1,
      filter: `occupation_group_concept_id = "${softwareDeveloperConceptId}"`,
      attributesToRetrieve: [
        "id",
        "headline",
        "webpage_url",
        "application_deadline",
        "description_text",
        "description_text_formatted",
      ],
    });

    return NextResponse.json({
      jobs: searchResults.hits,
      totalHits: searchResults.totalHits,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
