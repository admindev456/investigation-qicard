import React from "react";
import Image from "next/image";
import { Section } from "@/app/lib/types";

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

const LeadershipRecord: React.FC<LeadershipRecordProps> = ({ section }) => {
  const { profile, timeline, convictions, schemes, usResponse, torture, currentStatus } = section.content;

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
      <div className="mb-8 sm:mb-10 md:mb-12 lg:-mx-96 lg:px-96">
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
                  Citation [4]
                </span>
              </span>
              .
              <a 
                href="https://static.foxnews.com/foxnews.com/content/uploads/2025/05/5.28.25_iraq_sanctions_letter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block ml-1.5 text-sky-600 hover:text-sky-700 underline font-semibold text-[10px] sm:text-xs align-super"
              >
                [4]
              </a>
              {" "}He remains chairman and actively represents Qi Card internationally, including at the October 2025 Money 20/20 USA fintech conference.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h3 className="text-sm sm:text-base font-semibold uppercase tracking-widest text-black mb-6">Legal Timeline</h3>
        <div className="space-y-3 sm:space-y-4">
          {timeline.map((event, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 sm:p-5 md:p-6 hover:border-slate-300 transition-colors">
              <div className="mb-3">
                <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-600 mb-1">
                  {event.date}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-black">{event.event}</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Authority</span>
                  <p className="text-xs sm:text-sm text-slate-800">{event.authority}</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Outcome</span>
                  <p className="text-xs sm:text-sm text-slate-800">{event.outcome}</p>
                </div>
              </div>

              <CitationLink citation={event.citation} url={event.citationUrl} />
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Grid */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h3 className="text-sm sm:text-base font-semibold uppercase tracking-widest text-black mb-6">Documented Evidence</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Convictions */}
          <div className="space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 pb-2 border-b border-slate-200">
              Criminal Convictions
            </h4>
            {convictions.map((conviction, index) => (
              <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-red-700">Charge</span>
                  <p className="text-xs sm:text-sm font-medium text-black mt-1">{conviction.charge}</p>
                </div>

                {conviction.coDefendants && (
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-red-700">Co-Defendants</span>
                    <p className="text-xs text-slate-700 mt-1">{conviction.coDefendants}</p>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-red-700">Sentence</span>
                  <p className="text-xs sm:text-sm font-medium text-black mt-1">{conviction.sentence}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-red-700">Court</span>
                    <p className="text-xs text-slate-700 mt-1">{conviction.court}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-red-700">Date</span>
                    <p className="text-xs text-slate-700 mt-1">{conviction.date}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-red-700">Status</span>
                  <p className="text-xs font-medium text-black mt-1">{conviction.status}</p>
                </div>

                <CitationLink citation={conviction.citation} url={conviction.citationUrl} />
              </div>
            ))}
          </div>

          {/* Schemes */}
          <div className="space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 pb-2 border-b border-slate-200">
              Fraud Schemes
            </h4>
            {schemes.map((scheme, index) => (
              <div key={index} className="border border-orange-200 bg-orange-50 rounded-lg p-4 space-y-3">
                <h5 className="text-xs sm:text-sm font-bold text-black">{scheme.title}</h5>
                <p className="text-xs text-slate-800 leading-relaxed">{scheme.description}</p>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-700">Methods</span>
                  <ul className="mt-2 space-y-1.5">
                    {scheme.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                        <span className="text-orange-600 flex-shrink-0 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <CitationLink citation={scheme.citation} url={scheme.citationUrl} />
              </div>
            ))}
          </div>

          {/* U.S. Response */}
          <div className="space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 pb-2 border-b border-slate-200">
              U.S. Political Response
            </h4>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 space-y-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-700">Designation</span>
                <p className="text-xs sm:text-sm font-bold text-black mt-1">{usResponse.designation}</p>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-700">Source</span>
                <p className="text-xs text-slate-800 mt-1">{usResponse.source}</p>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-700">Date</span>
                <p className="text-xs text-slate-800 mt-1">{usResponse.date}</p>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-700">Details</span>
                <p className="text-xs text-slate-800 leading-relaxed mt-1">{usResponse.details}</p>
              </div>

              <CitationLink citation={usResponse.citation} url={usResponse.citationUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* Torture & Acquittal Section */}
      <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-5 sm:p-6 md:p-7 mb-8 sm:mb-10 md:mb-12">
        <h4 className="font-display text-base sm:text-lg font-bold text-black mb-4">Torture Allegations & Acquittal</h4>

        <div className="space-y-4 text-xs sm:text-sm text-slate-800">
          <p className="leading-relaxed">{torture.arrest}</p>

          <div>
            <span className="font-semibold text-black">Documented torture methods:</span>
            <ul className="mt-2 space-y-1.5 ml-4">
              {torture.methods.map((method, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 flex-shrink-0">•</span>
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-semibold text-black">Evidence:</span>
            <ul className="mt-2 space-y-1.5 ml-4">
              {torture.evidence.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="font-semibold text-black">{torture.outcome}</p>

          <CitationLink citation={torture.citation} url={torture.citationUrl} />
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-slate-900 text-white rounded-lg p-5 sm:p-6 md:p-7">
        <h4 className="font-display text-base sm:text-lg font-bold mb-5">Current Status (November 2025)</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-300">Positions Held</span>
            <ul className="mt-3 space-y-2">
              {currentStatus.positions.map((position, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="text-sky-400 flex-shrink-0 mt-0.5">▸</span>
                  <span>{position}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-300">Recent Activities</span>
            <ul className="mt-3 space-y-2">
              {currentStatus.activities.map((activity, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="text-sky-400 flex-shrink-0 mt-0.5">▸</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-5">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300">{currentStatus.note}</p>
        </div>
      </div>
    </div>
  );
};

export default LeadershipRecord;
