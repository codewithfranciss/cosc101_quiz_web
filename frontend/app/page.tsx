"use client";

import React, { useState, useEffect } from "react";
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
    full_name:"",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lecturers, setLecturers] = useState<{ name: string }[]>([]);
  const [departments, setDepartments] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get-lecturers`
        );
        if (!response.ok) throw new Error("Failed to fetch lecturers.");
        const data = await response.json();

        if (Array.isArray(data.lecturers)) {
          setLecturers(data.lecturers.map((name: string) => ({ name })));
        } else {
          console.error("Invalid API response format:", data);
          setLecturers([]);
        }
      } catch (error: any) {
        console.error("Error fetching lecturers:", error.message);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get-department`
        );
        if (!response.ok) throw new Error("Failed to fetch departments.");
        const data = await response.json();

        if (Array.isArray(data.departments)) {
          setDepartments(data.departments.map((name: string) => ({ name })));
        } else {
          console.error("Invalid API response format:", data);
          setDepartments([]);
        }
      } catch (error: any) {
        console.error("Error fetching departments:", error.message);
      }
    };

    fetchLecturers();
    fetchDepartments();
  }, []);

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

    if (!formData.matric_number || !formData.password || !formData.department || !formData.lecturer) {
      setError("Fill in your complete details to proceed.");
      setLoading(false);
      return;
    }

    try {
      const verifyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/check-submission?matric_number=${formData.matric_number}`
      );
      const verifyData = await verifyResponse.json();

      if (verifyData.submitted) {
        setError("You have already submitted the exam.");
        setIsSubmitted(true);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed.");
      }

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


              {/* Full Name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Surname first"
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
                  value={formData.department || undefined}
                  disabled={isSubmitted}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {departments.length > 0 ? (
                      departments.map((department, index) => (
                        <SelectItem key={index} value={department.name}>
                          {department.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="no-departments">
                        No departments available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Lecturer */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lecturer">Lecturer</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("lecturer", value)}
                  value={formData.lecturer || undefined}
                  disabled={isSubmitted}
                >
                  <SelectTrigger id="lecturer">
                    <SelectValue placeholder="Select lecturer" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-48 overflow-y-auto">
                    {lecturers.length > 0 ? (
                      lecturers.map((lecturer, index) => (
                        <SelectItem key={index} value={lecturer.name}>
                          {lecturer.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="no-lecturers">
                        No lecturers available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <CardFooter className="flex justify-end">
              <Button
                className="bg-primary my-4 text-white rounded-full flex items-center gap-2"
                type="submit"
                disabled={loading || isSubmitted}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enter Exam"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
