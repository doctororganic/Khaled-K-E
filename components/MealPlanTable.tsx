import React, { useState } from 'react';
import { ChevronDown, ChevronUp, UtensilsCrossed } from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  components: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  preparationSteps: string[];
  alternativeMeal?: Meal;
  cookingTips?: string[];
}

interface MealPlan {
  day: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

interface MealPlanTableProps {
  mealPlans: MealPlan[];
  calorieInfo?: {
    calories: number;
    formula: string;
    explanation: string;
  };
  proteinInfo?: {
    min: number;
    max: number;
    recommended: number;
  };
}

export const MealPlanTable: React.FC<MealPlanTableProps> = ({
  mealPlans,
  calorieInfo,
  proteinInfo
}) => {
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(new Set());
  const [showAlternatives, setShowAlternatives] = useState<Set<string>>(new Set());

  const toggleMeal = (mealId: string) => {
    const newExpanded = new Set(expandedMeals);
    if (newExpanded.has(mealId)) {
      newExpanded.delete(mealId);
    } else {
      newExpanded.add(mealId);
    }
    setExpandedMeals(newExpanded);
  };

  const toggleAlternative = (mealId: string) => {
    const newShow = new Set(showAlternatives);
    if (newShow.has(mealId)) {
      newShow.delete(mealId);
    } else {
      newShow.add(mealId);
    }
    setShowAlternatives(newShow);
  };

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="w-full space-y-6">
      {/* Summary Info */}
      {calorieInfo && proteinInfo && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold text-lg mb-2 text-blue-900">Daily Nutrition Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold">Daily Calories: </span>
              <span className="text-blue-700">{calorieInfo.calories} kcal</span>
              <p className="text-xs text-gray-600 mt-1">{calorieInfo.formula}</p>
              <p className="text-xs text-gray-500 mt-1">{calorieInfo.explanation}</p>
            </div>
            <div>
              <span className="font-semibold">Protein Range: </span>
              <span className="text-blue-700">{proteinInfo.min}-{proteinInfo.max}g</span>
              <p className="text-xs text-gray-600 mt-1">Recommended: {proteinInfo.recommended}g</p>
            </div>
            <div>
              <span className="font-semibold">Calculation Method: </span>
              <span className="text-xs text-gray-600">Based on weight, BMI, activity level, and goals</span>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Meal Plans */}
      {mealPlans.map((plan) => (
        <div key={plan.day} className="border rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              {formatDay(plan.day)}
            </h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>
                <span className="font-semibold">Total Calories: </span>
                <span>{plan.totalCalories} kcal</span>
              </div>
              <div>
                <span className="font-semibold">Protein: </span>
                <span>{plan.totalProtein}g</span>
              </div>
              <div>
                <span className="font-semibold">Carbs: </span>
                <span>{plan.totalCarbs}g</span>
              </div>
              <div>
                <span className="font-semibold">Fats: </span>
                <span>{plan.totalFats}g</span>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {plan.meals.map((meal) => (
              <div key={meal.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleMeal(meal.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-lg">{meal.name}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {meal.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Calories: </span>
                        <span>{meal.calories} kcal</span>
                      </div>
                      <div>
                        <span className="font-medium">Protein: </span>
                        <span>{meal.protein}g</span>
                      </div>
                      <div>
                        <span className="font-medium">Carbs: </span>
                        <span>{meal.carbs}g</span>
                      </div>
                      <div>
                        <span className="font-medium">Fats: </span>
                        <span>{meal.fats}g</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Components: </span>
                      <span>{meal.components.join(', ')}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedMeals.has(meal.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedMeals.has(meal.id) && (
                  <div className="mt-4 pt-4 border-t space-y-4">
                    {/* Preparation Steps */}
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-700">Preparation Steps:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                        {meal.preparationSteps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Cooking Tips */}
                    {meal.cookingTips && meal.cookingTips.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-700">Cooking Tips:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {meal.cookingTips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Alternative Meal */}
                    {meal.alternativeMeal && (
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <button
                          onClick={() => toggleAlternative(meal.id)}
                          className="font-semibold text-yellow-800 hover:text-yellow-900 mb-2"
                        >
                          {showAlternatives.has(meal.id) ? 'Hide' : 'Show'} Alternative Meal
                        </button>
                        {showAlternatives.has(meal.id) && (
                          <div className="mt-2 space-y-2">
                            <div className="font-semibold text-gray-700">{meal.alternativeMeal.name}</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Calories: </span>
                                <span>{meal.alternativeMeal.calories} kcal</span>
                              </div>
                              <div>
                                <span className="font-medium">Protein: </span>
                                <span>{meal.alternativeMeal.protein}g</span>
                              </div>
                              <div>
                                <span className="font-medium">Carbs: </span>
                                <span>{meal.alternativeMeal.carbs}g</span>
                              </div>
                              <div>
                                <span className="font-medium">Fats: </span>
                                <span>{meal.alternativeMeal.fats}g</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">Components: </span>
                              <span>{meal.alternativeMeal.components.join(', ')}</span>
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm mb-1">Preparation:</h5>
                              <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600">
                                {meal.alternativeMeal.preparationSteps.map((step, idx) => (
                                  <li key={idx}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
