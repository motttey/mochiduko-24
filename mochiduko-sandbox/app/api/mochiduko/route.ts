// This gets called on every request
import { NextResponse } from 'next/server';

export async function GET() {
    // Fetch data from external API
    const res = await fetch(`https://mochiduko-api.netlify.app/each_illusts.json`)
    console.log(res)

    const data = await res.json()
    // Pass data to the page via props
    return NextResponse.json({ illusts: data })
}
