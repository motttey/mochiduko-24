// This gets called on every request
import { Illust } from '@/types/api';
import { NextResponse } from 'next/server';

export async function GET() {
    // Fetch data from external API
    const res: Response = await fetch(`https://mochiduko-api.netlify.app/each_illusts.json`)
    const data: Array<Illust> = await res.json()
    // Pass data to the page via props
    return NextResponse.json({ illusts: data })
}
