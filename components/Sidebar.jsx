"use client";

import { FaHome, FaClock, FaCalendarAlt, FaBook} from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";

export default function Sidebar() {
  const { userName } = useContext(UserContext);

  return (
    <div className="fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col w-16 md:w-60">
      <div className="p-4 bg-gray-900 text-center">
        <span
          className="hidden md:inline-block truncate w-full"
          title={userName}
        >
          {userName}
        </span>
      </div>
      <Link
        href="/"
        className="p-4 hover:bg-gray-700 flex items-center no-underline"
      >
        <FaHome className="mr-2" />
        <span className="hidden md:inline">Home</span>
      </Link>
      <Link
        href="/page1"
        className="p-4 hover:bg-gray-700 flex items-center no-underline"
      >
        <FaClock className="mr-2" />
        <span className="hidden md:inline">Current Time</span>
      </Link>
      <Link
        href="/page2"
        className="p-4 hover:bg-gray-700 flex items-center no-underline"
      >
        <FaCalendarAlt className="mr-2" />
        <span className="hidden md:inline">Date and Weather</span>
      </Link>
      <Link
        href="/page3"
        className="p-4 hover:bg-gray-700 flex items-center no-underline"
      >
        <FaBook className="mr-2" />
        <span className="hidden md:inline">Lectures</span>
      </Link>
    </div>
  );
}
