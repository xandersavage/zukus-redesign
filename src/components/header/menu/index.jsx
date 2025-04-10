import { motion } from "framer-motion";
import { opacity, slideLeft, mountAnim } from "../anim";
import styles from "./style.module.scss";
import Link from "./link";
import { useState } from "react";

const menu = [
  {
    title: "Home",
    description: "Return to the main page",
    images: ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg"],
  },
  {
    title: "About",
    description: "Learn about our company and values",
    images: ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg"],
  },
  {
    title: "Services",
    description: "Explore our comprehensive services",
    images: [
      "/images/services/service-1.jpg",
      "/images/services/service-2.jpg",
    ],
  },
  {
    title: "HSES Policy",
    description: "Our commitment to Health, Safety, Environment, and Security",
    images: ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg"],
  },
  {
    title: "Gallery",
    description: "View our project portfolio and achievements",
    images: [
      "/images/portfolio/portfolio-1.jpg",
      "/images/portfolio/portfolio-2.jpg",
    ],
  },
  {
    title: "Staff Email",
    description: "Access your company email account",
    images: ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg"],
  },
  {
    title: "Admin",
    description: "Administrative portal for authorized personnel",
    images: ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg"],
  },
];

export default function index({ closeMenu }) {
  return (
    <motion.div
      className={styles.menu}
      variants={opacity}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className={styles.header}>
        <motion.svg
          variants={slideLeft}
          {...mountAnim}
          onClick={() => {
            closeMenu();
          }}
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.5 1.5L67 67" stroke="white" />
          <path d="M66.5 1L0.999997 66.5" stroke="white" />
        </motion.svg>
      </div>

      <div className={styles.body}>
        {menu.map((el, index) => {
          return <Link data={el} index={index} key={index} />;
        })}
      </div>

      <motion.div
        variants={opacity}
        {...mountAnim}
        custom={0.5}
        className={styles.footer}
      >
        <a>FB</a>
        <a>IG</a>
        <a>IN</a>
        <a>BE</a>
      </motion.div>
    </motion.div>
  );
}
