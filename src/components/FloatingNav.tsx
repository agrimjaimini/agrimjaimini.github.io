import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Home, Briefcase, Code, GraduationCap, User, Mail, X } from 'lucide-react';
import { Link } from 'react-scroll';

interface FloatingNavProps {
  sections: Array<{ id: string; label: string }>;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'hero': return Home;
      case 'projects': return Code;
      case 'skills': return User;
      case 'education': return GraduationCap;
      case 'experience': return Briefcase;
      case 'contact': return Mail;
      default: return User;
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false);
  };

  if (!scrolled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 xl:hidden"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2"
          >
            <div className="glass-strong rounded-2xl p-3 border border-neutral-200/20 dark:border-white/10 shadow-2xl">
              <div className="flex flex-col gap-2">
                {sections.map((section, index) => {
                  const Icon = getIcon(section.id);
                  return (
                    <Link
                      key={section.id}
                      to={section.id}
                      smooth={true}
                      duration={800}
                      offset={-80}
                      onClick={() => handleSectionClick(section.id)}
                      spy={true}
                      activeClass="active-nav"
                    >
                      <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="p-3 glass rounded-xl hover:glass-strong transition-all duration-200 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-primary-500 transition-colors duration-200" />
                      </motion.button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 glass-strong rounded-full shadow-2xl border border-neutral-200/20 dark:border-white/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle navigation"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default FloatingNav; 