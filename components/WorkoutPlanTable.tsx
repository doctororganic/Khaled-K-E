import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Dumbbell, RefreshCw } from 'lucide-react';

interface AlternativeExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  commonMistakes: string[];
}

interface Exercise {
  id: string;
  name: string;
  type: string;
  muscleGroups: string[];
  sets: number;
  reps: string;
  rest: string;
  commonMistakes: string[];
  alternatives: AlternativeExercise[];
  notes?: string;
}

interface WorkoutPlan {
  day: string;
  exercises: Exercise[];
  totalDuration: number;
  restDays?: boolean;
}

interface WorkoutPlanTableProps {
  workoutPlans: WorkoutPlan[];
}

export const WorkoutPlanTable: React.FC<WorkoutPlanTableProps> = ({
  workoutPlans
}) => {
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set());
  const [showAlternatives, setShowAlternatives] = useState<Set<string>>(new Set());

  const toggleExercise = (exerciseId: string) => {
    const newExpanded = new Set(expandedExercises);
    if (newExpanded.has(exerciseId)) {
      newExpanded.delete(exerciseId);
    } else {
      newExpanded.add(exerciseId);
    }
    setExpandedExercises(newExpanded);
  };

  const toggleAlternative = (exerciseId: string) => {
    const newShow = new Set(showAlternatives);
    if (newShow.has(exerciseId)) {
      newShow.delete(exerciseId);
    } else {
      newShow.add(exerciseId);
    }
    setShowAlternatives(newShow);
  };

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="w-full space-y-6">
      {workoutPlans.map((plan) => (
        <div key={plan.day} className="border rounded-lg overflow-hidden">
          <div className={`p-4 text-white ${
            plan.restDays 
              ? 'bg-gray-500' 
              : 'bg-gradient-to-r from-purple-500 to-purple-600'
          }`}>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {plan.restDays ? (
                <RefreshCw className="w-5 h-5" />
              ) : (
                <Dumbbell className="w-5 h-5" />
              )}
              {formatDay(plan.day)}
              {plan.restDays && <span className="ml-2 text-sm">(Rest Day)</span>}
            </h2>
            {!plan.restDays && (
              <div className="mt-2 text-sm">
                <span className="font-semibold">Total Duration: </span>
                <span>{plan.totalDuration} minutes</span>
              </div>
            )}
          </div>

          {plan.restDays ? (
            <div className="p-6 text-center text-gray-500">
              <p className="text-lg">Rest and recovery day</p>
              <p className="text-sm mt-2">Light activities like walking or stretching are recommended</p>
            </div>
          ) : (
            <div className="divide-y">
              {plan.exercises.map((exercise) => (
                <div key={exercise.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleExercise(exercise.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-lg">{exercise.name}</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {exercise.type}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Sets: </span>
                          <span>{exercise.sets}</span>
                        </div>
                        <div>
                          <span className="font-medium">Reps: </span>
                          <span>{exercise.reps}</span>
                        </div>
                        <div>
                          <span className="font-medium">Rest: </span>
                          <span>{exercise.rest}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <span className="font-medium">Muscle Groups: </span>
                        <span>{exercise.muscleGroups.join(', ')}</span>
                      </div>
                      {exercise.notes && (
                        <div className="mt-1 text-xs text-gray-400">
                          {exercise.notes}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      {expandedExercises.has(exercise.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedExercises.has(exercise.id) && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      {/* Common Mistakes */}
                      <div>
                        <h4 className="font-semibold mb-2 text-red-700">Common Mistakes to Avoid:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {exercise.commonMistakes.map((mistake, idx) => (
                            <li key={idx}>{mistake}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Alternative Exercises */}
                      {exercise.alternatives && exercise.alternatives.length > 0 && (
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                          <button
                            onClick={() => toggleAlternative(exercise.id)}
                            className="font-semibold text-blue-800 hover:text-blue-900 mb-2"
                          >
                            {showAlternatives.has(exercise.id) ? 'Hide' : 'Show'} Alternative Exercises ({exercise.alternatives.length})
                          </button>
                          {showAlternatives.has(exercise.id) && (
                            <div className="mt-2 space-y-3">
                              {exercise.alternatives.map((alt) => (
                                <div key={alt.id} className="bg-white p-3 rounded border">
                                  <div className="font-semibold text-gray-700 mb-2">{alt.name}</div>
                                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                                    <div>
                                      <span className="font-medium">Sets: </span>
                                      <span>{alt.sets}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Reps: </span>
                                      <span>{alt.reps}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Rest: </span>
                                      <span>{alt.rest}</span>
                                    </div>
                                  </div>
                                  {alt.commonMistakes && alt.commonMistakes.length > 0 && (
                                    <div>
                                      <h5 className="font-semibold text-xs text-red-700 mb-1">Common Mistakes:</h5>
                                      <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                                        {alt.commonMistakes.map((mistake, idx) => (
                                          <li key={idx}>{mistake}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
