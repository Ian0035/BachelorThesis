"use client";

import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { motion, AnimatePresence } from "framer-motion";



const categories = [
  { name: "Content Coverage", shortdescription: "The comprehensiveness and relevance of the study materials provided by each course provider. Click to see more info...", description:"Content coverage refers to how well a CFA course provider’s study materials align with the official CFA curriculum. A high-quality course should comprehensively cover all topics outlined in the CFA Institute’s syllabus, ensuring that no important areas are overlooked. Depth of content is also important—study materials should go beyond just summarizing information and provide thorough explanations, examples, and real-world applications. Clarity of explanations plays a crucial role in helping candidates grasp complex financial concepts, while alignment with exam objectives ensures that the materials focus on the most relevant topics, weighted appropriately based on their importance in the actual CFA exam." },
  { name: "Practice Resources", shortdescription: "The availability and quality of practice exams, quizzes, and question banks. Click to see more info...", description:"Practice resources are essential for reinforcing learning and improving exam performance. This includes access to practice questions, quizzes, mock exams, and other assessment tools. The quantity of practice questions matters, as candidates need sufficient exposure to different question types. The difficulty level should match the rigor of the actual CFA exam to provide an accurate sense of preparedness. The format of practice tests should also closely resemble the CFA exam structure, helping candidates become comfortable with its layout. Lastly, the relevance of practice questions ensures that they accurately reflect the types of questions that may appear on the exam." },
  { name: "Flexibility and Accessibility", shortdescription: "How accessible the course is, including mobile support, offline access, and flexible scheduling. Click to see more info...", description:"Flexibility and accessibility refer to how convenient it is for candidates to access and use the study materials. Many CFA candidates balance exam preparation with work or other commitments, making it important for course providers to offer multiple learning formats, such as live classes, pre-recorded videos, mobile apps, or self-paced study options. The availability of a structured or flexible study schedule is another key consideration—some candidates may prefer a guided program with set deadlines, while others may need the freedom to study at their own pace. Accessibility across various devices, such as laptops, tablets, and smartphones, is also important, as well as the ability to download materials for offline use." },
  { name: "Student Support", shortdescription: "The level of support provided, such as tutor assistance, discussion forums, and mentorship. Click to see more info...", description:"Student support refers to the level of assistance and guidance provided throughout the CFA exam preparation process. Access to instructors or tutors is crucial for addressing doubts and clarifying complex topics. Some courses offer discussion forums or study groups, where candidates can interact with peers, share insights, and seek help. Personalized feedback, such as progress tracking, customized study plans, or performance analytics, can further enhance the learning experience. Additional support services, such as one-on-one coaching, mentorship programs, or customer support, can also be valuable in ensuring candidates stay on track." },
  { name: "Cost-effectiveness", shortdescription: "How well the course price aligns with the value and quality of the content. Click to see more info...", description:"Cost-effectiveness evaluates whether a CFA course provides good value for the price paid. This involves comparing the cost of the course against the quality and quantity of study materials, practice resources, and support services offered. Hidden costs should also be considered—some providers may charge extra for mock exams, tutor access, or additional materials. Discounts and promotions, such as early-bird pricing, group discounts, or returning-student offers, can help reduce costs. A refund policy is another important factor; some providers offer money-back guarantees if students are unsatisfied or fail the exam despite completing the course." },
];

