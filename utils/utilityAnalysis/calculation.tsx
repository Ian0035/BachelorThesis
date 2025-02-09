export const calculateUtilityAnalysis = (params: any, crowdfundingProviderData: any) => {
  crowdfundingProviderData.map((provider: any, index: number) => {
    const scoreReach = (provider.reach / 100) * Number(params.find((param: { criteria: string; }) => param.criteria === 'reach')?.weight);
    const scoreCosts = (provider.cost / 100) * Number(params.find((param: { criteria: string; }) => param.criteria === 'cost')?.weight);
    const scoreTrustworthiness = (provider.trustworthiness / 100) * Number(params.find((param: { criteria: string; }) => param.criteria === 'trustworthiness')?.weight);

    // add new attriute score to provider
    provider.score = Number(scoreReach + scoreCosts + scoreTrustworthiness).toFixed(2);
  });

  return crowdfundingProviderData;
};
