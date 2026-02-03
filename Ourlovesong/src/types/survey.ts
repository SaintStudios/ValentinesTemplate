/**
 * Survey Type Definitions
 * 
 * TypeScript interfaces for the order survey flow.
 * Defines relationship types, step data structures, and validation errors.
 */

// Relationship type with all available options
export type Relationship = 
  | 'husband' 
  | 'wife' 
  | 'children' 
  | 'father' 
  | 'mother' 
  | 'sibling' 
  | 'friend' 
  | 'myself' 
  | 'other';

// Step 1 data structure for recipient and name information
export interface Step1Data {
  relationship: Relationship | null;
  name: string;
  pronunciation?: string;
}

// Step 2 data structure for genre selection
export interface Step2Data {
  genre: string | null;
  customGenre: string;
}

// Step 3 data structure for qualities
export interface Step3Data {
  qualities: string;
}

// Step 4 data structure for memories
export interface Step4Data {
  memories: string;
}

// Step 5 data structure for special message
export interface Step5Data {
  specialMessage: string;
}

// Complete survey data combining all steps
export interface SurveyData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
}

// Validation errors organized by step
export interface SurveyErrors {
  step1?: {
    relationship?: string;
    name?: string;
  };
  step2?: {
    genre?: string;
  };
  step3?: {
    qualities?: string;
  };
  step4?: {
    memories?: string;
  };
  step5?: {
    specialMessage?: string;
  };
}

// Survey step configuration
export interface SurveyStep {
  id: number;
  name: string;
  key: keyof SurveyData;
}

// Array of all survey steps for iteration
export const SURVEY_STEPS: SurveyStep[] = [
  { id: 1, name: 'Recipient', key: 'step1' },
  { id: 2, name: 'Genre', key: 'step2' },
  { id: 3, name: 'Story', key: 'step3' },
  { id: 4, name: 'Preferences', key: 'step4' },
  { id: 5, name: 'Delivery', key: 'step5' },
] as const;

// Total number of steps in the survey
export const TOTAL_STEPS = 5;

// localStorage key for survey persistence
export const SURVEY_STORAGE_KEY = 'ourlovesong_survey_data';

// Relationship display labels
export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  husband: 'Husband',
  wife: 'Wife',
  children: 'Children',
  father: 'Father',
  mother: 'Mother',
  sibling: 'Sibling',
  friend: 'Friend',
  myself: 'Myself',
  other: 'Other',
} as const;

// Relationship display order for consistent rendering
export const RELATIONSHIP_ORDER: Relationship[] = [
  'husband',
  'wife',
  'children',
  'father',
  'mother',
  'sibling',
  'friend',
  'myself',
  'other',
] as const;

