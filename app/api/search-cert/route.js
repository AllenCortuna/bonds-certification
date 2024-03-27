import { NextResponse } from "next/server";
import connection from "@/config/db";

export async function POST(request) {
  console.log("TRY SEARCH ");
  try {
    // Extract data from the request body
    const id = await request.json();
    console.log("SUBMITTED ID: ", id);

    const [rows,fields] = await connection.query(
      "SELECT * FROM `bonds` WHERE id = ?",
      [id]
    );
    // console.log("rows:", rows);
    return NextResponse.json({
      results: rows,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
