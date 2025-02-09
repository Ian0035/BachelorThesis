'use client';
import { useState } from 'react';
import { calculateUtilityAnalysis } from '../utils/utilityAnalysis/calculation';
import { checkForm } from '../utils/utilityAnalysis/checkForm';
import { sortList } from '../utils/utilityAnalysis/sortList';
import CrowdfuningProviderOverview from './CrowdfuningProviderOverview';

const UtilityAnalysisInteraction = ({ crowdfundingProviderData }: { crowdfundingProviderData: any }) => {

  const [ratedCrowdFundingProvider, setRatedCrowdFundingProvider] = useState<any[]>([]);
  const [params, setParams] = useState([
    { id: 1, weight: '', criteria: '' },
    { id: 2, weight: '', criteria: '' },
    { id: 3, weight: '', criteria: '' },
  ]);

  const handleTitleChange = (index: any, newWeight: any) => {
    const updatedParams = [...params];
    updatedParams[index].weight = newWeight;
    setParams(updatedParams);
  };

  const handleContentChange = (index: any, newCriteria: any) => {
    const updatedParams = [...params];
    updatedParams[index].criteria = newCriteria;
    setParams(updatedParams);
  };

  const saveChanges = () => {
    const correctForm = checkForm(params);
    if (correctForm === true) {
      //calculates the utility analysis and sorts the list 
      const ratedCrowdFundingProviderList = sortList(calculateUtilityAnalysis(params, crowdfundingProviderData));
      setRatedCrowdFundingProvider(ratedCrowdFundingProviderList);
    } else {
      //alerts the user with the specific error message
      alert(correctForm);
    }
  };

  const deleteList = () => {
    // reset the list and the params
    setRatedCrowdFundingProvider([]);
    setParams([
      { id: 1, weight: '', criteria: '' },
      { id: 2, weight: '', criteria: '' },
      { id: 3, weight: '', criteria: '' },
    ]);
  };

  return (
    <div>

      {ratedCrowdFundingProvider.length === 0 ? (
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold leading-tight mb-2">
              Nutzwertanalyse
            </h2>
          </div>
          <p>
            Bitte wählen Sie Kriterien, die für die Nutzwertanalyse verwendet
            werden sollen aus. <br />
            Die Kriterien müssen einzeln Gewichtet werden. Dabei ist zu
            beachtenm, dass die Summe am Ende 100% ergeben muss
          </p>
          <form action="">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full"
                            src="https://cdn-icons-png.flaticon.com/512/6404/6404370.png"
                            alt=""
                          />
                        </div>
                        Kriterien
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full"
                            src="   https://cdn-icons-png.flaticon.com/512/847/847345.png"
                            alt=""
                          />
                        </div>
                        Gewichtung - total max 100%
                      </th>
                    </tr>
                  </thead>
                  {/*For loop over the criteria that can be chosen*/}
                  <tbody>
                    {params.map((param, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="relative">
                              <select
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                value={param.criteria === '' ? '' : param.criteria}
                                onChange={(e) => handleContentChange(index, e.target.value)}

                              >
                                <option value="" disabled hidden>
                                  Kriterium auswählen
                                </option>
                                <option value="reach">Reichweite</option>
                                <option value="cost">Kosten</option>
                                <option value="trustworthiness">Vertrauenswürdigkeit</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center flex-row" >
                            <input
                              className="p-16 bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-md py-2 px-2 block appearance-none leading-normal"
                              type="email"
                              placeholder="Gewichtung"
                              value={param.weight}
                              onChange={(e) => handleTitleChange(index, e.target.value)}
                            />
                            <p className="ml-2">%</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          <button
            onClick={saveChanges}
            className="bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >Ausrechnen</button>
        </div>
      ) : (
        <>
          <button
            onClick={deleteList}
            className="bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          >Neu ausrechnen</button>
          <CrowdfuningProviderOverview crowdfundingProvider={ratedCrowdFundingProvider} ></CrowdfuningProviderOverview>
        </>
      )}
    </div>
  );
};

export default UtilityAnalysisInteraction;
