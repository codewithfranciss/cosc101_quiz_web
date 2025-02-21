import React from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex bg-primary justify-between items-center shadow-md px-6 py-4">
      {/* Logo or Branding */}
      <h1 className="text-xl text-white font-semibold">Intro to programming I</h1>

      {/* Matric Number & Logout Form */}
      <div className="flex items-center gap-4">
        <span className="text-white"> 23/2077, Offor Chidoziem Francis</span>
      </div>
    </nav>
  );
}
