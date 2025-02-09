import UtilityAnalysisInteraction from "../../components/UtilityAnalysisInteraction";
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';


const UtilityAnalysis = async () => {
  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const { data: crowdfundingProvider } = await supabase.from("crowdfundingProvider").select();

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <UtilityAnalysisInteraction crowdfundingProviderData={crowdfundingProvider} />
      </div>
    </div>
  );
};

export default UtilityAnalysis;
