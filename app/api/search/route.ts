import { NextRequest, NextResponse } from 'next/server';
import { searchVerses } from '@/lib/quran-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const language = searchParams.get('language') || 'en';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '20');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    const response = await searchVerses(query, language, page, perPage);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error searching verses:', error);
    return NextResponse.json(
      { error: 'Failed to search verses' },
      { status: 500 }
    );
  }
}

