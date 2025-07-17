import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

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

const Hero: React.FC<HeroProps> = ({ name, tagline, interests, profileImage, socialLinks }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="bg-white/5 dark:bg-white/5 rounded-2xl px-4 md:px-8 py-8 md:py-12 shadow-lg border border-white/20 dark:border-white/10 max-w-4xl w-full flex flex-col items-center"
      >
        <motion.div
          whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgba(255,255,255,0.25)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mb-6 bg-neutral-800 ring-4 ring-neutral-700 ring-offset-2 ring-offset-black shadow-lg"
          style={{ filter: "blur(0px)" }}
        >
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        </motion.div>
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="text-xl md:text-3xl mb-2 min-h-[2.5rem] md:min-h-[3rem] font-sans font-extrabold tracking-tight text-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {tagline}
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2 justify-center my-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {interests.map((interest) => (
            <span key={interest} className="bg-neutral-700/80 px-3 py-1 rounded-full text-xs font-medium text-neutral-200 transition-all duration-200 shadow hover:bg-primary/80 hover:scale-105 hover:shadow-lg">
              {interest}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex gap-6 justify-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group transition-all duration-200 hover:scale-110 hover:shadow-lg">
            <Github className="w-7 h-7 text-neutral-300 group-hover:text-white transition-colors duration-200" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group transition-all duration-200 hover:scale-110 hover:shadow-lg">
            <Linkedin className="w-7 h-7 text-neutral-300 group-hover:text-white transition-colors duration-200" />
          </a>
          <a href={`mailto:${socialLinks.email}`} aria-label="Email" className="group transition-all duration-200 hover:scale-110 hover:shadow-lg">
            <Mail className="w-7 h-7 text-neutral-300 group-hover:text-white transition-colors duration-200" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 