import { NextRequest, NextResponse } from 'next/server';
import { getChapterVerses } from '@/lib/quran-api';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chapterId = parseInt(params.id);
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '10');
    const translations = searchParams.get('translations') || undefined;

    const response = await getChapterVerses(chapterId, page, perPage, translations);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching verses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch verses' },
      { status: 500 }
    );
  }
}

