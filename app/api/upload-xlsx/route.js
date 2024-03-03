import { NextResponse } from "next/server";
// import connection from "@/config/db";
import * as xlsx from "xlsx";
import fs from "fs"; // Import the 'fs' module to read the file


export async function GET() {
  console.log("try xlsx upload");
  try {
    // Read the Excel file
    const buffer = fs.readFileSync("/Users/zanzen/Desktop/DPWH/bonds.xlsm");
    // Convert the buffer to a workbook
    const workbook = xlsx.read(buffer, { type: "buffer" });
    // Get the sheet name
    const sheetName = workbook.SheetNames[7];
    // Get the sheet
    const sheet = workbook.Sheets[sheetName];
    // Convert Excel data to JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log('data', data)

    // for (const row of data) {
    //   const keys = Object.keys(row);
    //   const values = Object.values(row);

    //   const query = `INSERT INTO cert (contractNo, content) VALUES (${keys.map(() => "?").join(", ")})`;

    //   await connection.query(query, values);
    // }

    console.log("Data uploaded successfully");
    return NextResponse.json({
      status: 200,
      data: data, // Return the data in the response
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500, // Set status to 500 for internal server error
      error: error.message, // Return error message in the response
    });
  }
}
