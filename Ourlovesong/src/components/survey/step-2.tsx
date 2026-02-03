/**
 * Survey Step 2: Genre Selection
 * 
 * Second step where users select their preferred music genre.
 * Compact design that fits on screen without scrolling.
 */

'use client';

import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Step2Data } from '@/types/survey';

export interface Step2Props {
  songFile: File | null;
  errors?: {
    songFile?: string;
  };
  onSongFileChange: (file: File | null) => void;
  className?: string;
}

export function Step2({
  songFile,
  errors = {},
  onSongFileChange,
  className = '',
}: Step2Props) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onSongFileChange(e.target.files[0]);
      }
    },
    [onSongFileChange]
  );

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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

      {/* Song Upload */}
      <div className="mb-4">
        <label className="block text-base font-medium text-brand-espresso mb-2.5">
          {t('survey.step2.song_label')}
        </label>

        <div
          onClick={handleUploadClick}
          className={cn(
            "w-full px-4 py-8 border-2 border-dashed rounded-md cursor-pointer transition-colors flex flex-col items-center justify-center text-center",
            errors.songFile ? "border-brand-error/50 bg-brand-error/5" : "border-gray-300 hover:border-brand-gold/50 hover:bg-white/50"
          )}
        >
          {songFile ? (
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-brand-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-brand-success font-medium">File Selected: {songFile.name}</span>
            </div>
          ) : (
            <>
              <svg className="w-10 h-10 text-brand-mocha-light mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span className="text-sm text-brand-mocha">Upload MP3 file</span>
              <span className="text-xs text-brand-mocha-light mt-1">Maximum size 10MB</span>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,audio/mpeg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {errors.songFile && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-brand-error"
          >
            {errors.songFile}
          </motion.p>
        )}
      </div>

      {/* Spacer to maintain layout balance */}
      <div className="flex-1" />
    </motion.div>
  );
}

