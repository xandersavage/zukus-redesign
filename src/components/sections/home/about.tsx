// src/components/sections/home/about.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { AboutCounter } from "./about-counter";
import { AboutImageGrid } from "./about-image-grid";

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-secondary-50"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-100 rounded-bl-full opacity-20" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-200 rounded-tr-full opacity-20" />

      <Container>
        {/* This div changes from grid to flex-col on smaller screens */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content - full width on mobile, half width on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-secondary-900 text-3xl md:text-4xl font-display font-bold mb-6">
              <span className="text-primary-500">35+ Years</span> of Excellence
              <br />
              in Oil & Gas Services
            </h2>

            <p className="text-secondary-700 text-lg mb-8">
              Since 1987, Zukus Industries has been delivering innovative
              solutions and specialized services to the oil and gas industry
              worldwide, maintaining the highest standards of safety, quality,
              and operational excellence.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {/* Achievement Counters */}
              <AboutCounter value={1200} label="Projects Completed" />
              <AboutCounter value={42} label="Countries Served" />
              <AboutCounter value={98} label="Client Satisfaction" suffix="%" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              onClick={() => (window.location.href = "/about")}
            >
              <span>Discover Our Story</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Image grid - optimized height on mobile */}
          <div className="w-full mt-8 lg:mt-0">
            <AboutImageGrid />
          </div>
        </div>
      </Container>
    </section>
  );
}
