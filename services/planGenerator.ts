/**
 * Comprehensive Plan Generator Service
 * Generates meal plans, workout plans, and disease management plans
 * Based on client data and JSON backend files
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Types
interface ClientData {
  name: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  metabolicRate: 'high' | 'medium' | 'low';
  systemGoal: 'increasing_strength_muscle_mass' | 'gaining_weight' | 'losing_weight' | 'maintaining_weight' | 'reshaping';
  workoutGoal: 'muscle_gain' | 'weight_loss' | 'endurance' | 'flexibility' | 'strength' | 'general_fitness';
  dislikedFoods: string[];
  allergies: string[];
  diseases: string[];
  medications: string[];
  preferredCuisine?: string;
  mealFrequency?: '3_meals' | '4_meals' | '3_meals_1_snack' | '3_meals_2_snacks' | 'intermittent_fasting';
  workoutLocation: 'gym' | 'home';
  injuries?: string[];
  complaints?: string[];
}

interface MealPlan {
  day: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

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

interface WorkoutPlan {
  day: string;
  exercises: Exercise[];
  totalDuration: number;
  restDays?: boolean;
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

interface AlternativeExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  commonMistakes: string[];
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

interface Supplement {
  name: string;
  dose: string;
  benefit: string;
}

// Load JSON data
const loadJSON = (filename: string) => {
  try {
    const filePath = join(process.cwd(), 'data', 'json', filename);
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return null;
  }
};

export class PlanGenerator {
  private clientData: ClientData;
  private clientDataJSON: any;
  private calorieCalculations: any;
  private dietTypes: any;
  private recipes: any;
  private meals: any;
  private diseases: any;
  private medications: any;
  private workouts: any;
  private injuries: any;
  private complaints: any;
  private haramIngredients: any;
  private cookingSkills: any;
  private mealPlansTemplate: any;

  constructor(clientData: ClientData) {
    this.clientData = clientData;
    
    // Load all JSON files
    this.clientDataJSON = loadJSON('01_client_data.json');
    this.calorieCalculations = loadJSON('02_calorie_calculations.json');
    this.dietTypes = loadJSON('03_diet_types.json');
    this.recipes = loadJSON('04_recipes.json');
    this.meals = loadJSON('05_meals.json');
    this.diseases = loadJSON('06_diseases.json');
    this.medications = loadJSON('07_medications.json');
    this.workouts = loadJSON('08_workouts.json');
    this.injuries = loadJSON('09_injuries.json');
    this.complaints = loadJSON('10_metabolism_complaints.json');
    this.haramIngredients = loadJSON('11_haram_ingredients.json');
    this.cookingSkills = loadJSON('12_cooking_skills.json');
    this.mealPlansTemplate = loadJSON('13_meal_plans_template.json');
  }

  /**
   * Calculate BMI
   */
  private calculateBMI(): number {
    const heightInMeters = this.clientData.height / 100;
    return this.clientData.weight / (heightInMeters * heightInMeters);
  }

  /**
   * Calculate daily calories based on guidelines
   */
  calculateDailyCalories(): { calories: number; formula: string; explanation: string } {
    const bmi = this.calculateBMI();
    const weight = this.clientData.weight;
    let calories: number;
    let formula: string;
    let explanation: string;

    // Determine formula based on BMI and goals
    if (bmi >= 18 && bmi <= 30 && 
        (this.clientData.systemGoal === 'losing_weight' || this.clientData.systemGoal === 'maintaining_weight')) {
      calories = weight * 20;
      formula = `${weight} kg × 20 = ${calories} calories`;
      explanation = "20 calories per kg for BMI 18-30 (overweight, obese, normal weight) - suitable for weight loss or maintenance";
    } else if (bmi >= 15 && bmi <= 17) {
      calories = weight * 25;
      formula = `${weight} kg × 25 = ${calories} calories`;
      explanation = "25 calories per kg for BMI 15-17 and thin individuals - suitable for maintenance or weight gain";
    } else if (this.clientData.metabolicRate === 'high' || 
               this.clientData.systemGoal === 'increasing_strength_muscle_mass' ||
               this.clientData.systemGoal === 'gaining_weight') {
      calories = weight * 30;
      formula = `${weight} kg × 30 = ${calories} calories`;
      explanation = "30 calories per kg for high metabolic rate or muscle mass gain";
    } else {
      calories = weight * 20;
      formula = `${weight} kg × 20 = ${calories} calories`;
      explanation = "Default: 20 calories per kg";
    }

    return { calories: Math.round(calories), formula, explanation };
  }

  /**
   * Calculate protein requirements
   */
  calculateProteinRequirements(): { min: number; max: number; recommended: number } {
    const weight = this.clientData.weight;
    const isActive = this.clientData.activityLevel !== 'sedentary';
    const liftsWeights = this.clientData.workoutGoal === 'muscle_gain' || 
                        this.clientData.workoutGoal === 'strength' ||
                        this.clientData.systemGoal === 'increasing_strength_muscle_mass';

    let min: number, max: number;

    if (liftsWeights || isActive) {
      min = weight * 1.5;
      max = weight * 1.7;
    } else {
      min = weight * 1.0;
      max = weight * 1.5;
    }

    const recommended = (min + max) / 2;

    return {
      min: Math.round(min),
      max: Math.round(max),
      recommended: Math.round(recommended)
    };
  }

  /**
   * Determine appropriate diet type based on client data
   */
  determineDietType(): string {
    // Check diseases first
    if (this.clientData.diseases.length > 0) {
      const disease = this.diseases?.diseases?.find((d: any) => 
        this.clientData.diseases.includes(d.id)
      );
      if (disease?.recommendedDiet) {
        return disease.recommendedDiet;
      }
    }

    // Check system goal
    if (this.clientData.systemGoal === 'losing_weight') {
      return 'low_carb';
    } else if (this.clientData.systemGoal === 'increasing_strength_muscle_mass') {
      return 'high_carb';
    } else if (this.clientData.preferredCuisine === 'mediterranean') {
      return 'mediterranean';
    }

    return 'balanced';
  }

  /**
   * Filter meals based on restrictions
   */
  private filterMeals(availableMeals: any[]): any[] {
    return availableMeals.filter(meal => {
      // Check allergies
      if (meal.allergens && meal.allergens.some((allergen: string) => 
        this.clientData.allergies.includes(allergen)
      )) {
        return false;
      }

      // Check disliked foods
      if (meal.ingredients && meal.ingredients.some((ingredient: string) => 
        this.clientData.dislikedFoods.some(disliked => 
          ingredient.toLowerCase().includes(disliked.toLowerCase())
        )
      )) {
        return false;
      }

      // Check diseases - exclude harmful foods
      if (this.clientData.diseases.length > 0) {
        for (const diseaseId of this.clientData.diseases) {
          const disease = this.diseases?.diseases?.find((d: any) => d.id === diseaseId);
          if (disease?.foodsToAvoid && meal.ingredients) {
            if (meal.ingredients.some((ing: string) => 
              disease.foodsToAvoid.some((avoid: string) => 
                ing.toLowerCase().includes(avoid.toLowerCase())
              )
            )) {
              return false;
            }
          }
        }
      }

      return true;
    });
  }

  /**
   * Replace haram ingredients
   */
  private replaceHaramIngredients(ingredients: string[]): string[] {
    const replacements = this.haramIngredients?.replacementRules || {};
    
    return ingredients.map(ingredient => {
      let replaced = ingredient.toLowerCase();
      
      // Replace vanilla extract
      if (replaced.includes('vanilla extract')) {
        replaced = replaced.replace(/vanilla extract/g, 'vanilline powder');
      }
      
      // Replace gelatin
      if (replaced.includes('gelatin') && !replaced.includes('fish')) {
        replaced = replaced.replace(/gelatin/g, 'fish gelatin or agar-agar');
      }
      
      // Replace lard
      if (replaced.includes('lard')) {
        replaced = replaced.replace(/lard/g, 'halal beef fat or vegetable oil');
      }
      
      return replaced;
    });
  }

  /**
   * Generate weekly meal plan
   */
  generateWeeklyMealPlan(): MealPlan[] {
    const calorieInfo = this.calculateDailyCalories();
    const dailyCalories = calorieInfo.calories;
    const dietType = this.determineDietType();
    const mealFrequency = this.clientData.mealFrequency || '3_meals';
    
    // Get meal distribution
    const distribution = this.mealPlansTemplate?.mealDistribution[mealFrequency];
    if (!distribution) {
      throw new Error(`Invalid meal frequency: ${mealFrequency}`);
    }

    // Filter available meals
    const availableMeals = this.meals?.meals || [];
    const filteredMeals = this.filterMeals(availableMeals);
    
    // Filter by diet type
    const dietMeals = filteredMeals.filter((meal: any) => 
      meal.dietTypes?.includes(dietType)
    );

    // Generate plan for each day
    const days = this.mealPlansTemplate?.weeklyStructure?.days || 
                 ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    const weeklyPlan: MealPlan[] = [];

    for (const day of days) {
      const dayMeals: Meal[] = [];
      let dayTotalCalories = 0;
      let dayTotalProtein = 0;
      let dayTotalCarbs = 0;
      let dayTotalFats = 0;

      for (const mealType of distribution.meals) {
        // Find suitable meal for this meal type
        const suitableMeals = dietMeals.filter((m: any) => m.type === mealType);
        
        if (suitableMeals.length === 0) continue;

        // Select random meal (or use algorithm for variety)
        const selectedMeal = suitableMeals[Math.floor(Math.random() * suitableMeals.length)];
        
        // Calculate portion size to match calorie distribution
        const targetCalories = dailyCalories * distribution.calorieDistribution[mealType];
        const portionMultiplier = targetCalories / selectedMeal.baseCalories;
        
        const meal: Meal = {
          id: selectedMeal.id,
          name: selectedMeal.name,
          type: mealType,
          components: this.replaceHaramIngredients(selectedMeal.ingredients || []),
          calories: Math.round(selectedMeal.baseCalories * portionMultiplier),
          protein: Math.round(selectedMeal.protein * portionMultiplier),
          carbs: Math.round(selectedMeal.carbs * portionMultiplier),
          fats: Math.round(selectedMeal.fats * portionMultiplier),
          preparationSteps: this.generatePreparationSteps(selectedMeal),
          cookingTips: this.getCookingTips(selectedMeal.type)
        };

        // Add alternative meal
        if (selectedMeal.alternatives && selectedMeal.alternatives.length > 0) {
          const altId = selectedMeal.alternatives[0];
          const altMeal = availableMeals.find((m: any) => m.id === altId);
          if (altMeal && this.filterMeals([altMeal]).length > 0) {
            meal.alternativeMeal = {
              id: altMeal.id,
              name: altMeal.name,
              type: mealType,
              components: this.replaceHaramIngredients(altMeal.ingredients || []),
              calories: Math.round(altMeal.baseCalories * portionMultiplier),
              protein: Math.round(altMeal.protein * portionMultiplier),
              carbs: Math.round(altMeal.carbs * portionMultiplier),
              fats: Math.round(altMeal.fats * portionMultiplier),
              preparationSteps: this.generatePreparationSteps(altMeal),
              cookingTips: this.getCookingTips(altMeal.type)
            };
          }
        }

        dayMeals.push(meal);
        dayTotalCalories += meal.calories;
        dayTotalProtein += meal.protein;
        dayTotalCarbs += meal.carbs;
        dayTotalFats += meal.fats;
      }

      weeklyPlan.push({
        day,
        meals: dayMeals,
        totalCalories: Math.round(dayTotalCalories),
        totalProtein: Math.round(dayTotalProtein),
        totalCarbs: Math.round(dayTotalCarbs),
        totalFats: Math.round(dayTotalFats)
      });
    }

    return weeklyPlan;
  }

  /**
   * Generate preparation steps for a meal
   */
  private generatePreparationSteps(meal: any): string[] {
    // Try to get from recipes first
    if (this.recipes?.cuisines) {
      for (const cuisine of Object.values(this.recipes.cuisines) as any[]) {
        const recipe = cuisine.recipes?.find((r: any) => r.id === meal.id || r.name === meal.name);
        if (recipe?.preparation) {
          return recipe.preparation.map((step: string, index: number) => 
            `${index + 1}. ${step}`
          );
        }
      }
    }

    // Default preparation steps
    return [
      "1. Prepare all ingredients",
      "2. Follow cooking method based on meal type",
      "3. Adjust quantities based on calorie requirements",
      "4. Season to taste",
      "5. Serve hot"
    ];
  }

  /**
   * Get cooking tips for meal type
   */
  private getCookingTips(mealType: string): string[] {
    const skills = this.cookingSkills?.skills || [];
    // Match meal type to cooking skill (simplified)
    const relevantSkill = skills.find((s: any) => 
      mealType.includes(s.mealType) || s.mealType.includes(mealType)
    );
    return relevantSkill?.tips || [];
  }

  /**
   * Generate weekly workout plan
   */
  generateWeeklyWorkoutPlan(): WorkoutPlan[] {
    const workoutGoal = this.clientData.workoutGoal;
    const location = this.clientData.workoutLocation;
    const injuries = this.clientData.injuries || [];

    // Get workout types that match goal
    const relevantWorkouts = this.workouts?.workoutTypes?.filter((wt: any) =>
      wt.goals?.includes(workoutGoal)
    ) || [];

    // Filter exercises based on location and injuries
    const availableExercises: any[] = [];
    for (const workoutType of relevantWorkouts) {
      for (const exercise of workoutType.exercises || []) {
        // Check location match
        if (exercise.location !== location && location === 'home' && exercise.equipment !== 'none') {
          continue;
        }

        // Check if exercise should be avoided due to injury
        let shouldAvoid = false;
        for (const injuryId of injuries) {
          const injury = this.injuries?.injuries?.find((i: any) => i.id === injuryId);
          if (injury?.exercisesToAvoid?.includes(exercise.id)) {
            shouldAvoid = true;
            break;
          }
        }
        if (shouldAvoid) continue;

        availableExercises.push({
          ...exercise,
          workoutType: workoutType.id
        });
      }
    }

    // Generate weekly plan (example: 5 days workout, 2 rest days)
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const weeklyPlan: WorkoutPlan[] = [];

    // Distribute exercises across workout days
    const workoutDays = ['monday', 'tuesday', 'wednesday', 'friday', 'saturday'];
    const restDays = ['thursday', 'sunday'];

    let exerciseIndex = 0;
    for (const day of days) {
      if (restDays.includes(day)) {
        weeklyPlan.push({
          day,
          exercises: [],
          totalDuration: 0,
          restDays: true
        });
        continue;
      }

      // Select 4-6 exercises for the day
      const dayExercises: Exercise[] = [];
      const exercisesPerDay = 5;
      let totalDuration = 0;

      for (let i = 0; i < exercisesPerDay && exerciseIndex < availableExercises.length; i++) {
        const ex = availableExercises[exerciseIndex % availableExercises.length];
        
        // Get alternatives
        const alternatives: AlternativeExercise[] = [];
        if (ex.alternatives) {
          for (const altId of ex.alternatives) {
            const altEx = availableExercises.find((e: any) => e.id === altId);
            if (altEx) {
              alternatives.push({
                id: altEx.id,
                name: altEx.name,
                sets: altEx.sets,
                reps: altEx.reps,
                rest: altEx.rest,
                commonMistakes: altEx.commonMistakes || []
              });
            }
          }
        }

        const exercise: Exercise = {
          id: ex.id,
          name: ex.name,
          type: ex.workoutType,
          muscleGroups: ex.muscleGroups || [],
          sets: ex.sets,
          reps: ex.reps,
          rest: ex.rest,
          commonMistakes: ex.commonMistakes || [],
          alternatives: alternatives.length > 0 ? alternatives : [],
          notes: ex.equipment ? `Equipment: ${ex.equipment}` : undefined
        };

        dayExercises.push(exercise);
        
        // Estimate duration (sets * (rest + work time))
        const restSeconds = parseInt(ex.rest) || 60;
        const estimatedDuration = ex.sets * (restSeconds + 60); // 60s per set
        totalDuration += estimatedDuration;
        
        exerciseIndex++;
      }

      weeklyPlan.push({
        day,
        exercises: dayExercises,
        totalDuration: Math.round(totalDuration / 60) // Convert to minutes
      });
    }

    return weeklyPlan;
  }

  /**
   * Generate disease management plan
   */
  generateDiseaseManagementPlan(): DiseaseManagementPlan[] {
    const plans: DiseaseManagementPlan[] = [];

    for (const diseaseId of this.clientData.diseases) {
      const disease = this.diseases?.diseases?.find((d: any) => d.id === diseaseId);
      if (!disease) continue;

      // Check medications
      let medicationAdvice: string[] = [];
      for (const medId of this.clientData.medications) {
        const medication = this.medications?.medications?.find((m: any) => m.id === medId);
        if (medication) {
          medicationAdvice.push(...(medication.nutritionalConsiderations || []));
        }
      }

      const plan: DiseaseManagementPlan = {
        disease: disease.name,
        treatmentPlan: disease.nutritionalAdvice || [],
        nutritionalAdvice: [
          ...(disease.nutritionalAdvice || []),
          ...medicationAdvice
        ],
        foodsToAvoid: disease.foodsToAvoid || [],
        foodsToInclude: disease.foodsToInclude || [],
        supplements: disease.supplements || [],
        mealTiming: disease.mealTiming || "Regular meals throughout the day",
        disclaimer: disease.disclaimer || "This information is for educational purposes only and is not a substitute for professional medical advice. Please consult your doctor before making any dietary changes."
      };

      plans.push(plan);
    }

    return plans;
  }

  /**
   * Generate complaint solutions
   */
  generateComplaintSolutions(): any[] {
    const solutions: any[] = [];

    for (const complaintId of this.clientData.complaints || []) {
      const complaint = this.complaints?.complaints?.find((c: any) => c.id === complaintId);
      if (!complaint) continue;

      solutions.push({
        complaint: complaint.name,
        solutions: complaint.solutions || [],
        nutritionalAdvice: complaint.nutritionalAdvice || [],
        supplements: complaint.supplements || [],
        workoutRecommendations: complaint.workoutRecommendations || []
      });
    }

    return solutions;
  }

  /**
   * Generate complete plan summary
   */
  generateCompletePlan() {
    const calorieInfo = this.calculateDailyCalories();
    const proteinInfo = this.calculateProteinRequirements();
    const dietType = this.determineDietType();

    return {
      clientInfo: {
        name: this.clientData.name,
        bmi: this.calculateBMI().toFixed(1),
        dailyCalories: calorieInfo.calories,
        calorieFormula: calorieInfo.formula,
        calorieExplanation: calorieInfo.explanation,
        proteinRequirements: proteinInfo,
        recommendedDiet: dietType
      },
      weeklyMealPlan: this.generateWeeklyMealPlan(),
      weeklyWorkoutPlan: this.generateWeeklyWorkoutPlan(),
      diseaseManagement: this.generateDiseaseManagementPlan(),
      complaintSolutions: this.generateComplaintSolutions(),
      disclaimer: "This site is to update you with information and guide you to useful advice for the purpose of education and awareness and is not a substitute for a doctor's visit."
    };
  }
}
