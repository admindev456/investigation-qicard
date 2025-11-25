import React from "react";
import { Section } from "@/app/lib/types";

interface TextBlockSection extends Section {
  content: {
    content: string;
    variant?: string; // Optional variant for different styling
    html?: boolean; // Whether to render as HTML
  };
}

interface TextBlockSectionProps {
  section: TextBlockSection;
}

const TextBlock: React.FC<TextBlockSectionProps> = ({ section }) => {
  // Check if this is a tagline variant (for subtext under headings)
  const isTagline = section?.content?.variant === "tagline" || section?.id === "ecosystem-subtext";
  // Check if this is a citation variant (for citation disclaimer text)
  const isCitation = section?.content?.variant === "citation" || section?.id === "ecosystem-citation";
  // Check if this is a body paragraph variant
  const isBody = section?.content?.variant === "body" || section?.id === "ecosystem-intro";
  
  const className = isTagline
    ? "mb-3 sm:mb-4 md:mb-4 text-sm sm:text-base md:text-lg lg:text-lg font-medium sm:font-normal leading-relaxed sm:leading-relaxed text-black max-w-3xl"
    : isCitation
    ? "mb-4 sm:mb-5 md:mb-5 text-[10px] sm:text-xs md:text-sm font-medium sm:font-normal leading-relaxed text-slate-700 max-w-3xl"
    : isBody
    ? "text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 max-w-3xl lg:max-w-none"
    : "text-md text-slate-600 whitespace-pre-wrap mb-14 scroll-mt-20";

  const content = section?.content?.content || "";

  return (
    <div className={className} id={section.id}>
      {section?.content?.html ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        content
      )}
    </div>
  );
};

export default TextBlock;
