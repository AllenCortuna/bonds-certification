import { NextResponse } from "next/server";
import connection from "@/config/db";

export async function POST(request) {

  try {
    // Extract data from the request body
    console.log("try upload");
    const data = await request.json()
    // const { contractNo, content } = req.body.json();
    console.log(data);

    // Check if the contract number already exists
    const [existingContract] = await connection.execute('SELECT * FROM cert WHERE contractNo = ?', [data.contractNo]);
    if (existingContract.length > 0) {
      // If contract number already exists, return an error response
      console.log('Contract number already exists:', data.contractNo);
      return NextResponse.json({
        error: "Contract number already exists",
      });
    }


    // Perform database operation (e.g., insert data)
    const [result] = await connection.execute('INSERT INTO cert (contractNo, content) VALUES (?, ?)', [data.contractNo, data.content]);
    console.log('Data inserted successfully:', result);
    return NextResponse.json({
      data
    });

  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({
    error: "Internal server error",
  });
  }
}
