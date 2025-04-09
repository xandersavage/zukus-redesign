// src/components/sections/home/about-image-grid.tsx
"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";

export function AboutImageGrid() {
  const containerRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  // Enhanced scroll animations with more dynamic ranges
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // More dramatic parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Add rotation for 3D effect
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 4]);
  const rotate4 = useTransform(scrollYProgress, [0, 1], [0, -3]);

  // Scale effects for depth
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1]);

  // Define image data for cleaner rendering
  const images = [
    {
      id: 1,
      src: "/images/projects1.jpg",
      alt: "Offshore Oil Rig",
      className: "absolute top-0 left-0 w-3/4 h-3/5 p-2",
      motion: { y: y1, rotate: rotate1, scale: scale1 },
      caption: "Offshore Operations",
    },
    {
      id: 2,
      src: "/images/contact1.jpg",
      alt: "Engineers at Work",
      className: "absolute top-0 right-0 w-1/3 h-2/5 p-2",
      motion: { y: y2, rotate: rotate2, scale: scale2 },
      caption: "Engineering Excellence",
    },
    {
      id: 3,
      src: "/images/contact2.jpg",
      alt: "Specialized Equipment",
      className: "absolute bottom-0 left-0 w-1/3 h-2/5 p-2",
      motion: { y: y3, rotate: rotate3, scale: scale1 },
      caption: "Cutting-Edge Equipment",
    },
    {
      id: 4,
      src: "/images/projects2.jpg",
      alt: "Zukus Industries Team",
      className: "absolute bottom-0 right-0 w-3/5 h-2/5 p-2",
      motion: { y: y4, rotate: rotate4, scale: scale2 },
      caption: "Professional Team",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden perspective-1000"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-300/20 blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-secondary-300/20 blur-3xl z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* Render all images with enhanced effects */}
      {images.map((image, index) => (
        <div key={image.id} className={image.className}>
          <motion.div
            style={{
              y: image.motion.y,
              rotateZ: image.motion.rotate,
              scale: image.motion.scale,
              transformStyle: "preserve-3d",
            }}
            whileHover={{
              scale: 1.05,
              zIndex: 20,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
            className="w-full h-full relative rounded-lg overflow-hidden shadow-2xl transform transition-all duration-700 ease-out"
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700 hover:scale-110"
              priority={index === 0}
            />

            {/* Enhanced gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 via-secondary-900/30 to-transparent"
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.3 }}
            />

            {/* Caption that appears on hover */}
            <AnimatePresence>
              {hoveredImage === image.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-secondary-900/90 to-secondary-900/0"
                >
                  <p className="text-white font-medium text-sm md:text-base">
                    {image.caption}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      ))}

      {/* Enhanced central emblem */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(255,255,255,0.5)",
            rotateY: 10,
          }}
          className="bg-white/90 backdrop-blur-md rounded-full w-28 h-28 md:w-36 md:h-36 flex items-center justify-center shadow-2xl border-2 border-primary-300/50 overflow-hidden"
        >
          <motion.div
            className="text-center relative z-10"
            whileHover={{ scale: 1.1 }}
          >
            <span className="block text-lg md:text-xl font-semibold text-secondary-900">
              SINCE
            </span>
            <span className="block text-2xl md:text-4xl font-bold text-primary-500 drop-shadow-sm">
              1987
            </span>
          </motion.div>

          {/* Animated background inside the emblem */}
          <motion.div
            className="absolute inset-0 bg-gradient-conic from-primary-100 via-white to-primary-100 z-0 opacity-50"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>

      {/* Floating particles for additional visual interest */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary-500/30 backdrop-blur-sm z-20"
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
