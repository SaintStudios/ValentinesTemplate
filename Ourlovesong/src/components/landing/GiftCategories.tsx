"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CreateSongButton } from "@/components/shared/CreateSongButton";
import Link from "next/link";

interface Category {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  href: string;
  imageUrl: string;
}

const categories: Category[] = [
  {
    id: "partner",
    titleKey: "categories.partner.title",
    descriptionKey: "categories.partner.description",
    href: "/order/survey?category=partner",
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    id: "children",
    titleKey: "categories.children.title",
    descriptionKey: "categories.children.description",
    href: "/order/survey?category=children",
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: "parents",
    titleKey: "categories.parents.title",
    descriptionKey: "categories.parents.description",
    href: "/order/survey?category=parents",
    imageUrl: "https://images.unsplash.com/photo-1501901609772-df0848060b33?q=80&w=2070&auto=format&fit=crop",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: "friends",
    titleKey: "categories.friends.title",
    descriptionKey: "categories.friends.description",
    href: "/order/survey?category=friends",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: "anniversary",
    titleKey: "categories.anniversary.title",
    descriptionKey: "categories.anniversary.description",
    href: "/order/survey?category=anniversary",
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "memorial",
    titleKey: "categories.memorial.title",
    descriptionKey: "categories.memorial.description",
    href: "/order/survey?category=memorial",
    imageUrl: "https://images.unsplash.com/photo-1590239549758-4c4bcc36971c?q=80&w=2070&auto=format&fit=crop",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function GiftCategories() {
  const { t } = useTranslation();

  return (
    <Section variant="cream" size="lg">
      <div className="container mx-auto px-4">
        {/* Section Header */}


        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={category.href}>
                <div
                  className="h-full rounded-2xl overflow-hidden group cursor-pointer hover:shadow-floating transition-all duration-300 relative bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.imageUrl})` }}
                >
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60 group-hover:from-black/75 group-hover:via-black/55 group-hover:to-black/65 transition-all duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center p-8 h-full justify-center">
                    {/* Icon */}
                    <div className="w-16 h-16 mb-4 rounded-full bg-white flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {category.icon}
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-xl text-white mb-2">
                      {t(category.titleKey)}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {t(category.descriptionKey)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-brand-mocha mb-6">{t("categories.cta_text")}</p>
          <CreateSongButton />
        </motion.div>
      </div>
    </Section>
  );
}

