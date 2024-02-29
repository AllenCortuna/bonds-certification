import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-20 bg-zinc-200">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl font-bold">
          CertGEN
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Homepage</Link>
          </li>

          <li>
            <details>
              <summary>Actions</summary>
              <ul className="p-2 bg-base-100 rounded-t-none w-40">
                <li>
                  <Link href={"/add-cert"}>Add Certificate</Link>
                </li>
                <li>
                  <Link href={"/get-cert"}>Get Certificate</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};
