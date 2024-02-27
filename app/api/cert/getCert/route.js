import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "heloo world hehehehe",
  });
}
