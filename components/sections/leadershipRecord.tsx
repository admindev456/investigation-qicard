import React from "react";
import Image from "next/image";
import { Section } from "@/app/lib/types";
import { criminalTimelineData } from "@/components/sections/criminalTimeline";

interface TimelineEvent {
  date: string;
  category: 'arrest' | 'legal' | 'torture' | 'acquittal' | 'political' | 'status';
  title: string;
  details: {
    authority?: string;
    outcome?: string;
    specifics?: string[];
    context?: string;
  };
  citations: {
    text: string;
    url?: string;
    source: string;
  }[];
}

interface LeadershipRecordSection extends Section {
  content: {
    profile: {
      name: string;
      title: string;
      summary: string;
    };
    timeline: Array<{
      date: string;
      event: string;
      authority: string;
      outcome: string;
      citation: string;
      citationUrl?: string;
    }>;
    convictions: Array<{
      charge: string;
      sentence: string;
      court: string;
      date: string;
      status: string;
      coDefendants?: string;
      citation: string;
      citationUrl?: string;
    }>;
    schemes: Array<{
      title: string;
      description: string;
      details: string[];
      citation: string;
      citationUrl?: string;
    }>;
    usResponse: {
      designation: string;
      source: string;
      date: string;
      details: string;
      citation: string;
      citationUrl?: string;
    };
    torture: {
      arrest: string;
      methods: string[];
      evidence: string[];
      outcome: string;
      citation: string;
      citationUrl?: string;
    };
    currentStatus: {
      positions: string[];
      activities: string[];
      note: string;
    };
  };
}

interface LeadershipRecordProps {
  section: LeadershipRecordSection;
}

const CitationLink: React.FC<{ citation: string; url?: string }> = ({ citation, url }) => (
  <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 underline font-medium text-[10px] sm:text-xs align-super"
      >
        [{citation}]
      </a>
    ) : (
      <span className="text-[10px] sm:text-xs text-slate-600 font-medium">[{citation}]</span>
    )}
  </div>
);

const categoryColors = {
  arrest: {
    dot: 'bg-red-600',
    border: 'border-red-200',
    bg: 'bg-red-50',
    text: 'text-red-700',
    label: 'Detention & Arrest'
  },
  legal: {
    dot: 'bg-orange-600',
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    label: 'Legal Proceedings'
  },
  torture: {
    dot: 'bg-yellow-600',
    border: 'border-yellow-200',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    label: 'Torture & Human Rights'
  },
  acquittal: {
    dot: 'bg-green-600',
    border: 'border-green-200',
    bg: 'bg-green-50',
    text: 'text-green-700',
    label: 'Acquittal & Exoneration'
  },
  political: {
    dot: 'bg-blue-600',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    label: 'U.S. Political Action'
  },
  status: {
    dot: 'bg-slate-600',
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    label: 'Current Status'
  }
};

