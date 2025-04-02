"use client"; // Mark this file as a Client Component

import { Button } from "@/components/ui/button";

export default function QuestionPage() {
  const handleAskQuestion = () => {
    // Placeholder for question submission logic
    console.log("Question submitted!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Type your question here..."
        rows="5"
      ></textarea>
      <Button onClick={handleAskQuestion}>Submit Question</Button>
    </div>
  );
}