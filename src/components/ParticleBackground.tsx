import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Helper function to detect dark mode
const isDarkMode = () => {
  return document.documentElement.classList.contains('dark');
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  originalSize: number;
  originalOpacity: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Initialize particles
    const particles: Particle[] = [];
    const particleCount = Math.min(window.innerWidth / 15, 150);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        originalSize: Math.random() * 3 + 1,
        originalOpacity: Math.random() * 0.6 + 0.2,
      });
    }

    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const mouseRadius = 150; // Radius of mouse influence

      particles.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction - repulsion effect
        if (distance < mouseRadius && isHovering) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          
          // Repulsion force
          const repulsionForce = force * 0.5;
          particle.vx -= Math.cos(angle) * repulsionForce;
          particle.vy -= Math.sin(angle) * repulsionForce;
          
          // Scale and opacity effect near mouse
          const scaleFactor = 1 + force * 0.5;
          particle.size = particle.originalSize * scaleFactor;
          particle.opacity = particle.originalOpacity * (1 + force * 0.3);
        } else {
          // Gradually return to original size and opacity
          particle.size += (particle.originalSize - particle.size) * 0.1;
          particle.opacity += (particle.originalOpacity - particle.opacity) * 0.1;
        }

        // Add some natural movement
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;

        // Dampen velocity
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges with smooth transition
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        
        const darkMode = isDarkMode();
        if (darkMode) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(163, 163, 163, ${particle.opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(0, 0, 0, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(64, 64, 64, ${particle.opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections with dynamic distance based on mouse
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Dynamic connection distance based on mouse proximity
          const baseConnectionDistance = 120;
          const mouseDistance = Math.sqrt(
            Math.pow(mouse.x - (particle.x + otherParticle.x) / 2, 2) +
            Math.pow(mouse.y - (particle.y + otherParticle.y) / 2, 2)
          );
          
          const connectionDistance = isHovering && mouseDistance < mouseRadius
            ? baseConnectionDistance * (1 + (mouseRadius - mouseDistance) / mouseRadius * 0.5)
            : baseConnectionDistance;

          if (distance < connectionDistance) {
            const opacity = 0.15 * (1 - distance / connectionDistance);
            const lineWidth = 0.5 + (1 - distance / connectionDistance) * 0.5;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const darkMode = isDarkMode();
            ctx.strokeStyle = darkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default ParticleBackground; 