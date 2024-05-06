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

  try {
    console.log("here")
    let outputDocument = new Docxtemplater(zip);
    const bondData = rawData?.bondData
    console.log("amount", rawData.bondData[5]);
    const dataToAdd = {
      id : bondData[0],
      num: bondData[1],
      contractor_name: bondData[2],
      project_no: bondData[3],
      project_name: bondData[4],
      amount: formatNumber(bondData[5]),
      amountInWords: amountToWords(bondData[5]),
      date_validated: convertToDate(bondData[6]),
      effectivity_date: convertToDate(bondData[7]),
      expiration_date: convertToDate(bondData[8]),
      validity: bondData[9],
      bond_no: bondData[10],
      the_who: bondData[14],
      insurance_company: bondData[11],
      bond_type: bondData[13],
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
        path.resolve(__dirname,  `${folderData?.outputFolder}/ ${bondData[0]} Certfications.docx`),
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
