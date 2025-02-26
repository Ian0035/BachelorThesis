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
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-5">Data from Supabase</h1>
            {providers.length === 0 ? (
                <p className="text-gray-500">No providers found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {providers.map((provider) => (
                        <div key={provider.id} className="p-4 bg-white shadow-md rounded-lg">
                            <h2 className="text-xl font-semibold">{provider.name}</h2>
                            <p className="text-gray-600">{provider.contentQuality}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowAllProvidersWithScore;
