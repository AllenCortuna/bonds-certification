"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "@/config/toast";

const SearchCert = () => {
  const [id, setId] = useState("");

  const handleRefresh = async () => {
    console.log("refresh");
    // Define the URLs for the API endpoints
    const bondsApi = "http://localhost:3000/api/upload-bonds";
    const whoApi = "http://localhost:3000/api/upload-who";

    try {
      const folderData = JSON.parse(localStorage.getItem("folderData"));
      // Make GET requests to both endpoints
      //save BONDS to local storage
      const response1 = await axios.post(bondsApi, folderData);
      console.log("Response from endpoint1:", response1.data.data);
      localStorage.setItem("bondData", JSON.stringify(response1.data.data));
      //save PERSONS to local storage
      const response2 = await axios.post(whoApi, folderData);
      console.log("Response from endpoint2:", response2.data.data);
      localStorage.setItem("whoData", JSON.stringify(response2.data.data));

      if (response1.data.error || response2.data.error) {
        window.alert(`${response1.data.error} &  ${response2.data.error}`);
      } else {
        window.alert(`${response1.data.message} &  ${response2.data.message}`);
      }
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const bondData = JSON.parse(localStorage.getItem("bondData"));
      const whoData = JSON.parse(localStorage.getItem("whoData"));
      console.log('id :>> ', id);
      const response = await axios.post(
        "http://localhost:3000/api/search-cert",
        JSON.stringify({ id, bondData, whoData }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response: ", response.data.result);

      if (!response.data.result) {
        errorToast("Submitted Contract NO. did not match  any data");
      }
      if (response.data.result) {
        try {
          const folderData = JSON.parse(localStorage.getItem("folderData"));
          const bonds = await axios.post(
            "http://localhost:3000/api/set-template",
            JSON.stringify({ bondData: response.data.result, folderData }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (bonds) {
            successToast("BONDS Created Succesfully");
          }
        } catch (error) {
          console.error("Error Searching certificate:", error.message);
          errorToast("Failed to Create BONDS.docx");
        }
      }
    } catch (error) {
      console.error("Error Searching certificate:", error.message);
      errorToast("Failed to Find certificate. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <span className="flex flex-row gap-4 justify-center p-10">
        <label className="input input-bordered flex items-center gap-2 w-80">
          {/* TODO: Icon  */}
          <input
            type="text"
            className="grow"
            placeholder="Paste here..."
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
          onClick={handleSubmit}
          className="btn btn-neutral text-zinc-50 hover:bg-orange-500 hover:border-orange-500 hover:shadow-md rounded-md text-md w-32 font-normal"
        >
          Submit
        </button>

        <button
          className="btn btn-outline rounded-md text-zinc-500 text-md"
          onClick={handleRefresh}
        >
          Sync Bonds
        </button>
      </span>
    </div>
  );
};

export default SearchCert;
