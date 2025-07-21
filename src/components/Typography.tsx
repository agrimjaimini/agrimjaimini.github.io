import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

interface TypographyProps {
  children: React.ReactNode;
  variant?: 
    | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    | "hero" | "hero-subtitle"
    | "body-large" | "body" | "body-small"
    | "caption" | "overline"
    | "code" | "pre";
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  animate?: boolean;
  delay?: number;
  gradient?: "primary" | "modern" | "vibrant" | "sunset" | "ocean";
  weight?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  className = "",
  as,
  animate = false,
  delay = 0,
  gradient,
  weight,
}) => {
  const baseClasses = "text-optimize-legibility";
  
  const variantClasses = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight",
    h2: "text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight",
    h3: "text-2xl md:text-3xl lg:text-4xl font-semibold font-display tracking-tight",
    h4: "text-xl md:text-2xl lg:text-3xl font-semibold font-display tracking-tight",
    h5: "text-lg md:text-xl lg:text-2xl font-medium font-display tracking-tight",
    h6: "text-base md:text-lg lg:text-xl font-medium font-display tracking-tight",
    hero: "text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter leading-none text-balance",
    "hero-subtitle": "text-xl md:text-2xl lg:text-3xl font-medium font-sans tracking-tight leading-relaxed text-balance",
    "body-large": "text-lg md:text-xl font-normal font-sans leading-relaxed",
    body: "text-base font-normal font-sans leading-relaxed",
    "body-small": "text-sm font-normal font-sans leading-relaxed",
    caption: "text-sm font-medium font-sans tracking-wide",
    overline: "text-xs font-semibold font-sans tracking-widest uppercase",
    code: "text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded",
    pre: "text-sm font-mono bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto",
  };

  const gradientClasses = {
    primary: "text-gradient-primary",
    modern: "text-gradient-modern",
    vibrant: "text-gradient-vibrant",
    sunset: "text-gradient-sunset",
    ocean: "text-gradient-ocean",
  };

  const weightClasses = {
    thin: "font-thin",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    gradient && gradientClasses[gradient],
    weight && weightClasses[weight],
    className
  );

  const Component = as || (variant.startsWith('h') ? variant : 'div');

  if (animate) {
    return (
      <motion.div
        className={classes}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  const renderComponent = () => {
    switch (Component) {
      case 'h1':
        return <h1 className={classes}>{children}</h1>;
      case 'h2':
        return <h2 className={classes}>{children}</h2>;
      case 'h3':
        return <h3 className={classes}>{children}</h3>;
      case 'h4':
        return <h4 className={classes}>{children}</h4>;
      case 'h5':
        return <h5 className={classes}>{children}</h5>;
      case 'h6':
        return <h6 className={classes}>{children}</h6>;
      case 'p':
        return <p className={classes}>{children}</p>;
      case 'span':
        return <span className={classes}>{children}</span>;
      case 'div':
      default:
        return <div className={classes}>{children}</div>;
    }
  };

  return renderComponent();
};

export default Typography; 