import { NextResponse } from 'next/server';
import { getChapters } from '@/lib/quran-api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/chapters
 * Returns chapters in the format: { chapters: Chapter[] }
 * Each chapter includes: id, revelation_place, revelation_order, bismillah_pre,
 * name_simple, name_complex, name_arabic, verses_count, pages, translated_name
 */
export async function GET() {
  try {
    const chapters = await getChapters();
    
    // Ensure response matches expected format: { chapters: Chapter[] }
    return NextResponse.json({ chapters }, { status: 200 });
  } catch (error) {
    console.error('Error fetching chapters:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch chapters';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

