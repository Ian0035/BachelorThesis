"use client";

import { useState, useEffect } from "react";
import { Star, StarHalf } from "lucide-react";
import { useRouter } from "next/navigation"; // Correct import

interface Provider {
  id: number;
  name: string;
  description: string;
  link: string;
  similarityScore: number;
  certified: string;
}

export default function ShowRanking() {
  const [rankedProviders, setRankedProviders] = useState<Provider[]>([]); // Explicit type
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Load ranked providers from localStorage
    const storedData = localStorage.getItem("rankedProviders");
    if (storedData) {
      setRankedProviders(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 w-full min-h-screen">
      <div className="w-11/12 md:w-5/6 mx-auto py-10 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Ranked CFA Providers
        </h1>
  
        {rankedProviders.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rankedProviders.map((provider, index) => (
                <div
                  key={provider.id}
                  className="p-6 bg-white dark:bg-zinc-800 dark:border dark:border-zinc-200 dark:shadow-md dark:shadow-zinc-200 rounded-lg shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold mb-2 dark:text-white">
                        <span
                          className={`text-xl font-bold ${
                            index === 0
                              ? "text-yellow-500"
                              : index === 1
                              ? "text-gray-400"
                              : index === 2
                              ? "text-orange-600"
                              : "text-black dark:text-white"
                          }`}
                        >
                          #{index + 1 + " "}
                        </span>
                        {provider.name}
                      </h2>
                      
                      {provider.certified === "Certified" && (
                        <img
                          src="/images/certified.png"
                          alt="certified logo"
                          className="w-12 h-12 object-contain"
                        />
                      )}
                    </div>

  
                    <p className="text-gray-600 dark:text-white mt-2 inline-flex items-center">
                      Compatibility: {(provider.similarityScore / 100).toFixed(1)}/5
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-500 ml-1" />
                    </p>
  
                    <p className="text-gray-600 dark:text-white mt-2">
                      {provider.description}
                    </p>
                  </div>
  
                  <button
                    onClick={() => router.push(`/provider-details/${provider.id}`)}
                    className="mt-4 px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-white">
            No rankings available yet. Submit your scores first.
          </p>
        )}
      </div>
    </div>
  );
  
}
