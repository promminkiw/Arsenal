// src/app/api/football/fixtures/route.ts
import { NextResponse } from 'next/server';
import { getFixturesFootballData } from '@/lib/footballData';

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getFixturesFootballData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
