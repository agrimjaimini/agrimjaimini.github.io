import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "typewriter" | "fade" | "slide" | "gradient";
  delay?: number;
  speed?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  type = "fade",
  delay = 0,
  speed = 50,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (type === "typewriter") {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, text, type, speed]);

  useEffect(() => {
    if (type === "typewriter") {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [text, type]);

  const renderText = () => {
    switch (type) {
      case "typewriter":
        return (
          <span className={className}>
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-6 bg-primary-500 ml-1"
            />
          </span>
        );
      
      case "gradient":
        return (
          <motion.span
            className={`${className} bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-xy`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8 }}
          >
            {text}
          </motion.span>
        );
      
      case "slide":
        return (
          <motion.span
            className={className}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            {text}
          </motion.span>
        );
      
      default:
        return (
          <motion.span
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8 }}
          >
            {text}
          </motion.span>
        );
    }
  };

  return renderText();
};

export default AnimatedText; 