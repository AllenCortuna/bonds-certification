import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("TRY SEARCH ");
  try {
    // Extract data from the request body
    const data = await request.json();
    const id = data?.id;
    const bondData = data?.bondData;
    const whoData = data?.whoData;

    console.log("SUBMITTED ID: ", id);
    // console.log('whoData :>> ', whoData);


    return NextResponse.json({
      result: id,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({
      error: error,
    });
  }
}
