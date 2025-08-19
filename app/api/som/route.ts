import { NextResponse } from "next/server";

import { mochidukoApiUrl } from "@/app/data/constants";
import { Illust } from "@/types/api";

export const dynamic = "force-static";

export async function GET() {
  const res: Response = await fetch(`${mochidukoApiUrl}/som_data.json`);
  const data: Array<Illust> = await res.json();
  return NextResponse.json({ illusts: data });
}
