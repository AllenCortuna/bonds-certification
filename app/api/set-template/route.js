import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { convertToDate } from "@/config/convertToDate";
import { amountToWords } from "@/config/amountToWords";
import { formatNumber } from "@/config/formatNumber";
import { templateDir } from "@/config/path";

export async function POST(request) {
  const templateFile = fs.readFileSync(
    path.resolve(__dirname, templateDir),
    "binary"
  );
  const zip = new PizZip(templateFile);
  console.log("here");

  try {
    // Attempt to read all the templated tags
    let outputDocument = new Docxtemplater(zip);
    const rawData = await request.json();
    console.log("rawData", rawData);
    const id = `${rawData.bond_type} ${rawData.bond_no}`;
    const dataToAdd = {
      id,
      num: rawData.num,
      contractor_name: rawData.contractor_name,
      project_no: rawData.project_no,
      project_name: rawData.project_name,
      amount: formatNumber(rawData.amount),
      amountInWords: amountToWords(rawData.amount),
      date_validated: convertToDate(rawData.date_validated),
      effectivity_date: convertToDate(rawData.effectivity_date),
      expiration_date: convertToDate(rawData.expiration_date),
      validity: rawData.validity,
      bond_no: rawData.bond_no,
      insurance_company: rawData.insurance_company,
      bond_type: rawData.bond_type,
    };
    console.log("dataToAdd: ", dataToAdd);

    // Set the data we wish to add to the document
    outputDocument.setData(dataToAdd);

    try {
      // Attempt to render the document (Add data to the template)
      outputDocument.render();

      // Create a buffer to store the output data
      let outputDocumentBuffer = outputDocument
        .getZip()
        .generate({ type: "nodebuffer" });

      // Save the buffer to a file
      fs.writeFileSync(
        path.resolve(__dirname, `C:/Users/User/Desktop/BONDS/${rawData.id} Certifications.docx`),
        outputDocumentBuffer
      );
    } catch (error) {
      console.error(`ERROR Filling out Template:`);
      console.error(error);
    }
  } catch (error) {
    console.error(`ERROR Loading Template:`);
    console.error(error);
  }

  return NextResponse.json({
    status: 200,
    message: "Template written succesfully",
  });
}
