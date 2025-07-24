import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building2, GraduationCap } from 'lucide-react';

export interface TimelineItem {
  title: string;
  subtitle: string;
  duration: string;
  location?: string;
  points?: string[];
  gpa?: string;
  courses?: string[];
  type?: 'experience' | 'education';
}

interface TimelineProps {
  items: TimelineItem[];
  title: string;
  type: 'experience' | 'education';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
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

const Timeline: React.FC<TimelineProps> = ({ items, title, type }) => {
  const Icon = type === 'experience' ? Building2 : GraduationCap;
  
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl"
      >
        <div className="text-center mb-16">
          <h2 className="text-section-title">{title}</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {type === 'experience' 
              ? 'Professional journey and key accomplishments'
              : 'Academic background and achievements'
            }
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
        >
          {/* Enhanced timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/20 via-primary-400/40 to-primary-500/20" />
          
          <div className="space-y-8 md:space-y-12">
            {items.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={itemVariants}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 w-4 h-4 -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-neutral-900 shadow-lg group-hover:scale-125 transition-all duration-300 group-hover:shadow-glow" />
                  <div className="absolute w-2 h-2 rounded-full bg-white/90 animate-pulse-soft" />
                </div>

                {/* Enhanced timeline dot with icon */}
                <div className="absolute left-4 md:left-6 w-8 h-8 -translate-x-1/2 -translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-primary-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-primary-300" />
                </div>

                {/* Content card */}
                <div className="ml-12 md:ml-16">
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      y: -4
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-6 relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-2xl border border-neutral-700/50 group-hover:border-primary-500/30 transition-all duration-500" />
                    
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div className="flex-1">
                          <h3 className="font-sans font-bold text-xl text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-primary-300 font-semibold text-lg mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-1 text-sm">
                          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{item.duration}</span>
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-500">
                              <MapPin className="w-4 h-4" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* GPA for education */}
                      {item.gpa && (
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/10 text-primary-300 border border-primary-500/20">
                            GPA: {item.gpa}
                          </span>
                        </div>
                      )}

                      {/* Key points */}
                      {item.points && item.points.length > 0 && (
                        <div className="mb-4">
                          <ul className="space-y-2">
                            {item.points.map((point, pointIndex) => (
                              <motion.li
                                key={pointIndex}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: pointIndex * 0.1 }}
                                className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300 leading-relaxed"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                                <span className="text-sm group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors duration-300">
                                  {point}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Relevant courses for education */}
                      {item.courses && item.courses.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold font-sans text-neutral-600 dark:text-neutral-400 mb-2">Relevant Coursework:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.courses.map((course, courseIndex) => (
                              <motion.span
                                key={course}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: courseIndex * 0.05 }}
                                className="px-2 py-1 text-xs font-medium rounded-full bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border border-neutral-300/50 dark:border-neutral-700/50 hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-300 transition-all duration-300"
                              >
                                {course}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Timeline; 