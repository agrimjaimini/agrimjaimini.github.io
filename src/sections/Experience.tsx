import React from "react";
import { experience } from "../data/experience";
import Timeline, { TimelineItem } from "../components/Timeline";

const Experience: React.FC = () => {
  // Map experience data to timeline items
  const timelineItems: TimelineItem[] = experience.map(exp => ({
    title: exp.company,
    subtitle: exp.title,
    duration: exp.duration,
    location: exp.location,
    points: exp.points,
    type: 'experience' as const
  }));

  return (
    <Timeline 
      items={timelineItems}
      title="Experience"
      type="experience"
    />
  );
};

export default Experience; 