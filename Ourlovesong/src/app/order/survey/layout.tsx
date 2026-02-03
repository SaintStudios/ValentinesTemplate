/**
 * Survey Page Layout
 * 
 * Elegant, spacious layout for the order survey flow.
 * Creates a romantic, focused experience with generous breathing room.
 */

import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Your Song | OurLoveSong.co',
  description: 'Order a personalized custom song for your loved one.',
};

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-cream antialiased">
        {/* Subtle texture overlay for warmth */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent" />
        </div>
        {children}
      </body>
    </html>
  );
}
