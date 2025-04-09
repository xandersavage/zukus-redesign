"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary-900 pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 800 800">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              id="pattern-circle"
              cx="20"
              cy="20"
              r="1.5"
              fill="currentColor"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-circles)"
          />
        </svg>
      </div>

      {/* Main Content */}
      <Container className="relative">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Innovative Solutions for the
              <span className="text-primary-500"> Oil & Gas Industry</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Providing quality, specialized, and efficient services to the oil
              and gas industry since 1987. Trusted by leading companies
              worldwide.
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-secondary-900 font-medium"
              >
                Explore Our Services
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 md:justify-start">
              <div className="flex items-center">
                <span className="mr-2 text-primary-500">✓</span> 35+ Years
                Experience
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-primary-500">✓</span> ISO Certified
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-primary-500">✓</span> Global
                Operations
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px] lg:h-[550px]">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/80 to-transparent z-[1]"></div>
              <Image
                src="/images/projects1.jpg"
                alt="Zukus Industries Oil & Gas Operations"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 right-6 rounded-xl bg-white/10 backdrop-blur-lg p-4 text-white border border-white/20 shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary-500 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5 text-secondary-900"
                    >
                      <path d="M12 2v5m0 14v-5m-7-7h5M19 12h-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Projects Completed</p>
                    <p className="text-xl font-bold">1200+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L48 5.33333C96 10.6667 192 21.3333 288 26.6667C384 32 480 32 576 26.6667C672 21.3333 768 10.6667 864 10.6667C960 10.6667 1056 21.3333 1152 32C1248 42.6667 1344 53.3333 1392 58.6667L1440 64V64H1392C1344 64 1248 64 1152 64C1056 64 960 64 864 64C768 64 672 64 576 64C480 64 384 64 288 64C192 64 96 64 48 64H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
