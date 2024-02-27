"use client";
import React, { useState } from "react";

const AddCert = () => {
  const [formData, setFormData] = useState({
    contractNo: "24EB00",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <input
        type="text"
        name="contractNo"
        className="input input-bordered w-full max-w-xs bg-zinc-300 font-bold text-orange-600"
        value={formData.contractNo}
        onChange={handleChange}
        placeholder="Contract No."
      />
      <textarea
        name="content"
        className="textarea textarea-bordered bg-zinc-300"
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
