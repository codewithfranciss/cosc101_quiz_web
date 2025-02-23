'use client'

import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Welcome() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartExam = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/home/exam");
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
          <p className="text-gray-700 text-base"><span className="font-semibold">Time:</span> 20 Minutes</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="w-full bg-primary hover:bg-accent text-white font-medium flex items-center justify-center gap-2"
            onClick={handleStartExam} 
            disabled={loading}
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
