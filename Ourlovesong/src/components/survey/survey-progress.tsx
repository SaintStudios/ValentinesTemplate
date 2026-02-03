/**
 * Survey Progress Component
 * 
 * Visual progress indicator showing all steps with current step highlighted.
 * Displays numbered steps with connecting progress line.
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TOTAL_STEPS, SURVEY_STEPS } from '@/types/survey';

export interface SurveyProgressProps {
  /**
   * Current step number (1-indexed)
   */
  currentStep: number;
  
  /**
   * Optional callback when a step is clicked
   */
  onStepClick?: (step: number) => void;
  
  /**
   * Optional CSS class name for additional styling
   */
  className?: string;
}

export function SurveyProgress({
  currentStep,
  onStepClick,
  className = '',
}: SurveyProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Step indicators with progress line */}
      <div className="relative flex items-center justify-between">
        {/* Progress line background */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-brand-cream-dark -translate-y-1/2" />
        
        {/* Progress line fill */}
        <motion.div
          className="absolute left-0 top-1/2 h-0.5 bg-brand-gold -translate-y-1/2"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        
        {/* Step dots */}
        {SURVEY_STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <motion.button
              key={step.id}
              type="button"
              onClick={() => onStepClick?.(step.id)}
              disabled={!onStepClick}
              className={cn(
                'relative z-10 flex items-center justify-center',
                'w-8 h-8 rounded-full border-2',
                'transition-all duration-200',
                isCompleted && 'bg-brand-gold border-brand-gold text-white',
                isCurrent && 'bg-brand-cream border-brand-gold text-brand-espresso',
                !isCompleted && !isCurrent && 'bg-brand-cream border-brand-cream-dark text-brand-mocha',
                onStepClick && 'cursor-pointer hover:scale-110',
                !onStepClick && 'cursor-default'
              )}
              whileHover={onStepClick ? { scale: 1.1 } : undefined}
              whileTap={onStepClick ? { scale: 0.95 } : undefined}
            >
              {isCompleted ? (
                // Checkmark for completed steps
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                // Step number for current and future steps
                <span className="text-xs font-semibold">
                  {step.id}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Step labels (optional, can be hidden on mobile) */}
      <div className="hidden sm:flex items-center justify-between mt-2">
        {SURVEY_STEPS.map((step) => {
          const isActive = step.id === currentStep;
          
          return (
            <div
              key={step.id}
              className={cn(
                'text-xs transition-colors duration-200',
                isActive ? 'text-brand-espresso font-medium' : 'text-brand-mocha'
              )}
            >
              {step.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

