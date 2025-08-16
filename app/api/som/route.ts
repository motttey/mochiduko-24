// This gets called on every request
import { NextResponse } from "next/server";

import { Illust } from "@/types/api";

export const dynamic = "force-static";

export async function GET() {
  // Fetch data from external API
  const res: Response = await fetch(
    `https://mochiduko-api.netlify.app/som_data.json`,
  );
  const data: Array<Illust> = await res.json();
  // Pass data to the page via props
  return NextResponse.json({ illusts: data });
}
