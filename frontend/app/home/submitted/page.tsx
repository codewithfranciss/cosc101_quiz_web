import React from "react";
import { CheckCircle } from "lucide-react"; // Using Lucide icons for a clean design
import { Button } from "@/components/ui/button";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      {/* Animated Checkmark */}
      <div className="bg-green-100 p-6 rounded-full shadow-lg mb-6 animate-bounce">
        <CheckCircle className="text-green-600 w-16 h-16" />
      </div>

      {/* Success Text */}
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Successfully Submitted</h1>
      <p className="text-lg text-gray-600">Your score has been captured.</p>

      {/* Button to return to home */}
      <Button className="mt-6 bg-primary hover:bg-secondary text-white px-6 py-3 text-lg font-semibold">
        Logout
      </Button>
    </div>
  );
}
