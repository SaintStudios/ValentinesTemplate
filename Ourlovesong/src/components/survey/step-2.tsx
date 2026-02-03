/**
 * Survey Step 2: Set the Mood
 *
 * Second step where users paste a Spotify or Apple Music link
 * to set the mood for their virtual date space.
 */

'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export interface Step2Props {
  songLink: string;
  errors?: {
    songLink?: string;
  };
  onSongLinkChange: (link: string) => void;
  className?: string;
}

export function Step2({
  songLink = '',
  errors = {},
  onSongLinkChange,
  className = '',
}: Step2Props) {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSongLinkChange(e.target.value);
    },
    [onSongLinkChange]
  );

  const isSpotify = (songLink || '').includes('spotify.com') || (songLink || '').includes('spotify:');
  const isAppleMusic = (songLink || '').includes('music.apple.com');
  const hasValidLink = (songLink || '').trim() && (isSpotify || isAppleMusic);

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
          {t('survey.step2.heading')}
        </h2>
        <p className="text-lg text-brand-mocha mt-2">
          {t('survey.step2.subheading')}
        </p>
      </div>

      {/* Music Link Input */}
      <div className="mb-4">
        <label className="block text-base font-medium text-brand-espresso mb-2.5">
          {t('survey.step2.song_label')}
        </label>

        <div className="relative">
          <input
            type="url"
            value={songLink}
            onChange={handleChange}
            placeholder="https://open.spotify.com/track/... or https://music.apple.com/..."
            className={cn(
              "w-full px-4 py-3.5 border-2 rounded-md text-sm text-brand-espresso placeholder:text-brand-mocha-light/60 bg-white transition-colors focus:outline-none focus:ring-0",
              errors.songLink
                ? "border-brand-error/50 bg-brand-error/5"
                : hasValidLink
                  ? "border-brand-success/50"
                  : "border-gray-300 focus:border-brand-gold/50"
            )}
          />
        </div>

        {/* Platform indicator */}
        {hasValidLink && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2.5 flex items-center gap-2"
          >
            {isSpotify && (
              <>
                <svg className="w-5 h-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="text-sm text-brand-success font-medium">Spotify link detected</span>
              </>
            )}
            {isAppleMusic && (
              <>
                <svg className="w-5 h-5 text-[#FC3C44]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.225C18.97.033 18.207.014 17.455 0c-.727-.013-1.456 0-2.184 0H8.73c-.769 0-1.537-.007-2.306.013-.72.013-1.434.047-2.133.227A5.145 5.145 0 002.17.945C1.087 1.658.345 2.638.04 3.898a9.283 9.283 0 00-.04 2.386C.007 7.012 0 7.74 0 8.47v7.06c0 .73-.007 1.458.013 2.186.02.728.047 1.442.227 2.142.307 1.3 1.049 2.296 2.167 3.025.54.352 1.137.567 1.783.686.73.139 1.467.16 2.213.167.727.013 1.456.007 2.184.007h6.53c.769 0 1.537.007 2.306-.013.72-.013 1.434-.047 2.133-.227a5.145 5.145 0 002.12-.68c1.083-.713 1.825-1.693 2.13-2.953.197-.78.227-1.573.233-2.366.013-.728.007-1.457.007-2.186V8.47c0-.73.007-1.459-.013-2.186v-.16zM11.7 17.44V8.093l5.527-1.327v6.3c0 .16-.007.32-.02.473-.067.7-.38 1.24-.98 1.586a2.363 2.363 0 01-1.31.387c-.987.033-1.787-.627-1.86-1.54-.073-.92.527-1.667 1.42-1.88.407-.1.82-.14 1.233-.213.2-.033.393-.073.567-.167.3-.153.433-.407.413-.733V8.253l-3.56.86v7.227c0 .16-.007.32-.02.473-.067.7-.38 1.24-.98 1.586a2.363 2.363 0 01-1.31.387c-.987.033-1.787-.627-1.86-1.54-.073-.92.527-1.667 1.42-1.88.407-.1.82-.14 1.233-.213.2-.033.393-.073.567-.167.3-.153.433-.407.413-.733 0-.007.007-.6.007-.813z" />
                </svg>
                <span className="text-sm text-[#FC3C44] font-medium">Apple Music link detected</span>
              </>
            )}
          </motion.div>
        )}

        {errors.songLink && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-brand-error"
          >
            {errors.songLink}
          </motion.p>
        )}
      </div>

      {/* Spacer to maintain layout balance */}
      <div className="flex-1" />
    </motion.div>
  );
}
