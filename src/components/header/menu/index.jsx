import { motion } from "framer-motion";
import { opacity, slideLeft, mountAnim } from "../anim";
import styles from "./style.module.scss";
import Link from "./link";
import { useState } from "react";

const menu = [
  {
    title: "Home",
    description: "Return to the main page",
    images: ["hero/hero-1.webp", "hero/hero-2.webp"],
  },
  {
    title: "About",
    description: "Learn about our company and values",
    images: ["about/engineering-team.webp", "about/office-environment.webp"],
  },
  {
    title: "Services",
    description: "Explore our comprehensive services",
    images: ["services/service-1.webp", "services/service-2.webp"],
  },
  {
    title: "HSES Policy",
    description: "Our commitment to Health, Safety, Environment, and Security",
    images: ["about/engineering-team.webp", "about/office-environment.webp"],
  },
  {
    title: "Gallery",
    description: "View our project portfolio and achievements",
    images: ["portfolio/portfolio-1.webp", "portfolio/portfolio-2.webp"],
  },
  {
    title: "Staff Email",
    description: "Access your company email account",
    images: ["about/office-environment.webp", "about/engineering-team.webp"],
  },
  {
    title: "Admin",
    description: "Administrative portal for authorized personnel",
    images: ["about/office-environment.webp", "about/engineering-team.webp"],
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
