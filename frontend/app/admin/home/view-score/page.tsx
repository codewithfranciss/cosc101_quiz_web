'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Lecturer {
  lecturer: string; 
}

export default function ViewScores() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]); 

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/lecturers");
        const data: Lecturer[] = await response.json();
        setLecturers(data);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Scores</h2>

      {/* Lecturer List */}
      <div className="w-full max-w-2xl bg-gray-100 rounded-lg shadow-md overflow-hidden">
        {lecturers.length > 0 ? (
          lecturers.map((lecturer, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 border-b ${
                index === lecturers.length - 1 ? "border-none" : "border-gray-200"
              }`}
            >
              {/* Lecturer Name */}
              <p className="text-gray-700 text-lg">{lecturer.lecturer}</p>

              {/* View Button */}
              <Link href={`/admin/home/view-score/${encodeURIComponent(lecturer.lecturer)}`}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View Scores
              </button></Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-4">No lecturers found</p>
        )}
      </div>
    </div>
  );
}
