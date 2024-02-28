"use client";
import { useEffect, useState } from "react";

const GetCert = () => {
  const [results, setResults] = useState([]);

  const handleGetCert = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/cert/getCert", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setResults(data.results);

      if (!response.ok) {
        throw new Error("Failed to upload certificate.");
      }
    } catch (error) {
      console.error("Error uploading certificate:", error.message);
      alert(
        "Failed to Load certificate. Please check if MYSQL is already running..."
      );
    }
  };

  useEffect(() => {
    handleGetCert();
  }, []);
  return (
    <div className="width-full p-10 mt-5 flex justify-center flex-col gap-10">
      <button
        className="btn btn-outline rounded-md text-zinc-500 text-sm mx-auto"
        onClick={handleGetCert}
      >
        Refresh
      </button>
      <div className="overflow-x-auto mx-auto ">
        <table className="table table-zebra table-pin-rows w-[60rem]">
          {/* head */}
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th className="text-md font-bold">Contract ID</th>
              <th className="text-md font-bold">Content</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                {/* <td className="">{result.id}</td> */}
                <td className="text-zinc-600 flex align-start">
                  {result.contractNo}
                </td>
                <td className="max-w-[28rem] text-zinc-600 text-sm">
                  {result.content}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetCert;
