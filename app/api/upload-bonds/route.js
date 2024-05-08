import { NextResponse } from "next/server";
import * as xlsx from "xlsx";
import fs from "fs";
import { removeDuplicate } from "@/config/removeDuplicate";

export async function POST(request) {
  try {
    console.log("here")
    const rawData = await request.json();
    const bondPath = rawData?.bondPath;
    console.log("BONDS PATH: ",bondPath);
    const buffer = fs.readFileSync(bondPath);
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[7];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    const sliceData = data.slice(8); // Assuming you're excluding header rows
    const unfilterBonds = sliceData.map((obj) => Object.values(obj));
    const bonds = removeDuplicate(unfilterBonds);
    // console.log("BONDS: ", bonds);

    console.log("Data uploaded successfully");
    return NextResponse.json({
      status: 200,
      message: "Bonds uploaded successfully",
      data: bonds
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Something went wrong while uploading bonds",
    });
  }
}
