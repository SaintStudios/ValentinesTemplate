"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/**
 * CreateSongButton - A reusable button component that links to the /create page
 * with a gift icon. Used throughout the landing page to encourage conversions.
 */
export function CreateSongButton() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex justify-center"
    >
      <Link href="/order/survey">
          <Button size="lg" variant="sparkle" className="group">
          {/* Gift Icon */}
          <svg
            className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </svg>
          {t("nav.create_song")}
        </Button>
      </Link>
    </motion.div>
  );
}

