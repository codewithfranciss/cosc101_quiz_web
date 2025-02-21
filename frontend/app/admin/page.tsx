import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>

        <form className="space-y-4">
          {/* Username Field */}
          <div>
            <Label htmlFor="username" className="block mb-1 text-gray-700">Username</Label>
            <Input type="text" id="username" placeholder="Enter username" className="w-full" />
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="block mb-1 text-gray-700">Password</Label>
            <Input type="password" id="password" placeholder="Enter password" className="w-full" />
          </div>

          {/* Login Button (Right-Aligned) */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
