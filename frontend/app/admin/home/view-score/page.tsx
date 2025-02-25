'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Lecturer {
  lecturer: string;
}

interface Department {
  department: string;
}

export default function ViewScores() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // Fetch lecturers
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lecturers`);
        const data: Lecturer[] = await response.json();
        setLecturers(data);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };

    fetchLecturers();
  }, []);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/department`);
        const data: Department[] = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Scores</h2>

      {/* Two Columns Layout */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        
        {/* Student Scores by Lecturer */}
        <div className="w-full md:w-1/2 bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <h3 className="text-lg font-medium text-center p-4 bg-gray-200">Scores by Lecturer</h3>
          {lecturers.length > 0 ? (
            lecturers.map((lecturer, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 border-b ${
                  index === lecturers.length - 1 ? "border-none" : "border-gray-300"
                }`}
              >
                {/* Lecturer Name */}
                <p className="text-gray-700 text-lg">{lecturer.lecturer}</p>

                {/* View Button */}
                <Link href={`/admin/home/view-score/${encodeURIComponent(lecturer.lecturer)}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    View Scores
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 p-4 text-center">No lecturers found</p>
          )}
        </div>

        {/* Student Scores by Department */}
        <div className="w-full md:w-1/2 bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <h3 className="text-lg font-medium text-center p-4 bg-gray-200">Scores by Department</h3>
          {departments.length > 0 ? (
            departments.map((dept, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 border-b ${
                  index === departments.length - 1 ? "border-none" : "border-gray-300"
                }`}
              >
                {/* Department Name */}
                <p className="text-gray-700 text-lg">{dept.department}</p>

                {/* View Button */}
                <Link href={`/admin/home/view-score/department/${encodeURIComponent(dept.department)}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    View Scores
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 p-4 text-center">No departments found</p>
          )}
        </div>

      </div>
    </div>
  );
}
