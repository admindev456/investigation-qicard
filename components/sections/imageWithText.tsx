import React from "react";
import Image from "next/image";
import { Section } from "@/app/lib/types";

interface ImageWithTextSection extends Section {
  content: {
    image: {
      url: string;
      alt?: string;
    };
    caption?: string;
    captionUrl?: string;
    text: string | Array<{
      text: string;
      citation?: {
        number: string;
        url: string;
      };
    }>;
    citation?: {
      number: string;
      url: string;
    };
  };
}

interface ImageWithTextProps {
  section: ImageWithTextSection;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ section }) => {
  const { image, caption, captionUrl, text, citation } = section.content || {};

  return (
    <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 mb-8 sm:mb-10 md:mb-12 lg:mb-16" id={section.id}>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Column - Image */}
        <div className="flex-shrink-0 lg:w-1/2">
          <div className="mb-2">
            <Image
              src={image?.url || ""}
              alt={image?.alt || ""}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg border border-slate-200"
            />
          </div>
          {caption && (
            <p className="text-[10px] sm:text-xs text-slate-600 mt-2">
              {captionUrl ? (
                <a
                  href={captionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 underline"
                  title={captionUrl}
                >
                  {(() => {
                    try {
                      // Try to extract the actual destination URL from Google redirect
                      const url = new URL(captionUrl);
                      const urlParam = url.searchParams.get('url');
                      if (urlParam) {
                        try {
                          const destUrl = new URL(decodeURIComponent(urlParam));
                          const domain = destUrl.hostname.replace('www.', '');
                          return domain.length > 35 ? `${domain.substring(0, 35)}...` : domain;
                        } catch {
                          // Fallback to showing just "Source"
                          return "Source";
                        }
                      }
                      // If no url param, try to get domain from main URL
                      const domain = url.hostname.replace('www.', '');
                      return domain.length > 35 ? `${domain.substring(0, 35)}...` : domain;
                    } catch {
                      return "Source";
                    }
                  })()}
                </a>
              ) : (
                caption
              )}
            </p>
          )}
        </div>

        {/* Right Column - Text */}
        <div className="flex-1 lg:w-1/2">
          <div className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 space-y-3">
            {Array.isArray(text) ? (
              text.map((item, index) => (
                <p key={index}>
                  <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                    {item.text}
                    {item.citation && (
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                        Citation [{item.citation.number}]
                      </span>
                    )}
                  </span>
                  {item.citation && (
                    <a
                      href={item.citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                    >
                      [{item.citation.number}]
                    </a>
                  )}
                </p>
              ))
            ) : (
              <p>
                <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                  {text}
                  {citation && (
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                      Citation [{citation.number}]
                    </span>
                  )}
                </span>
                {citation && (
                  <a
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                  >
                    [{citation.number}]
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithText;

