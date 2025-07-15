import React from "react";
import { experience } from "../data/experience";
import { motion } from "framer-motion";

const Experience: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-neutral-800 rounded-full" style={{ zIndex: 0 }} />
        <div className="space-y-12 pl-12">
          {experience.map((role, i) => (
            <div key={role.company + role.title} className="relative flex items-start">
              {/* Timeline dot removed */}
              <div className="bg-white/5 dark:bg-white/5 rounded-xl p-6 text-left shadow w-full border border-white/20 dark:border-white/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <span className="font-semibold text-lg text-white">{role.company}</span>
                  <span className="text-neutral-400 text-sm mt-1 md:mt-0">{role.duration}</span>
                </div>
                <div className="text-neutral-300 font-medium mb-2">{role.title}</div>
                <ul className="list-disc ml-6 text-neutral-300 space-y-1">
                  {role.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience; 