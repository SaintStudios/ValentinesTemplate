"use client";

import { useState, useEffect } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function Hero() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ minutes: 45, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Random duration between 20 and 60 minutes
    const duration = (Math.floor(Math.random() * (60 - 20 + 1)) + 20) * 60;
    const endTime = Date.now() + duration * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ minutes: 0, seconds: 0 });
      } else {
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Section variant="cream" size="xl" className="pt-20 lg:pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-espresso leading-tight mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-brand-mocha mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/order/survey">
              <Button size="lg" variant="sparkle" className="w-full sm:w-auto min-w-[200px]">
                {t("hero.cta_primary")}
              </Button>
            </Link>
            <a href="#examples">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                {t("hero.cta_secondary")}
              </Button>
            </a>
          </motion.div>

          {/* Pricing & Offer */}
          <motion.div
            variants={itemVariants}
            className="max-w-xl mx-auto"
          >
            <div className="card p-6 lg:p-8 relative overflow-hidden">
              {/* Valentine's Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-gold text-white px-4 py-1 rounded-b-lg text-sm font-medium tracking-wide shadow-sm whitespace-nowrap">
                Valentine's Special 2026
              </div>

              <div className="mt-6 flex flex-col items-center justify-center">
                <div className="flex items-baseline justify-center gap-4 mb-2">
                  <span className="text-5xl sm:text-6xl text-brand-mocha/40 line-through font-serif decoration-2">
                    99,99 €
                  </span>
                  <span className="text-3xl sm:text-4xl font-serif text-brand-espresso font-bold">
                    16,99 €
                  </span>
                </div>

                {mounted && (
                  <div className="flex items-center gap-2 text-rose-600 font-medium animate-pulse mt-6">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Offer ends in {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>
    </Section>
  );
}

