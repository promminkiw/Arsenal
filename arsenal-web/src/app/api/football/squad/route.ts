import { NextResponse } from 'next/server';
import { apiFootballGET, getFootballConfig } from '@/lib/apiFootball';

export const revalidate = 3600; // squad เปลี่ยนไม่ถี่: cache 1 ชม.

// โครงสร้าง response ของ /players/squads (เราจะอ่านเท่าที่ใช้)
type PlayersSquadsResponse = Array<{
  team: { id: number; name: string; logo?: string };
  players: Array<{
    id: number;
    name: string;
    age?: number;
    number?: number;
    position?: string;
    photo?: string;
    nationality?: string;
  }>;
}>;

export async function GET(req: Request) {
  const { teamId } = getFootballConfig();

  // ✅ ใช้ endpoint ที่เหมาะกับ “squad ปัจจุบัน”
  const r = await apiFootballGET<PlayersSquadsResponse>(
    '/players/squads',
    { team: teamId },
    revalidate
  );

  // เผื่ออยากดู raw response: /api/football/squad?debug=1
  const url = new URL(req.url);
  const debug = url.searchParams.get('debug') === '1';

  if (!r.ok) {
    return NextResponse.json(
      {
        error: 'API-Football squad failed',
        status: r.status,
        apiUrl: r.url,
        detail: r.error,
      },
      { status: r.status }
    );
  }

  const block = r.data?.response?.[0];
  const teamName = block?.team?.name ?? '';
  const players = block?.players ?? [];

  const items = players.map((p) => ({
    id: p.id,
    name: p.name,
    age: p.age ?? null,
    nationality: p.nationality ?? '',
    photo: p.photo ?? null,
    position: p.position ?? '',
    number: p.number ?? null,
    teamName,
  }));

  if (debug) {
    return NextResponse.json({
      ok: true,
      teamId,
      apiUrl: r.url,
      results: r.data?.results,
      errors: r.data?.errors,
      rawCount: players.length,
      sample: items.slice(0, 3),
      raw: r.data, 
    });
  }

  return NextResponse.json({ teamId, items });
}
