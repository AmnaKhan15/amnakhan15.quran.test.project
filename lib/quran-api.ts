import axios from 'axios';

const AUTH_URL = process.env.QURAN_API_AUTH_URL || 'https://prelive-oauth2.quran.foundation/oauth2/token';
const BASE_URL = process.env.QURAN_API_BASE_URL || 'https://apis-prelive.quran.foundation/content/api/v4';

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  juz_number: number;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_type: string | null;
  sajdah_number: number | null;
  page_number: number;
  text_uthmani?: string;
  text_indopak?: string;
  text_simple?: string;
  translations?: Array<{
    id: number;
    resource_id: number;
    text: string;
    resource_name: string;
    resource_language_name?: string;
  }>;
}

export interface ChaptersResponse {
  chapters: Chapter[];
}

export interface VersesResponse {
  verses: Verse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
}

let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get OAuth2 access token with caching
 */
export async function getAccessToken(): Promise<string> {
  const clientId = process.env.QURAN_CLIENT_ID;
  const clientSecret = process.env.QURAN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('QURAN_CLIENT_ID and QURAN_CLIENT_SECRET must be set in environment variables');
  }

  // Return cached token if still valid (with 5 minute buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cachedToken.token;
  }

  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await axios.post<AccessTokenResponse>(
      AUTH_URL,
      'grant_type=client_credentials&scope=content',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const expiresAt = Date.now() + (response.data.expires_in * 1000);
    cachedToken = {
      token: response.data.access_token,
      expiresAt,
    };

    return cachedToken.token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to authenticate with Quran Foundation API');
  }
}

/**
 * Make authenticated API request
 */
async function makeAuthenticatedRequest<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const token = await getAccessToken();
  const clientId = process.env.QURAN_CLIENT_ID!;

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  try {
    const response = await axios.get<T>(url.toString(), {
      headers: {
        'x-auth-token': token,
        'x-client-id': clientId,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.status, error.response?.data);
      throw new Error(`API request failed: ${error.response?.status} ${error.response?.statusText}`);
    }
    throw error;
  }
}

/**
 * Get all chapters
 * Returns chapters in the expected format: { chapters: Chapter[] }
 */
export async function getChapters(): Promise<Chapter[]> {
  const response = await makeAuthenticatedRequest<ChaptersResponse>('/chapters');
  
  // Validate response structure
  if (!response || !response.chapters || !Array.isArray(response.chapters)) {
    throw new Error('Invalid response format: expected { chapters: Chapter[] }');
  }
  
  return response.chapters;
}

/**
 * Get verses for a chapter
 */
export async function getChapterVerses(
  chapterId: number,
  page: number = 1,
  perPage: number = 10,
  translations?: string
): Promise<VersesResponse> {
  const params: Record<string, string> = {
    page: page.toString(),
    per_page: perPage.toString(),
    // Include text fields to get Arabic text
    fields: 'text_uthmani,text_simple,text_indopak',
  };
  
  if (translations) {
    params.translations = translations;
    // Include translation fields
    params.translation_fields = 'text,resource_name,resource_language_name';
  }

  return makeAuthenticatedRequest<VersesResponse>(`/verses/by_chapter/${chapterId}`, params);
}

/**
 * Get a specific verse by key (e.g., "1:1", "2:255")
 */
export async function getVerse(verseKey: string, translations?: string): Promise<Verse> {
  const params: Record<string, string> = {
    // Include text fields to get Arabic text
    fields: 'text_uthmani,text_simple,text_indopak',
  };
  
  if (translations) {
    params.translations = translations;
    // Include translation fields
    params.translation_fields = 'text,resource_name,resource_language_name';
  }

  const response = await makeAuthenticatedRequest<{ verse: Verse }>(`/verses/by_key/${verseKey}`, params);
  return response.verse;
}

/**
 * Search verses
 */
export async function searchVerses(
  query: string,
  language: string = 'en',
  page: number = 1,
  perPage: number = 20
): Promise<VersesResponse> {
  const params = {
    q: query,
    language,
    page: page.toString(),
    per_page: perPage.toString(),
  };

  return makeAuthenticatedRequest<VersesResponse>('/verses/search', params);
}

