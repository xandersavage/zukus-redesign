// src/components/sections/home/services.tsx
"use client";

import React from "react";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "@/components/sections/home/service-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";
import { Gauge, Flame, Anchor, LineChart } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | React.ReactElement;
  image: string;
  features: string[];
}

// Service data
const services: Service[] = [
  {
    id: "slickline",
    title: "Slickline Services",
    description:
      "Precision downhole operations with advanced slickline technology for well maintenance and diagnostics.",
    icon: <Gauge className="w-8 h-8" />,
    image: "/images/services/service-3.jpg",
    features: [
      "Depth correlation and tagging",
      "Fishing operations",
      "Memory gauge surveys",
    ],
  },
  {
    id: "hot-oil",
    title: "Hot Oil/Pumping Operations",
    description:
      "Thermal treatment and high-pressure pumping services to maintain optimal well performance.",
    icon: <Flame className="w-8 h-8" />,
    image: "/images/services/service-2.jpg",
    features: [
      "Paraffin removal",
      "High-pressure pumping",
      "Flow line clearing",
    ],
  },
  {
    id: "marine",
    title: "Marine Services",
    description:
      "Comprehensive offshore support with specialized vessels and equipment for marine operations.",
    icon: <Anchor className="w-8 h-8" />,
    image: "/images/services/service-1.jpg",
    features: [
      "Offshore logistics",
      "Platform support",
      "Equipment transportation",
    ],
  },
  {
    id: "well-testing",
    title: "Well-testing Services",
    description:
      "Detailed analysis and monitoring of well performance using advanced testing methodologies.",
    icon: <LineChart className="w-8 h-8" />,
    image: "/images/services/service-4.jpg",
    features: ["Flow measurement", "Pressure testing", "Reservoir evaluation"],
  },
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden z-0"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-secondary-900 to-transparent opacity-5 -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-100 opacity-30 blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary-100 opacity-30 blur-3xl -z-10"></div>

      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
            Specialized <span className="text-primary-500">Services</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-secondary-700">
            We provide comprehensive solutions for the oil and gas industry,
            leveraging over 35 years of expertise to deliver exceptional
            results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} className="h-full">
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isInView={isInView}
                isActive={activeService === service.id}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-secondary-900 text-white rounded-full font-medium hover:bg-secondary-800 transition-colors group"
          >
            <span>View All Services</span>
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
    </section>
  );
}
