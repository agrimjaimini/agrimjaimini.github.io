import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to dark theme
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const themes: { value: Theme; icon: React.ComponentType<any>; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
  ];

  if (!mounted) {
    return (
      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
        <div className="w-5 h-5 bg-neutral-400 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.div
        className="flex glass rounded-xl p-1 shadow-medium border border-neutral-200/50 dark:border-white/10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {themes.map(({ value, icon: Icon, label }) => (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            className={`relative p-2 rounded-lg transition-all duration-200 ${
              theme === value
                ? "text-neutral-900 bg-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${label} theme`}
          >
            {theme === value && (
              <motion.div
                className="absolute inset-0 bg-white rounded-lg"
                layoutId="theme-background"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="relative z-10">
              <Icon className="w-4 h-4" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default ThemeToggle; 