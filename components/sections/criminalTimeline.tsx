import React from "react";

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

interface CriminalTimelineSection {
  id: string;
  type: string;
  content: {
    events: TimelineEvent[];
  };
}

interface CriminalTimelineProps {
  section: CriminalTimelineSection;
}

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

const CriminalTimeline: React.FC<CriminalTimelineProps> = ({ section }) => {
  const { events } = section.content;

  return (
    <div className="mb-12 sm:mb-16 md:mb-20">
      {/* Section Header */}
      <div className="mb-8 sm:mb-10">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2">
          Criminal Timeline (Verified)
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Chronological documentation of arrest, detention, torture, convictions, and acquittal with comprehensive source citations
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-slate-200" aria-hidden="true"></div>

        {/* Timeline Events */}
        <div className="space-y-6 sm:space-y-8">
          {events.map((event, index) => {
            const colors = categoryColors[event.category];
            
            return (
              <div key={index} className="relative pl-8 sm:pl-10">
                {/* Node/Dot */}
                <div 
                  className={`absolute left-0 w-4 h-4 rounded-full ${colors.dot} border-2 border-white shadow-md`}
                  aria-hidden="true"
                ></div>

                {/* Event Card */}
                <div className={`border ${colors.border} rounded-lg overflow-hidden`}>
                  {/* Date Header */}
                  <div className={`${colors.bg} px-4 sm:px-5 py-2.5 border-b ${colors.border}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black">
                        {event.date}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest ${colors.text}`}>
                        {colors.label}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="bg-white p-4 sm:p-5 md:p-6">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-black mb-3">
                      {event.title}
                    </h4>

                    {/* Details Grid */}
                    {(event.details.authority || event.details.outcome) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                        {event.details.authority && (
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 block mb-1">
                              Authority
                            </span>
                            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                              {event.details.authority}
                            </p>
                          </div>
                        )}
                        {event.details.outcome && (
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 block mb-1">
                              Outcome
                            </span>
                            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                              {event.details.outcome}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Context */}
                    {event.details.context && (
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {event.details.context}
                        </p>
                      </div>
                    )}

                    {/* Specifics List */}
                    {event.details.specifics && event.details.specifics.length > 0 && (
                      <div className="mb-4">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 block mb-2">
                          Key Details
                        </span>
                        <ul className="space-y-1.5">
                          {event.details.specifics.map((specific, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                              <span className="text-slate-400 flex-shrink-0 mt-0.5">•</span>
                              <span className="leading-relaxed">{specific}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Citations */}
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-slate-500 block mb-2">
                        Sources
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {event.citations.map((citation, idx) => (
                          <div key={idx} className="inline-flex items-center">
                            {citation.url ? (
                              <a
                                href={citation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[10px] sm:text-xs text-slate-700 hover:text-slate-900 transition-colors"
                                title={citation.source}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span className="font-medium">{citation.text}</span>
                              </a>
                            ) : (
                              <span 
                                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-[10px] sm:text-xs text-slate-600"
                                title={citation.source}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="font-medium">{citation.text}</span>
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Data with comprehensive citations
export const criminalTimelineData: TimelineEvent[] = [
  {
    date: "September 17, 2020",
    category: "arrest",
    title: "Abdul Hussein among 3 arrested at Baghdad International Airport, along with Shaker al-Zamili, the head of the Baghdad Investment Commission, and Ahmed al-Saadi, former Director-General of Iraq's Pension Authority, seized one day earlier on September 16, 2020.",
    details: {
      authority: "Arrested by members of the Committee No. 29 (Prime Minister al-Kadhimi's anti-corruption unit under Executive Order No. 29, also known as 'Diwaniya Committee').",
      specifics: []
    },
    citations: [
      {
        text: "MENA Rights Group",
        url: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi",
        source: "MENA Rights Group - Bahaa Abdul Hussein Abdul Hadi Case File"
      }
    ]
  },
  {
    date: "September 2020 - January 2021",
    category: "torture",
    title: "From September 2020 to January 2021, Abdul Hussein was subjected to various types of physical and psychological torture during his imprisonment.",
    details: {
      context: "The Central Anti-Corruption Criminal Court sentenced Abdul Hussein on January 24, 2021 to 4 years imprisonment as well as a 10 million dinar fine ($6,800) for paying bribes to Ahmed al-Saadi (also referenced as Ahmed Abdel-Jalil Al-Saadi), former Director of Iraq's National Pensions Authority.",
      specifics: []
    },
    citations: [
      {
        text: "MENA Rights Group",
        url: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi",
        source: "MENA Rights Group comprehensive case documentation with UN WGAD submission"
      }
    ]
  },
  {
    date: "July 8, 2021",
    category: "legal",
    title: "Al-Karkh Criminal Court for Corruption Cases convicted Abdul Hussein again on July 8, 2021, sentencing him to 3 years for his role in embezzling 13,173,696,096 Iraqi dinars (approximately $9 million) in bank revenues during Qi Card's 2013-2019 partnership with Rafidain Bank.",
    details: {
      context: "This case, prosecuted under Articles 316, 47, 48, and 49 of Iraq's Penal Code, included two Rafidain Bank executives as co-defendants: Afrah Muhammad Abed Ali (Director-General) and Walaa Abdul Jawad Hussein (Head of Credit Cards Department), both receiving identical 3-year sentences.",
      specifics: []
    },
    citations: []
  },
  {
    date: "MARCH 2, 2022 - DECEMBER 11, 2023",
    category: "legal",
    title: "Iraq's Federal Supreme Court ruled on March 2, 2022 that Committee No. 29's establishment was unconstitutional, and a violation of Iraq's Constitution related to human rights guarantees, separation of powers, judicial independence, and the mandate of the Commission of Integrity. The court dissolved the committee entirely, undermining the legal foundation of investigations it conducted.",
    details: {
      context: "This constitutional defect became central to Abdul Hussein's defense as well as many others charged with corruption and bribery. After a retrial on December 5, 2022 reduced his sentence to 1 year and 9 months, Iraq's Court of Cassation—the nation's highest criminal court—acquitted Abdul Hussein on December 11, 2023. He had already been released on March 9, 2023 after completing his reduced sentence.",
      specifics: []
    },
    citations: [
      {
        text: "Federal Supreme Court",
        source: "Federal Supreme Court Case No. 169/Federal/2021 - Committee No. 29 dissolution ruling"
      },
      {
        text: "MENA Rights Group",
        url: "https://menarights.org/en/case/bahaa-abdul-hussein-abdul-hadi",
        source: "MENA Rights Group documentation of constitutional violations"
      }
    ]
  },
  {
    date: "May 28, 2025",
    category: "political",
    title: "On May 28th, both Abdul Hussein and Qi Card are explicitly named in U.S. Congressional Sanctions Demands from U.S. Representatives Joe Wilson (R-SC) and W. Gregory Steube (R-FL) in a letter addressed to Secretary of State Marco Rubio.",
    details: {
      authority: undefined,
      outcome: undefined,
      context: "",
      specifics: []
    },
    citations: []
  },
  {
    date: "MAY 31, 2025 - JUNE 3, 2025",
    category: "political",
    title: "On May 31st, the Wall Street Journal published a comprehensive in-depth report shining a glaring light on a major international money laundering scandal, implicating Qi Card in a scheme to siphon US dollars out of Iraq utilizing Visa and Mastercard-linked products to monetize Iraq’s dual exchange rates for large, near‑risk‑free profits. Benefiting Iranian-backed militias and evading US sanctions on Iran.",
    details: {
      authority: undefined,
      outcome: undefined,
      context: "",
      specifics: []
    },
    citations: []
  }
];

export default CriminalTimeline;
