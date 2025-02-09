import { checkForm } from '../utils/utilityAnalysis/checkForm';

describe('checkForm', () => {
  test('should return true when all attributes are set, weights are numbers, sum of weights is 100, and no duplicate criteria', () => {
    const params = [
      { criteria: 'Criteria1', weight: '50' },
      { criteria: 'Criteria2', weight: '50' },
    ];
    expect(checkForm(params)).toBeTruthy();
  });

  test('should return error message when some attributes are not set', () => {
    const params = [
      { criteria: '', weight: '50' },
      { criteria: 'Criteria2', weight: '50' },
    ];
    expect(checkForm(params)).toEqual('Some attributes are not set - Please check your input');
  });

  test('should return error message when some weights are not numbers', () => {
    const params = [
      { criteria: 'Criteria1', weight: '50' },
      { criteria: 'Criteria2', weight: 'not a number' },
    ];
    expect(checkForm(params)).toEqual('Some attributes are not numbers - Please check your input');
  });

  test('should return error message when sum of weights is not 100', () => {
    const params = [
      { criteria: 'Criteria1', weight: '30' },
      { criteria: 'Criteria2', weight: '30' },
    ];
    expect(checkForm(params)).toEqual('Sum of weights is not 100% - Please check your input');
  });

  test('should return error message when some criteria are duplicate', () => {
    const params = [
      { criteria: 'Criteria1', weight: '50' },
      { criteria: 'Criteria1', weight: '50' },
    ];
    expect(checkForm(params)).toEqual('Some criteria are double - Please check your input');
  });
});
