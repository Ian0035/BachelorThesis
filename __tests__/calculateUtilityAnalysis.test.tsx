import { calculateUtilityAnalysis } from '../utils/utilityAnalysis/calculation';

describe('calculateUtilityAnalysis', () => {
  test('should correctly calculate the score for each provider', () => {
    const params = [
      { criteria: 'reach', weight: '50' },
      { criteria: 'cost', weight: '25' },
      { criteria: 'trustworthiness', weight: '25' },
    ];
    const crowdfundingProviderData = [
      { reach: 10, cost: 5, trustworthiness: 7 },
      { reach: 8, cost: 6, trustworthiness: 9 },
    ];
    const result = calculateUtilityAnalysis(params, crowdfundingProviderData);
    expect(result[0].score).toBe('8.00');
    expect(result[1].score).toBe('7.75');
  });
});
