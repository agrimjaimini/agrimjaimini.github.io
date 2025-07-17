import React from "react";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      bounce: 0.2,
      duration: 0.7,
    },
  },
};

const Projects: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-8 py-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="bg-white/5 dark:bg-white/5 rounded-xl p-6 flex flex-col items-start text-left shadow-lg hover:scale-[1.03] transition-transform duration-200 border border-white/20 dark:border-white/10 relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            transition={{ delay: i * 0.1 }}
          >
            <div className="font-semibold text-lg mb-2">{project.title}</div>
            <div className="text-neutral-400 mb-3">{project.description}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span key={tech} className="bg-neutral-700/80 px-3 py-1 rounded-full text-xs font-medium text-neutral-200 transition-all duration-200 shadow hover:bg-primary/80 hover:scale-105 hover:shadow-lg">
                  {tech}
                </span>
              ))}
            </div>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="underline text-sm mt-auto">Demo</a>
            )}
            {project.github && (
              <div className="absolute bottom-4 right-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects; 