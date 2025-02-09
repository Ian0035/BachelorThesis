import CrowdfuningProviderOverview from '@/components/CrowdfuningProviderOverview';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Index() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data: crowdfundingProvider } = await supabase.from("crowdfundingProvider").select();

    return (
        <>
            <CrowdfuningProviderOverview crowdfundingProvider={crowdfundingProvider} ></CrowdfuningProviderOverview>
        </>
    )
}
