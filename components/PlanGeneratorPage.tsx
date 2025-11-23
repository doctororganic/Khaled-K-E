import React, { useState, useEffect } from 'react';
import { PlanGeneratorBrowser, type ClientData } from '../services/planGeneratorBrowser';
import { MealPlanTable } from './MealPlanTable';
import { WorkoutPlanTable } from './WorkoutPlanTable';
import { DiseaseManagementTable } from './DiseaseManagementTable';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const PlanGeneratorPage: React.FC = () => {
  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderately_active',
    metabolicRate: 'medium',
    systemGoal: 'maintaining_weight',
    workoutGoal: 'general_fitness',
    dislikedFoods: [],
    allergies: [],
    diseases: [],
    medications: [],
    preferredCuisine: 'arabic',
    mealFrequency: '3_meals',
    workoutLocation: 'gym',
    injuries: [],
    complaints: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planData, setPlanData] = useState<any>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const generator = new PlanGeneratorBrowser(clientData);
        await generator.loadAllData();
        setDataLoaded(true);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const generatePlan = async () => {
    if (!dataLoaded) {
      setError('Data not loaded yet. Please wait...');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const generator = new PlanGeneratorBrowser(clientData);
      await generator.loadAllData();
      const completePlan = generator.generateCompletePlan();
      setPlanData(completePlan);
    } catch (err: any) {
      setError(err.message || 'Failed to generate plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Comprehensive Health & Fitness Plan Generator
        </h1>

        {/* Client Data Form */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Client Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={clientData.name}
                onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <input
                type="number"
                value={clientData.age}
                onChange={(e) => setClientData({ ...clientData, age: parseInt(e.target.value) || 30 })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                value={clientData.weight}
                onChange={(e) => setClientData({ ...clientData, weight: parseFloat(e.target.value) || 70 })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Height (cm)</label>
              <input
                type="number"
                value={clientData.height}
                onChange={(e) => setClientData({ ...clientData, height: parseFloat(e.target.value) || 170 })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                value={clientData.gender}
                onChange={(e) => setClientData({ ...clientData, gender: e.target.value as 'male' | 'female' })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Activity Level</label>
              <select
                value={clientData.activityLevel}
                onChange={(e) => setClientData({ ...clientData, activityLevel: e.target.value as any })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="sedentary">Sedentary</option>
                <option value="lightly_active">Lightly Active</option>
                <option value="moderately_active">Moderately Active</option>
                <option value="very_active">Very Active</option>
                <option value="extremely_active">Extremely Active</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Metabolic Rate</label>
              <select
                value={clientData.metabolicRate}
                onChange={(e) => setClientData({ ...clientData, metabolicRate: e.target.value as 'high' | 'medium' | 'low' })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">System Goal</label>
              <select
                value={clientData.systemGoal}
                onChange={(e) => setClientData({ ...clientData, systemGoal: e.target.value as any })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="increasing_strength_muscle_mass">Increasing Strength & Muscle Mass</option>
                <option value="gaining_weight">Gaining Weight</option>
                <option value="losing_weight">Losing Weight</option>
                <option value="maintaining_weight">Maintaining Weight</option>
                <option value="reshaping">Reshaping</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Workout Goal</label>
              <select
                value={clientData.workoutGoal}
                onChange={(e) => setClientData({ ...clientData, workoutGoal: e.target.value as any })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="muscle_gain">Muscle Gain</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="endurance">Endurance</option>
                <option value="flexibility">Flexibility</option>
                <option value="strength">Strength</option>
                <option value="general_fitness">General Fitness</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meal Frequency</label>
              <select
                value={clientData.mealFrequency}
                onChange={(e) => setClientData({ ...clientData, mealFrequency: e.target.value as any })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="3_meals">3 Meals</option>
                <option value="4_meals">4 Meals</option>
                <option value="3_meals_1_snack">3 Meals + 1 Snack</option>
                <option value="3_meals_2_snacks">3 Meals + 2 Snacks</option>
                <option value="intermittent_fasting">Intermittent Fasting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Workout Location</label>
              <select
                value={clientData.workoutLocation}
                onChange={(e) => setClientData({ ...clientData, workoutLocation: e.target.value as 'gym' | 'home' })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              >
                <option value="gym">Gym</option>
                <option value="home">Home</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Disliked Foods (comma-separated)</label>
            <input
              type="text"
              value={clientData.dislikedFoods.join(', ')}
              onChange={(e) => setClientData({ 
                ...clientData, 
                dislikedFoods: e.target.value.split(',').map(f => f.trim()).filter(f => f) 
              })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              placeholder="e.g., broccoli, cabbage"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Allergies (comma-separated)</label>
            <input
              type="text"
              value={clientData.allergies.join(', ')}
              onChange={(e) => setClientData({ 
                ...clientData, 
                allergies: e.target.value.split(',').map(f => f.trim()).filter(f => f) 
              })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              placeholder="e.g., nuts, dairy"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Diseases (comma-separated: diabetes, hypertension, heart_disease, arthritis)</label>
            <input
              type="text"
              value={clientData.diseases.join(', ')}
              onChange={(e) => setClientData({ 
                ...clientData, 
                diseases: e.target.value.split(',').map(f => f.trim()).filter(f => f) 
              })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              placeholder="e.g., diabetes"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Medications (comma-separated: metformin, warfarin, ace_inhibitor)</label>
            <input
              type="text"
              value={clientData.medications.join(', ')}
              onChange={(e) => setClientData({ 
                ...clientData, 
                medications: e.target.value.split(',').map(f => f.trim()).filter(f => f) 
              })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              placeholder="e.g., metformin"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Complaints (comma-separated: slow_metabolism, low_energy, bloating, poor_sleep)</label>
            <input
              type="text"
              value={clientData.complaints?.join(', ') || ''}
              onChange={(e) => setClientData({ 
                ...clientData, 
                complaints: e.target.value.split(',').map(f => f.trim()).filter(f => f) 
              })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              placeholder="e.g., slow_metabolism"
            />
          </div>

          <button
            onClick={generatePlan}
            disabled={loading || !dataLoaded}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Generate Complete Plan
              </>
            )}
          </button>

          {!dataLoaded && (
            <div className="mt-4 flex items-center gap-2 text-yellow-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading data files...</span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-8 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        {/* Generated Plans */}
        {planData && (
          <div className="space-y-8">
            {/* Client Info Summary */}
            <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Plan Summary for {planData.clientInfo.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-blue-400 font-semibold">BMI: </span>
                  <span>{planData.clientInfo.bmi}</span>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold">Daily Calories: </span>
                  <span>{planData.clientInfo.dailyCalories} kcal</span>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold">Recommended Diet: </span>
                  <span className="capitalize">{planData.clientInfo.recommendedDiet.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                {planData.clientInfo.calorieExplanation}
              </div>
            </div>

            {/* Meal Plans */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Weekly Meal Plan</h2>
              <MealPlanTable
                mealPlans={planData.weeklyMealPlan}
                calorieInfo={{
                  calories: planData.clientInfo.dailyCalories,
                  formula: planData.clientInfo.calorieFormula,
                  explanation: planData.clientInfo.calorieExplanation
                }}
                proteinInfo={planData.clientInfo.proteinRequirements}
              />
            </div>

            {/* Workout Plans */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Weekly Workout Plan</h2>
              <WorkoutPlanTable workoutPlans={planData.weeklyWorkoutPlan} />
            </div>

            {/* Disease Management */}
            {(planData.diseaseManagement.length > 0 || planData.complaintSolutions.length > 0) && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Disease Management & Health Solutions</h2>
                <DiseaseManagementTable
                  diseasePlans={planData.diseaseManagement}
                  complaintSolutions={planData.complaintSolutions}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
