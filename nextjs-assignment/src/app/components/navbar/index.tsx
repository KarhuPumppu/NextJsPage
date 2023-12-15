import React from "react";
import Link from "next/link";
// import Button from "./Button";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-cyan-700 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Today</p>
                </Link>
              </li>
              <li>
                <Link href="/nextDay">
                  <p>Next Day</p>
                </Link>
              </li>
              <li>
                <Link href="/previousDay">
                  <p>Previous Day</p>
                </Link>
              </li>
            </ul>
            {/* <Button /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;