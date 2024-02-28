import { NextResponse } from "next/server";
import connection from "@/config/db";

export async function GET() {
  try {
    const [results] = await connection.query(
      "SELECT * FROM `cert` ORDER BY `createdAt` DESC LIMIT 10"
    );
    // console.log(results);
    return NextResponse.json({
      results
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
// return NextResponse.json({
//   message: "heloo world hehehehe",
// });
