'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Welcome() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  // Fetch timer from the backend
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-timer`);
        const data = await response.json();
        if (response.ok) {
          setTimer(data.timer * 60); // Convert minutes to seconds
        } else {
          console.error("Failed to fetch timer:", data.error);
        }
      } catch (error) {
        console.error("Error fetching timer:", error);
      }
    };

    fetchTimer();
  }, []);

  const handleStartExam = () => {
    if (timer === null) return; // Prevent starting if timer is not fetched
    setLoading(true);
    setTimeout(() => {
      router.push(`/home/exam?timer=${timer}`); // Pass timer as a query param
    }, 1000);
  };

  return (
    <div className="flex justify-center mt-44">
      <Card className="w-[350px] shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-bold">COSC 101 Mid Semester</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-5">
          <p className="text-gray-700 text-base">40 Questions</p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">Time:</span> {timer ? `${timer / 60} Minutes` : "Loading..."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="w-full bg-primary hover:bg-accent text-white font-medium flex items-center justify-center gap-2"
            onClick={handleStartExam} 
            disabled={loading || timer === null} // Disable until timer is fetched
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Starting...
              </>
            ) : (
              "Start Exam"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
