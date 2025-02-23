import React from "react";
import { FaFileUpload, FaUserPlus, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white border-r border-gray-300 flex flex-col justify-between p-4 shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-semibold text-gray-800 mb-6">Admin Panel</div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <Link href="/admin/home/upload" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
          <FaFileUpload className="w-5 h-5" />
          <span>Upload Questions</span>
        </Link>

        <Link href="/admin/home/add-student" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
          <FaUserPlus className="w-5 h-5" />
          <span>Add Student</span>
        </Link>

        <Link href="/admin/home/view-score" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
          <FaChartBar className="w-5 h-5" />
          <span>View Score</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <button className="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        <FaSignOutAlt className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
