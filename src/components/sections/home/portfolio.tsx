// src/components/sections/home/portfolio.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ExternalLink } from "lucide-react";

// Portfolio data with different aspect ratios for visual interest
const portfolioProjects = [
  {
    id: "project1",
    title: "Offshore Platform Maintenance",
    image: "/images/portfolio/portfolio-1.jpg",
    category: "Offshore Operations",
    description:
      "Comprehensive maintenance and inspection services for offshore platforms, ensuring optimal performance and safety standards.",
    year: "2023",
    location: "Gulf of Mexico",
    aspectRatio: "aspect-[4/3]",
    features: [
      "Platform inspection",
      "Safety compliance",
      "Equipment maintenance",
      "Environmental monitoring",
    ],
  },
  {
    id: "project2",
    title: "Slickline Intervention",
    image: "/images/portfolio/portfolio-2.jpg",
    category: "Slickline Services",
    description:
      "Advanced slickline operations for well intervention and maintenance, utilizing cutting-edge technology and expertise.",
    year: "2023",
    location: "North Sea",
    aspectRatio: "aspect-[1/1]",
    features: [
      "Well intervention",
      "Tool deployment",
      "Data acquisition",
      "Safety protocols",
    ],
  },
  {
    id: "project3",
    title: "Hot Oil Treatment",
    image: "/images/portfolio/portfolio-3.jpg",
    category: "Hot Oil Operations",
    description:
      "Specialized hot oil treatment services for pipeline maintenance and flow assurance in challenging environments.",
    year: "2023",
    location: "West Africa",
    aspectRatio: "aspect-[3/4]",
    features: [
      "Pipeline cleaning",
      "Wax removal",
      "Flow assurance",
      "Temperature control",
    ],
  },
  {
    id: "project4",
    title: "Marine Support Operations",
    image: "/images/portfolio/portfolio-4.jpg",
    category: "Marine Services",
    description:
      "Comprehensive marine support services including vessel operations, logistics, and offshore support.",
    year: "2023",
    location: "Southeast Asia",
    aspectRatio: "aspect-[16/9]",
    features: [
      "Vessel operations",
      "Cargo handling",
      "Crew management",
      "Safety compliance",
    ],
  },
  {
    id: "project5",
    title: "Well Testing Campaign",
    image: "/images/portfolio/portfolio-5.jpg",
    category: "Well-testing",
    description:
      "Extensive well testing operations with advanced monitoring and data analysis capabilities.",
    year: "2023",
    location: "Middle East",
    aspectRatio: "aspect-[4/3]",
    features: [
      "Pressure testing",
      "Flow measurement",
      "Data analysis",
      "Report generation",
    ],
  },
  {
    id: "project6",
    title: "Offshore Installation",
    image: "/images/portfolio/portfolio-6.jpg",
    category: "Offshore Operations",
    description:
      "Complex offshore installation project involving multiple platforms and subsea infrastructure.",
    year: "2023",
    location: "North Sea",
    aspectRatio: "aspect-[1/1]",
    features: [
      "Platform installation",
      "Subsea infrastructure",
      "Safety management",
      "Quality control",
    ],
  },
];

// Extract unique categories
const categories = [
  "All",
  ...new Set(portfolioProjects.map((p) => p.category)),
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof portfolioProjects)[0] | null
  >(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter projects based on selected category
  const filteredProjects =
    activeCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) => project.category === activeCategory
        );

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-secondary-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/10 to-transparent"></div>
      </div>

      <Container>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-1"
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
          className="flex flex-wrap justify-center gap-3 mb-12 relative z-1"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-1"
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
          className="mt-16 text-center relative z-1"
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 bg-primary-500 text-secondary-900 rounded-full font-medium hover:bg-primary-400 transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
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

// Portfolio Item Component with enhanced animations
function PortfolioItem({
  project,
  index,
  onClick,
}: {
  project: (typeof portfolioProjects)[0];
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.25, 0.1, 0.25, 1], // Custom easing function
        },
      }}
      exit={{
        opacity: 0,
        y: -20,
        scale: 0.9,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className={`${project.aspectRatio} relative overflow-hidden rounded-xl group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      layout
    >
      {/* Project image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
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
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.1 + index * 0.1, duration: 0.5 },
          }}
          className="inline-block px-3 py-1 mb-2 text-sm font-medium rounded-full bg-primary-500 text-secondary-900 w-fit"
        >
          {project.category}
        </motion.span>

        {/* Project title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2 + index * 0.1, duration: 0.5 },
          }}
          className="text-xl font-bold text-white mb-2"
        >
          {project.title}
        </motion.h3>

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
              <span className="inline-flex items-center text-white font-medium group">
                <span>View Details</span>
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corner accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.3 + index * 0.1, duration: 0.5 },
        }}
        className="absolute top-0 right-0 w-20 h-20 overflow-hidden"
      >
        <div className="absolute transform rotate-45 bg-primary-500/30 backdrop-blur-sm w-28 h-28 -top-14 -right-14"></div>
      </motion.div>
    </motion.div>
  );
}

// Project Modal Component
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof portfolioProjects)[0];
  onClose: () => void;
}) {
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
        className="relative w-full max-w-6xl rounded-2xl overflow-hidden bg-secondary-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Project image */}
        <div className="relative w-full h-[500px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-800 to-transparent"></div>
        </div>

        {/* Project details */}
        <div className="p-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-500 text-secondary-900">
              {project.category}
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white">
              {project.year}
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white">
              {project.location}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4">
            {project.title}
          </h3>

          <p className="text-white/70 mb-8">{project.description}</p>

          {/* Project features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-center text-white/80">
                <div className="w-2 h-2 rounded-full bg-primary-500 mr-3"></div>
                {feature}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-primary-500 text-secondary-900 rounded-lg font-medium hover:bg-primary-400 transition-colors flex items-center">
              <span>View Case Study</span>
              <ExternalLink className="ml-2 w-5 h-5" />
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
