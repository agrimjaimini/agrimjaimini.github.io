import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, MessageCircle, ArrowUpRight, Calendar } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "aj638@cornell.edu",
      href: "mailto:aj638@cornell.edu",
      description: "Send me a message directly",
      color: "hover:text-primary-400",
      bgColor: "hover:bg-primary-500/10",
      borderColor: "hover:border-primary-500/50"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "agrimjaimini",
      href: "https://linkedin.com/in/agrimjaimini",
      description: "Connect professionally",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-500/10",
      borderColor: "hover:border-blue-500/50"
    },
    {
      icon: MessageCircle,
      title: "Telegram",
      value: "agrimjaimini",
      href: "https://t.me/agrimjaimini",
      description: "Send me a message",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-500/10",
      borderColor: "hover:border-blue-500/50"
    },
    {
      icon: Calendar,
      title: "Book a Meeting",
      value: "15/30 Min Call",
      href: "https://cal.com/agrim-jaimini",
      description: "Schedule a call with me",
      color: "hover:text-green-500",
      bgColor: "hover:bg-green-500/10",
      borderColor: "hover:border-green-500/50"
    }
  ];

  return (
    <section className="section-container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-16">
          <motion.h2 
            variants={itemVariants}
            className="text-section-title"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and innovation.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group"
              >
                <motion.a
                  href={method.href}
                  target={method.href.startsWith('mailto:') || method.href === '#' ? undefined : "_blank"}
                  rel={method.href.startsWith('mailto:') || method.href === '#' ? undefined : "noopener noreferrer"}
                  className="block bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-6 relative overflow-hidden hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Animated border */}
                  <div className={`absolute inset-0 rounded-2xl border border-neutral-700/50 group-hover:border-primary-500/30 transition-all duration-500`} />
                  
                  <div className="relative z-10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl transition-all duration-300 group-hover:scale-110 ${method.bgColor}`}>
                          <Icon className={`w-6 h-6 text-neutral-600 dark:text-neutral-400 transition-colors duration-300 ${method.color}`} />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-xl text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                            {method.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ArrowUpRight className="w-5 h-5 text-neutral-600 dark:text-neutral-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" />
                      </motion.div>
                    </div>
                    
                    <div className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {method.value}
                    </div>
                  </div>
                  
                  
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-2xl text-neutral-800 dark:text-neutral-100 mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              Whether you have a project in mind, want to discuss potential opportunities, or just want to connect, I'd love to hear from you.
            </p>
            <motion.a
              href="mailto:aj638@cornell.edu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 btn-primary group"
            >
              Send Message
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact; 