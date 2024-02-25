import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10  p-24">
      <Link href={"/get-cert"}>
        {" "}
        <button className="btn btn-outline rounded-md text-zinc-500 text-md">Get Certificate</button>
      </Link>
      <Link href={"/add-cert"}>
        <button className="btn btn-outline rounded-md text-zinc-500 text-md">Add Certificate</button>
      </Link>
    </main>
  );
}
