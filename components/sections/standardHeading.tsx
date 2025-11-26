import React from "react";
import { Heading, Section } from "@/app/lib/types";

interface StandardHeadingSection extends Section {
  content: {
    heading: Heading;
  };
}

interface StandardHeadingProps {
  section: StandardHeadingSection;
}

const StandardHeading: React.FC<StandardHeadingProps> = ({ section }) => {
  const { heading } = section?.content || {};
  const { headingType, title } = heading || {};
  
  // Use the same styling as overview hero for h1 headings
  const className = headingType === "h1" 
    ? "font-display text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold leading-snug sm:leading-snug text-black mb-8"
    : headingType === "h2"
    ? `font-display text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-snug sm:leading-snug text-black mb-6 ${section?.id === "designated-terrorist-factions-title" ? "mt-10 sm:mt-12 md:mt-14" : ""}`
    : headingType === "h3"
    ? `font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black mb-4 ${section?.id === "kataib-hezbollah-title" ? "mt-6 sm:mt-8" : ""}`
    : `text-${headingType === "h4" ? "lg" : "base"} font-bold mb-8`;

  const HeadingTag = headingType === "h1" ? "h1" : headingType === "h2" ? "h2" : headingType === "h3" ? "h3" : headingType === "h4" ? "h4" : "div";

  return (
    <HeadingTag className={className} id={section.id}>
      {title}
    </HeadingTag>
  );
};

export default StandardHeading;
