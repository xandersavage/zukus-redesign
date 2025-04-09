// src/components/sections/home/about-counter.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AboutCounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export function AboutCounter({ value, label, suffix = "" }: AboutCounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = 30; // Update every 30ms
    const steps = duration / increment;
    const stepValue = value / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start > value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, increment);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={counterRef} className="flex flex-col">
      <span className="text-3xl font-bold text-secondary-900">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-secondary-600">{label}</span>
    </div>
  );
}
