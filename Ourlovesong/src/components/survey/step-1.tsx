/**
 * Survey Step 1: Recipient Information
 * 
 * First step of the survey - compact design that fits on screen.
 * No scrolling required.
 */

'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import {
  Relationship,
  RELATIONSHIP_ORDER,
} from '@/types/survey';

export interface Step1Props {
  relationship: Relationship | null;
  name: string;
  pronunciation?: string;
  errors?: {
    relationship?: string;
    name?: string;
  };
  onRelationshipChange: (relationship: Relationship) => void;
  onNameChange: (name: string) => void;
  onPronunciationChange: (pronunciation: string) => void;
  className?: string;
}

export function Step1({
  relationship,
  name,
  pronunciation = '',
  errors = {},
  onRelationshipChange,
  onNameChange,
  onPronunciationChange,
  className = '',
}: Step1Props) {
  const { t } = useTranslation();

  const handleRelationshipSelect = useCallback(
    (rel: Relationship) => {
      onRelationshipChange(rel);
    },
    [onRelationshipChange]
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onNameChange(e.target.value);
    },
    [onNameChange]
  );

  const handlePronunciationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onPronunciationChange(e.target.value);
    },
    [onPronunciationChange]
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
          {t('survey.step1.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step1.subheading')}
        </p>
      </div>

      {/* Relationship Selection */}
      <div className="mb-4">
        <label className="block text-base font-medium text-brand-espresso mb-2.5">
          {t('survey.step1.relationship_label')}
        </label>
        
        <div className="grid grid-cols-3 gap-2">
          {RELATIONSHIP_ORDER.map((rel) => {
            const isSelected = relationship === rel;
            
            return (
              <motion.button
                key={rel}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRelationshipSelect(rel)}
                className={cn(
                  'relative px-2 py-2.5 rounded-md border-2 text-sm font-medium',
                  'transition-all duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-1',
                  isSelected
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-espresso'
                    : 'border-gray-200 bg-white text-brand-mocha hover:border-brand-gold/50'
                )}
              >
                {t(`survey.relationships.${rel}`)}
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-gold rounded-full flex items-center justify-center"
                  >
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
        
        {errors.relationship && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-brand-error"
          >
            {errors.relationship}
          </motion.p>
        )}
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label
          htmlFor="recipient-name"
          className="block text-base font-medium text-brand-espresso mb-2"
        >
          {t('survey.step1.name_label')}
        </label>
        
        <input
          id="recipient-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder={t('survey.step1.name_placeholder')}
          className={cn(
            'w-full px-4 py-3 text-base',
            'bg-white border rounded-md',
            'transition-all duration-150',
            'placeholder:text-brand-mocha-light/80',
            'focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold',
            errors.name
              ? 'border-brand-error focus:ring-brand-error/30'
              : 'border-gray-300'
          )}
        />
        
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-brand-error"
          >
            {errors.name}
          </motion.p>
        )}
      </div>

      {/* Pronunciation - Optional */}
      <div className="mb-2">
        <label
          htmlFor="pronunciation"
          className="block text-sm text-brand-mocha mb-1"
        >
          {t('survey.step1.pronunciation_label')}
        </label>
        
        <input
          id="pronunciation"
          type="text"
          value={pronunciation}
          onChange={handlePronunciationChange}
          placeholder={t('survey.step1.pronunciation_placeholder')}
          className={cn(
            'w-full px-4 py-2.5 text-sm',
            'bg-white border border-gray-300 rounded-md',
            'transition-all duration-150',
            'placeholder:text-brand-mocha-light/70',
            'focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold'
          )}
        />
        
        <p className="mt-1 text-xs text-brand-mocha-light">
          {t('survey.step1.pronunciation_tip')}
        </p>
      </div>
    </motion.div>
  );
}
