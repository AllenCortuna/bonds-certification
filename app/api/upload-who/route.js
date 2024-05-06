import { NextResponse } from "next/server";
import * as xlsx from "xlsx";
import fs from "fs";
import { filterSignatury } from "@/config/filterSignatury";

export async function POST(request) {
  try {
    const rawData = await request.json();
    const bondPath = rawData?.bondPath;
    const buffer = fs.readFileSync(bondPath);
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[8];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    const sliceData = data.slice(1); // Assuming you're excluding header rows
    const unfilterBonds = sliceData.map((obj) => Object.values(obj));
    const whos = filterSignatury(unfilterBonds);

    console.log("Data uploaded successfully");
    return NextResponse.json({
      status: 200,
      message: "Person uploaded successfully",
      data: whos,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: error.message,
      message:
        "Something went wrong while uploading persons of signatury company",
    });
  }
}
