/**
 * Survey Navigation Component
 * 
 * Compact footer navigation designed for full-viewport layout.
 * Shows progress dots on page 1, terms moved elsewhere.
 */

'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface SurveyNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;
  isSubmitting?: boolean;
  onBack: () => void;
  onNext: () => void;
  className?: string;
}

export function SurveyNavigation({
  currentStep,
  isFirstStep,
  isLastStep,
  canProceed,
  isSubmitting = false,
  onBack,
  onNext,
  className = '',
}: SurveyNavigationProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'relative flex-shrink-0 flex items-center justify-between gap-4 pt-6 pb-1 bg-brand-cream',
        className
      )}
    >
      {/* Fade shadow above navigation */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-brand-cream to-transparent pointer-events-none" />
      {/* Back Button */}
      <Button
        variant="secondary"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
        className="min-w-[100px]"
      >
        {t('survey.navigation.back')}
      </Button>

      {/* Progress Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              step === currentStep
                ? 'w-8 bg-brand-gold'
                : step < currentStep
                ? 'w-2 bg-brand-gold/60'
                : 'w-2 bg-brand-cream-dark'
            )}
          />
        ))}
      </div>

      {/* Next/Submit Button */}
      <Button
        variant="primary"
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
        isLoading={isSubmitting}
        className="min-w-[100px]"
      >
        {isLastStep
          ? t('survey.navigation.submit')
          : t('survey.navigation.next')}
      </Button>
    </div>
  );
}
