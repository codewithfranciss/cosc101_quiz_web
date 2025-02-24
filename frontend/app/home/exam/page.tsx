"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [studentData, setStudentData] = useState<{ matric_number: string; lecturer: string } | null>(null); // 40 minutes in seconds
  const [loading, setLoading] = useState(false);
  // Fetch student data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("studentData");
    if (storedData) {
      setStudentData(JSON.parse(storedData));
    }else{
      router.push('/')
    }
  }, []);


  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://10.136.3.10:5000/api/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // Auto-submit when time runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle selecting an answer
  const handleSelectOption = (questionId: number, option: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  // Handle Next & Previous
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    if(!studentData){
      alert("Please login to submit exam")
      router.push('/')
    }
    setLoading(true);
    console.log("Quiz Submitted! Answers:", answers);
    const payload = {
      matric_number: studentData?.matric_number,
      lecturer: studentData?.lecturer,
      answers: answers, // Send user answers
};
      try {
  const response = await fetch("http://10.136.3.10:5000/api/submit-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit quiz");
  }
  router.push("/home/submitted");
} catch (error) {
  console.error("Submission error:", error);
  alert("An error occurred while submitting the quiz. Please try again.");
}finally{
  setLoading(false)
}

    router.push("/home/submitted");
    
  };

  if (questions.length === 0) {
    return <p className="text-center text-xl font-semibold">Loading questions...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative">
      {/* Timer */}
      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
        Time Left: {formatTime(timeLeft)}
      </div>

      {/* Pagination */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 flex flex-wrap justify-center gap-2">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`w-10 h-10 text-sm font-medium rounded-md ${
              currentQuestion === index ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Quiz Container */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-center mb-4">
          COSC 101 - Question {currentQuestion + 1}/{questions.length}
        </h2>
        <p className="text-gray-700 mb-4">{questions[currentQuestion].question}</p>

        {/* Options */}
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md cursor-pointer"
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[questions[currentQuestion].id] === option}
                onChange={() => handleSelectOption(questions[currentQuestion].id, option)}
                className="w-4 h-4"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button onClick={handlePrev} disabled={currentQuestion === 0} variant="outline">
            Previous
          </Button>
          {currentQuestion === questions.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin mr-2" /> Submitting...
    </>
  ) : (
    "Submit"
  )}
</Button>
          ) : (
            <Button onClick={handleNext} className="bg-green-700 hover:bg-primary text-white">
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
