import { NextResponse } from "next/server";
import connection from "@/config/db";

export async function POST(request) {
  try {
    // Extract data from the request body
    const contractNo = await request.json();
    // const { contractNo, content } = req.body.json();
    console.log("contractNo: ", contractNo);

    const [results] = await connection.query(
      "SELECT * FROM `cert` WHERE contractNO = ?",[contractNo]
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