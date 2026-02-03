/**
 * Survey Step 5: Special Message
 * 
 * Fifth and final step where users can add a special message.
 * Compact design that fits on screen without scrolling.
 */

'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export interface Step5Props {
  specialMessage: string;
  errors?: {
    specialMessage?: string;
  };
  onSpecialMessageChange: (specialMessage: string) => void;
  className?: string;
}

export function Step5({
  specialMessage,
  errors = {},
  onSpecialMessageChange,
  className = '',
}: Step5Props) {
  const { t } = useTranslation();

  const handleSpecialMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onSpecialMessageChange(e.target.value);
    },
    [onSpecialMessageChange]
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
          {t('survey.step5.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step5.subheading')}
        </p>
      </div>

      {/* Special Message Section */}
      <div className="flex-1 flex flex-col">
        <label
          htmlFor="special-message"
          className="block text-base font-medium text-brand-espresso mb-2"
        >
          {t('survey.step5.message_label')}
        </label>
        
        <textarea
          id="special-message"
          value={specialMessage}
          onChange={handleSpecialMessageChange}
          placeholder={t('survey.step5.message_placeholder')}
          rows={8}
          className={cn(
            'w-full px-4 py-3 text-base',
            'bg-white border rounded-md resize-none',
            'transition-all duration-150',
            'placeholder:text-brand-mocha-light/80',
            'focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold',
            errors.specialMessage
              ? 'border-brand-error focus:ring-brand-error/30'
              : 'border-gray-300'
          )}
        />
        
        {errors.specialMessage && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-brand-error"
          >
            {errors.specialMessage}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

