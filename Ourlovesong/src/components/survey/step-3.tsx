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
  backgroundId: string;
  errors?: {
    backgroundId?: string;
  };
  onBackgroundChange: (id: string) => void;
  className?: string;
}

const BACKGROUNDS = [
  { id: 'paris', labelKey: 'survey.step3.background_options.paris', icon: '🗼' },
  { id: 'beach', labelKey: 'survey.step3.background_options.beach', icon: '🏖️' },
  { id: 'mountain', labelKey: 'survey.step3.background_options.mountain', icon: '⛰️' },
];

export function Step3({
  backgroundId,
  errors = {},
  onBackgroundChange,
  className = '',
}: Step3Props) {
  const { t } = useTranslation();

  const handleBackgroundSelect = useCallback(
    (id: string) => {
      onBackgroundChange(id);
    },
    [onBackgroundChange]
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

      {/* Background Selection */}
      <div className="flex-1 flex flex-col">
        <label className="block text-base font-medium text-brand-espresso mb-2.5">
          {t('survey.step3.background_label')}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BACKGROUNDS.map((bg) => {
            const isSelected = backgroundId === bg.id;

            return (
              <motion.button
                key={bg.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBackgroundSelect(bg.id)}
                className={cn(
                  'relative px-4 py-6 rounded-md border-2 text-base font-medium flex flex-col items-center gap-2',
                  'transition-all duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-1',
                  isSelected
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-espresso'
                    : 'border-gray-200 bg-white text-brand-mocha hover:border-brand-gold/50'
                )}
              >
                <span className="text-4xl">{bg.icon}</span>
                <span className="text-brand-espresso font-serif">{t(bg.labelKey)}</span>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center shadow-sm"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {errors.backgroundId && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-brand-error"
          >
            {errors.backgroundId}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
