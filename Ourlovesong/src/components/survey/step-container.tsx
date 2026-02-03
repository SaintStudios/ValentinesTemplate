/**
 * Step Container Component
 * 
 * Animated wrapper for survey steps providing smooth transitions
 * between different steps of the survey flow.
 */

'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface StepContainerProps {
  children: ReactNode;
  currentStep: number;
  direction?: number;
  className?: string;
}

const stepVariants = {
  right: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  left: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  fade: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
};

export function StepContainer({
  children,
  currentStep,
  direction = 0,
  className = '',
}: StepContainerProps) {
  let animationVariant = stepVariants.fade;
  if (direction > 0) {
    animationVariant = stepVariants.right;
  } else if (direction < 0) {
    animationVariant = stepVariants.left;
  }

  return (
    <div className={cn('flex-1 min-h-0 flex flex-col', className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          variants={animationVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex-1 min-h-0 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function StepIndicators({
  totalSteps,
  currentStep,
  className = '',
}: {
  totalSteps: number;
  currentStep: number;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center gap-1.5', className)}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={cn(
            'w-2 h-2 rounded-full transition-colors duration-200',
            step === currentStep
              ? 'bg-brand-gold'
              : step < currentStep
              ? 'bg-brand-gold/50'
              : 'bg-brand-cream-dark'
          )}
        />
      ))}
    </div>
  );
}
