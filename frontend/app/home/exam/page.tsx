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
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [studentData, setStudentData] = useState<{ matric_number: string; full_name: string; lecturer: string; department: string; } | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch student data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("studentData");
    if (storedData) {
      setStudentData(JSON.parse(storedData));
    } else {
      router.push("/");
    }
  }, []);

  // Fetch questions only if studentData exists
  useEffect(() => {
    if (!studentData) return;
    
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions`);
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data: Question[] = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, [studentData]);

  // Fetch timer from backend
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-timer`);
        const data = await response.json();
        if (response.ok) {
          setTimeLeft(data.timer * 60);
        } else {
          console.error("Failed to fetch timer:", data.error);
        }
      } catch (error) {
        console.error("Error fetching timer:", error);
      }
    };
    fetchTimer();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
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

  const handleSelectOption = (questionId: number, option: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!studentData) {
      alert("Please login to submit exam");
      router.push("/");
      return;
    }

    setLoading(true);
    const payload = {
      matric_number: studentData.matric_number,
      lecturer: studentData.lecturer,
      department: studentData.department,
      full_name: studentData.full_name,
      answers,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-quiz`, {
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
    } finally {
      setLoading(false);
    }
  };

  if (loadingQuestions) {
    return <p className="text-center text-xl font-semibold">Loading questions...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative">
      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
        Time Left: {formatTime(timeLeft)}
      </div>

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

      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-center mb-4">
          COSC 101 - Question {currentQuestion + 1}/{questions.length}
        </h2>
        <p className="text-gray-700 mb-4">{questions[currentQuestion].question}</p>

        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md cursor-pointer">
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

        <div className="flex justify-between mt-6">
          <Button onClick={handlePrev} disabled={currentQuestion === 0} variant="outline">Previous</Button>
          <Button onClick={currentQuestion === questions.length - 1 ? handleSubmit : handleNext} className="bg-green-700 text-white">
            {currentQuestion === questions.length - 1 ? (loading ? "Submitting..." : "Submit") : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
