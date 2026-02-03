/**
 * Survey Header Component
 * 
 * Compact header designed to fit within full-viewport layout.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export interface SurveyHeaderProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  className?: string;
}

export function SurveyHeader({
  currentStep,
  totalSteps,
  progress,
  className = '',
}: SurveyHeaderProps) {
  const { t } = useTranslation();
  
  const progressWidth = `${progress}%`;

  return (
    <header
      className={cn(
        'flex-shrink-0 px-4 py-3 md:py-4',
        className
      )}
    >
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-brand-mocha"
          >
            {t('survey.step_indicator', { step: currentStep, total: totalSteps })}
          </motion.span>
          
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium text-brand-gold"
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
        
        <div className="relative h-1.5 bg-brand-cream-dark rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-brand-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: progressWidth }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </header>
  );
}
