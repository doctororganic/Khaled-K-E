/**
 * API Handler for Plan Generation
 * RESTful endpoints for generating meal plans, workout plans, and disease management
 */

import { PlanGenerator } from './planGenerator';
import type { ClientData } from './planGenerator';

export interface PlanGenerationRequest {
  clientData: ClientData;
  planType: 'meal' | 'workout' | 'disease' | 'complete';
}

export interface PlanGenerationResponse {
  success: boolean;
  data?: any;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

/**
 * Generate meal plan endpoint handler
 */
export function generateMealPlan(clientData: ClientData): PlanGenerationResponse {
  try {
    const generator = new PlanGenerator(clientData);
    const mealPlan = generator.generateWeeklyMealPlan();
    const calorieInfo = generator.calculateDailyCalories();
    const proteinInfo = generator.calculateProteinRequirements();

    return {
      success: true,
      data: {
        mealPlan,
        calorieInfo,
        proteinInfo,
        dietType: generator.determineDietType()
      },
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'MEAL_PLAN_ERROR',
        message: error.message || 'Failed to generate meal plan'
      },
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Generate workout plan endpoint handler
 */
export function generateWorkoutPlan(clientData: ClientData): PlanGenerationResponse {
  try {
    const generator = new PlanGenerator(clientData);
    const workoutPlan = generator.generateWeeklyWorkoutPlan();

    return {
      success: true,
      data: {
        workoutPlan
      },
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'WORKOUT_PLAN_ERROR',
        message: error.message || 'Failed to generate workout plan'
      },
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Generate disease management plan endpoint handler
 */
export function generateDiseasePlan(clientData: ClientData): PlanGenerationResponse {
  try {
    const generator = new PlanGenerator(clientData);
    const diseasePlan = generator.generateDiseaseManagementPlan();
    const complaintSolutions = generator.generateComplaintSolutions();

    return {
      success: true,
      data: {
        diseasePlan,
        complaintSolutions,
        disclaimer: "This site is to update you with information and guide you to useful advice for the purpose of education and awareness and is not a substitute for a doctor's visit."
      },
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'DISEASE_PLAN_ERROR',
        message: error.message || 'Failed to generate disease management plan'
      },
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Generate complete plan (all plans)
 */
export function generateCompletePlan(clientData: ClientData): PlanGenerationResponse {
  try {
    const generator = new PlanGenerator(clientData);
    const completePlan = generator.generateCompletePlan();

    return {
      success: true,
      data: completePlan,
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'COMPLETE_PLAN_ERROR',
        message: error.message || 'Failed to generate complete plan'
      },
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Main API handler
 */
export function handlePlanGeneration(request: PlanGenerationRequest): PlanGenerationResponse {
  const { clientData, planType } = request;

  // Validate client data
  if (!clientData.name || !clientData.weight || !clientData.height) {
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Missing required client data: name, weight, height'
      },
      timestamp: new Date().toISOString()
    };
  }

  switch (planType) {
    case 'meal':
      return generateMealPlan(clientData);
    case 'workout':
      return generateWorkoutPlan(clientData);
    case 'disease':
      return generateDiseasePlan(clientData);
    case 'complete':
      return generateCompletePlan(clientData);
    default:
      return {
        success: false,
        error: {
          code: 'INVALID_PLAN_TYPE',
          message: `Invalid plan type: ${planType}. Must be 'meal', 'workout', 'disease', or 'complete'`
        },
        timestamp: new Date().toISOString()
      };
  }
}
