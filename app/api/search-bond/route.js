import { NextResponse } from "next/server";
import connection from "@/config/db";

export async function POST(request) {
  try {
    // Extract data from the request body
    console.log("try search");
    const data = await request.json();
    // const { contractNo, content } = req.body.json();
    console.log(data);

    // Check if the contract number already exists
    const result = await connection.execute(
      "SELECT * FROM bonds WHERE id = ? INNER JOIN who ON bonds.id = who.id",
      [data.id]
    );

    console.log("Data from Search:", result);
    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error("Error Searching:", error);
    return NextResponse.json({
      error: "Internal server error",
    });
  }

}
