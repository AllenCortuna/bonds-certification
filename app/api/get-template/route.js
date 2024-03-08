import { NextResponse } from "next/server";
import createReport from "docx-templates";
import fs from "fs";
import React from "react";

const template = fs.readFileSync(
  "/Users/zanzen/Desktop/DPWH/certTemplate.docx"
);
export async function GET() {
  const buffer = await createReport({
    template,
    data: {
      name: "John",
      surname: "Appleseed",
    },
  });
  fs.writeFileSync("report.docx", buffer);

  return NextResponse.json({
    status: 200,
    message: "Person uploaded successfully",
  });
}
