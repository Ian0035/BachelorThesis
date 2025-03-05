interface Provider {
    id: string;
    name: string;
    contentQuality: string;
    practiseMaterial: string;
    flexibilityAccessibility: string;
    studentPortal: string;
    costEffectiveness: string;
}

const ShowAllProvidersWithScore = ({ providers = [] }: { providers?: Provider[] }) => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-800 dark:border dark:border-zinc-200 p-10">
            <div className="flex justify-between mb-5">
            <h1 className="text-3xl font-bold">Data from Supabase</h1>
            <a href="" className="text-xl font-bold text-white bg-gray-400 dark:bg-zinc-600 dark:hover:bg-zinc-700 rounded-lg flex items-center justify-center p-2">webscrape new data</a>
            </div>
            {providers.length === 0 ? (
                <p className="text-gray-500">No providers found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-zinc-400">
                                <th className="border border-gray-300 px-4 py-2">Provider Name</th>
                                <th className="border border-gray-300 px-4 py-2">Content Quality</th>
                                <th className="border border-gray-300 px-4 py-2">Practice Material</th>
                                <th className="border border-gray-300 px-4 py-2">Flexibility & Accessibility</th>
                                <th className="border border-gray-300 px-4 py-2">Student Portal</th>
                                <th className="border border-gray-300 px-4 py-2">Cost Effectiveness</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((provider) => (
                                <tr key={provider.id} className="border border-gray-300">
                                    <td className="border border-gray-300 px-4 py-2">{provider.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{provider.contentQuality}</td>
                                    <td className="border border-gray-300 px-4 py-2">{provider.practiseMaterial}</td>
                                    <td className="border border-gray-300 px-4 py-2">{provider.flexibilityAccessibility}</td>
                                    <td className="border border-gray-300 px-4 py-2">{provider.studentPortal}</td>
                                    <td className="border border-gray-300 px-4 py-2">{provider.costEffectiveness}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ShowAllProvidersWithScore;