export default function Index() {
  const router = useRouter(); // Initialize router

  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [selectedMoreinfo, setSelectedMoreinfo] = useState< {name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showIntroText, setShowIntroText] = useState(true);


  // Generate random values for the sliders on mount
  useEffect(() => {
    const randomScores = Object.fromEntries(categories.map(({ name }) => [name, Math.floor(Math.random() * 101)]));
    setScores(randomScores); // Set the random values after the component mounts
  }, []);

  // Handle slider value change
  const handleChange = (category: string, value: number) => {
    setScores((prev) => ({ ...prev, [category]: value }));
  };
  

  // Submit data to local backend (API route)
  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage(null);
    localStorage.setItem("storedRatings", JSON.stringify(scores)); // Store scores in localStorage

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

  // If scores are not yet loaded, show a loading message
  if (scores === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className="w-full bg-gray-100 dark:bg-zinc-800">
    <div className="w-10/12 flex flex-col items-center pt-4 pb-10 mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3">
        The Comparison Tool</h1>

      <div className="bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-lg shadow-lg dark:border dark:border-zinc-200 dark:shadow-lg dark:shadow-zinc-200 w-full xl:w-10/12">
        <div className="inline-flex w-full">
        {/* Wide Section */}
          <div className="w-2/5 hidden md:block mx-auto max-h-[452px]" id="form">
            {categories.map(({ name, shortdescription, description }) => (
              <div key={name} className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="font-semibold">{name}</label>
                  <Tooltip title={shortdescription} arrow>
                    <Info size={18} className="cursor-pointer text-gray-600 dark:text-white" onClick={() => setSelectedMoreinfo({name, description})} />
                  </Tooltip>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scores[name]}
                  onChange={(e) => handleChange(name, Number(e.target.value))}
                  className="accent-green-500 dark:accent-green-800 w-full mt-2"
                />
                <div className="text-right text-sm text-gray-600 dark:text-white">{scores[name]}</div>
              </div>
            ))}
          </div>

          {/* Vertical line */}
          <div className="border-l-2 hidden md:block border-gray-300 mx-4" style={{ height: "auto" }} />


          <div className="w-2/5 mx-auto hidden md:block max-h-[452px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full" id="information">
            {/* Default text */}
            {!selectedMoreinfo && (
              <div className="p-2 rounded-lg mt-4">
                <p className="font-bold text-gray-700 dark:text-white text-xl pb-1">Welcome To the comparison tool</p>
                <p className="text-base/[1.45rem] dark:text-white text-gray-700 pb-4">
                Are you looking for a <span className="font-bold"> CFA provider </span> that perfectly fits you? 
                Look no further and try out the CFA course provider <span className="font-bold">comparison tool! </span> 
                This tool is specially made to find the right CFA provider <span className="font-bold">for you</span>. 
                <br />
                Decide what factors are most important for you.
                Rank the following items on a scale of <span className="font-bold"> 0 - 100 </span> based on importance.
                </p>
                <p className="text-base/[1.45rem] text-gray-700 dark:text-white">
                <span className="font-bold">For example:</span> If the cost of the CFA course provider would play a big part in the final descion,
                   you could give it a score of anywhere between 80 - 100. IF you don't really care about student support, give this a rating between 20 - 30.
                   <br /> 
                   The comparison tool works best if you're being honest with yourself and decide 
                    how much you actually care about a certain factor.
                </p>
              </div>
            )}
            {/* Dynamic description */}
            {selectedMoreinfo && (
              <div className="bg-gray-100 dark:bg-zinc-600 p-4 rounded-lg text-gray-700 dark:text-white mt-4">
                <div className="flex justify-between">
                  <p className="text-xl font-bold pb-1">
                    {selectedMoreinfo.name}
                  </p>
                <button
                  onClick={() => setSelectedMoreinfo(null)}
                  className="ml-2 text-red-500 font-semibold text-2xl"
                >
                  x
                </button>
                </div>
                <p className="text-base">
                <span className="font-bold">Info: </span>{selectedMoreinfo.description}
                </p>
              </div>
            )}

            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            
          </div>
          </div>
          <div className="w-40 hidden md:block mx-auto">
              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-green-500 dark:bg-green-800 text-white py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-900 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Calculating..." : "Calculate"}
              </button>
            </div>
        {/* MOBILE ONLY VIEW */}
          <div className="block md:hidden w-full">

          {/* Intro Text Section */}
          {showIntroText && (
            <div className="p-2 rounded-lg mt-2">
              <p className="font-bold text-gray-700 dark:text-white text-lg pb-1">
                Welcome To the comparison tool
              </p>
              <p className="text-base/[1.45rem] dark:text-white text-gray-700 pb-4">
                Are you looking for a <span className="font-bold">CFA provider</span> that perfectly fits you?
                Look no further and try out the CFA course provider <span className="font-bold">comparison tool!</span>
                <br />
                Decide what factors are most important for you. Rank the following items on a scale of
                <span className="font-bold"> 0 - 100 </span> based on importance.
              </p>
              <p className="text-base/[1.45rem] text-gray-700 dark:text-white">
                <span className="font-bold">For example:</span> If the cost of the CFA course provider plays a big part
                in your decision, give it a score between 80–100. If you don't care about student support, give that a 20–30.
                <br />
                The tool works best when you're honest about what matters to you most.
              </p>

              <button
                onClick={() => setShowIntroText(false)}
                className="mt-4 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                I got it
              </button>
            </div>
          )}

          {!showIntroText && (
            <div className="w-full" id="form">
              {categories.map(({ name, shortdescription, description }) => (
                <div key={name} className="mb-4">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold">{name}</label>
                    <Tooltip title={shortdescription} arrow>
                      <Info
                        size={18}
                        className="cursor-pointer text-gray-600 dark:text-white"
                        onClick={() =>
                          setSelectedMoreinfo((prev) =>
                            prev?.name === name ? null : { name, description }
                          )
                        }
                      />
                    </Tooltip>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scores[name]}
                    onChange={(e) => handleChange(name, Number(e.target.value))}
                    className="accent-green-500 dark:accent-green-800 w-full mt-2"
                  />
                  <div className="text-right text-sm text-gray-600 dark:text-white">
                    {scores[name]}
                  </div>

                  {/* Inline Dynamic Description */}
                  <AnimatePresence initial={false} mode="wait">
                    {selectedMoreinfo?.name === name && (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="bg-gray-100 dark:bg-zinc-600 p-3 mt-2 rounded-lg text-sm text-gray-700 dark:text-white"
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-semibold">{selectedMoreinfo.name}</p>
                          <button
                            onClick={() => setSelectedMoreinfo(null)}
                            className="text-red-500 text-base font-bold ml-2"
                          >
                            ×
                          </button>
                        </div>
                        <p className="mt-1">
                          <span className="font-bold">Info: </span>{selectedMoreinfo.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              ))}
              {!showIntroText && (
                <div className="w-40 mx-auto">
                  <button
                    onClick={handleSubmit}
                    className="mt-6 w-full bg-green-500 dark:bg-green-800 text-white py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-900 disabled:bg-gray-400"
                    disabled={loading}
                  >
                    {loading ? "Calculating..." : "Calculate"}
                  </button>
                </div>
              )}
            </div>
          )}

          </div>

          </div>
      </div>
    </div>

  );
}
