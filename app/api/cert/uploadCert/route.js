import { NextResponse } from "next/server";
import connection from "@/config/db";

export async function POST() {
  console.log("try upload");

  try {
    // Extract data from the request body
    console.log("try upload");
    const { contractNo, content } = req.body;
    console.log(contractNo);

    // Perform database operation (e.g., insert data)
    const [result] = await connection.execute('INSERT INTO your_table (contractNo, content) VALUES (?, ?)', [contractNo, content]);
    console.log('Data inserted successfully:', result);
    return NextResponse.json({
      data: result
    });

  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({
    error: "Internal server error",
  });
  }
  // return NextResponse.json({
  //   message: "heloo world hehehehe",
  // });
}
