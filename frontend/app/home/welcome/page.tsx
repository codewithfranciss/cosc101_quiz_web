import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="flex justify-center mt-44">
      <Card className="w-[350px] shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-bold">COSC 101 Mid Semester</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-5">
          <p className="text-gray-700 text-base">40 Questions</p>
          <p className="text-gray-700 text-base"><span className="font-semibold ">Time:</span> 20 Minutes</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full bg-primary hover:bg-accent text-white font-medium">Start Exam</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
