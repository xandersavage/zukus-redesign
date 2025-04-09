// src/components/sections/home/portfolio.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";

// Portfolio data with different aspect ratios for visual interest
const portfolioProjects = [
  {
    id: "project1",
    image: "/images/projects1.jpg",
    category: "Offshore Operations",
    aspectRatio: "aspect-[4/3]", // Standard
  },
  {
    id: "project2",
    image: "/images/project2.jpg",
    category: "Slickline Services",
    aspectRatio: "aspect-[1/1]", // Square
  },
  {
    id: "project3",
    image: "/images/projects1.jpg",
    category: "Hot Oil Operations",
    aspectRatio: "aspect-[3/4]", // Portrait
  },
  {
    id: "project4",
    image: "/images/projects1.jpg",
    category: "Marine Services",
    aspectRatio: "aspect-[16/9]", // Widescreen
  },
  {
    id: "project5",
    image: "/images/projects1.jpg",
    category: "Well-testing",
    aspectRatio: "aspect-[4/3]", // Standard
  },
  {
    id: "project6",
    image: "/images/projects1.jpg",
    category: "Offshore Operations",
    aspectRatio: "aspect-[1/1]", // Square
  },
];

// Extract unique categories
const categories = [
  "All",
  ...new Set(portfolioProjects.map((p) => p.category)),
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<{
    id: string;
    image: string;
    category: string;
    aspectRatio: string;
  } | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter projects based on selected category
  const filteredProjects =
    activeCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  // Handle mouse move for cursor effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-secondary-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Custom cursor effect */}
      <motion.div
        className="hidden md:block fixed w-16 h-16 rounded-full bg-primary-500/30 backdrop-blur-md pointer-events-none z-50 mix-blend-screen"
        style={{
          left: cursorPosition.x - 32,
          top: cursorPosition.y - 32,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/10 to-transparent"></div>
      </div>

      <Container className="relative">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Our <span className="text-primary-500">Portfolio</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore our showcase of successful projects and innovative solutions
            in the oil and gas industry.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary-500 text-secondary-900"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Dynamic masonry grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <PortfolioItem
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 bg-primary-500 text-secondary-900 rounded-full font-medium hover:bg-primary-400 transition-colors group"
          >
            <span>View All Projects</span>
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
          </Link>
        </motion.div>
      </Container>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Portfolio Item Component
function PortfolioItem({
  project,
  index,
  onClick,
}: {
  project: (typeof portfolioProjects)[number];
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        layout: { duration: 0.4, type: "spring" },
      }}
      whileHover={{ y: -10 }}
      className={`${project.aspectRatio} relative overflow-hidden rounded-xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Project image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.category}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ${
            isHovered ? "scale-110 blur-sm" : "scale-100"
          }`}
        />

        {/* Overlay gradient */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered
              ? "bg-secondary-900/70 backdrop-blur-sm"
              : "bg-gradient-to-t from-secondary-900/80 to-transparent"
          }`}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Category tag - always visible */}
        <span className="inline-block px-3 py-1 mb-2 text-sm font-medium rounded-full bg-primary-500 text-secondary-900 w-fit">
          {project.category}
        </span>

        {/* View details button - only on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <span className="inline-flex items-center text-white font-medium group cursor-pointer">
                <span>View Details</span>
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute transform rotate-45 bg-primary-500/30 backdrop-blur-sm w-28 h-28 -top-14 -right-14"></div>
      </div>
    </motion.div>
  );
}

// Project Modal Component
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof portfolioProjects)[number];
  onClose: () => void;
}) {
  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-secondary-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Project image */}
        <div className="relative w-full h-80 md:h-96">
          <Image
            src={project.image}
            alt={project.category}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-800 to-transparent"></div>
        </div>

        {/* Project details */}
        <div className="relative p-6 md:p-8">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary-500 text-secondary-900">
            {project.category}
          </span>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {project.category} Project
          </h3>

          <p className="text-white/70 mb-6">
            This project demonstrates our expertise in{" "}
            {project.category.toLowerCase()}
            within the oil and gas industry. Our team provided innovative
            solutions that met industry standards while delivering exceptional
            results.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-primary-500 text-secondary-900 rounded-lg font-medium hover:bg-primary-400 transition-colors">
              Full Case Study
            </button>
            <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
              Related Projects
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
