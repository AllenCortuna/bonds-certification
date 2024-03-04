import { NextResponse } from "next/server";
import connection from "@/config/db";
import * as xlsx from "xlsx";
import fs from "fs";

export async function GET() {
  try {
    const buffer = fs.readFileSync("/Users/zanzen/Desktop/DPWH/bonds.xlsm");
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[7];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    const bonds = data.slice(8); // Assuming you're excluding header rows

    for (const row of bonds) {
      const arr = Object.values(row);
      await connection.query(
        "INSERT INTO bonds (id, num, contractor_name, project_no, project_name, amount, date_validated, effectivity_date, expiration_date, validity, bond_no, insurance_company, bond_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        arr
      );
    }

    console.log("Data uploaded successfully");
    return NextResponse.json({
      status: 200,
      data: bonds,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: error.message,
    });
  }
}
