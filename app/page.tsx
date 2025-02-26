"use client";

import { useState } from "react";
import { Tooltip } from "@mui/material";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation"; // Import Next.js router


const categories = [
  { name: "Content Coverage", description: "The comprehensiveness and relevance of the study materials provided by each course provider." },
  { name: "Practice Resources", description: "The availability and quality of practice exams, quizzes, and question banks." },
  { name: "Flexibility and Accessibility", description: "How accessible the course is, including mobile support, offline access, and flexible scheduling." },
  { name: "Student Support", description: "The level of support provided, such as tutor assistance, discussion forums, and mentorship." },
  { name: "Cost-effectiveness", description: "How well the course price aligns with the value and quality of the content." },
];

export default function Index() {
  const router = useRouter(); // Initialize router
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(categories.map(({ name }) => [name, 0])) // Default scores = 0
  );
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle slider value change
  const handleChange = (category: string, value: number) => {
    setScores((prev) => ({ ...prev, [category]: value }));
  };

  // Submit data to local backend (API route)
  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/saveRatings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores),
      });

      if (!response.ok) throw new Error("Failed to save scores.");

      const data = await response.json();
      // Store ranked providers in localStorage before navigating
      localStorage.setItem("rankedProviders", JSON.stringify(data.rankedProviders));
      // Redirect to ranking page after successful submission
      router.push("/ShowRanking"); 

    } catch (error) {
      setErrorMessage("Error saving scores. Please try again.");
      console.error("Save error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-3">CFA Course Provider Comparison</h1>
      <p className="text-lg text-center mb-6">Rank the following items on a scale of 0 - 100 based on importance.</p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {categories.map(({ name, description }) => (
          <div key={name} className="mb-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold">{name}</label>
              <Tooltip title={description} arrow>
                <Info size={18} className="cursor-pointer text-gray-600" onClick={() => setSelectedDescription(description)} />
              </Tooltip>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={scores[name] ?? 50}
              onChange={(e) => handleChange(name, Number(e.target.value))}
              className="w-full mt-2"
            />
            <div className="text-right text-sm text-gray-600">{scores[name] ?? 50}</div>
          </div>
        ))}

        {selectedDescription && (
          <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mt-4">
            <strong>Info:</strong> {selectedDescription}
          </div>
        )}

        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
