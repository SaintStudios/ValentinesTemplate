'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { clearSurveyData } from '@/hooks/useSurvey';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    clearSurveyData();
  }, []);

  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-serif text-brand-espresso mb-3">
          Thank You!
        </h1>

        <p className="text-brand-mocha text-lg mb-6">
          Your order has been placed. We&apos;re creating your virtual date space now.
        </p>

        {sessionId && (
          <p className="text-sm text-brand-mocha-light mb-8">
            Order reference: <span className="font-mono text-xs">{sessionId}</span>
          </p>
        )}

        <a
          href="/"
          className="inline-block bg-brand-gold text-white font-medium px-8 py-3 rounded-md hover:bg-brand-gold/90 transition-colors"
        >
          Back to Home
        </a>
      </motion.div>
    </main>
  );
}
