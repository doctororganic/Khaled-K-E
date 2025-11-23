# 📋 Plan Generator System - Usage Guide

## ✅ What Has Been Created

### 1. **13 JSON Data Files** (in `/public/data/`)
All backend data files are ready:
- `01_client_data.json` - Client data structure
- `02_calorie_calculations.json` - Calorie formulas
- `03_diet_types.json` - Diet types (low-carb, keto, etc.)
- `04_recipes.json` - Recipes by cuisine
- `05_meals.json` - Meal database
- `06_diseases.json` - Disease information
- `07_medications.json` - Medication interactions
- `08_workouts.json` - Exercise database
- `09_injuries.json` - Injury management
- `10_metabolism_complaints.json` - Complaint solutions
- `11_haram_ingredients.json` - Halal alternatives
- `12_cooking_skills.json` - Cooking tips
- `13_meal_plans_template.json` - Meal plan structure

### 2. **Core Services**
- `services/planGeneratorBrowser.ts` - Browser-compatible plan generator
- `services/planGenerator.ts` - Node.js version (for backend if needed)
- `services/planGeneratorAPI.ts` - API handlers

### 3. **React Components**
- `components/MealPlanTable.tsx` - Displays weekly meal plans in tables
- `components/WorkoutPlanTable.tsx` - Displays weekly workout plans
- `components/DiseaseManagementTable.tsx` - Displays disease management plans
- `components/PlanGeneratorPage.tsx` - Complete page with form and results

## 🚀 How to Use

### Option 1: Use the Complete Page Component

```tsx
import { PlanGeneratorPage } from './components/PlanGeneratorPage';

function App() {
  return <PlanGeneratorPage />;
}
```

### Option 2: Use Individual Components

```tsx
import { PlanGeneratorBrowser } from './services/planGeneratorBrowser';
import { MealPlanTable } from './components/MealPlanTable';
import { WorkoutPlanTable } from './components/WorkoutPlanTable';
import { DiseaseManagementTable } from './components/DiseaseManagementTable';

function MyComponent() {
  const [planData, setPlanData] = useState(null);

  const generatePlan = async () => {
    const clientData: ClientData = {
      name: "Ahmed",
      age: 30,
      weight: 75,
      height: 175,
      gender: "male",
      activityLevel: "moderately_active",
      metabolicRate: "medium",
      systemGoal: "losing_weight",
      workoutGoal: "weight_loss",
      dislikedFoods: ["broccoli"],
      allergies: ["nuts"],
      diseases: ["diabetes"],
      medications: ["metformin"],
      preferredCuisine: "arabic",
      mealFrequency: "3_meals_1_snack",
      workoutLocation: "gym",
      injuries: [],
      complaints: ["slow_metabolism"]
    };

    const generator = new PlanGeneratorBrowser(clientData);
    await generator.loadAllData();
    const plan = generator.generateCompletePlan();
    setPlanData(plan);
  };

  return (
    <div>
      <button onClick={generatePlan}>Generate Plan</button>
      {planData && (
        <>
          <MealPlanTable 
            mealPlans={planData.weeklyMealPlan}
            calorieInfo={planData.clientInfo}
            proteinInfo={planData.clientInfo.proteinRequirements}
          />
          <WorkoutPlanTable workoutPlans={planData.weeklyWorkoutPlan} />
          <DiseaseManagementTable
            diseasePlans={planData.diseaseManagement}
            complaintSolutions={planData.complaintSolutions}
          />
        </>
      )}
    </div>
  );
}
```

## 📊 Features

### Meal Plan Generation
✅ Calculates calories using formulas:
- 20 cal/kg for BMI 18-30 (weight loss/maintenance)
- 25 cal/kg for BMI 15-17 (underweight)
- 30 cal/kg for high metabolism/muscle gain

✅ Calculates protein (1-1.7g/kg based on activity)

✅ Filters meals based on:
- Allergies
- Disliked foods
- Disease restrictions
- Diet type (low-carb, keto, Mediterranean, etc.)

✅ Replaces haram ingredients:
- Vanilla extract → Vanilline powder
- Gelatin → Fish gelatin or agar-agar
- Lard → Halal beef fat or vegetable oil

