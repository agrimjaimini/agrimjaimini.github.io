import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Mail, Github, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-scroll";

interface FloatingActionButtonProps {
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ socialLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Mail,
      href: `mailto:${socialLinks.email}`,
      label: "Email",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Github,
      href: socialLinks.github,
      label: "GitHub",
      color: "bg-neutral-800 hover:bg-neutral-900",
    },
    {
      icon: Linkedin,
      href: socialLinks.linkedin,
      label: "LinkedIn",
      color: "bg-blue-600 hover:bg-blue-700",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('mailto:') ? undefined : "_blank"}
                rel={action.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${action.color} text-white p-3 rounded-full shadow-lg backdrop-blur-xl border border-white/20 transition-all duration-300 group`}
                aria-label={action.label}
              >
                <action.icon className="w-5 h-5" />
                <span className="absolute right-full mr-3 px-2 py-1 text-xs font-medium text-white bg-neutral-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {action.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-3"
      >
        <Link
          to="hero"
          smooth={true}
          duration={800}
          className="block"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg backdrop-blur-xl border border-white/20 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white p-4 rounded-full shadow-lg backdrop-blur-xl border border-white/20 transition-all duration-300"
        aria-label="Toggle actions"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton; 