import React from "react";
import { skills } from "../data/skills";
import { motion } from "framer-motion";

const categories = Array.from(new Set(skills.map((s) => s.category)));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.3,
      duration: 0.6,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 25,
    },
  },
};

const Skills: React.FC = () => {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-16">
          <h2 className="text-section-title">Technical Skills</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 lg:gap-8"
        >
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter((s) => s.category === category);
            
            return (
              <motion.div
                key={category}
                variants={categoryVariants}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-6 relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border border-neutral-700/50 group-hover:border-primary-500/30 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    {/* Category header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display font-bold text-xl text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                        {category}
                      </h3>
                      <div className="text-sm text-neutral-600 dark:text-neutral-500 font-medium">
                        {categorySkills.length} skills
                      </div>
                    </div>
                    
                    {/* Skills grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          variants={skillVariants}
                          custom={skillIndex}
                          whileHover={{ 
                            scale: 1.05,
                            y: -2
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="group/skill"
                        >
                          <div className="relative p-3 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/40 border border-neutral-300/50 dark:border-neutral-700/30 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300 cursor-default">
                            {/* Skill name */}
                            <div className="text-center">
                              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover/skill:text-primary-600 dark:group-hover/skill:text-primary-300 transition-colors duration-300">
                                {skill.name}
                              </span>
                            </div>
                            
                            {/* Hover shimmer effect */}
                            <div className="absolute inset-0 rounded-xl animate-shimmer opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <span className="text-primary-300 font-semibold">{skills.length} technologies</span> across{" "}
              <span className="text-primary-300 font-semibold">{categories.length} categories</span>, 
              constantly expanding my toolkit to tackle new challenges and stay current with industry trends.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills; 