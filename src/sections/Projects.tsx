import React from "react";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar, ArrowUpRight } from "lucide-react";

const cardVariants = {
  offscreen: { 
    opacity: 0, 
    y: 50,
    scale: 0.95 
  },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const hoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

const Projects: React.FC = () => {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl"
      >
        <div className="text-center mb-16">
          <h2 className="text-section-title">Featured Projects</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work spanning web development, machine learning, and software engineering
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 px-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group relative"
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              custom={i}
            >
              <motion.div
                variants={hoverVariants}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-6 relative overflow-hidden h-full hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-editorial font-light text-xl mb-2 text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.date && (
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                          <Calendar className="w-4 h-4" />
                          <span>{project.date}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="View GitHub Repository"
                        >
                          <Github className="w-4 h-4 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white" />
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="View Live Demo"
                        >
                          <ExternalLink className="w-4 h-4 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + techIndex * 0.05 }}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border border-neutral-300/50 dark:border-neutral-700/50 hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  

                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* View more projects link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/agrimjaimini"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-secondary group"
          >
            View More on GitHub
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects; 