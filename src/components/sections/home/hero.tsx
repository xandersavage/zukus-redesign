"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { useState, useEffect } from "react";

interface HeroImage {
  src: string;
  stat: {
    icon: React.ReactNode;
    label: string;
    value: string;
  };
  transition: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
  };
}

const heroImages: HeroImage[] = [
  {
    src: "/images/hero/hero-1.jpg",
    stat: {
      icon: (
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
      ),
      label: "Projects Completed",
      value: "1200+",
    },
    transition: {
      initial: {
        opacity: 0,
        scale: 1.2,
        rotateX: 45,
        rotateY: -20,
        transformOrigin: "center center",
      },
      animate: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        rotateX: -45,
        rotateY: 20,
      },
    },
  },
  {
    src: "/images/hero/hero-2.jpg",
    stat: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5 text-secondary-900"
        >
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Years Experience",
      value: "35+",
    },
    transition: {
      initial: {
        opacity: 0,
        x: 100,
        rotateZ: 15,
        scale: 0.9,
      },
      animate: {
        opacity: 1,
        x: 0,
        rotateZ: 0,
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: -100,
        rotateZ: -15,
        scale: 1.1,
      },
    },
  },
  {
    src: "/images/hero/hero-3.webp",
    stat: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5 text-secondary-900"
        >
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Global Reach",
      value: "50+",
    },
    transition: {
      initial: {
        opacity: 0,
        y: 100,
        rotateX: -30,
        scale: 0.9,
      },
      animate: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      },
      exit: {
        opacity: 0,
        y: -100,
        rotateX: 30,
        scale: 1.1,
      },
    },
  },
  {
    src: "/images/hero/hero-4.webp",
    stat: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5 text-secondary-900"
        >
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: "ISO Certified",
      value: "9001",
    },
    transition: {
      initial: {
        opacity: 0,
        scale: 0.8,
        rotateY: 45,
        rotateZ: -10,
      },
      animate: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
      },
      exit: {
        opacity: 0,
        scale: 1.2,
        rotateY: -45,
        rotateZ: 10,
      },
    },
  },
  {
    src: "/images/hero/hero-5.webp",
    stat: {
      icon: (
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
      ),
      label: "Active Projects",
      value: "150+",
    },
    transition: {
      initial: {
        opacity: 0,
        x: -100,
        rotateX: 30,
        rotateY: 30,
        scale: 0.9,
      },
      animate: {
        opacity: 1,
        x: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: 100,
        rotateX: -30,
        rotateY: -30,
        scale: 1.1,
      },
    },
  },
  {
    src: "/images/hero/hero-6.webp",
    stat: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5 text-secondary-900"
        >
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Client Satisfaction",
      value: "98%",
    },
    transition: {
      initial: {
        opacity: 0,
        y: -100,
        rotateX: 45,
        rotateZ: 15,
        scale: 0.9,
      },
      animate: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateZ: 0,
        scale: 1,
      },
      exit: {
        opacity: 0,
        y: 100,
        rotateX: -45,
        rotateZ: -15,
        scale: 1.1,
      },
    },
  },
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

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

          {/* Hero Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px] lg:h-[550px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={heroImages[currentImageIndex].transition.initial}
                  animate={heroImages[currentImageIndex].transition.animate}
                  exit={heroImages[currentImageIndex].transition.exit}
                  transition={{
                    duration: 1.2,
                    ease: [0.4, 0, 0.2, 1],
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src={heroImages[currentImageIndex].src}
                    alt="Zukus Industries Oil & Gas Operations"
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Carousel Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? "bg-primary-500 w-6"
                        : "bg-white/50 w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Floating Stats Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`stats-${currentImageIndex}`}
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 20, x: 20 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                  className="absolute bottom-6 right-6 rounded-xl bg-white/10 backdrop-blur-lg p-4 text-white border border-white/20 shadow-lg hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary-500 p-2">
                      {heroImages[currentImageIndex].stat.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">
                        {heroImages[currentImageIndex].stat.label}
                      </p>
                      <p className="text-xl font-bold">
                        {heroImages[currentImageIndex].stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
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
