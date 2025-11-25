import React from "react";
import { Section } from "@/app/lib/types";

interface DividerSection extends Section {
  content?: Record<string, never>; // Empty content, divider doesn't need content
}

interface DividerProps {
  section: DividerSection;
}

const Divider: React.FC<DividerProps> = ({ section }) => {
  return (
    <div className="my-6 sm:my-8 h-px bg-slate-200" id={section.id}></div>
  );
};

export default Divider;

