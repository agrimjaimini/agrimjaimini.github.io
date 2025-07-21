import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  rotateX?: number;
  rotateY?: number;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  intensity = 20,
  scale = 1.05,
  rotateX = 10,
  rotateY = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const scaleSpring = useSpring(1, springConfig);

  const rotateXTransform = useTransform(mouseY, [-0.5, 0.5], [rotateX, -rotateX]);
  const rotateYTransform = useTransform(mouseX, [-0.5, 0.5], [-rotateY, rotateY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXFromCenter = e.clientX - centerX;
    const mouseYFromCenter = e.clientY - centerY;
    
    mouseX.set(mouseXFromCenter / (rect.width / 2));
    mouseY.set(mouseYFromCenter / (rect.height / 2));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scaleSpring.set(scale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    scaleSpring.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: rotateXTransform,
          rotateY: rotateYTransform,
          scale: scaleSpring,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transform: "translateZ(-10px)",
        }}
      />
    </motion.div>
  );
};

export default Card3D; 