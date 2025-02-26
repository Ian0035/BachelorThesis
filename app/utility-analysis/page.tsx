import ShowAllProvidersWithScore from '@/components/ShowAllProvidersWithScore';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Index() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    console.log("Fetching providers...");
    const { data: providers, error } = await supabase.from("providers").select();

    if (error) {
        console.error("Error fetching providers:", error);
    }

    return (
        <ShowAllProvidersWithScore providers={providers ?? []} />
    );
}
