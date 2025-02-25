"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaFileUpload, FaUserPlus, FaChartBar, FaSignOutAlt, FaClock } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [timer, setTimer] = useState(""); // Timer state

 

  // Save the timer to the database
  const saveTimer = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/set-timer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timer: Number(timer) }),
      });

      if (!response.ok) {
        throw new Error("Failed to save timer.");
      }

      alert("Timer saved successfully!");
    } catch (error) {
      console.error("Error saving timer:", error);
      alert("Failed to save timer.");
    }
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-300 flex flex-col justify-between p-4 shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-semibold text-gray-800 mb-6">Admin Panel</div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <Link href="/admin/home/upload" className={`flex items-center space-x-3 text-gray-700 hover:text-blue-600 ${pathname === "/admin/home/upload" ? "font-bold text-blue-600" : ""}`}>
          <FaFileUpload className="w-5 h-5" />
          <span>Upload Questions</span>
        </Link>

        <Link href="/admin/home/add-student" className={`flex items-center space-x-3 text-gray-700 hover:text-blue-600 ${pathname === "/admin/home/add-student" ? "font-bold text-blue-600" : ""}`}>
          <FaUserPlus className="w-5 h-5" />
          <span>Add Student</span>
        </Link>

        <Link href="/admin/home/view-score" className={`flex items-center space-x-3 text-gray-700 hover:text-blue-600 ${pathname === "/admin/home/view-score" ? "font-bold text-blue-600" : ""}`}>
          <FaChartBar className="w-5 h-5" />
          <span>View Score</span>
        </Link>
      </nav>

      {/* Timer Input */}
      <div className="flex flex-col space-y-2 my-4">
        <label className="text-gray-700 flex items-center space-x-2">
          <FaClock className="w-5 h-5" />
          <span>Set Timer (mins)</span>
        </label>
        <input
          type="number"
          min="1"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={saveTimer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Timer
        </button>
      </div>

      {/* Logout Button */}
      <button className="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        <FaSignOutAlt className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
