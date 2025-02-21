'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  question: `Sample question ${index + 1}?`,
  options: ["Option A", "Option B", "Option C", "Option D"],
}));

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    alert("Quiz Submitted!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative">
      {/* Timer */}
      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
        Time Left: 20:00
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
          COSC 101 - Question {currentQuestion + 1}/40
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
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
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
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className="bg-green-700 hover:bg-primary text-white"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
