"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [matricNumber, setMatricNumber] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve student data from local storage
    const storedStudentData = localStorage.getItem("studentData");
    if (storedStudentData) {
      const student = JSON.parse(storedStudentData);
      setMatricNumber(student.matric_number);
    }
  }, []);

  return (
    <nav className="flex bg-primary justify-between items-center shadow-md px-6 py-4">
      {/* Logo or Branding */}
      <h1 className="text-xl text-white font-semibold">Intro to Programming I</h1>

      {/* Matric Number Display */}
      <div className="flex items-center gap-4">
        <span className="text-white">
          Matric Number: {matricNumber ? matricNumber : "Not logged in"}
        </span>
      </div>
    </nav>
  );
}
