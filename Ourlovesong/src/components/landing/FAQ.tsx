"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { CreateSongButton } from "@/components/shared/CreateSongButton";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "faq.questions.0.question",
    answer: "faq.questions.0.answer",
  },
  {
    question: "faq.questions.1.question",
    answer: "faq.questions.1.answer",
  },
  {
    question: "faq.questions.2.question",
    answer: "faq.questions.2.answer",
  },
  {
    question: "faq.questions.3.question",
    answer: "faq.questions.3.answer",
  },
  {
    question: "faq.questions.4.question",
    answer: "faq.questions.4.answer",
  },
  {
    question: "faq.questions.5.question",
    answer: "faq.questions.5.answer",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section variant="gold" size="lg" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-espresso mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-brand-mocha">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const question = t(item.question);
            const answer = t(item.answer);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-brand-paper hover:bg-brand-cream transition-colors duration-200"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-serif text-lg text-brand-espresso pr-4">
                    {question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-brand-gold flex-shrink-0 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-brand-mocha leading-relaxed">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 p-8 bg-brand-cream rounded-lg"
        >
          <p className="text-brand-espresso mb-4">{t("faq.contact_text")}</p>
          <a
            href="mailto:hello@ourlovesong.co"
            className="text-brand-gold font-semibold hover:underline"
          >
            hello@ourlovesong.co
          </a>
          <div className="mt-6">
            <CreateSongButton />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

