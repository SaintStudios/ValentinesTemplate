/**
 * Survey Step 4: Special Memories
 * 
 * Fourth step where users share their favorite memories.
 * Compact design that fits on screen without scrolling.
 */

'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export interface Step4Props {
  cardMessage: string;
  errors?: {
    cardMessage?: string;
  };
  onCardMessageChange: (message: string) => void;
  className?: string;
}

export function Step4({
  cardMessage,
  errors = {},
  onCardMessageChange,
  className = '',
}: Step4Props) {
  const { t } = useTranslation();
  const [showAiInput, setShowAiInput] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onCardMessageChange(e.target.value);
    },
    [onCardMessageChange]
  );

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        onCardMessageChange(data.message);
        setShowAiInput(false);
        setAiPrompt('');
      } else {
        console.error('Failed to generate message:', data.error);
        // Could add error handling UI here
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
    } finally {
      setIsGenerating(false);
    }
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
          {t('survey.step4.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step4.subheading')}
        </p>
      </div>

      {/* Card Message Section */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex justify-between items-end mb-2">
          <label
            htmlFor="card-message"
            className="block text-base font-medium text-brand-espresso"
          >
            {t('survey.step4.card_label')}
          </label>

          <button
            type="button"
            onClick={() => setShowAiInput(!showAiInput)}
            className="text-xs flex items-center gap-1 text-brand-gold hover:text-brand-gold-dark transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {showAiInput ? 'Close Assistant' : 'Write with AI'}
          </button>
        </div>

        {/* AI Assistant Panel */}
        {showAiInput && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-brand-gold/10 border border-brand-gold/30 rounded-md p-3 mb-3 overflow-hidden"
          >
            <p className="text-xs text-brand-espresso mb-2 font-medium">What kind of message should I write?</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={t('survey.step4.ai_placeholder')}
                className="flex-1 text-sm px-3 py-2 rounded border border-brand-gold/30 focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                className="bg-brand-gold text-white px-4 py-2 rounded text-sm font-medium hover:bg-brand-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? 'Writing...' : 'Generate'}
              </button>
            </div>
          </motion.div>
        )}

        <textarea
          id="card-message"
          value={cardMessage}
          onChange={handleMessageChange}
          placeholder={t('survey.step4.card_placeholder')}
          rows={showAiInput ? 5 : 8}
          className={cn(
            'w-full px-4 py-3 text-base',
            'bg-white border rounded-md resize-none',
            'transition-all duration-150',
            'placeholder:text-brand-mocha-light/80',
            'focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold',
            errors.cardMessage
              ? 'border-brand-error focus:ring-brand-error/30'
              : 'border-gray-300'
          )}
        />

        {errors.cardMessage && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-brand-error"
          >
            {errors.cardMessage}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

