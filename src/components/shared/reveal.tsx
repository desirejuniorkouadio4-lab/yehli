"use client";

import * as React from "react";
import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Délai d'apparition (en secondes), utile pour un effet décalé */
  delay?: number;
  /** Décalage vertical initial (px) */
  y?: number;
};

/**
 * Apparition douce au scroll : fade-in + translateY → 0.
 * Sobre et conforme à la charte (sans animations ostentatoires).
 */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
