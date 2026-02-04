/**
 * Survey Step 1: Recipient Information
 * 
 * First step of the survey - compact design that fits on screen.
 * No scrolling required.
 */

'use client';

import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
export interface Step1Props {
  name: string;
  photo?: File | null;
  errors?: {
    name?: string;
    photo?: string;
  };
  onNameChange: (name: string) => void;
  onPhotoChange: (file: File | null) => void;
  className?: string;
}

export function Step1({
  name,
  photo,
  errors = {},
  onNameChange,
  onPhotoChange,
  className = '',
}: Step1Props) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onNameChange(e.target.value);
    },
    [onNameChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onPhotoChange(e.target.files[0]);
      }
    },
    [onPhotoChange]
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
          {t('survey.step1.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step1.subheading')}
        </p>
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

      {/* Photo Upload */}
      <div className="mb-2">
        <label
          className="block text-base font-medium text-brand-espresso mb-2"
        >
          {t('survey.step1.gf_image_label')}
        </label>

        <div
          onClick={handleUploadClick}
          className={cn(
            "w-full px-4 py-6 border-2 border-dashed rounded-md cursor-pointer transition-colors flex flex-col items-center justify-center text-center",
            errors.photo ? "border-brand-error/50 bg-brand-error/5" : "border-gray-300 hover:border-brand-gold/50 hover:bg-white/50"
          )}
        >
          {photo ? (
            <div className="flex items-center gap-2">
              <span className="text-brand-success font-medium">Photo Selected: {photo.name}</span>
            </div>
          ) : (
            <>
              <svg className="w-8 h-8 text-brand-mocha-light mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-brand-mocha">Click to upload photo</span>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {errors.photo && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-brand-error"
          >
            {errors.photo}
          </motion.p>
        )}

        {/* Privacy Note */}
        <p className="mt-3 text-center text-sm text-brand-mocha/60 italic">
          {t('survey.step1.privacy_note')}
        </p>
      </div>
    </motion.div>
  );
}
