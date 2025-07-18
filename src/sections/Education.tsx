import React from "react";
import { education } from "../data/education";
import { motion } from "framer-motion";

const Education: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Education</h2>
      <div className="w-full max-w-4xl px-8 py-12">
        {education.map((edu) => (
          <div key={edu.school} className="bg-white/5 dark:bg-white/5 rounded-xl p-8 mb-8 border border-white/20 dark:border-white/10 text-left shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
              <div className="flex items-center gap-3">
                {edu.school.includes("Cornell") && (
                  <img src={process.env.PUBLIC_URL + "/cornell-seal.svg"} alt="Cornell Seal" className="w-12 h-12 md:w-14 md:h-14 object-contain bg-white rounded-full p-1 shadow-md border border-neutral-200 dark:border-white/20 transition-all duration-200 hover:scale-110 hover:shadow-xl cursor-pointer" style={{marginBottom: '2px'}} />
                )}
                <span className="font-semibold text-lg text-white">{edu.school}</span>
              </div>
              <span className="text-neutral-400 text-sm mt-1 md:mt-0">{edu.duration}</span>
            </div>
            <div className="text-neutral-300 font-medium mb-2">{edu.degree}</div>
            {edu.gpa && (
              <div className="text-neutral-400 text-sm mb-2">GPA: {edu.gpa}</div>
            )}
            {edu.coursework && edu.coursework.length > 0 && (
              <div className="text-neutral-400 text-sm">
                <span className="font-semibold">Relevant Coursework:</span> {edu.coursework.join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education; 