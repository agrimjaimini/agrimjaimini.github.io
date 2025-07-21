import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, X, ChevronDown, Home, Briefcase, Code, GraduationCap, User, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  sections: Array<{ id: string; label: string }>;
}

const Navbar: React.FC<NavbarProps> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  const getIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'hero': return Home;
      case 'projects': return Code;
      case 'skills': return Code;
      case 'education': return GraduationCap;
      case 'experience': return Briefcase;
      case 'contact': return Mail;
      default: return User;
    }
  };

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? 'glass-strong backdrop-blur-2xl border-b border-neutral-200/20 dark:border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
              onClick={() => handleNavClick('hero')}
            >
              <span className="font-display font-bold text-xl lg:text-2xl tracking-tight text-neutral-900 dark:text-white drop-shadow-sm">
                Agrim Jaimini
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"></div>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            variants={itemVariants}
            className="hidden lg:flex items-center gap-6"
          >
            {/* Navigation Links */}
            <ul className="flex items-center gap-1 glass rounded-2xl px-3 py-2 shadow-medium border border-neutral-200/30 dark:border-white/10">
              {sections.map((section) => (
                <motion.li key={section.id} className="relative">
                  <Link
                    to={section.id}
                    smooth={true}
                    duration={500}
                    offset={-100}
                    spy={true}
                    activeClass="active-nav"
                    onClick={() => handleNavClick(section.id)}
                    className="relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer group overflow-hidden"
                  >
                    <span className="relative z-10 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                      {section.label}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-xl"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
            
            <ThemeToggle />
          </motion.div>

          {/* Mobile menu button */}
          <motion.div 
            variants={itemVariants}
            className="lg:hidden flex items-center gap-3"
          >
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 glass rounded-xl border border-neutral-200/30 dark:border-white/10"
              aria-label="Toggle menu"
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
                    <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden"
            >
              <div className="glass-strong rounded-2xl p-4 mb-4 border border-neutral-200/20 dark:border-white/10">
                <ul className="space-y-2">
                  {sections.map((section, index) => {
                    const Icon = getIcon(section.id);
                    return (
                      <motion.li
                        key={section.id}
                        variants={itemVariants}
                        className="relative"
                      >
                        <Link
                          to={section.id}
                          smooth={true}
                          duration={500}
                          offset={-100}
                          onClick={() => handleNavClick(section.id)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 cursor-pointer ${
                            activeSection === section.id 
                              ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-neutral-900 dark:text-white' 
                              : 'hover:bg-neutral-100/50 dark:hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {section.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar; 