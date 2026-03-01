'use client';

import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-[#0b0f19] via-[#0b1224] to-black text-gray-300 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Left Section */}
        {/*
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/image.png"
              alt="NASA Logo"
              fill
              className="rounded-full object-cover ring-1 ring-white/30"
            />
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base text-white">
              Team ExploreX
            </p>
            <p className="text-xs text-gray-400">
              NASA Space Apps Challenge 2025 — Karachi
            </p>
          </div>
        </div>
        */}

        {/* Center Section */}
        {/*
        <div className="text-center">
          <p className="font-lexend text-sm sm:text-base text-white">
            🌦️ <span className="font-semibold">Will It Rain On My Parade?</span>
          </p>
          <p className="text-xs text-gray-400">
            A NASA-powered Weather Probability App
          </p>
        </div>
        */}

        {/* Right Section */}
        {/*
        <div className="flex items-center gap-5">
          <Link
            href="https://github.com/marjan-ahmed/nasa-weather-probability-app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-white transition-colors"
          >
            <FaGithub size={20} /> <span>GitHub</span>
          </Link>

          <Link
            href="https://www.spaceappschallenge.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-white transition-colors"
          >
            <FaGlobe size={18} /> <span>NASA Space Apps</span>
          </Link>
        </div>
        */}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mt-6 pt-4 text-center">
        {/*
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} 
          <span className="font-medium text-white"> Team ExploreX</span>.  
          Built for <span className="text-blue-400">NASA Space Apps Challenge 2025</span>.
        </p>
        */}

        {/* New Footer Line */}
        <p className="text-xs text-gray-400">
          Developed with ❤️ by 
          <span className="font-medium text-white"> Muhammad Marjan Ahmed</span>
        </p>
      </div>

      {/* Decorative background effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,#1e3a8a_0%,transparent_70%)] opacity-40"></div>
    </footer>
  );
}
