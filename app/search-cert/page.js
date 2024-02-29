"use client"
import React from "react";
import { useState } from "react";

const SearchCert = () => {
  // TODO: implement search here
  const [contractNo, setContractNo] = useState("")
  const handleSearch = () => {
    try {
      // Call database
    } catch (error) {
      // Handle errors
    }
   
    revalidatePath('/posts') // Update cached posts
    redirect(`/post/${id}`) // Navigate to the new post page
     console.log("search");
  };

  return (
    <div className="flex flex-col">
      <span className="flex flex-row gap-4 justify-center p-10">
        <label className="input input-bordered flex items-center gap-2 w-60">
          {/* TODO: Icon  */}
          <input type="text" className="grow" placeholder="Search" onChange={(e)=> {setContractNo(e.target.value)}} value={contractNo} />
        </label>
        {/* Search  */}
        <button
          onClick={handleSearch}
          className="btn btn-neutral text-zinc-100 hover:bg-orange-500 hover:border-orange-500 hover:shadow-md rounded-md text-zinc-500 text-md w-32 font-normal"
        >
          Submit
        </button>
      </span>
    </div>
  );
};

export default SearchCert;
