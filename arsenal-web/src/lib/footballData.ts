// src/lib/footballData.ts
import 'server-only';

const BASE = 'https://api.football-data.org/v4';

function needEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function cfg() {
  return {
    key: needEnv('FOOTBALLDATA_KEY'),
    teamId: needEnv('FOOTBALLDATA_TEAM_ID'),
    competition: needEnv('FOOTBALLDATA_COMPETITION'), // e.g. "PL" or "2021"
    season: needEnv('FOOTBALLDATA_SEASON'), // e.g. "2025" (ปีเริ่มฤดูกาล 2025/26)
  };
}

async function fdGet<T>(
  path: string,
  params: Record<string, string | number | undefined>,
  revalidateSeconds: number
): Promise<T> {
  const { key } = cfg();
  const url = new URL(BASE + path);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && String(v).length > 0) {
      url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    headers: { 'X-Auth-Token': key },
    next: { revalidate: revalidateSeconds },
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    // ignore
  }

  if (!res.ok) {
    const detail = json?.message ? ` | ${json.message}` : '';
    throw new Error(`football-data error ${res.status} ${url}${detail}`);
  }

  return json as T;
}

/** คืน "shape ที่หน้าเดิมคุณใช้" ให้ใกล้เคียง API-Football */
export async function getStandingsFootballData() {
  const { competition, season, teamId } = cfg();

  const data = await fdGet<any>(
    `/competitions/${competition}/standings`,
    { season },
    600
  );

  const total = data?.standings?.find((s: any) => s.type === 'TOTAL')?.table ?? [];

  const items = total.map((row: any) => ({
    rank: row.position,
    team: {
      id: row.team?.id,
      name: row.team?.name ?? '',
      logo: row.team?.crest ?? null,
    },
    all: {
      played: row.playedGames ?? 0,
      win: row.won ?? 0,
      draw: row.draw ?? 0,
      lose: row.lost ?? 0,
    },
    goalsDiff: row.goalDifference ?? 0,
    points: row.points ?? 0,
    form: row.form ?? '',
  }));

  const myRow =
    items.find((x: any) => String(x.team.id) === String(teamId)) ?? null;

  return {
    leagueId: competition,
    season,
    teamId,
    myRow,
    items,
  };
}

export async function getFixturesFootballData() {
  const { teamId, season, competition } = cfg();

  // 1) โหลดทีมทั้งหมดในลีกเพื่อเอา crest/logo (cache นาน ๆ ได้)
  const teamsData = await fdGet<any>(
    `/competitions/${competition}/teams`,
    { season },
    86400 // cache 1 วัน
  );

  const crestByTeamId = new Map<string, string>();
  const teams = teamsData?.teams ?? [];
  for (const t of teams) {
    const id = t?.id;
    const crest = t?.crest ?? t?.crestUrl ?? t?.logo ?? null;
    if (id && crest) crestByTeamId.set(String(id), String(crest));
  }

  // 2) โหลดแมตช์ของทีม (fixtures + results)
  const data = await fdGet<any>(
    `/teams/${teamId}/matches`,
    { season, limit: 50 },
    300
  );

  const matches = data?.matches ?? [];

  // 3) map เป็น shape ที่ UI คุณใช้ + เติม homeLogo/awayLogo
  const items = matches.map((m: any) => {
    const homeId = m?.homeTeam?.id;
    const awayId = m?.awayTeam?.id;

    return {
      id: m.id,
      date: m.utcDate,
      status: m.status ?? '',
      competition: m.competition?.name ?? '',
      round: m.matchday ? `Matchday ${m.matchday}` : (m.stage ?? ''),
      homeTeam: m.homeTeam?.name ?? '',
      awayTeam: m.awayTeam?.name ?? '',
      homeLogo: homeId ? crestByTeamId.get(String(homeId)) ?? null : null,
      awayLogo: awayId ? crestByTeamId.get(String(awayId)) ?? null : null,
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
      stadium: m.venue ?? '',
    };
  });

  return { teamId, season, items };
}

