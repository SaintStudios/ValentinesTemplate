/**
 * Survey State Management Hook
 * 
 * Manages survey state with localStorage persistence.
 * Provides methods for navigation, data updates, and validation.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  SurveyData,
  SurveyErrors,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  SURVEY_STORAGE_KEY,
  TOTAL_STEPS,
} from '@/types/survey';

// Default empty survey data structure
const createEmptySurveyData = (): SurveyData => ({
  step1: {
    relationship: null,
    name: '',
    photo: null,
  },
  step2: {
    songFile: null,
  },
  step3: {
    backgroundId: '',
  },
  step4: {
    cardMessage: '',
  },
  step5: {
    confirmed: false,
  },
});

// Initialize survey data from localStorage or create empty
const loadSurveyData = (): SurveyData => {
  if (typeof window === 'undefined') {
    return createEmptySurveyData();
  }

  try {
    const stored = localStorage.getItem(SURVEY_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all fields exist
      // Note: Files cannot be restored from localStorage, so we reset them to null
      return {
        step1: { ...createEmptySurveyData().step1, ...parsed.step1, photo: null },
        step2: { ...createEmptySurveyData().step2, ...parsed.step2, songFile: null },
        step3: { ...createEmptySurveyData().step3, ...parsed.step3 },
        step4: { ...createEmptySurveyData().step4, ...parsed.step4 },
        step5: { ...createEmptySurveyData().step5, ...parsed.step5 },
      };
    }
  } catch (error) {
    console.error('Failed to load survey data from localStorage:', error);
  }
  return createEmptySurveyData();
};

// Save survey data to localStorage - excluding Files
const saveSurveyData = (data: SurveyData): void => {
  if (typeof window === 'undefined') return;

  try {
    // Create a copy without files for storage
    const storageData = {
      ...data,
      step1: { ...data.step1, photo: undefined },
      step2: { ...data.step2, songFile: undefined }
    };
    localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.error('Failed to save survey data to localStorage:', error);
  }
};

// Clear survey data from localStorage
export const clearSurveyData = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(SURVEY_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear survey data from localStorage:', error);
  }
};

/**
 * Hook for managing survey state with localStorage persistence
 */
export function useSurvey() {
  // Current step (1-based, ranging from 1 to TOTAL_STEPS)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Survey form data
  const [surveyData, setSurveyData] = useState<SurveyData>(createEmptySurveyData);

  // Validation errors
  const [errors, setErrors] = useState<SurveyErrors>({});

  // Loading state for persistence
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedData = loadSurveyData();
    setSurveyData(loadedData);
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      saveSurveyData(surveyData);
    }
  }, [surveyData, isLoading]);

  // Navigation methods
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    const validatedStep = Math.max(1, Math.min(step, TOTAL_STEPS));
    setCurrentStep(validatedStep);
  }, []);

  // Data update methods for each step
  const updateStep1 = useCallback((data: Partial<Step1Data>) => {
    setSurveyData((prev) => ({
      ...prev,
      step1: { ...prev.step1, ...data },
    }));
    // Clear errors when data is updated
    setErrors((prev) => ({
      ...prev,
      step1: undefined,
    }));
  }, []);

  const updateStep2 = useCallback((data: Partial<Step2Data>) => {
    setSurveyData((prev) => ({
      ...prev,
      step2: { ...prev.step2, ...data },
    }));
    setErrors((prev) => ({
      ...prev,
      step2: undefined,
    }));
  }, []);

  const updateStep3 = useCallback((data: Partial<Step3Data>) => {
    setSurveyData((prev) => ({
      ...prev,
      step3: { ...prev.step3, ...data },
    }));
    setErrors((prev) => ({
      ...prev,
      step3: undefined,
    }));
  }, []);

  const updateStep4 = useCallback((data: Partial<Step4Data>) => {
    setSurveyData((prev) => ({
      ...prev,
      step4: { ...prev.step4, ...data },
    }));
    setErrors((prev) => ({
      ...prev,
      step4: undefined,
    }));
  }, []);

  const updateStep5 = useCallback((data: Partial<Step5Data>) => {
    setSurveyData((prev) => ({
      ...prev,
      step5: { ...prev.step5, ...data },
    }));
    setErrors((prev) => ({
      ...prev,
      step5: undefined,
    }));
  }, []);

  // Validation methods
  const validateStep1 = useCallback((): boolean => {
    const newErrors: SurveyErrors['step1'] = {};
    let isValid = true;

    if (!surveyData.step1.relationship) {
      newErrors.relationship = 'Please select who this is for';
      isValid = false;
    }

    if (!surveyData.step1.name.trim()) {
      newErrors.name = 'Please enter her name';
      isValid = false;
    }

    if (!surveyData.step1.photo) {
      newErrors.photo = 'Please upload a photo';
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, step1: newErrors }));
    return isValid;
  }, [surveyData]);

  const validateStep2 = useCallback((): boolean => {
    const newErrors: SurveyErrors['step2'] = {};
    let isValid = true;

    if (!surveyData.step2.songFile) {
      newErrors.songFile = 'Please upload a song';
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, step2: newErrors }));
    return isValid;
  }, [surveyData]);

  const validateStep3 = useCallback((): boolean => {
    const newErrors: SurveyErrors['step3'] = {};
    let isValid = true;

    if (!surveyData.step3.backgroundId) {
      newErrors.backgroundId = 'Please select a background';
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, step3: newErrors }));
    return isValid;
  }, [surveyData]);

  const validateStep4 = useCallback((): boolean => {
    const newErrors: SurveyErrors['step4'] = {};
    let isValid = true;

    if (!surveyData.step4.cardMessage.trim()) {
      newErrors.cardMessage = 'Please write a message';
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, step4: newErrors }));
    return isValid;
  }, [surveyData]);

  const validateStep5 = useCallback((): boolean => {
    return true;
  }, [surveyData]);

  const validateCurrentStep = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      case 5:
        return validateStep5();
      default:
        return true;
    }
  }, [currentStep, validateStep1, validateStep2, validateStep3, validateStep4, validateStep5]);

  // Progress calculation
  const getProgress = useCallback((): number => {
    return Math.round((currentStep / TOTAL_STEPS) * 100);
  }, [currentStep]);

  const isStepValid = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        return !!surveyData.step1.relationship && !!surveyData.step1.name.trim() && !!surveyData.step1.photo;
      case 2:
        return !!surveyData.step2.songFile;
      case 3:
        return !!surveyData.step3.backgroundId;
      case 4:
        return !!surveyData.step4.cardMessage.trim();
      case 5:
        return true;
      default:
        return false;
    }
  }, [surveyData, currentStep]);

  // Check valid on every step change to allow next button to be enabled/disabled if needed in real-time
  // (Not used in current button logic but good for future)
  const canProceed = isStepValid();

  return {
    // State
    currentStep,
    surveyData,
    errors,
    isLoading,
    totalSteps: TOTAL_STEPS,
    progress: getProgress(),
    canProceed,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === TOTAL_STEPS,
    // Navigation
    nextStep,
    prevStep,
    goToStep,
    // Data updates
    updateStep1,
    updateStep2,
    updateStep3,
    updateStep4,
    updateStep5,
    // Validation
    validateCurrentStep,
    // Utility
    clearSurveyData,
  };
}
