import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10  p-24">
       <Link href={'/get-cert'} className="text-md p-4 text-zinc-700 border rounded-md "> Get Certificate</Link>
       <Link href={'/add-cert'} className="text-md p-4 text-zinc-700 border rounded-md "> Add Certificate</Link>
    </main>
  );
}
