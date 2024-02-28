"use client";
import React, { useState, useEffect } from "react";

const AddCert = () => {
  const [formData, setFormData] = useState({
    contractNo: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({ ...formData, contractNo: "" });
    // extract contractNo
    const regex = /\b(?:project)\s*([^\s:]+)/i;
    const match = formData.content.match(regex);
    // console.log(formData.content);
    if (match) {
      const projectCode = match[1];
      setFormData({ ...formData, contractNo: projectCode });
      // console.log(projectCode);
    } else {
      console.log("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/cert/uploadCert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("response",response);

      if (!response.ok) {
        throw new Error("Failed to upload certificate.");
      }

      // Reset the form after successful upload
      setFormData({
        contractNo: "24EB00",
        content: "",
      });

      alert("Certificate uploaded successfully!");
    } catch (error) {
      console.error("Error uploading certificate:", error.message);
      alert("Failed to upload certificate. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-10 justify-start flex-col mx-auto mt-20 w-[50rem]"
    >

      <div className="stats stats-vertical shadow w-40">
        <div className="stat">
          <div className="stat-title text-sm mb-2">Contract NO:</div>
          <div className="stat-value text-lg font-semibold ">{formData.contractNo}</div>
        </div>
      </div>

      <textarea
        name="content"
        className="textarea textarea-bordered bg-zinc-300 "
        value={formData.content}
        onChange={handleChange}
        rows={10}
        placeholder="Paste your content here..."
      />
      <button
        className="btn btn-secondary w-[10rem] text-sm rounded-md"
        type="submit"
      >
        Upload
      </button>
    </form>
  );
};

export default AddCert;
