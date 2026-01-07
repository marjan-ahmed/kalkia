'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { AboutSection } from '@/components/AboutSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { InputFlowSection } from '@/components/InputFlowSection';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Link from 'next/link';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false, loading: () => <div className="text-gray-400">Loading animation...</div> }
);

const LottieAnimation = memo(() => (
  <div className="flex justify-center items-center w-full h-full">
    <div
      className="
      w-[110%] h-[110%]
      sm:w-[125%] sm:h-[125%]
      lg:w-[135%] lg:h-[135%]
      xl:w-[140%] xl:h-[140%]
      flex justify-center items-center
    "
    >
      <DotLottieReact
        src="https://lottie.host/84ce8bb0-7ce5-45f8-9ee3-e2a3ce995aca/YRf0ADz7Fs.lottie"
        loop
        autoplay
        className="w-full h-full"
      />
    </div>
  </div>
));
LottieAnimation.displayName = 'LottieAnimation';

// ✅ Hero paragraph
const hero_paragraph = `
Plan outdoor events with confidence using NASA Earth observation data. Get historical weather probabilities for any location and date—from extreme heat and rainfall to wind conditions and air quality—months in advance.
`;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 🔹 Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 px-4 pt-28 md:pt-48">
        <div className="mx-auto max-w-6xl h-full flex items-center justify-center">
          <div className="text-center space-y-8 md:space-y-12 w-full">

            {/* Heading */}
            <div className="relative z-10 space-y-3">
              <h1 className="font-exo text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 text-center">
                Want to Plan an Outdoor 
                <br className="hidden lg:block" />
                Events<span className="font-lexend">?</span>
              </h1>

              <div className="max-w-4xl mx-auto flex justify-center">
                <TextGenerateEffect words={hero_paragraph} />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="relative z-10 flex font-lexend flex-col sm:flex-row justify-center gap-4 px-4">
              <Button className="py-6 px-6 w-full sm:w-auto">
                <Link href="/dashboard">Check Weather Probabilities</Link>
              </Button>
              <Button variant="outline" className="py-6 px-6 w-full sm:w-auto">
                <Link href="#workflow">Learn How It Works</Link>
              </Button>
            </div>

            {/* Animation */}
            <div className="relative z-10 flex items-center justify-center mt-8 md:mt-12">
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <LottieAnimation />
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Simplified Background Elements (lighter for better performance) */}
        <div className="absolute top-1/4 left-4 w-16 h-16 bg-blue-100/40 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-24 h-24 bg-purple-100/40 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-green-100/35 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* 🔹 Other Sections */}
      <AboutSection />
      <FeaturesSection />
      <InputFlowSection />
    </div>
  );
}