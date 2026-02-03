"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  songTitle: string;
  initials: string;
  image: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function Testimonials() {
  const { t } = useTranslation();

  // Generate testimonials from translations
  // Profile images from public/assets/images/profile images/
  // All images are unique and not used in Hero section
  const testimonials: Testimonial[] = [
    { id: "1", quote: t("testimonials.items.0.quote"), author: t("testimonials.items.0.author"), songTitle: t("testimonials.items.0.song_title"), initials: t("testimonials.items.0.initials"), image: "/assets/images/profile images/cae16174-3429-435a-af2f-67ca56179eb4.png" },
    { id: "2", quote: t("testimonials.items.1.quote"), author: t("testimonials.items.1.author"), songTitle: t("testimonials.items.1.song_title"), initials: t("testimonials.items.1.initials"), image: "/assets/images/profile images/8464a72f-7258-47b4-ae93-2b1457d1b533.png" },
    { id: "3", quote: t("testimonials.items.2.quote"), author: t("testimonials.items.2.author"), songTitle: t("testimonials.items.2.song_title"), initials: t("testimonials.items.2.initials"), image: "/assets/images/profile images/f834cd22-a7eb-4f99-955c-b9ee43337dcd.png" },
    { id: "4", quote: t("testimonials.items.3.quote"), author: t("testimonials.items.3.author"), songTitle: t("testimonials.items.3.song_title"), initials: t("testimonials.items.3.initials"), image: "/assets/images/profile images/85b5f136-a27e-495f-a88b-ae7ba1e7200e.png" },
    { id: "5", quote: t("testimonials.items.4.quote"), author: t("testimonials.items.4.author"), songTitle: t("testimonials.items.4.song_title"), initials: t("testimonials.items.4.initials"), image: "/assets/images/profile images/cc027ace-b0cc-48a2-a921-c0cff52eac92.png" },
    { id: "6", quote: t("testimonials.items.5.quote"), author: t("testimonials.items.5.author"), songTitle: t("testimonials.items.5.song_title"), initials: t("testimonials.items.5.initials"), image: "/assets/images/profile images/444bd377-5776-4685-8964-bef13a6c9a27.png" },
  ];

  return (
    <Section variant="paper" size="md" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-espresso mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-brand-mocha max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-gold/10 rounded-full">
            <svg
              className="w-5 h-5 text-brand-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-brand-gold font-semibold">
              {t("testimonials.stats")}
            </span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card variant="default" padding="md" className="h-full">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-brand-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-brand-espresso mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-brand-espresso text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-brand-mocha">
                      {testimonial.songTitle}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

