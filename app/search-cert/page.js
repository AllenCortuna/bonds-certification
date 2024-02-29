"use client";
import React from "react";
import { useState } from "react";

const SearchCert = () => {
  const [contractNo, setContractNo] = useState("");
  const [data, setData] = useState({});

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/cert/searchCert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contractNo),
        }
      );
      setData(await response.json())
      console.log(data);

      if (!response.ok) {
        throw new Error("Failed to upload certificate.");
      }
    } catch (error) {
      console.error("Error uploading certificate:", error.message);
      alert("Failed to upload certificate. Please try again later.");
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
    </div>
  );
};

export default SearchCert;
