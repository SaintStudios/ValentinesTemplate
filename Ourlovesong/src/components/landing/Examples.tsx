"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CreateSongButton } from "@/components/shared/CreateSongButton";

interface SongExample {
  id: string;
  title: string;
  category: string;
  duration: string;
  isPlaying: boolean;
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function AudioPlayer({
  duration,
  isPlaying,
  onToggle,
}: {
  duration: string;
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const [progress, setProgress] = useState(0);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onToggle}
        className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white hover:bg-brand-gold-light transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-brand-mocha">{duration}</span>
        </div>
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-gold rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function Examples() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { t } = useTranslation();

  // Generate song examples from translations
  const songExamples: SongExample[] = [
    { id: "1", title: t("examples.items.0.title"), category: t("examples.items.0.category"), duration: t("examples.items.0.duration"), isPlaying: false },
    { id: "2", title: t("examples.items.1.title"), category: t("examples.items.1.category"), duration: t("examples.items.1.duration"), isPlaying: false },
    { id: "3", title: t("examples.items.2.title"), category: t("examples.items.2.category"), duration: t("examples.items.2.duration"), isPlaying: false },
    { id: "4", title: t("examples.items.3.title"), category: t("examples.items.3.category"), duration: t("examples.items.3.duration"), isPlaying: false },
  ];

  const handlePlayToggle = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <Section variant="cream" size="lg" id="examples">
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
            {t("examples.title")}
          </h2>
          <p className="text-lg text-brand-mocha max-w-2xl mx-auto">
            {t("examples.subtitle")}
          </p>
        </motion.div>

        {/* Song Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {songExamples.map((song) => (
            <motion.div key={song.id} variants={itemVariants}>
              <Card variant="elevated" padding="md" className="h-full">
                {/* Placeholder Album Art */}
                <div className="aspect-square bg-brand-cream-dark rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-brand-espresso/10" />
                  <svg
                    className="w-16 h-16 text-brand-gold/50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>

                {/* Song Info */}
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-brand-gold bg-brand-gold/10 rounded-full mb-2">
                    {song.category}
                  </span>
                  <h3 className="font-serif text-lg text-brand-espresso">
                    {song.title}
                  </h3>
                </div>

                {/* Audio Player */}
                <AudioPlayer
                  duration={song.duration}
                  isPlaying={playingId === song.id}
                  onToggle={() => handlePlayToggle(song.id)}
                />
              </Card>
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
          <p className="text-brand-mocha text-sm mb-6">
            {t("examples.note")}
          </p>
          <CreateSongButton />
        </motion.div>
      </div>
    </Section>
  );
}

