import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Examples } from "@/components/landing/Examples";
import { Testimonials } from "@/components/landing/Testimonials";

import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <Header />
      <Hero />
      <HowItWorks />
      <Examples />
      <Testimonials />

      <FAQ />
      <Footer />
    </main>
  );
}



