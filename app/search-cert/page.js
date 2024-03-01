"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import PrintableCert from "../component/PrintableCert";

const SearchCert = () => {
  const apiUrl = "http://localhost:3000/api/cert/searchCert";

  const [contractNo, setContractNo] = useState("");
  const [data, setData] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.post(apiUrl, JSON.stringify(contractNo), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle the response here
      console.log("response.data: ",response);
      setData(response.data.results[0]);
      console.log("data: ", data.content);

      // if (!response.ok) {
      //   throw new Error("Failed to Search certificate.");
      // }
    } catch (error) {
      console.error("Error Searching certificate:", error.message);
      alert("Failed to Find certificate. Please try again later.");
    }
    // revalidatePath('/posts') // Update cached posts
    // redirect(`/post/${id}`) // Navigate to the new post page
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
              setContractNo(e.target.value);
            }}
            value={contractNo}
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

      {data && <PrintableCert data={data}/>}
    </div>
  );
};

export default SearchCert;
