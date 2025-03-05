"use client";

import { useState, useEffect } from "react";
import { Star, StarHalf } from "lucide-react";

interface Provider {
  id: number;
  name: string;
  description: string;
  link: string;
  similarityScore: number;
}

export default function ShowRanking() {
  const [rankedProviders, setRankedProviders] = useState<Provider[]>([]); // Explicit type

  useEffect(() => {
    // Load ranked providers from localStorage
    const storedData = localStorage.getItem("rankedProviders");
    if (storedData) {
      setRankedProviders(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen w-5/6 bg-gray-100 dark:bg-zinc-800 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-5">Ranked CFA Providers</h1>
      <div className="flex justify-center w-full gap-6">
      {rankedProviders.length > 0 ? (
        <div className="bg-background dark:bg-zinc-800 dark:border dark:border-zinc-200 dark:shadow-lg dark:shadow-zinc-200 p-6 rounded-lg shadow-2xl w-full">
            <div className="flex justify-center">
          {rankedProviders.map((provider, index) => (
            <div key={provider.id} className="p-6 m-2 w-80 text-left bg-white dark:bg-zinc-800 dark:shadow-md dark:border dark:border-zinc-200 dark:shadow-zinc-200 rounded shadow-lg flex flex-col justify-between"> 
            {/* Ensuring consistent height */}
            <div>
              <h2 className="text-xl font-semibold mt-2 dark:text-white">
                <span className={`text-xl font-bold ${
                  index === 0 ? "text-yellow-500" :
                  index === 1 ? "text-gray-400" :
                  index === 2 ? "text-orange-600" :
                  "text-black"
                }`}>
                  #{index + 1 + ' '}
                </span>
                {provider.name}
              </h2>
              
                <p className="text-gray-600 dark:text-white mt-3 w-full inline-flex items-center">
                  Compatibility: {(provider.similarityScore / 100).toFixed(1)}/5
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-500 ml-1" />
                </p>
              <p className="text-gray-600 dark:text-white mt-1 mb-5">{provider.description}</p>
              
            </div>
        
            {/* Button at the bottom */}
            <a 
              href={provider.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-auto px-4 py-2 font-semibold text-white bg-green-500 dark:bg-green-800 rounded-lg hover:bg-green-600 dark:hover:bg-green-900"
            >
              Learn More
            </a>
          </div>
          ))}
          </div>
          <div className="flex justify-between w-full mt-6 text-gray-600">
                <button className="hover:underline">← Previous</button>
                <button className="hover:underline">Next →</button>
          </div>
        </div>
      ) : (
        <p>No rankings available yet. Submit your scores first.</p>
      )}
      </div>
      <div className="flex justify-between w-full mt-6 text-gray-600">
        <button className="hover:underline">← Previous</button>
        <button className="hover:underline">Next →</button>
      </div>
    </div>
  );
}
