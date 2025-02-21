import React from "react";

export default function ViewScores() {
  const lecturers = [
    { id: 1, name: "Dr. John Smith" },
    { id: 2, name: "Prof. Emily Carter" },
    { id: 3, name: "Dr. Michael Brown" },
    { id: 4, name: "Prof. Sarah Johnson" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen  p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Scores</h2>

      {/* Lecturer List */}
      <div className="w-full max-w-2xl bg-gray-100 rounded-lg shadow-md overflow-hidden">
        {lecturers.map((lecturer, index) => (
          <div
            key={lecturer.id}
            className={`flex justify-between items-center p-4 border-b ${index === lecturers.length - 1 ? "border-none" : "border-gray-200"}`}
          >
            {/* Lecturer Name */}
            <p className="text-gray-700 text-lg">{lecturer.name}</p>

            {/* View Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
