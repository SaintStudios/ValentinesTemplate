/**
 * Survey Step 5: Review & Delivery Option
 *
 * Final step where users review their choices and optionally
 * select instant delivery before proceeding to checkout.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { SurveyData } from '@/types/survey';

export interface Step5Props {
  data: SurveyData;
  instantDelivery?: boolean;
  onInstantDeliveryChange?: (value: boolean) => void;
  className?: string;
}

export function Step5({
  data,
  instantDelivery = false,
  onInstantDeliveryChange,
  className = '',
}: Step5Props) {
  const { t } = useTranslation();

  const getBackgroundLabel = (id: string) => {
    // This should ideally map from the same source as Step3
    const map: Record<string, string> = {
      paris: 'survey.step3.background_options.paris',
      beach: 'survey.step3.background_options.beach',
      mountain: 'survey.step3.background_options.mountain',
    };
    return map[id] ? t(map[id]) : id;
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
          {t('survey.step5.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step5.subheading')}
        </p>
      </div>

      {/* Review Section */}
      <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-y-auto pr-1">

        {/* The Date */}
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-brand-mocha-light uppercase tracking-wider mb-2">
            {t('survey.steps.step1')}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-base">
            <div>
              <span className="text-brand-mocha block text-sm">Name</span>
              <span className="text-brand-espresso font-medium">{data.step1.name}</span>
            </div>
            <div>
              <span className="text-brand-mocha block text-sm">Photo</span>
              <span className="text-brand-espresso font-medium truncate">
                {data.step1.photo ? 'Uploaded' : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Music */}
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-brand-mocha-light uppercase tracking-wider mb-2">
            {t('survey.steps.step2')}
          </h3>
          <div>
            <span className="text-brand-mocha block text-sm">Song</span>
            <span className="text-brand-espresso font-medium block truncate">
              {data.step2.songFile ? data.step2.songFile.name : 'None'}
            </span>
          </div>
        </div>

        {/* Scene */}
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-brand-mocha-light uppercase tracking-wider mb-2">
            {t('survey.steps.step3')}
          </h3>
          <div>
            <span className="text-brand-espresso font-medium">
              {getBackgroundLabel(data.step3.backgroundId)}
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-brand-mocha-light uppercase tracking-wider mb-2">
            {t('survey.steps.step4')}
          </h3>
          <p className="text-brand-espresso italic text-sm whitespace-pre-wrap max-h-24 overflow-y-auto">
            &ldquo;{data.step4.cardMessage}&rdquo;
          </p>
        </div>

        {/* Instant Delivery Upsell */}
        <div
          className={cn(
            'p-4 rounded-md border-2 transition-colors cursor-pointer',
            instantDelivery
              ? 'bg-brand-gold/10 border-brand-gold'
              : 'bg-white border-gray-200'
          )}
          onClick={() => onInstantDeliveryChange?.(!instantDelivery)}
        >
          <div className="flex items-start gap-3">
            <div className="pt-0.5">
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                  instantDelivery
                    ? 'bg-brand-gold border-brand-gold'
                    : 'border-gray-300 bg-white'
                )}
              >
                {instantDelivery && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-brand-espresso font-medium">
                  Get it instantly
                </span>
                <span className="text-brand-espresso font-semibold">
                  +&euro;20.00
                </span>
              </div>
              <p className="text-sm text-brand-mocha mt-1">
                {instantDelivery
                  ? 'Your date space will be ready right away!'
                  : 'Standard delivery: ready in ~2 hours'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
