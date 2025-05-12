'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Provider {
  id: string;
  name: string;
  contentQuality: string;
  practiseMaterial: string;
  flexibilityAccessibility: string;
  studentPortal: string;
  costEffectiveness: string;
  certified?: boolean; // Add certified field
}

const ShowAllProvidersWithScore = ({ providers = [] }: { providers?: Provider[] }) => {
  const [scrapedData, setScrapedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleScrapeClick = async () => {
    setLoading(true);

    try {
      console.log('Button clicked: Fetching scraped data...');
      const response = await fetch('/api/scrape/route', {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      console.log('Scraped Data:', data);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No data returned from scraper");
      }

      // Loop through scraped data and update certified for each provider
      for (const { id, certified } of data) {
        if (!id || !certified) {
          console.error(`Missing id or certified for provider id ${id}`);
          continue; // Skip if any provider's certified is missing
        }

        const { error } = await supabase
          .from('providers')
          .update({ certified })
          .eq('id', id);

        if (error) {
          console.error(`Error updating provider id ${id}: ${error.message}`);
        }
      }

      setScrapedData(data);
      window.location.reload(); // Reload to show updated prices

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error scraping data:', error.message);
      } else {
        console.error('Error scraping data:', error);
      }
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen dark:border dark:border-zinc-200 p-6 md:p-10">
    <div className="flex flex-col md:flex-row justify-between mb-5">
      <h1 className="text-3xl font-bold mb-4 md:mb-0">Data from Supabase</h1>
      <button
        onClick={handleScrapeClick}
        className="text-xl font-bold text-white bg-gray-400 dark:bg-zinc-600 dark:hover:bg-zinc-700 rounded-lg flex items-center justify-center p-2"
        disabled={loading}
      >
        {loading ? "Webscraping..." : "Webscrape new data"}
      </button>
    </div>
  
    {providers.length === 0 ? (
      <p className="text-gray-500">No providers found.</p>
    ) : (
      <div>
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 dark:bg-zinc-400">
              <th className="border border-gray-300 px-4 py-2">Provider Name</th>
              <th className="border border-gray-300 px-4 py-2">Content Quality</th>
              <th className="border border-gray-300 px-4 py-2">Practice Material</th>
              <th className="border border-gray-300 px-4 py-2">Flexibility & Accessibility</th>
              <th className="border border-gray-300 px-4 py-2">Student Portal</th>
              <th className="border border-gray-300 px-4 py-2">Cost Effectiveness</th>
              <th className="border border-gray-300 px-4 py-2">Certified</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id} className="border border-gray-300 dark:even:bg-zinc-700 even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{provider.name}</td>
                <td className="border border-gray-300 px-4 py-2">{provider.contentQuality}</td>
                <td className="border border-gray-300 px-4 py-2">{provider.practiseMaterial}</td>
                <td className="border border-gray-300 px-4 py-2">{provider.flexibilityAccessibility}</td>
                <td className="border border-gray-300 px-4 py-2">{provider.studentPortal}</td>
                <td className="border border-gray-300 px-4 py-2">{provider.costEffectiveness}</td>
                <td className="border border-gray-300 px-4 py-2">{provider.certified || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto md:hidden">
      {providers.map((provider) => (
        <div key={provider.id} className="mb-4 p-4 bg-white dark:bg-zinc-800 border dark:border-gray-200 rounded-lg">
          <p className="font-bold text-2xl">{provider.name}</p>
          <p>Content Quality: <span className='font-semibold text-lg'>{provider.contentQuality}</span></p>
          <p>Practice Material: <span className='font-semibold text-lg'>{provider.practiseMaterial}</span></p>
          <p>Flexibility & Accessibility: <span className='font-semibold text-lg'>{provider.flexibilityAccessibility}</span></p>
          <p>Student Portal: <span className='font-semibold text-lg'>{provider.studentPortal}</span></p>
          <p>Cost Effectiveness: <span className='font-semibold text-lg'>{provider.costEffectiveness}</span></p>
          <p>certified: <span className='font-semibold text-lg'>{provider.certified || 'N/A'}</span></p>
        </div>

      ))}
    </div>
    </div>
    )}
  </div>
  );  
};

export default ShowAllProvidersWithScore;
