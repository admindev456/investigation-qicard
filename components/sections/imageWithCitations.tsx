import React from "react";
import Image from "next/image";
import { Section } from "@/app/lib/types";

interface ImageWithCitationSection extends Section {
  content: {
    image: {
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    citationUrl?: string;
  };
}

interface ImageWithCitationProps {
  section: ImageWithCitationSection;
}

const ImageWithCitation: React.FC<ImageWithCitationProps> = ({ section }) => {
  const { image, citationUrl } = section.content || {};

  const shortenUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      return domain.length > 40 ? `${domain.substring(0, 40)}...` : domain;
    } catch {
      return url.length > 40 ? `${url.substring(0, 40)}...` : url;
    }
  };

  return (
    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16" id={section.id}>
      <div className="mb-2">
        <Image
          src={image?.url || ""}
          alt={image?.alt || ""}
          width={image?.width || 1200}
          height={image?.height || 800}
          className="w-full h-auto rounded-lg border border-slate-200"
        />
      </div>
      {citationUrl && (
        <p className="text-[10px] sm:text-xs text-slate-600 mt-2">
          <a
            href={citationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-700 underline"
            title={citationUrl}
          >
            {shortenUrl(citationUrl)}
          </a>
        </p>
      )}
    </div>
  );
};

export default ImageWithCitation;

