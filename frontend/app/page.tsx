"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Spinner icon
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    matric_number: "",
    password: "",
    department: "",
    lecturer: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.matric_number || !formData.password) {
      setError("Matric Number and Password are required.");
      setLoading(false);
      return;
    }

    try {
      // Check if already submitted
      const verifyResponse = await fetch(
        `http://10.136.3.10:5000/api/check-submission?matric_number=${formData.matric_number}`
      );
      const verifyData = await verifyResponse.json();

      if (verifyData.submitted) {
        setError("You have already submitted the exam.");
        setIsSubmitted(true);
        setLoading(false);
        return;
      }

      // Proceed with login
      const response = await fetch("http://10.136.3.10:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed.");
      }

      // Store in localStorage
      localStorage.setItem("studentData", JSON.stringify(formData));
      router.push("/home/welcome");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="py-6 text-center">
            COS 101: Intro to Programming I
          </CardTitle>
          <CardDescription>Fill in your details to proceed.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {/* Matric Number */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="matric_number">Matric Number</Label>
                <Input
                  id="matric_number"
                  name="matric_number"
                  value={formData.matric_number}
                  onChange={handleChange}
                  placeholder="Enter your matric number"
                  required
                  disabled={isSubmitted}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  disabled={isSubmitted}
                />
              </div>

              {/* Department */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="department">Department</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("department", value)}
                  value={formData.department}
                  disabled={isSubmitted}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="business">Business Administration</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lecturer */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lecturer">Lecturer</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("lecturer", value)}
                  value={formData.lecturer}
                  disabled={isSubmitted}
                >
                  <SelectTrigger id="lecturer">
                    <SelectValue placeholder="Select lecturer" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                    <SelectItem value="prof-johnson">Prof. Johnson</SelectItem>
                    <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <CardFooter className="flex justify-end">
              <Button
                className="bg-primary my-4 text-white rounded-full flex items-center gap-2"
                type="submit"
                disabled={loading || isSubmitted}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : isSubmitted ? (
                  "Submitted"
                ) : (
                  "Enter Exam"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
