/**
 * Survey Step 2: Genre Selection
 * 
 * Second step where users select their preferred music genre.
 * Compact design that fits on screen without scrolling.
 */

'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export interface Step2Props {
  genre: string | null;
  customGenre: string;
  errors?: {
    genre?: string;
  };
  onGenreChange: (genre: string) => void;
  onCustomGenreChange: (customGenre: string) => void;
  className?: string;
}

// Available genres for selection
const GENRES = [
  'Pop',
  'Country',
  'Rock',
  'R&B',
  'Jazz',
  'Worship',
  'Rap / Hip-Hop',
  'Custom...',
];

export function Step2({
  genre,
  customGenre = '',
  errors = {},
  onGenreChange,
  onCustomGenreChange,
  className = '',
}: Step2Props) {
  const { t } = useTranslation();
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleGenreSelect = useCallback(
    (selectedGenre: string) => {
      onGenreChange(selectedGenre);
      setShowCustomInput(selectedGenre === 'Custom...');
    },
    [onGenreChange]
  );

  const handleCustomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onCustomGenreChange(e.target.value);
    },
    [onCustomGenreChange]
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
          {t('survey.step2.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step2.subheading')}
        </p>
      </div>

      {/* Genre Selection */}
      <div className="mb-4">
        <label className="block text-base font-medium text-brand-espresso mb-2.5">
          {t('survey.step2.genre_label')}
        </label>
        
        <div className="grid grid-cols-2 gap-2.5">
          {GENRES.map((genreOption) => {
            const isSelected = genre === genreOption;
            
            return (
              <motion.button
                key={genreOption}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenreSelect(genreOption)}
                className={cn(
                  'relative px-3 py-3 rounded-md border-2 text-base font-medium',
                  'transition-all duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-1',
                  isSelected
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-espresso'
                    : 'border-gray-200 bg-white text-brand-mocha hover:border-brand-gold/50'
                )}
              >
                {genreOption}
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center shadow-sm"
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
        
        {errors.genre && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-brand-error"
          >
            {errors.genre}
          </motion.p>
        )}
      </div>

      {/* Custom Genre Input - Shows when Custom... is selected */}
      {showCustomInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-2"
        >
          <label
            htmlFor="custom-genre"
            className="block text-sm text-brand-mocha mb-1.5"
          >
            {t('survey.step2.custom_genre_label')}
          </label>
          
          <input
            id="custom-genre"
            type="text"
            value={customGenre}
            onChange={handleCustomChange}
            placeholder={t('survey.step2.custom_genre_placeholder')}
            className={cn(
              'w-full px-4 py-3 text-base',
              'bg-white border rounded-md',
              'transition-all duration-150',
              'placeholder:text-brand-mocha-light/80',
              'focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold',
              'border-gray-300'
            )}
          />
        </motion.div>
      )}

      {/* Spacer to maintain layout balance */}
      <div className="flex-1" />
    </motion.div>
  );
}

