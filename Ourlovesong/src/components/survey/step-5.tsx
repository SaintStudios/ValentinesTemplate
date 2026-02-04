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
import { SurveyData, SurveyErrors } from '@/types/survey';

export interface Step5Props {
  data: SurveyData;
  instantDelivery?: boolean;
  onInstantDeliveryChange?: (value: boolean) => void;
  onEmailChange?: (email: string) => void;
  errors?: SurveyErrors['step5'];
  className?: string;
}

export function Step5({
  data,
  instantDelivery = false,
  onInstantDeliveryChange,
  onEmailChange,
  errors,
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
      className={cn('flex-1 min-h-0 flex flex-col', className)}
    >
      {/* Section Heading */}
      <div className="flex-shrink-0 text-center mb-3 px-2">
        <h2 className="text-h1 font-serif text-brand-espresso">
          {t('survey.step5.heading')}
        </h2>
        <p className="text-base text-brand-mocha mt-1">
          {t('survey.step5.subheading')}
        </p>
      </div>

      {/* Email Input Section */}
      <div className="flex-shrink-0 px-2 mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-brand-espresso mb-1">
          Your Email <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-brand-mocha-light mb-2">
          We'll send your custom 3D date link here shortly.
        </p>
        <input
          type="email"
          id="email"
          value={data.step5.email}
          onChange={(e) => onEmailChange?.(e.target.value)}
          placeholder="name@example.com"
          className={cn(
            "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400 bg-white",
            errors?.email ? "border-red-500" : "border-gray-200"
          )}
        />
        {errors?.email && (
          <p className="mt-1 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Review Section */}
      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto pr-1">

        {/* Compact Order Summary */}
        <div className="bg-white rounded-md border border-gray-200 divide-y divide-gray-100">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs font-medium text-brand-mocha-light uppercase tracking-wider">Name</span>
            <span className="text-sm text-brand-espresso font-medium">{data.step1.name}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs font-medium text-brand-mocha-light uppercase tracking-wider">Photo</span>
            <span className="text-sm text-brand-espresso font-medium">{data.step1.photo ? 'Uploaded' : 'None'}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs font-medium text-brand-mocha-light uppercase tracking-wider">Song</span>
            <span className="text-sm text-brand-espresso font-medium truncate ml-4 max-w-[60%] text-right">
              {data.step2.songLink || 'None'}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs font-medium text-brand-mocha-light uppercase tracking-wider">Scene</span>
            <span className="text-sm text-brand-espresso font-medium">{getBackgroundLabel(data.step3.backgroundId)}</span>
          </div>
          <div className="px-3 py-2">
            <span className="text-xs font-medium text-brand-mocha-light uppercase tracking-wider block mb-1">Message</span>
            <p className="text-sm text-brand-espresso italic line-clamp-2">
              &ldquo;{data.step4.cardMessage}&rdquo;
            </p>
          </div>
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
                  ? 'Your date space will be ready within 5 minutes!'
                  : 'Standard delivery: ready within 24 hours'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
