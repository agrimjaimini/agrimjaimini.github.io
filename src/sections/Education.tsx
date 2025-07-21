import React from "react";
import { education } from "../data/education";
import Timeline, { TimelineItem } from "../components/Timeline";

const Education: React.FC = () => {
  // Map education data to timeline items
  const timelineItems: TimelineItem[] = education.map(edu => ({
    title: edu.school,
    subtitle: edu.degree,
    duration: edu.duration,
    gpa: edu.gpa,
    courses: edu.coursework,
    type: 'education' as const
  }));

  return (
    <Timeline 
      items={timelineItems}
      title="Education"
      type="education"
    />
  );
};

export default Education; 