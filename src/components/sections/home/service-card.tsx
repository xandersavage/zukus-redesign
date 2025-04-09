// src/components/sections/home/service-card.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    features: string[];
  };
  index: number;
  isInView: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ServiceCard({
  service,
  index,
  isInView,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -10 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-xl h-[450px] transform transition-all duration-500"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
            isActive
              ? "from-secondary-900/90 to-secondary-900/70"
              : "from-secondary-900/80 to-transparent"
          }`}
        ></div>
      </div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
        }
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        className="absolute top-6 left-6 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center z-2"
      >
        <Image
          src={service.icon}
          alt=""
          width={32}
          height={32}
          className="text-secondary-900"
        />
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10 transform transition-transform duration-500">
        <motion.h3
          layout
          className="text-2xl font-display font-bold text-white mb-3"
        >
          {service.title}
        </motion.h3>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isActive
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-white/90 mb-4">{service.description}</p>

          <ul className="space-y-2 mb-4">
            {service.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.3, delay: 0.1 * i }}
                className="flex items-center text-white/80"
              >
                <svg
                  className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>

          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center text-primary-500 hover:text-primary-400 font-medium"
          >
            <span>Learn more</span>
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
