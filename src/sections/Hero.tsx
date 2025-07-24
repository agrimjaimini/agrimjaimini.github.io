import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Link } from "react-scroll";

interface HeroProps {
  name: string;
  tagline: string;
  interests: string[];
  profileImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Hero: React.FC<HeroProps> = ({ name, tagline, interests, profileImage, socialLinks }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Profile image */}
            <motion.div
              variants={itemVariants}
              className="relative mb-4 md:mb-6 group"
            >
              <motion.div 
                className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden bg-neutral-800 ring-4 ring-primary-500/30 ring-offset-4 ring-offset-white dark:ring-offset-neutral-900 shadow-2xl cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <motion.img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover object-center" 
                  whileHover={{ 
                    scale: 1.1,
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light mb-2 md:mb-3 text-gradient-primary leading-tight tracking-tight py-1 md:py-2 lg:py-3"
              style={{ 
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              {name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 font-medium text-neutral-700 dark:text-neutral-200 max-w-2xl leading-relaxed"
            >
              {tagline}
            </motion.p>

            {/* Interests */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 justify-center my-4 md:my-6 max-w-3xl"
            >
              {interests.map((interest, index) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                  }}
                  className="px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-300/50 dark:border-neutral-700/50 hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-300 cursor-default"
                >
                  {interest}
                </motion.span>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 md:gap-4 justify-center mt-3 md:mt-4 mb-4 md:mb-6"
            >
              {[
                { icon: Github, href: socialLinks.github, label: "GitHub", color: "hover:text-neutral-800 dark:hover:text-neutral-100" },
                { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn", color: "hover:text-blue-600 dark:hover:text-blue-400" },
                { icon: Mail, href: `mailto:${socialLinks.email}`, label: "Email", color: "hover:text-primary-600 dark:hover:text-primary-400" },
              ].map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : "_blank"}
                  rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 md:p-3 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl transition-all duration-300 group ${color}`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-600 dark:text-neutral-400 group-hover:scale-110 transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-4 md:mt-6 text-center"
            >
              <Link
                to="projects"
                smooth={true}
                duration={800}
                offset={-100}
                className="inline-block"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-pointer group"
                >
                  <span className="text-sm font-medium tracking-wide">Explore</span>
                  <ArrowDown className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 