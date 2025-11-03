import React from "react";
import { Section } from "@/app/lib/types";

interface OverviewStat {
  value: string;
  label: string;
  caption?: string;
  source?: string;
}

interface OverviewHeroSection extends Section {
  content: {
    siteMark: string;
    title: string;
    tagline: string;
    supporting: string;
    stats: OverviewStat[];
    aboutTitle: string;
    aboutDescription: string;
    highlights: string[];
    metaSummary: string;
  };
}

const OverviewHero: React.FC<{ section: OverviewHeroSection }> = ({ section }) => {
  const { id } = section;
  const {
    title,
    tagline,
    supporting,
    stats = [],
    aboutTitle,
    aboutDescription,
    highlights = [],
    metaSummary,
  } = section.content || {};

  return (
    <section id={id} className="bg-white">
      <div className="mx-auto max-w-4xl">
        {/* Hero headline section */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold leading-snug sm:leading-snug text-black">
            {title}
          </h1>
        </div>

        {/* Tagline - primary message */}
        <p className="mb-3 sm:mb-4 md:mb-4 text-sm sm:text-base md:text-lg lg:text-lg font-medium sm:font-normal leading-relaxed sm:leading-relaxed text-black max-w-3xl">
          {tagline}
        </p>

        {/* Supporting text */}
        {supporting && (
          <p className="mb-6 sm:mb-7 md:mb-8 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-700 max-w-3xl">
            {supporting}
          </p>
        )}

        {/* About section */}
        <div>
          <h2 className="mb-2 sm:mb-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-900 underline">
            About This Report
          </h2>
          
          <p className="mb-4 sm:mb-5 md:mb-5 text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 max-w-3xl">
            {aboutDescription}
          </p>

          {/* Citation disclaimer */}
          <p className="mb-4 sm:mb-5 md:mb-5 text-[10px] sm:text-xs md:text-sm font-medium sm:font-normal leading-relaxed text-slate-700 max-w-3xl">
            All claims are cited to primary sources. Materials organized for legal, governmental, and investigative use.
          </p>

          {/* Divider */}
          <div className="my-6 sm:my-8 h-px bg-slate-200"></div>

          {/* Report Content */}
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 lg:-mx-96 lg:px-96">
            {/* Intro Paragraph */}
            <p className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 max-w-3xl lg:max-w-none">
              This report provides a comprehensive analysis of International Smart Card (ISC), the Iraqi financial technology company operating as Qi Card. It assesses the company&apos;s strategic position within Iraq&apos;s economy, the persistent and credible allegations of its exploitation for illicit finance, and its potential connections to the Islamic Republic of Iran and its network of regional proxies.
            </p>

            {/* Background Paragraph */}
            <p className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 max-w-3xl lg:max-w-none">
              Qi Card was founded in 2007 through a public-private partnership involving Iraq&apos;s two largest state-owned banks, Rafidain Bank and Rasheed Bank, along with the Iraqi Electronic Payment System.
              <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                By 2025, Qi Card had grown to become Iraq&apos;s dominant payment platform, serving over 11 million cardholders with approximately 23,000 point-of-sale terminals across every Iraqi governorate.
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                  Citation [1]
                </span>
              </span>
              <a 
                href="https://www.thenationalnews.com/business/banking/2025/10/01/iraqs-cashless-push-gaining-pace-but-much-more-needs-to-be-done-fintech-boss-says/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
              >
                [1]
              </a>
            </p>

            {/* Conclusion Paragraph */}
            <p className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 max-w-3xl lg:max-w-none">
              Drawing on an extensive corpus of verified sources and in-depth analysis, this report will demonstrate that while Qi Card plays a vital role in Iraq&apos;s modern financial system, it has also become a key hub for corruption, money laundering, and the financing of designated terrorist organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewHero;

