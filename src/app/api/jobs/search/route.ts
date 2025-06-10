import { NextRequest, NextResponse } from 'next/server';
import { meiliClient, JOBS_INDEX } from '@/lib/meilisearch';

const softwareDeveloperConceptId = "DJh5_yyF_hEM";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '100');

  try {
    const index = meiliClient.index(JOBS_INDEX);
    
    const searchResults = await index.search(query, {
      limit,
      filter: `occupation_group_concept_id = "${softwareDeveloperConceptId}"`,
      attributesToRetrieve: [
        'id',
        'headline',
        'webpage_url',
        'application_deadline',
        'description_text',
        'description_text_formatted',
      ],
    });

    return NextResponse.json({
      jobs: searchResults.hits,
      totalHits: searchResults.estimatedTotalHits,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
