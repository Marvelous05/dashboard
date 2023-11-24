import React from "react";
import Link from "next/link";
import "../globals.css";
import companyLogo from "../../../public/logo.png"
import Image from "next/image"
import SideNav from "../navDrawer/page.js";

const Navbar = () => {
  return (
    <nav className="justify-between flex flex-between w-full  pt-3 bg-blue-500 dark:bg-slate-800">
     <SideNav/>
      <Image
    className="mx-auto h-10 w-auto ml-1"
    src={companyLogo}
    height={500}
    width={500}
    alt="Your Company"
  />

      <ul class="flex flex-row font-medium mt-0 pt-1 pl-60 space-x-8 text-sm">
      <a href="http://localhost:3000/cards">
          <li className="text-white hover:text-blue-300">Home</li>
        </a>
        <a href="http://localhost:3000/issues">
          <li className="text-white hover:text-blue-300">Issues</li>
        </a>
        <a href=" http://localhost:3000/users">
          <li className="text-white hover:text-blue-300">Users</li>
        </a>
        <a href=" http://localhost:3000/fieldTasks">
          <li className="text-white hover:text-blue-300">
            Tasks
          </li>
        </a>
        <a href=" http://localhost:3000/stocklist">
          <li className="text-white hover:text-blue-300">Stock</li>
        </a>
        {/* <a href="/">
          <button
            type="button"
            className="text-black bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mb-5 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            LOGIN
          </button>

        
        </a> */}
        <a />
      </ul>
    </nav>
  );
};

export default Navbar;
