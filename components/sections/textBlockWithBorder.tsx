import React from "react";
import { Section } from "@/app/lib/types";

interface TextBlockWithBorderSection extends Section {
  content: {
    content: string;
    html?: boolean;
  };
}

interface TextBlockWithBorderProps {
  section: TextBlockWithBorderSection;
}

const TextBlockWithBorder: React.FC<TextBlockWithBorderProps> = ({ section }) => {
  const content = section?.content?.content || "";

  return (
    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16" id={section.id}>
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-300">
        <div className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">
          {section?.content?.html ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextBlockWithBorder;

