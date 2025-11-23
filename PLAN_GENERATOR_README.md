# 📋 Plan Generator System Documentation

## Overview

This system generates comprehensive meal plans, workout plans, and disease management plans based on client data and 13 JSON backend files.

## 📁 JSON Data Files

1. **01_client_data.json** - Client data structure and options
2. **02_calorie_calculations.json** - Calorie calculation formulas and macros
3. **03_diet_types.json** - Available diet types (low-carb, keto, Mediterranean, etc.)
4. **04_recipes.json** - Recipes organized by cuisine (Arabic, Mediterranean, Asian)
5. **05_meals.json** - Meal database with macros and alternatives
6. **06_diseases.json** - Disease information, foods to avoid/include, supplements
7. **07_medications.json** - Medication interactions and nutritional considerations
8. **08_workouts.json** - Exercise database with sets, reps, rest, alternatives
9. **09_injuries.json** - Injury-specific exercises and recovery plans
10. **10_metabolism_complaints.json** - Solutions for metabolism-related complaints
11. **11_haram_ingredients.json** - Haram ingredients and halal alternatives
12. **12_cooking_skills.json** - Cooking tips by meal type
13. **13_meal_plans_template.json** - Weekly meal plan structure and distribution

## 🎯 Features

### Meal Plan Generation
- ✅ Calculates daily calories based on BMI, goals, and metabolic rate
- ✅ Determines protein requirements (1-1.7g/kg based on activity)
- ✅ Selects appropriate diet type (low-carb, keto, balanced, etc.)
- ✅ Filters meals based on allergies, dislikes, and diseases
- ✅ Replaces haram ingredients with halal alternatives
- ✅ Generates weekly meal plan with alternatives
- ✅ Includes preparation steps and cooking tips
- ✅ Shows calories, protein, carbs, and fats for each meal

### Workout Plan Generation
- ✅ Selects exercises based on workout goal
- ✅ Filters by location (gym/home) and injuries
- ✅ Provides alternatives for each exercise
- ✅ Includes sets, reps, rest periods
- ✅ Lists common mistakes to avoid
- ✅ Generates weekly schedule with rest days

### Disease Management Plan
- ✅ Provides treatment plans based on diseases
- ✅ Lists foods to avoid and include
- ✅ Suggests supplements with dosages
- ✅ Considers medication interactions
- ✅ Includes nutritional advice
- ✅ Adds medical disclaimers

## 📊 Usage Example

```typescript
import { PlanGenerator } from './services/planGenerator';

const clientData: ClientData = {
  name: "Ahmed",
  age: 30,
  weight: 75, // kg
  height: 175, // cm
  gender: "male",
  activityLevel: "moderately_active",
  metabolicRate: "medium",
  systemGoal: "losing_weight",
  workoutGoal: "weight_loss",
  dislikedFoods: ["broccoli", "cabbage"],
  allergies: ["nuts"],
  diseases: ["diabetes"],
  medications: ["metformin"],
  preferredCuisine: "arabic",
  mealFrequency: "3_meals_1_snack",
  workoutLocation: "gym",
  injuries: [],
  complaints: ["slow_metabolism"]
};

const generator = new PlanGenerator(clientData);

// Generate complete plan
const completePlan = generator.generateCompletePlan();

// Or generate individual plans
const mealPlan = generator.generateWeeklyMealPlan();
const workoutPlan = generator.generateWeeklyWorkoutPlan();
const diseasePlan = generator.generateDiseaseManagementPlan();
```

## 🔢 Calorie Calculation Rules

1. **20 calories/kg** - BMI 18-30, weight loss/maintenance goals
2. **25 calories/kg** - BMI 15-17, thin individuals
3. **30 calories/kg** - High metabolic rate, muscle gain goals

## 🥩 Protein Requirements

- **Sedentary:** 1.0-1.5g per kg
- **Active/Weightlifting:** 1.5-1.7g per kg

## 🚫 Filtering Logic

The system automatically:
- Excludes foods with allergens
- Removes disliked foods
- Filters out foods harmful to diseases
- Replaces haram ingredients (vanilla extract → vanilline powder, etc.)
- Considers medication interactions

## 📝 Output Format

### Meal Plan
```json
{
  "day": "monday",
  "meals": [
    {
      "id": "breakfast_001",
      "name": "Oatmeal with Berries",
      "type": "breakfast",
      "components": ["oats", "berries", "almonds", "honey"],
      "calories": 350,
      "protein": 12,
      "carbs": 55,
      "fats": 8,
      "preparationSteps": ["1. Cook oats", "2. Add berries", ...],
      "alternativeMeal": { ... }
    }
  ],
  "totalCalories": 1800,
  "totalProtein": 120,
  "totalCarbs": 200,
  "totalFats": 60
}
```

### Workout Plan
```json
{
  "day": "monday",
  "exercises": [
    {
      "id": "squat",
      "name": "Barbell Squat",
      "sets": 4,
      "reps": "8-12",
      "rest": "90-120 seconds",
      "commonMistakes": [...],
      "alternatives": [...]
    }
  ],
  "totalDuration": 60
}
```

## ⚠️ Important Notes

1. **Medical Disclaimer:** All medical/nutritional information includes disclaimers
2. **Haram Ingredients:** Automatically replaced with halal alternatives
3. **Disease Considerations:** Foods harmful to diseases are excluded
4. **Medication Interactions:** Considered in meal planning
5. **Injury Safety:** Exercises that could worsen injuries are excluded

## 🔄 Next Steps

To integrate this into your app:
1. Add API endpoints that use `handlePlanGeneration()`
2. Create UI components to display plans in tables
3. Add click handlers to show preparation steps
4. Implement alternative meal/workout switching
5. Add export functionality (PDF/JSON)
