/**
 * Survey Page - Main Survey Flow
 * 
 * Full-viewport survey with no scrolling. All content fits within screen.
 * Designed for maximum engagement and minimal friction.
 */

'use client';

import { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useSurvey } from '@/hooks/useSurvey';
import { SurveyHeader } from '@/components/survey/survey-header';
import { StepContainer } from '@/components/survey/step-container';
import { Step1 } from '@/components/survey/step-1';
import { Step2 } from '@/components/survey/step-2';
import { Step3 } from '@/components/survey/step-3';
import { Step4 } from '@/components/survey/step-4';
import { Step5 } from '@/components/survey/step-5';
import { SurveyNavigation } from '@/components/survey/survey-navigation';
import { cn } from '@/lib/utils';

export default function SurveyPage() {
  const { t } = useTranslation();
  
  const [direction, setDirection] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  const {
    currentStep,
    surveyData,
    errors,
    isLoading,
    totalSteps,
    progress,
    canProceed,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    updateStep1,
    updateStep2,
    updateStep3,
    updateStep4,
    updateStep5,
    validateCurrentStep,
  } = useSurvey();

  // Lock viewport height to prevent scroll on mobile
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      document.body.style.overflow = '';
    };
  }, []);

  const handleNext = useCallback(() => {
    const isValid = validateCurrentStep();
    if (isValid) {
      setDirection(1);
      nextStep();
    }
  }, [validateCurrentStep, nextStep]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    prevStep();
  }, [prevStep]);

  if (isLoading) {
    return (
      <div 
        className="h-screen bg-brand-cream flex items-center justify-center"
        style={{ minHeight: '-webkit-fill-available' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-10 h-10 border-3 border-brand-gold border-t-transparent rounded-full mx-auto mb-3 animate-spin" />
          <p className="text-brand-mocha text-sm">{t('common.loading')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <main 
      className="h-screen bg-brand-cream flex flex-col overflow-hidden"
      style={{ minHeight: '-webkit-fill-available' }}
    >
      {/* Fixed Header */}
      <SurveyHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
      />

      {/* Main Content - Full width, no card, fits in viewport */}
      <div className="flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-4 md:py-6 overflow-hidden">
        <div className="flex-1 flex flex-col max-w-lg mx-auto w-full">
          
          {/* Step Content */}
          <StepContainer
            currentStep={currentStep}
            direction={direction}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex-1 flex flex-col justify-start"
              >
                {currentStep === 1 && (
                  <Step1
                    relationship={surveyData.step1.relationship}
                    name={surveyData.step1.name}
                    pronunciation={surveyData.step1.pronunciation}
                    errors={errors.step1}
                    onRelationshipChange={(relationship) =>
                      updateStep1({ relationship })
                    }
                    onNameChange={(name) => updateStep1({ name })}
                    onPronunciationChange={(pronunciation) =>
                      updateStep1({ pronunciation })
                    }
                  />
                )}

                {currentStep === 2 && (
                  <Step2
                    genre={surveyData.step2.genre}
                    customGenre={surveyData.step2.customGenre}
                    errors={errors.step2}
                    onGenreChange={(genre) => updateStep2({ genre })}
                    onCustomGenreChange={(customGenre) => updateStep2({ customGenre })}
                  />
                )}

                {currentStep === 3 && (
                  <Step3
                    qualities={surveyData.step3.qualities}
                    errors={errors.step3}
                    onQualitiesChange={(qualities) => updateStep3({ qualities })}
                  />
                )}

                {currentStep === 4 && (
                  <Step4
                    memories={surveyData.step4.memories}
                    errors={errors.step4}
                    onMemoriesChange={(memories) => updateStep4({ memories })}
                  />
                )}

                {currentStep === 5 && (
                  <Step5
                    specialMessage={surveyData.step5.specialMessage}
                    errors={errors.step5}
                    onSpecialMessageChange={(specialMessage) => updateStep5({ specialMessage })}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </StepContainer>

          {/* Navigation Footer */}
          <SurveyNavigation
            currentStep={currentStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            canProceed={canProceed}
            onBack={handlePrev}
            onNext={handleNext}
          />
          
          {/* Terms Agreement - Only on page 1 */}
          {currentStep === 1 && (
            <p className="text-center text-xs text-brand-mocha-light mt-3">
              {t('survey.navigation.terms_agreement')}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
