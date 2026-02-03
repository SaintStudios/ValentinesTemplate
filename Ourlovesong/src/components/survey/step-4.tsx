/**
 * Survey Step 4: Special Memories
 * 
 * Fourth step where users share their favorite memories.
 * Compact design that fits on screen without scrolling.
 */

'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export interface Step4Props {
  memories: string;
  errors?: {
    memories?: string;
  };
  onMemoriesChange: (memories: string) => void;
  className?: string;
}

export function Step4({
  memories,
  errors = {},
  onMemoriesChange,
  className = '',
}: Step4Props) {
  const { t } = useTranslation();

  const handleMemoriesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onMemoriesChange(e.target.value);
    },
    [onMemoriesChange]
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
          {t('survey.step4.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step4.subheading')}
        </p>
      </div>

      {/* Memories Section */}
      <div className="flex-1 flex flex-col">
        <label
          htmlFor="memories"
          className="block text-base font-medium text-brand-espresso mb-2"
        >
          {t('survey.step4.memories_label')}
        </label>
        
        <textarea
          id="memories"
          value={memories}
          onChange={handleMemoriesChange}
          placeholder={t('survey.step4.memories_placeholder')}
          rows={8}
          className={cn(
            'w-full px-4 py-3 text-base',
            'bg-white border rounded-md resize-none',
            'transition-all duration-150',
            'placeholder:text-brand-mocha-light/80',
            'focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold',
            errors.memories
              ? 'border-brand-error focus:ring-brand-error/30'
              : 'border-gray-300'
          )}
        />
        
        {errors.memories && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-brand-error"
          >
            {errors.memories}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

