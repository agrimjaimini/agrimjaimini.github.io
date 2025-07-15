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
    <section className="min-h-screen flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="bg-white/5 dark:bg-white/5 rounded-2xl px-8 py-12 shadow-lg border border-white/20 dark:border-white/10 max-w-xl w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-36 h-36 rounded-full overflow-hidden mb-6 bg-neutral-800 ring-4 ring-neutral-700 ring-offset-2 ring-offset-black shadow-lg"
          style={{ filter: "blur(0px)" }}
        >
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        </motion.div>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl mb-2"
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
            <span key={interest} className="bg-neutral-700/80 px-4 py-2 rounded-full text-sm font-medium text-neutral-300 hover:bg-neutral-600 transition-colors duration-200">
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
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-7 h-7 hover:scale-110 transition-transform duration-200" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-7 h-7 hover:scale-110 transition-transform duration-200" />
          </a>
          <a href={`mailto:${socialLinks.email}`} aria-label="Email">
            <Mail className="w-7 h-7 hover:scale-110 transition-transform duration-200" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 