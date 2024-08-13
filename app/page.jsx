"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";

export default function Home() {
  const { userName, setUserName } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!userName) {
      setIsEditing(true);
    }
  }, [userName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(inputValue);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border p-2"
            placeholder="Enter your name"
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl mb-4">Welcome {userName}</h1>
          <h2 className="text-lg mb-4 mt-4">What do you want to do?</h2>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleEdit}
              className="p-2 bg-white border border-black text-black hover:bg-sky-400 hover:text-white"
            >
              Edit Name
            </button>
            <Link
              href="/page1"
              className="p-2 bg-white border border-black text-black hover:bg-sky-400  hover:text-white"
            >
              Check the Current Time
            </Link>
            <Link
              href="/page2"
              className="p-2 bg-white border border-black text-black hover:bg-sky-400  hover:text-white"
            >
              Check the Weather
            </Link>
            <Link
              href="/page3"
              className="p-2 bg-white border border-black text-black hover:bg-sky-400  hover:text-white"
            >
              Check Lectures
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
