import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, AlertTriangle } from 'lucide-react';

interface Supplement {
  name: string;
  dose: string;
  benefit: string;
}

interface DiseaseManagementPlan {
  disease: string;
  treatmentPlan: string[];
  nutritionalAdvice: string[];
  foodsToAvoid: string[];
  foodsToInclude: string[];
  supplements: Supplement[];
  mealTiming: string;
  disclaimer: string;
}

interface ComplaintSolution {
  complaint: string;
  solutions: string[];
  nutritionalAdvice: string[];
  supplements: Supplement[];
  workoutRecommendations: string[];
}

interface DiseaseManagementTableProps {
  diseasePlans: DiseaseManagementPlan[];
  complaintSolutions: ComplaintSolution[];
}

export const DiseaseManagementTable: React.FC<DiseaseManagementTableProps> = ({
  diseasePlans,
  complaintSolutions
}) => {
  const [expandedDiseases, setExpandedDiseases] = useState<Set<string>>(new Set());
  const [expandedComplaints, setExpandedComplaints] = useState<Set<string>>(new Set());

  const toggleDisease = (disease: string) => {
    const newExpanded = new Set(expandedDiseases);
    if (newExpanded.has(disease)) {
      newExpanded.delete(disease);
    } else {
      newExpanded.add(disease);
    }
    setExpandedDiseases(newExpanded);
  };

  const toggleComplaint = (complaint: string) => {
    const newExpanded = new Set(expandedComplaints);
    if (newExpanded.has(complaint)) {
      newExpanded.delete(complaint);
    } else {
      newExpanded.add(complaint);
    }
    setExpandedComplaints(newExpanded);
  };

  return (
    <div className="w-full space-y-6">
      {/* Medical Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-yellow-800 mb-1">Medical Disclaimer</h3>
            <p className="text-sm text-yellow-700">
              This site is to update you with information and guide you to useful advice for the purpose of education and awareness and is not a substitute for a doctor's visit. Always consult your healthcare provider before making any dietary or lifestyle changes.
            </p>
          </div>
        </div>
      </div>

      {/* Disease Management Plans */}
      {diseasePlans.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Disease Management Plans
          </h2>
          {diseasePlans.map((plan) => (
            <div key={plan.disease} className="border rounded-lg overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 cursor-pointer"
                onClick={() => toggleDisease(plan.disease)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{plan.disease}</h3>
                  {expandedDiseases.has(plan.disease) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {expandedDiseases.has(plan.disease) && (
                <div className="p-4 space-y-4">
                  {/* Treatment Plan */}
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-gray-700">Treatment Plan:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {plan.treatmentPlan.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Nutritional Advice */}
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-gray-700">Nutritional Advice:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {plan.nutritionalAdvice.map((advice, idx) => (
                        <li key={idx}>{advice}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Foods to Avoid */}
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Foods to Avoid:</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.foodsToAvoid.map((food, idx) => (
                        <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Foods to Include */}
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Foods to Include:</h4>
                    <div className="flex flex-wrap gap-2">
                      {plan.foodsToInclude.map((food, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Supplements */}
                  {plan.supplements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-gray-700">Recommended Supplements:</h4>
                      <div className="space-y-2">
                        {plan.supplements.map((supplement, idx) => (
                          <div key={idx} className="bg-blue-50 p-3 rounded border border-blue-200">
                            <div className="font-semibold text-blue-900">{supplement.name}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">Dose: </span>
                              <span>{supplement.dose}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Benefit: </span>
                              <span>{supplement.benefit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meal Timing */}
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-gray-700">Meal Timing:</h4>
                    <p className="text-sm text-gray-600">{plan.mealTiming}</p>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <p className="text-xs text-yellow-800">{plan.disclaimer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Complaint Solutions */}
      {complaintSolutions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            Complaint Solutions
          </h2>
          {complaintSolutions.map((solution) => (
            <div key={solution.complaint} className="border rounded-lg overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 cursor-pointer"
                onClick={() => toggleComplaint(solution.complaint)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{solution.complaint}</h3>
                  {expandedComplaints.has(solution.complaint) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {expandedComplaints.has(solution.complaint) && (
                <div className="p-4 space-y-4">
                  {/* Solutions */}
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-gray-700">Solutions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {solution.solutions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Nutritional Advice */}
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-gray-700">Nutritional Advice:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {solution.nutritionalAdvice.map((advice, idx) => (
                        <li key={idx}>{advice}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Supplements */}
                  {solution.supplements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-gray-700">Recommended Supplements:</h4>
                      <div className="space-y-2">
                        {solution.supplements.map((supplement, idx) => (
                          <div key={idx} className="bg-blue-50 p-3 rounded border border-blue-200">
                            <div className="font-semibold text-blue-900">{supplement.name}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">Dose: </span>
                              <span>{supplement.dose}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Benefit: </span>
                              <span>{supplement.benefit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Workout Recommendations */}
                  {solution.workoutRecommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-gray-700">Workout Recommendations:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {solution.workoutRecommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
