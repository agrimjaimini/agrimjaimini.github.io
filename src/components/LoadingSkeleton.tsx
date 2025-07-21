import React from "react";
import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  count?: number;
}

const shimmerVariants = {
  shimmer: {
    x: ["-100%", "100%"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
};

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "h-4 bg-neutral-800 rounded", 
  count = 1 
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`relative overflow-hidden ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/20 to-transparent"
            variants={shimmerVariants}
            animate="shimmer"
          />
        </motion.div>
      ))}
    </>
  );
};

export const ProjectCardSkeleton: React.FC = () => (
  <div className="card-interactive h-full">
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 bg-neutral-800 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 bg-neutral-800 rounded" />
            <Skeleton className="h-4 w-20 bg-neutral-800 rounded" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8 bg-neutral-800 rounded-lg" />
          <Skeleton className="w-8 h-8 bg-neutral-800 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-4 bg-neutral-800 rounded" count={3} />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 bg-neutral-800 rounded-full" />
        <Skeleton className="h-6 w-20 bg-neutral-800 rounded-full" />
        <Skeleton className="h-6 w-14 bg-neutral-800 rounded-full" />
      </div>
    </div>
  </div>
);

export const SkillCardSkeleton: React.FC = () => (
  <div className="card-interactive">
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 bg-neutral-800 rounded-xl" />
        <Skeleton className="h-6 flex-1 bg-neutral-800 rounded" />
      </div>
      <Skeleton className="h-4 bg-neutral-800 rounded" count={2} />
    </div>
  </div>
);

export const ExperienceCardSkeleton: React.FC = () => (
  <div className="card-interactive">
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 bg-neutral-800 rounded" />
          <Skeleton className="h-5 w-32 bg-neutral-800 rounded" />
        </div>
        <Skeleton className="h-5 w-20 bg-neutral-800 rounded" />
      </div>
      <Skeleton className="h-4 bg-neutral-800 rounded" count={3} />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 bg-neutral-800 rounded-full" />
        <Skeleton className="h-6 w-20 bg-neutral-800 rounded-full" />
      </div>
    </div>
  </div>
);

// Default export for Suspense fallback
const LoadingSkeleton: React.FC = () => (
  <div className="section-container">
    <div className="w-full max-w-7xl">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-64 mx-auto bg-neutral-800 rounded" />
        <Skeleton className="h-6 w-96 mx-auto mt-4 bg-neutral-800 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);

export default LoadingSkeleton; 