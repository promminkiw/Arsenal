// src/app/api/football/standing/route.ts
import { NextResponse } from 'next/server';
import { getStandingsFootballData } from '@/lib/footballData';

export const revalidate = 600;

export async function GET() {
  try {
    const data = await getStandingsFootballData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
