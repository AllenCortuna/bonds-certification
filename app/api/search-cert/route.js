import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const filterArrayById = (id, array) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i][0] === id) {
          return array[i];
        }
      }
      return null;
    };

    // Extract data from the request body
    const data = await request.json();
    const id = data?.id;
    const bondData = data?.bondData;
    const whoData = data?.whoData;

    const bond = filterArrayById(id, bondData);
    const who = filterArrayById(id, whoData);
    // console.log("bond result :>> ", bond);
    // console.log("who result :>> ", who);
    const result = [...bond, ...who];
    // console.log('result :>> ', result);

    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json({
      error: error,
    });
  }
}