const LeadershipRecord: React.FC<LeadershipRecordProps> = ({ section }) => {
  const { profile } = section.content;

  return (
    <div className="bg-white" id={section.id}>
      {/* Section Header with Top Spacing */}
      <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20 mb-8 sm:mb-10 md:mb-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold leading-snug text-black mb-3">
          Leadership & Criminal Record
        </h2>
        <div className="h-px w-16 bg-slate-300"></div>
      </div>

      {/* Profile Section */}
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 lg:-mx-96 lg:px-96">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src="/bahaapic.png"
              alt={profile.name}
              width={120}
              height={120}
              className="rounded-lg w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover"
            />
            </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-black mb-1">{profile.name}</h3>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-600 mb-4">{profile.title}</p>
            <p className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">
              Founder and Chairman of International Smart Card, Bahaa Abdul Hussein Abdul Hadi has been central to multiple corruption scandals spanning 2007-2025. Iraqi courts convicted him twice in 2021, 
              <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                once in January for bribing Ahmed Abdul Jalil, former Director of Public Pensions, resulting in a four year prison sentence plus a 10 million dinar fine ($6,846)
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                  Citation [2]
                </span>
              </span>
              .
              <a 
                href="https://amwaj.media/en/media-monitor/payment-card-pmu-jail-corruption"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
              >
                [2]
              </a>
              {" "}He was also convicted
              <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                 in July of 2021 for stealing 13.1 billion Iraqi dinars (approximately $8.9 million) in bank revenues, resulting in a three year prison sentence
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                  Citation [3]
                </span>
              </span>
              .
              <a 
                href="https://www.rudaw.net/english/middleeast/iraq/110720211"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
              >
                [3]
              </a>
            </p>
            <p className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800 mt-4 sm:mt-5">
              Despite his December 2023 acquittal by Iraq&apos;s Court of Cassation, 
              <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                U.S. Congressional representatives explicitly named him as a &quot;key money-laundering confederate&quot; in their May 2025 letter demanding sanctions as well as explicitely mentioning Qi Card and its partner Al-Rafidain Bank both by name as corrupt money laundering institutions deserving of US sanctions
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                  Citation [11]
                </span>
              </span>
              .
              <a 
                href="https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
              >
                [11]
              </a>
              {" "}He remains chairman and actively represents Qi Card internationally, including at the October 2025 Money 20/20 USA fintech conference.
            </p>
          </div>
        </div>
      </div>

      {/* Criminal Timeline Section */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        {/* Section Header */}
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3">
            Criminal Timeline
          </h3>
          <div className="h-px w-12 bg-slate-300"></div>
                </div>
                
        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-2 top-2 bottom-2 w-[1.5px] bg-slate-200/80 rounded-full" aria-hidden="true"></div>

          {/* Timeline Events */}
          <div className="space-y-4">
            {criminalTimelineData.map((event, index) => {
              const colors = categoryColors[event.category];
              
              return (
                <div key={index} className="relative pl-10">
                  {/* Node/Dot */}
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-white shadow-sm"
                    aria-hidden="true"
                  ></div>

                  {/* Event Card */}
                  <div className={`${index <= 4 ? 'rounded-lg bg-white p-4 hover:shadow-md transition-shadow relative' : 'border border-slate-200 rounded-lg bg-white p-4 hover:shadow-md transition-shadow relative'}`}>
                    {/* Header Row - Date and Category */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        {event.date}
                      </span>
                       {index > 1 && index !== 2 && index !== 3 && index !== 4 && index !== 5 && (
                         <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text} px-2 py-1 rounded bg-opacity-10 flex-shrink-0`}>
                           {colors.label}
                         </span>
                       )}
                  </div>
                  
                    {/* Event Title - Primary */}
                    <h4 className={`${index <= 5 ? 'text-xs sm:text-sm font-medium' : 'text-sm sm:text-base font-bold'} text-black mb-3 leading-snug`}>
                      {index === 0 ? (
                        <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                          {event.title}
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                            Citation [5]
                          </span>
                        </span>
                      ) : index === 1 ? (
                        <>
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            {event.title}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [6]
                            </span>
                          </span>
                          <a 
                            href="https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [6]
                          </a>
                        </>
                      ) : index === 2 ? (
                        <>
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            {event.title}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [9]
                            </span>
                          </span>
                          <a 
                            href="https://www.rudaw.net/english/middleeast/iraq/110720211"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [9]
                          </a>
                        </>
                      ) : index === 3 ? (
                        <>
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            {event.title}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [6]
                            </span>
                          </span>
                          <a 
                            href="https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [6]
                          </a>
                        </>
                      ) : index === 4 ? (
                        <>
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            {event.title}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [11]
                            </span>
                          </span>
                          <a 
                            href="https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [11]
                          </a>
                        </>
                      ) : index === 5 ? (
                        (() => {
                          const full = event.title || "";
                          const key = "implicating Qi Card";
                          const idx = full.indexOf(key);
                          if (idx === -1) {
                            return full;
                          }
                          const before = full.slice(0, idx);
                          const target = full.slice(idx);
                          return (
                            <>
                              {before}
                              <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                                {target}
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                                  Citation [13]
                                </span>
                              </span>
                              <a
                                href="https://www.wsj.com/world/middle-east/iran-visa-mastercard-dollars-sanctions-militias-0ecea0b9?st=SeWFzj&reflink=desktopwebshare_permalink"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                              >
                                [13]
                              </a>
                            </>
                          );
                        })()
                      ) : (
                        event.title
                      )}
                    </h4>

                    {/* First-event additional context paragraph */}
                    {index === 0 && (
                      <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                        <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                          Saadi, at the time, was being investigated for committing fraud in cooperation with the Qi Card Company &quot;to monthly obtain illegally deducted payments from the salaries of millions of retirees&quot;, a senior federal official familiar with the investigations told MEE.
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                            Citation [5]
                          </span>
                    </span>
                      <a
                          href="https://www.middleeasteye.net/news/iraq-mustafa-kadhimi-anti-corruption-drive"
                        target="_blank"
                        rel="noopener noreferrer"
                          className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                        >
                          [5]
                        </a>
                      </p>
                    )}

                    {/* Details Grid */}
                    {index !== 4 && (event.details.authority || event.details.outcome) && (
                      <div className={`${index === 0 ? '' : 'grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 pb-3 border-b border-slate-100'}`}>
                        {event.details.authority && (
                  <div>
                            {index !== 0 && (
                              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                                Authority
                              </p>
                            )}
                            <p className={`${index === 0 ? 'text-xs sm:text-sm font-medium text-black leading-snug' : 'text-sm text-slate-800 leading-relaxed'}`}>
                              {index === 0 ? (
                                <>
                                  <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                                    {event.details.authority}
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                                      Citation [6]
                                    </span>
                                  </span>
                                  <a 
                                    href="https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                                  >
                                    [6]
                                  </a>
                                </>
                              ) : (
                                event.details.authority
                              )}
                            </p>
                  </div>
                        )}
                        {index !== 0 && event.details.outcome && (
                    <div>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                              Outcome
                            </p>
                            <p className="text-sm text-slate-800 leading-relaxed">
                              {event.details.outcome}
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                  
                    {/* Context */}
                    {event.details.context && (
                      index === 1 ? (
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            {event.details.context}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [7]
                            </span>
                          </span>
                          <a 
                            href="https://www.thenationalnews.com/world/mena/two-senior-iraqi-officials-jailed-for-corruption-1.1152685"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [7]
                          </a>
                        </p>
                      ) : index === 2 ? (
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            {event.details.context}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [10]
                            </span>
                          </span>
                          <a 
                            href="https://shafaq.com/en/Iraq/Judiciary-sentences-three-senior-officials-in-a-state-bank-to-imprisonment-for-embezzlement"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [10]
                          </a>
                        </p>
                      ) : index === 3 ? (
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            {event.details.context}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [6]
                            </span>
                          </span>
                          <a 
                            href="https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [6]
                          </a>
                        </p>
                      ) : (
                        <p className="text-sm text-slate-700 leading-relaxed mb-3">
                          {event.details.context}
                        </p>
                      )
                    )}

                    {/* May 28, 2025 custom paragraphs */}
                    {index === 4 && (
                      <>
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            Abdul Hussein is designated by name as &apos;key money-laundering confederate&apos; along mentions of Qi Card for PMF payroll processing.
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [11]
                            </span>
                          </span>
                          <a 
                            href="https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [11]
                          </a>
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            PMF refers to Iraq&rsquo;s Popular Mobilization Forces, also known as al‑Hashd al‑Shaabi, an umbrella of predominantly Shia Iraqi militias, many with close ties to Iran.
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [12]
                            </span>
                          </span>
                          <a 
                            href="https://www.globalsecurity.org/military/world/para/hashd-al-shaabi.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [12]
                          </a>
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            Quote: &quot;The Popular Mobilization Forces (PMF), an umbrella group of 238,000 Iranian-backed militias, have been legitimized as part of Iraq&rsquo;s state security services and receive over $3 billion annually from the Iraqi government—funded in part by American taxpayer dollars. Since 2015, the U.S. Department of State has provided Iraq with $1.25 billion in Foreign Military Financing, in addition to billions more in aid to Iraq&rsquo;s Ministry of Interior and Ministry of Defense, despite these institutions being deeply infiltrated by Iranian proxies. These same Iran-backed militias, now operating with legal authority under the PMF, have launched rocket attacks on U.S. bases in Iraq and Syria&quot;
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [11]
                            </span>
                          </span>
                          <a 
                            href="https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [11]
                          </a>
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            Also quoted in the official Demands letter: &quot;Sanction Iraq’s Financial Institutions Supporting Iran, especially Al-Rafidain Bank and the epayment system Qi-Card, which processes the payroll for the PMF militias. Iraq’s ability to receive US dollars through the Federal Reserve is directly supporting Iran and its proxies in Iraq.&quot;
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [11]
                            </span>
                    </span>
                          <a 
                            href="https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [11]
                          </a>
                        </p>
                      </>
                    )}

                    {index === 5 && (
                      <>
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            After the US Treasury and the Federal Reserve Bank of New York shut down fraudulent international wire transfers by Iraqi banks late in 2022, the country’s militia groups swiftly pivoted to another tool: prepaid and debit cards issued through Visa and Mastercard.
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [14]
                            </span>
                          </span>
                          <a
                            href="https://www.moneycontrol.com/world/how-iran-backed-militias-exploited-visa-and-mastercard-to-siphon-dollars-out-of-iraq-article-13084824.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [14]
                          </a>
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-black leading-snug mb-3">
                          <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5">
                            The WSJ report describes a rapid pivot by Iran‑backed militias from bank wire channels to prepaid/debit card rails in early 2023. The resulting cross‑border card volumes in Iraq purportedly surged from ∼$50 million per month to approximately ∼$1.5 billion per month by April 2023, reflecting clear industrial‑scale exploitation of the payments networks to obtain dollars outside Iraq and re‑convert at black‑market rates.
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                              Citation [13]
                            </span>
                          </span>
                          <a
                            href="https://www.wsj.com/world/middle-east/iran-visa-mastercard-dollars-sanctions-militias-0ecea0b9?st=SeWFzj&reflink=desktopwebshare_permalink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                          >
                            [13]
                          </a>
                        </p>
                        <div className="text-xs sm:text-sm font-medium text-black leading-snug mb-3 space-y-2">
                          <p>The mechanism of the scheme involves several steps designed to exploit the difference between Iraq&apos;s official and market exchange rates for the US dollar:</p>
                          <div className="mt-4 lg:grid lg:grid-cols-2 lg:gap-6">
                            <div className="lg:pr-6">
                              <span className="relative group border-b-2 border-dotted border-sky-500 cursor-help px-0.5 block">
                                <ol className="list-decimal pl-5 space-y-1">
                                <li>
                                  <span className="font-semibold">Acquisition of Cards:</span> Iranian-backed militias, which are part of Iraq&apos;s Popular Mobilization Forces (PMF) and receive government salaries, hoarded large quantities of Qi Cards. These included cards issued to legitimate fighters as well as potentially thousands of &quot;ghost&quot; fighters—fake identities registered in the payroll system.
                                </li>
                                <li>
                                  <span className="font-semibold">Loading Cards with Dinars:</span> The Qi Cards, linked to accounts at Iraqi banks like Al-Rafidain Bank, were loaded with Iraqi dinars from the government payroll.
                                </li>
                                <li>
                                  <span className="font-semibold">International Transactions:</span> The militias then used the Visa and Mastercard networks associated with these cards to conduct transactions outside of Iraq, primarily in neighboring countries. These transactions were processed at the official Iraqi exchange rate (approximately , dinars to the US dollar).
                                </li>
                                <li>
                                  <span className="font-semibold">Arbitrage and Money Laundering:</span> The militias would then settle these transactions in the black market, where the US dollar traded at a much higher rate. This arbitrage generated significant profits. The US dollars obtained through this process were then funneled to Iran and its proxies, effectively bypassing US sanctions and funding Iranian terrorist proxies.
                                </li>
                                </ol>
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10 shadow-lg">
                                  Citation [13]
                                </span>
                              </span>
                              <a
                                href="https://www.wsj.com/world/middle-east/iran-visa-mastercard-dollars-sanctions-militias-0ecea0b9?st=SeWFzj&reflink=desktopwebshare_permalink"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
                              >
                                [13]
                              </a>
                  </div>
                            <div className="lg:justify-self-end">
                              <Image src="/flow.png" alt="Flow diagram of the card-based laundering mechanism" width={800} height={800} className="w-full h-auto rounded" />
                  </div>
                </div>
              </div>
                      </>
                    )}

                    {/* Specifics List */}
                    {event.details.specifics && event.details.specifics.length > 0 && (
                      <div className="mb-3">
                  <ul className="space-y-1.5">
                          {event.details.specifics.map((specific, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                              <span className="text-slate-400 flex-shrink-0 mt-1">•</span>
                              <span className="leading-relaxed">{specific}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                    )}

                    {/* Citations */}
                    {index > 1 && index !== 2 && index !== 3 && index !== 4 && index !== 5 && event.citations && event.citations.length > 0 && (
                      <div className="pt-3 border-t border-slate-200">
                        <div className="flex flex-wrap gap-2">
                          {event.citations.map((citation, idx) => (
                            <div key={idx}>
                              {citation.url ? (
                                <a
                                  href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-md text-xs text-sky-700 hover:text-sky-900 font-medium transition-colors"
                                  title={citation.source}
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  {citation.text}
                                </a>
                              ) : (
                                <span 
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-xs text-slate-700 font-medium"
                                  title={citation.source}
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  {citation.text}
                                </span>
                  )}
                </div>
                          ))}
              </div>
            </div>
                    )}
          </div>
        </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default LeadershipRecord;
