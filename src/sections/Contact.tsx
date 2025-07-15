import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact</h2>
      <div className="flex flex-col gap-6 items-center bg-white/5 dark:bg-white/5 rounded-xl p-8 w-full max-w-md mx-auto border border-white/20 dark:border-white/10">
        <a href="mailto:aj638@cornell.edu" className="flex items-center gap-3 text-lg font-medium text-neutral-200 hover:text-primary transition-colors duration-200">
          <Mail className="w-6 h-6" /> Email
        </a>
        <a href="https://linkedin.com/in/agrimjaimini" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg font-medium text-neutral-200 hover:text-primary transition-colors duration-200">
          <Linkedin className="w-6 h-6" /> LinkedIn
        </a>
        <a href="https://instagram.com/agrimjaimini" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg font-medium text-neutral-200 hover:text-primary transition-colors duration-200">
          <Instagram className="w-6 h-6" /> Instagram
        </a>
      </div>
    </motion.section>
  );
};

export default Contact; 