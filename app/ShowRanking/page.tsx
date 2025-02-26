"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

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
    <div className="min-h-screen w-5/6 bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-5">Ranked CFA Providers</h1>
      <div className="flex justify-center w-full gap-6">
      {rankedProviders.length > 0 ? (
        <div className="bg-background p-6 rounded-lg shadow-2xl w-full">
            <div className="flex justify-center">
          {rankedProviders.map((provider, index) => (
            <div key={provider.id} className="p-6 m-2 w-80 text-left bg-white rounded-xl shadow-lg flex flex-col justify-between"> 
            {/* Ensuring consistent height */}
            <div>
              <h2 className="text-xl font-semibold mt-2">
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
              <p className="text-gray-600 my-3">{provider.description}</p>
              <p className="text-gray-600 my-3">{provider.similarityScore.toFixed(2)}</p>
            </div>
        
            {/* Button at the bottom */}
            <a 
              href={provider.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
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
