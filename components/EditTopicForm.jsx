"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar"; 

export default function EditTopicForm({ id, title, description, teacherFirstName, teacherLastName }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newTeacherFirstName, setNewTeacherFirstName] = useState(teacherFirstName);
  const [newTeacherLastName, setNewTeacherLastName] = useState(teacherLastName);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription, newTeacherFirstName, newTeacherLastName }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/page3");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar />
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <input
        onChange={(e) => setNewTeacherFirstName(e.target.value)}
        value={newTeacherFirstName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Teacher First Name"
      />

      <input
        onChange={(e) => setNewTeacherLastName(e.target.value)}
        value={newTeacherLastName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Teacher Last Name"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
    </>
  );
}