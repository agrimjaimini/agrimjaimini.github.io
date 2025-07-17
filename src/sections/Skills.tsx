import React from "react";
import { skills } from "../data/skills";
import { motion } from "framer-motion";

const categories = Array.from(new Set(skills.map((s) => s.category)));

const Skills: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Tech Skills</h2>
      <div className="w-full max-w-4xl px-8 py-12">
        {categories.map((cat) => (
          <div key={cat} className="mb-6">
            <div className="text-left text-lg font-semibold mb-2 text-neutral-300">{cat}</div>
            <div className="flex flex-wrap gap-3 bg-white/5 dark:bg-white/5 rounded-xl p-4 border border-white/20 dark:border-white/10">
              {skills.filter((s) => s.category === cat).map((skill) => (
                <span
                  key={skill.name}
                  className="bg-neutral-700/80 px-3 py-1 rounded-full text-xs font-medium text-neutral-200 transition-all duration-200 shadow hover:bg-primary/80 hover:scale-105 hover:shadow-lg"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills; 