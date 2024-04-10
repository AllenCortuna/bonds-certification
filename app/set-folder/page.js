"use client";
import { successToast } from "@/config/toast";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const Folder = () => {
  const [data, setData] = useState({
    templatePath: "",
    outputFolder: "",
    bondPath: ""
  });

  useEffect(() => {
    const folderData = JSON.parse(localStorage.getItem("folderData"));
    setData(folderData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data Bonds folder:", data);
    localStorage.setItem("folderData", JSON.stringify(data));
    successToast("Folder directories has been updated");
  };

  return (
    <div className="flex w-screen p-20 justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="justify-center flex flex-col gap-3 mt-10 w-auto rounded-xl shadow-sm p-8 min-w-[50rem] bg-zinc-50"
      >
        {/* AWARD */}
        <p className="primary-text">Where to save Bonds?</p>
        <input
          name="outputFolder"
          value={data?.outputFolder}
          onChange={handleChange}
          className="custom-input"
        ></input>

        <p className="primary-text mt-5">Where to find the Bonds Template?</p>
        <input
          name="templatePath"
          value={data?.templatePath}
          onChange={handleChange}
          className="custom-input"
        ></input>

        <p className="primary-text mt-5">Where to find the Bonds Data?</p>
        <input
          name="bondPath"
          value={data?.bondPath}
          onChange={handleChange}
          className="custom-input"
        ></input>

        <button
          type="submit"
          className="btn btn-neutral text-sm w-32 ml-auto mr-0"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Folder;
