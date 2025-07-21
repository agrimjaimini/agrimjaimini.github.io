import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  offset?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  offset = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [offset, -100 * speed] 
      : [-offset, 100 * speed]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`parallax ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection; 