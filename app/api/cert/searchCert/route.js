import { NextResponse } from "next/server";
import connection from "@/config/db";

export async function POST(request) {
  try {
    // Extract data from the request body

    const contractNo = await request.json();
    console.log("contractNo: ", contractNo);

    const [rows,fields] = await connection.query(
      "SELECT * FROM `cert` WHERE contractNO = ?",
      [contractNo]
    );
    console.log("rows:", rows);
    return NextResponse.json({
      results: rows,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
