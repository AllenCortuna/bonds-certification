"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";

const SearchCert = () => {
  const [id, setId] = useState("");
  // const [data, setData] = useState({});


  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/cert/search-cert", JSON.stringify(id), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle the response here
      console.log("response: ", response.data.results[0]);

      if (response.data.results[0]) {
        // setData(response.data.results[0]);
        // console.log("data: ", response.data.results[0]);
        try {
          const bonds = await axios.post(
            "http://localhost:3000/api/set-template",
            JSON.stringify(response.data.results[0]),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (bonds) {
            alert("BONDS Created Succesfully");
          }
        } catch (error) {
          console.error("Error Searching certificate:", error.message);
          alert("Failed to Create BONDS.docx");
        }
      }
    } catch (error) {
      console.error("Error Searching certificate:", error.message);
      alert("Failed to Find certificate. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col">
      <span className="flex flex-row gap-4 justify-center p-10">
        <label className="input input-bordered flex items-center gap-2 w-60">
          {/* TODO: Icon  */}
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => {
              setId(e.target.value);
            }}
            onPaste={(e) => {
              setId(e.target.value);
              setId(e.target.value);
            }}
            value={id}
          />
        </label>
        {/* Search  */}
        <button
          onClick={handleSearch}
          className="btn btn-neutral text-zinc-50 hover:bg-orange-500 hover:border-orange-500 hover:shadow-md rounded-md text-md w-32 font-normal"
        >
          Submit
        </button>
      </span>
    </div>
  );
};

export default SearchCert;
