/**
 * Survey Step 3: Their Beautiful Qualities
 * 
 * Third step where users describe what makes the person special.
 * Compact design that fits on screen without scrolling.
 */

'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export interface Step3Props {
  qualities: string;
  errors?: {
    qualities?: string;
  };
  onQualitiesChange: (qualities: string) => void;
  className?: string;
}

export function Step3({
  qualities,
  errors = {},
  onQualitiesChange,
  className = '',
}: Step3Props) {
  const { t } = useTranslation();

  const handleQualitiesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onQualitiesChange(e.target.value);
    },
    [onQualitiesChange]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn('flex-1 flex flex-col', className)}
    >
      {/* Section Heading */}
      <div className="flex-shrink-0 text-center mb-5 px-2">
        <h2 className="text-h1 font-serif text-brand-espresso">
          {t('survey.step3.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step3.subheading')}
        </p>
      </div>

      {/* Qualities Section */}
      <div className="flex-1 flex flex-col">
        <label
          htmlFor="qualities"
          className="block text-base font-medium text-brand-espresso mb-2"
        >
          {t('survey.step3.qualities_label')}
        </label>
        
        <textarea
          id="qualities"
          value={qualities}
          onChange={handleQualitiesChange}
          placeholder={t('survey.step3.qualities_placeholder')}
          rows={8}
          className={cn(
            'w-full px-4 py-3 text-base',
            'bg-white border rounded-md resize-none',
            'transition-all duration-150',
            'placeholder:text-brand-mocha-light/80',
            'focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold',
            errors.qualities
              ? 'border-brand-error focus:ring-brand-error/30'
              : 'border-gray-300'
          )}
        />
        
        {errors.qualities && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-brand-error"
          >
            {errors.qualities}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
