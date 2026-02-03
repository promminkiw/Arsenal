import 'server-only';

/* =======================
   Types
======================= */
type ApiFootballResponse<T> = {
  get: string;
  parameters: Record<string, string>;
  errors: unknown;
  results: number;
  response: T;
};

/* =======================
   Helpers
======================= */
function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name} in .env.local`);
  return v;
}

/* =======================
   Config (Api-Sports)
======================= */
export function getFootballConfig() {
  return {
    apiKey: requireEnv('APIFOOTBALL_KEY'),
    teamId: process.env.APIFOOTBALL_TEAM_ID || '42',
    leagueId: process.env.APIFOOTBALL_LEAGUE_ID || '39',
    season: process.env.APIFOOTBALL_SEASON || '2025',
  };
}

/* =======================
   Base URL (Api-Sports)
======================= */
const BASE_URL = 'https://v3.football.api-sports.io';

/* =======================
   GET Wrapper
======================= */
export async function apiFootballGET<T>(
  path: string,
  params: Record<string, string | number | undefined>,
  revalidateSeconds = 600
) {
  const { apiKey } = getFootballConfig();

  const url = new URL(BASE_URL + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, String(v));
    }
  });

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      // ✅ header ที่ถูกต้องสำหรับ API-Football / Api-Sports
      'x-apisports-key': apiKey,
    },
    next: { revalidate: revalidateSeconds },
  });

  const text = await res.text();
  let data: ApiFootballResponse<T> | null = null;

  try {
    data = JSON.parse(text);
  } catch {}

  if (!res.ok) {
    return {
      ok: false as const,
      status: res.status,
      url: url.toString(),
      error: data ?? text,
    };
  }

  return {
    ok: true as const,
    status: res.status,
    url: url.toString(),
    data: data as ApiFootballResponse<T>,
  };
}
