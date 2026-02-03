/**
 * Survey Page - Main Survey Flow
 * 
 * Full-viewport survey with no scrolling. All content fits within screen.
 * Designed for maximum engagement and minimal friction.
 */

'use client';

import { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instantDelivery, setInstantDelivery] = useState(false);

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

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: surveyData.step1.name,
          relationship: surveyData.step1.relationship,
          backgroundId: surveyData.step3.backgroundId,
          cardMessage: surveyData.step4.cardMessage,
          songLink: surveyData.step2.songLink,
          instantDelivery,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Checkout failed');

      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      setIsSubmitting(false);
    }
  }, [surveyData, instantDelivery]);

  const handleNext = useCallback(() => {
    const isValid = validateCurrentStep();
    if (isValid) {
      if (isLastStep) {
        handleSubmit();
      } else {
        setDirection(1);
        nextStep();
      }
    }
  }, [validateCurrentStep, nextStep, isLastStep, handleSubmit]);

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
        <div className="flex-1 min-h-0 flex flex-col max-w-lg mx-auto w-full">

          {/* Step Content */}
          <StepContainer
            currentStep={currentStep}
            direction={direction}
          >
            {currentStep === 1 && (
              <Step1
                name={surveyData.step1.name}
                photo={surveyData.step1.photo}
                errors={errors.step1}
                onNameChange={(name) => updateStep1({ name })}
                onPhotoChange={(photo) => updateStep1({ photo })}
              />
            )}

            {currentStep === 2 && (
              <Step2
                songLink={surveyData.step2.songLink}
                errors={errors.step2}
                onSongLinkChange={(songLink) => updateStep2({ songLink })}
              />
            )}

            {currentStep === 3 && (
              <Step3
                backgroundId={surveyData.step3.backgroundId}
                errors={errors.step3}
                onBackgroundChange={(backgroundId) => updateStep3({ backgroundId })}
              />
            )}

            {currentStep === 4 && (
              <Step4
                cardMessage={surveyData.step4.cardMessage}
                errors={errors.step4}
                onCardMessageChange={(cardMessage) => updateStep4({ cardMessage })}
              />
            )}

            {currentStep === 5 && (
              <Step5
                data={surveyData}
                instantDelivery={instantDelivery}
                onInstantDeliveryChange={setInstantDelivery}
              />
            )}
          </StepContainer>

          {/* Navigation Footer */}
          <SurveyNavigation
            currentStep={currentStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            canProceed={canProceed}
            isSubmitting={isSubmitting}
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
