"use client";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const handleRefresh = async () => {
    console.log("refresh");
    // Define the URLs for the API endpoints
    const bondsApi = "http://localhost:3000/api/upload-bonds";
    const whoApi = "http://localhost:3000/api/upload-who";

    try {
      // Make GET requests to both endpoints
      const response1 = await axios.get(bondsApi);
      console.log("Response from endpoint1:", response1.data);

      const response2 = await axios.get(whoApi);
      console.log("Response from endpoint2:", response2.data);
      
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <Link href={"/search-cert"}>
        <button className="btn btn-outline rounded-md text-zinc-500 text-md">
          Create Certificate
        </button>
      </Link>

      <button
        className="btn btn-outline rounded-md text-zinc-500 text-md"
        onClick={handleRefresh}
      >
        Sync Bonds
      </button>
    </main>
  );
}
