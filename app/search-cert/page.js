"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "@/config/toast";

const SearchCert = () => {
  const [id, setId] = useState("");

  const handleSubmit = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.post("http://localhost:3000/api/search-cert", JSON.stringify(id), {
        headers: {
          "Content-Type": "application/json",
        },
      });
=======
      const response = await axios.post(
        "http://localhost:3000/api/cert/search-cert",
        JSON.stringify(id),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
>>>>>>> c6485eef4800455acb1be69260a6825294186570
      // Handle the response here
      console.log("response: ", response.data.results[0]);

      if (response.data.results[0]) {
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
      </span>
    </div>
  );
};

export default SearchCert;

// const successToast = (text) =>
//   toast.success(text, {
//     position: "top-right",
//     autoClose: 8000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//     // transition: Bounce,
//   });

// const errorToast = (text) =>
//   toast.error(text, {
//     position: "top-right",
//     autoClose: 8000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//     // transition: Bounce,
//   });