✅ Generates:
- Weekly meal plan (7 days)
- Meal alternatives for each meal
- Preparation steps
- Cooking tips
- Macros (calories, protein, carbs, fats)

### Workout Plan Generation
✅ Selects exercises based on:
- Workout goal (muscle gain, weight loss, etc.)
- Location (gym/home)
- Injuries (excludes harmful exercises)

✅ Provides:
- Sets, reps, rest periods
- Common mistakes to avoid
- Alternative exercises
- Weekly schedule with rest days

### Disease Management
✅ Generates plans for:
- Diabetes
- Hypertension
- Heart disease
- Arthritis
- And more...

✅ Includes:
- Foods to avoid/include
- Nutritional advice
- Supplement recommendations with dosages
- Medication considerations
- Medical disclaimers

## 🎨 UI Features

### Meal Plan Table
- Expandable meal cards
- Shows calories, protein, carbs, fats
- Preparation steps on click
- Alternative meals
- Cooking tips
- Daily totals

### Workout Plan Table
- Exercise cards with details
- Sets, reps, rest periods
- Common mistakes
- Alternative exercises
- Rest days highlighted

### Disease Management Table
- Expandable disease cards
- Foods to avoid (red) / include (green)
- Supplement recommendations
- Medical disclaimers
- Complaint solutions

## 🔧 Customization

### Add More Meals
Edit `/public/data/05_meals.json`:
```json
{
  "meals": [
    {
      "id": "new_meal_001",
      "name": "New Meal Name",
      "type": "breakfast",
      "baseCalories": 300,
      "protein": 15,
      "carbs": 40,
      "fats": 10,
      "ingredients": ["ingredient1", "ingredient2"],
      "dietTypes": ["balanced", "high_carb"],
      "allergens": [],
      "alternatives": []
    }
  ]
}
```

### Add More Exercises
Edit `/public/data/08_workouts.json`:
```json
{
  "workoutTypes": [
    {
      "id": "strength_training",
      "exercises": [
        {
          "id": "new_exercise",
          "name": "New Exercise",
          "muscleGroups": ["chest", "shoulders"],
          "sets": 4,
          "reps": "8-12",
          "rest": "90 seconds",
          "commonMistakes": ["Mistake 1", "Mistake 2"],
          "alternatives": [],
          "equipment": "barbell",
          "location": "gym"
        }
      ]
    }
  ]
}
```

### Add More Diseases
Edit `/public/data/06_diseases.json`:
```json
{
  "diseases": [
    {
      "id": "new_disease",
      "name": "New Disease",
      "foodsToAvoid": ["food1", "food2"],
      "foodsToInclude": ["food3", "food4"],
      "recommendedDiet": "balanced",
      "nutritionalAdvice": ["Advice 1", "Advice 2"],
      "supplements": [
        {
          "name": "Supplement Name",
          "dose": "500mg daily",
          "benefit": "Benefit description"
        }
      ]
    }
  ]
}
```

## 📝 Important Notes

1. **Medical Disclaimer**: All medical information includes disclaimers
2. **Haram Ingredients**: Automatically replaced with halal alternatives
3. **Data Loading**: JSON files are loaded via fetch from `/public/data/`
4. **Browser Compatibility**: Uses browser-compatible APIs (no Node.js fs)

## 🐛 Troubleshooting

### JSON files not loading
- Ensure files are in `/public/data/` directory
- Check browser console for fetch errors
- Verify file names match exactly (case-sensitive)

### Plans not generating
- Check that all required client data fields are filled
- Verify JSON files are valid JSON
- Check browser console for errors

### Meals/exercises missing
- Ensure meals/exercises match the selected diet type/workout goal
- Check that filters aren't excluding everything
- Verify JSON structure matches expected format

## 🎯 Next Steps

1. **Integrate into your app**: Add `PlanGeneratorPage` to your routing
2. **Customize styling**: Modify component styles to match your theme
3. **Add more data**: Expand JSON files with more meals, exercises, diseases
4. **Export functionality**: Add PDF/JSON export for generated plans
5. **Save plans**: Add functionality to save plans to localStorage or backend
