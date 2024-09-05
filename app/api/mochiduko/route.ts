// This gets called on every request
import { NextResponse } from "next/server";

import { Illust } from "@/types/api";

export async function GET() {
  // Fetch data from external API
  const res: Response = await fetch(
    `https://mochiduko-api.netlify.app/each_illusts.json`,
  );
  const data: Array<Illust> = await res.json();
  // Pass data to the page via props
  return NextResponse.json({ illusts: data });
}
