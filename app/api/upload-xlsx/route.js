import { NextResponse } from "next/server";
// import connection from "@/config/db";
import * as xlsx from "xlsx";
import fs from "fs"; // Import the 'fs' module to read the file

export async function GET() {
  try {
    //! remove all the data in the table before uploading
    const buffer = fs.readFileSync("/Users/zanzen/Desktop/DPWH/bonds.xlsm"); // Read the Excel file
    const workbook = xlsx.read(buffer, { type: "buffer" }); // Convert the buffer to a workbook
    const sheetName = workbook.SheetNames[7]; // Get the sheet name
    const sheet = workbook.Sheets[sheetName]; // Get the sheet
    const data = xlsx.utils.sheet_to_json(sheet); // Convert Excel data to JSON
    const bonds = data.slice(8);
    console.log("data", bonds);

    // for (const row of data) {
    //   const keys = Object.keys(row);
    //   const values = Object.values(row);

    //   const query = `INSERT INTO cert (contractNo, content) VALUES (${keys.map(() => "?").join(", ")})`;

    //   await connection.query(query, values);
    // }

    console.log("Data uploaded successfully");
    return NextResponse.json({
      status: 200,
      data: bonds, // Return the data in the response
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500, // Set status to 500 for internal server error
      error: error.message, // Return error message in the response
    });
  }
}
