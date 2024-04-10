import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { convertToDate } from "@/config/convertToDate";
import { amountToWords } from "@/config/amountToWords";
import { formatNumber } from "@/config/formatNumber";

export async function POST(request) {
  const rawData = await request.json();
  const folderData = rawData?.folderData
  const templateFile = fs.readFileSync(
    path.resolve(__dirname,folderData?.templatePath),
    "binary"
  );
  const zip = new PizZip(templateFile);
  // console.log("here");

  try {
    let outputDocument = new Docxtemplater(zip);
    const bondData = rawData?.bondData
    console.log("Raw Data", rawData);
    const id = `${bondData.bond_type} ${bondData.bond_no}`;
    const dataToAdd = {
      id,
      num: bondData.num,
      contractor_name: bondData.contractor_name,
      project_no: bondData.project_no,
      project_name: bondData.project_name,
      amount: formatNumber(bondData.amount),
      amountInWords: amountToWords(bondData.amount),
      date_validated: convertToDate(bondData.date_validated),
      effectivity_date: convertToDate(bondData.effectivity_date),
      expiration_date: convertToDate(bondData.expiration_date),
      validity: bondData.validity,
      bond_no: bondData.bond_no,
      the_who: bondData.the_who,
      insurance_company: bondData.insurance_company,
      bond_type: bondData.bond_type,
    };
    // console.log("dataToAdd: ", dataToAdd);

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
        path.resolve(__dirname, folderData?.outputFolder),
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
