import ShowAllProvidersWithScore from '@/components/ShowAllProvidersWithScore';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import AuthCheck from '@/app/dashboard/AuthCheck'; // ✅ Import AuthCheck
import React from 'react';

const Dashboard = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: providers, error } = await supabase.from("providers").select();

    if (error) {
        console.error("Error fetching providers:", error);
    }

    return (
      <div className='w-full bg-gray-100 dark:bg-zinc-800'>
      <AuthCheck> {/* ✅ Only render if user is authenticated */}
      <div className="p-6 w-5/6 mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <ShowAllProvidersWithScore providers={providers ?? []} />
      </div>
    </AuthCheck>
    </div>
    );
};

export default Dashboard;
