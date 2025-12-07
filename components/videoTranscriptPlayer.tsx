"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ChevronDown, ChevronUp, FileText } from 'lucide-react';

const VideoTranscriptPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(1);
  const [expandTranscript, setExpandTranscript] = useState(true);

  const transcriptGroups = [
    {
      id: 1,
      startTime: 0,
      endTime: 8,
      segments: [
        {
          id: 1,
          speaker: "Aras Habib",
          text: "No, I have figured out the path now, and I'm moving forward, God willing."
        },
        {
          id: 2,
          speaker: "Host",
          text: "Without them? You don't need [them]?"
        }
      ]
    },
    {
      id: 2,
      startTime: 9,
      endTime: 18,
      segments: [
        {
          id: 3,
          speaker: "Host",
          text: "Is it really there? It can't be removed?"
        },
        {
          id: 4,
          speaker: "Aras Habib",
          text: "No I found the way.. in a way without the Americans knowing about it"
        },
        {
          id: 6,
          speaker: "Host",
          text: "Huh?"
        }
      ]
    },
    {
      id: 3,
      startTime: 19,
      endTime: 37,
      segments: [
        {
          id: 8,
          speaker: "Host",
          text: "So, is there a lot in this path?"
        },
        {
          id: 9,
          speaker: "Aras Habib",
          text: "They're the ones that taught us."
        },
        {
          id: 10,
          speaker: "Host",
          text: "The Americans?"
        },
        {
          id: 11,
          speaker: "Aras Habib",
          text: "That... that... they put sanctions on you. Later, we learned the method of how to deal with them. So, no one works under their own name anymore. We don't work under our names; we work under the names of others. They don't know them. I swear, they don't know them."
        }
      ]
    },
    {
      id: 4,
      startTime: 38,
      endTime: 60,
      segments: [
        {
          id: 12,
          speaker: "Host",
          text: "Well, you might have just told them."
        },
        {
          id: 13,
          speaker: "Aras Habib",
          text: "They won't know them. You, others, whoever—you won't know them. We are going to make money. And I say with all pride, what I lost—130 million dollars in 2008—I say with all pride, in 2026, I will make double that amount."
        },
        {
          id: 14,
          speaker: "Host",
          text: "260?"
        },
        {
          id: 15,
          speaker: "Aras Habib",
          text: "230... I'll make 260."
        }
      ]
    },
    {
      id: 5,
      startTime: 60,
      endTime: 66,
      segments: [
        {
          id: 16,
          speaker: "Host",
          text: "And remember me with you."
        },
        {
          id: 17,
          speaker: "Aras Habib",
          text: "Yes."
        },
        {
          id: 18,
          speaker: "Host",
          text: "Remember me with you. Can I work with you?"
        },
        {
          id: 19,
          speaker: "Aras Habib",
          text: "What will you give me?"
        },
        {
          id: 20,
          speaker: "Host",
          text: "Huh?"
        }
      ]
    },
    {
      id: 6,
      startTime: 67,
      endTime: 78,
      segments: [
        {
          id: 21,
          speaker: "Aras Habib",
          text: "I want shell companies from you. Will you give me some? (Laughs)"
        },
        {
          id: 22,
          speaker: "Host",
          text: "(Laughs) On my honor, I started this meeting with... it's you... this cameraman destroyed me."
        },
        {
          id: 23,
          speaker: "Aras Habib",
          text: "What can I do to him? What does it have to do with this?"
        },
        {
          id: 24,
          speaker: "Host",
          text: "On my honor..."
        }
      ]
    }
  ];

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);

      const currentGroup = transcriptGroups.find(
        (group) => time >= group.startTime && time < group.endTime
      );

      if (currentGroup && currentGroup.id !== activeGroupId) {
        setActiveGroupId(currentGroup.id);
      }
    }
  };

  const handleGroupClick = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold leading-snug sm:leading-snug text-black mb-8">
          The Confession: A U.S.-Sanctioned Terrorist&apos;s Live Television Admission of Sanctions Evasion
        </h1>
        <p className="mb-3 sm:mb-4 md:mb-4 text-sm sm:text-base md:text-lg lg:text-lg font-medium sm:font-normal leading-relaxed sm:leading-relaxed text-black max-w-3xl">
          On Iraqi television, Aras Habib Karim—designated by the U.S. Treasury as a Specially Designated Global Terrorist for IRGC-Quds Force links—openly described the methodology of evading American financial sanctions using shell companies and nominee structures.
        </p>

        <p className="mb-4 sm:mb-5 md:mb-5 text-[10px] sm:text-xs md:text-sm font-medium sm:font-normal leading-relaxed text-slate-700 max-w-3xl">
          All claims are cited to primary sources. Materials organized for legal, governmental, and investigative use.
        </p>

        <div className="border-t border-slate-200 pt-6 mb-6"></div>

        <div className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-800 max-w-4xl mb-4">
          <p className="mb-4">
            The following video evidence captures a <strong>U.S.-sanctioned individual</strong>—designated under <strong>Executive Order 13224</strong> as a <strong>Specially Designated Global Terrorist (SDGT)</strong> for links to <strong>Iran&apos;s Islamic Revolutionary Guard Corps-Quds Force</strong>—openly describing <strong>sanctions evasion methodology</strong> on Iraqi national television. The speaker discusses:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Learning <strong>&quot;from the Americans&quot;</strong> how to circumvent their own sanctions</li>
            <li>Operating through <strong>shell companies and nominee names</strong> to avoid detection</li>
            <li>Personal financial exposure of <strong>$130 million</strong> and plans to generate <strong>$260 million</strong> by 2026</li>
            <li>Explicit requests for <strong>shell company assistance</strong> during the broadcast</li>
          </ul>
          <p className="text-xs sm:text-sm border-t border-slate-200 pt-4 mt-4 text-slate-600">
            This admission, broadcast on Al-Taghiir TV&apos;s &quot;From Baghdad&quot; program, represents a brazen public acknowledgment of the systematic sanctions evasion infrastructure operating within Iraq&apos;s financial ecosystem.
          </p>
        </div>
      </div>

      {/* Video Player & Transcript Layout */}
      <div className="mb-8 grid lg:grid-cols-4 gap-4 lg:items-start">
        {/* Left Column: Video Player */}
        <div className="lg:col-span-3">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video group" id="video-wrapper">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  setDuration(videoRef.current.duration);
                }
              }}
              onEnded={() => setIsPlaying(false)}
              playsInline
              src="https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/video/VIDEO-2025-11-29-15-54-13.mp4"
            />
            
            {/* Play Overlay */}
            <div 
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
              onClick={togglePlay}
            >
              <button className="p-4 bg-white/90 backdrop-blur rounded-full shadow-lg transform transition-transform hover:scale-110">
                {isPlaying ? <Pause size={28} className="text-slate-900" /> : <Play size={28} className="text-slate-900 ml-1" />}
              </button>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <input 
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (videoRef.current) {
                    videoRef.current.currentTime = val;
                  }
                  setCurrentTime(val);
                }}
                className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer mb-3 accent-sky-500 hover:accent-sky-400"
              />
              
              <div className="flex justify-between items-center text-white text-xs font-medium">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="hover:text-sky-200">
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button onClick={toggleMute} className="hover:text-sky-200">
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <span>{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
                </div>
                <button 
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }} 
                  className="hover:text-sky-200 flex items-center gap-1"
                >
                  <RotateCcw size={12} /> REPLAY
                </button>
              </div>
            </div>
          </div>
          
          {/* Video Evidence Metadata - Compact Caption */}
          <div className="mt-3 text-left">
            <div className="text-[10px] text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
              <div><span className="font-medium">Source Program:</span> &quot;From Baghdad&quot; (من بغداد)</div>
              <div><span className="font-medium">Broadcast Network:</span> Al-Taghiir TV (التغيير)</div>
              <div><span className="font-medium">Host:</span> Najm Al-Rubaie</div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500 uppercase font-semibold">On-Screen Chyron:</span>
                <span className="text-[10px] text-slate-700 italic">&quot;Habib: The Americans taught us how to deceive them on financial sanctions matters&quot;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Transcript */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col lg:max-h-[calc((100vw-2rem-1rem)*0.75*9/16)]">
          <div className="border-b border-slate-200 px-3 py-2 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <FileText size={14} className="text-slate-500" />
              <h3 className="font-display text-sm font-bold text-slate-900">Live Transcript</h3>
            </div>
            <button 
              onClick={() => setExpandTranscript(!expandTranscript)}
              className="text-slate-400 hover:text-slate-600"
            >
              {expandTranscript ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {expandTranscript && (
            <div 
              ref={transcriptContainerRef}
              className={`border-t border-slate-200 p-3 overflow-y-auto flex-1 min-h-0 transition-all duration-500`}
            >
              {transcriptGroups.map((group) => {
                const isActive = activeGroupId === group.id;
                
                if (!isActive) return null;

                return (
                  <div
                    key={group.id}
                    onClick={() => handleGroupClick(group.startTime)}
                    className="cursor-pointer"
                  >
                    <div className="mb-3 pb-2 border-b border-slate-200">
                      <span className="text-[9px] text-slate-500 font-mono">
                        [{formatTime(group.startTime)} - {formatTime(group.endTime)}]
                      </span>
                    </div>
                    <div className="space-y-2">
                      {group.segments.map((segment) => (
                        <div
                          key={segment.id}
                          className="p-2 rounded-md transition-all duration-200 border-l-2 border-transparent hover:bg-slate-50 hover:border-l-slate-200"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`text-[9px] uppercase font-bold tracking-wider px-1 py-0.5 rounded ${
                              segment.speaker === 'Aras Habib' 
                                ? 'bg-red-50 text-red-800' 
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {segment.speaker}
                            </span>
                          </div>
                          <p className="text-slate-800 leading-snug text-xs">
                            {segment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {activeGroupId === null && (
                <div className="flex items-center justify-center h-full text-slate-400 italic text-xs">
                  Video paused or loading...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Identity & OFAC Information */}
      <div className="mb-8 text-xs sm:text-sm md:text-base leading-relaxed text-slate-800 space-y-3">
        <p>
          On 15 May 2018, the U.S. Treasury&apos;s Office of Foreign Assets Control (OFAC) added Aras Habib, the chairman and chief executive of Iraq-based Al-Bilad Islamic Bank, and the bank itself, to the Specially Designated Nationals (SDN) list as a <strong>Specially Designated Global Terrorist (SDGT)</strong>, &quot;for assisting, sponsoring, or providing financial, material, or technological support for, or financial or other services to or in support of&quot; Iranian Islamic Revolutionary Guard Corps&apos; (IRGC) Quds Force.
        </p>
        <p>
          The designation rationale stated that Habib enabled IRGC Qods Forces to move funds from Tehran to Hezbollah in Lebanon.
        </p>
        <p>
          Following a now-familiar playbook, Aras Habib exploited vulnerabilities in Iraq&apos;s financial system by leveraging control over licensed institutions, concealing his beneficial ownership through complex layers of holding companies, and utilising bulk-purchased prepaid cards to facilitate cross-border smuggling and money laundering on behalf of the IRGC-Qods Force and its proxies.
        </p>
        <p>
          The combination of complex ownership structures, nominee shareholders, related-party transactions, and in the case of PMF Ghost accounts, outright <strong>fraud</strong>, are deliberately used to obscure the link between illicit activities and their ultimate beneficiaries, frustrating investigators and regulators.
        </p>
        <p>
          The methodologies described in Aras Habib Karim&apos;s televised statements and the documented Bahaa Hadi network structure (using primary sources) exhibit parallel characteristics. <strong>These parallels suggest a common operational playbook employed across Iran-aligned financial networks in Iraq</strong>, rather than isolated or coincidental methodological similarity.
        </p>
      </div>

      {/* Related-Party Transactions and Shell Companies */}
      <div className="mb-8 text-xs sm:text-sm md:text-base leading-relaxed text-slate-800 space-y-3">
        <div className="border-t border-slate-200 pt-6"></div>
        <p>
          The role of <strong>related-party transactions (RPTs)</strong> and <strong>shell companies</strong> is fundamental to the final stage of the money laundering cycle—the Layering and Integration phases—used by the illicit financial networks in Iraq to convert systematically stolen Iraqi dinars (IQD) and resulting foreign currency profits into <strong>defensible, foreign-held assets</strong>.
        </p>
        <p>
          This process involves using corporate structures under common control to obscure the origins of criminal funds, particularly those derived from currency arbitrage and direct state embezzlement.
        </p>

        <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-6">
          1. Role of Shell Companies in the Placement and Conversion Phases
        </h3>
        <p>
          Shell companies and fictitious corporate vehicles serve to inject stolen Iraqi dinars (IQD) into the formal banking system and facilitate the initial conversion to hard currency.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <strong>Facilitating Predicate Offenses:</strong> Shell companies were actively used in large-scale state theft. In the notorious &quot;$2.5 billion tax fraud&quot; (or &quot;Heist of the Century&quot;), <strong>3.7 trillion Iraqi dinars</strong> were stolen from the General Commission of Taxes account at Al-Rafidain Bank via 247 fraudulent checks cashed by <strong>five shell companies</strong>. Documents showed that some of these companies were established just weeks before the payments began, indicating they were created for the sole purpose of embezzlement.
          </li>
          <li>
            <strong>Obscuring Identity (Nominee Use):</strong> The networks rely on shell companies and nominee ownership to protect the true controllers from legal exposure. An individual linked to the illicit network openly admitted that after sanctions were imposed, they deliberately ceased working &quot;under our names anymore,&quot; stating, &quot;We work under the names of others,&quot; and requested assistance in acquiring &quot;shell companies&quot;. The lack of an accessible <strong>central registry of beneficial ownership</strong> in Iraq is noted as a primary structural vulnerability that enables this strategy.
          </li>
          <li>
            <strong>Monetizing Illicit IQD:</strong> Once established, shell companies provide a clean bank account to participate in the most lucrative operation: <strong>currency arbitrage</strong>. The underlying scheme involved converting IQD—obtained cheaply through theft (e.g., <strong>13.173 billion IQD</strong> stolen from Al-Rafidain Bank revenues)—into U.S. dollars at a favorable official rate by using cards abroad (UAE, Turkey, Jordan). The resulting liquid U.S. dollar profits were then ready for the next phase: hardening into hard assets.
          </li>
        </ul>

        <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-6">
          2. Role of Related-Party Transactions (RPTs) in Layering and Integration
        </h3>
        <p>
          RPTs are the critical mechanism used to channel the liquid dollar proceeds from the core fintech entities (like International Smart Card/Qi Card) into non-fintech corporate vehicles, converting the value into defensible, global assets.
        </p>

        <h4 className="font-display text-sm sm:text-base md:text-lg font-bold leading-snug text-black mb-3 mt-5">
          A. Establishing Related-Party Status
        </h4>
        <p>
          The foundational relationship exists because the principal individual, <strong>Bahaa Abdul-Hussein Hadi</strong> (ISC/Qi Card Chairman), and his immediate family members (Ibrahim, Safaa, and Alaa Hadi) are the central controllers of the entire financial network.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <strong>Compliance Violation:</strong> Under international standards (such as ASC 850 and <strong>IAS 24</strong>), controlling individuals and their affiliates automatically qualify as a &quot;Related Party&quot;. This requires <strong>detailed disclosure</strong> of transactions between affiliated entities. The channeling of funds between the primary company (ISC/Qi Card) and secondary companies controlled by the same family network without full disclosure represents a <strong>likely violation of International Accounting Standard 24</strong>.
          </li>
          <li>
            <strong>Layering Mechanism:</strong> The flow of funds from the core entities to the secondary entities occurs via RPT methods, such as <strong>inflated technology procurement contracts, fictitious consultancy payments</strong>, <strong>capital injections</strong>, inter-company <strong>loans</strong>, or the <strong>provision of guarantees or collateral</strong>. These transactions serve to create a plausible, business-related explanation for the movement of large sums.
          </li>
        </ul>

        <h4 className="font-display text-sm sm:text-base md:text-lg font-bold leading-snug text-black mb-3 mt-5">
          B. Asset Diversification via Corporate Vehicles
        </h4>
        <p>
          The investigation conducted by the Central Bank of Iraq (CBI) focused specifically on these secondary entities—<strong>Wadi Al-Maalumat</strong> and <strong>Saqr Al-Rafidain Company for Aviation</strong>—highlights substantial potential as integral vehicles in the layering and asset diversification process.
        </p>
        <p>
          The entire Hadi network could potentially serve as an effective <strong>geopolitical risk hedge</strong>.
        </p>
        <p>
          The separation of ownership and investment via international layering entities like those linked to the Hadi network ensures that <strong>if the core Baghdad operation (ISC/Qi Card) were sanctioned, the primary corporate assets and accumulated wealth held in foreign hubs (like the UAE, Jordan, and Turkey) are structurally insulated from direct seizure.</strong>
        </p>
      </div>

      {/* Detailed Network Analysis */}
      <div className="mb-8 text-xs sm:text-sm md:text-base leading-relaxed text-slate-800 space-y-3">
        <div className="border-t border-slate-200 pt-6"></div>
        <p>
          The following provides a detailed observation and analysis of a complex financial network centered on Iraqi businessman Bahaa Abdul-Hussein Hadi and his control over International Smart Card (ISC), the operator of the country&apos;s dominant Qi Card payment system.
        </p>
        <p>
          This analysis uses a combination of primary and secondary sources, <strong>both public and private</strong>, to demonstrate how this network systematically leveraged its privileged position to execute financial crimes, serving as a critical component of a financing architecture that supports U.S.-designated Foreign Terrorist Organizations and enables complex cross border financial fraud.
        </p>
        <p>
          It traces the flow of illicit capital from predicate offenses, through a profitable currency arbitrage scheme, culminating in the use of specialized sophisticated corporate vehicles.
        </p>

        <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-8">
          At the direction of the Central Bank of Iraq (CBI), an urgent investigation and asset seizure action was initiated, targeting the principal actors and corporate entities that form the core of this network. These key components include:
        </h2>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            Principal Individual: <strong>Bahaa Abdul-Hussein Hadi</strong>
          </li>
          <li>
            Key Family Members: <strong>Ibrahim Abdul-Hussein Hadi, Safaa Abdul-Hussein Hadi</strong>, and <strong>Alaa Abdul-Hussein Hadi</strong>
          </li>
          <li>
            Primary FinTech Entities: <strong>International Smart Card (ISC)/Qi Card, Iraqi Electronic Payment Systems Company (IEPS)</strong>, and <strong>Al-Injaz Technology Company</strong>
          </li>
          <li>
            Secondary Diversification Entities: <strong>Wadi Al-Maalumat</strong> and <strong>Saqr Al-Rafidain Company for Aviation</strong>
          </li>
        </ul>

        <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-8">
          2.0 The Predicate Offenses: Sourcing Illicit Capital Through State Capture
        </h2>
        <p>
          In any money laundering investigation, establishing the predicate offense—the underlying criminal activity that generates illicit proceeds—is of critical importance. This section details the documented criminal activities that provided the initial, illicit capital for the Hadi network&apos;s subsequent laundering and arbitrage schemes, demonstrating a clear pattern of embezzlement and bribery aimed at capturing state financial institutions for the purpose of threat finance.
        </p>
        <p>
          The theft of the 13.173 billion IQD in bank revenues was accomplished through the collusion of private sector leadership and senior officials within the state-owned Al-Rafidain Bank. The following three individuals were convicted and sentenced to three years in prison each by Baghdad&apos;s Al-Karkh Criminal Court in July 2021:
        </p>
        <ol className="list-decimal pl-5 space-y-3 mb-4">
          <li>
            <strong>Bahaa Abdul-Hussein Hadi:</strong> Identified as the Founder and Director (Chairman) of International Smart Card (Qi Card). He was convicted for his involvement in coordinating the theft. The ruling mandated the return of the embezzled funds to the state treasury.
          </li>
          <li>
            <strong>Afrah Muhammad Abid Ali:</strong> Identified as the <strong>Director-General of Al-Rafidain Bank</strong>.
          </li>
          <li>
            <strong>Walaa Abdul Jawad Hussein:</strong> Identified as the <strong>Head of the bank&apos;s Credit Cards Department</strong>.
          </li>
        </ol>
        <p>
          The conviction of the Qi Card director alongside the state bank&apos;s general manager and credit card director demonstrates the <strong>successful co-option</strong> of the state partner institution (Al-Rafidain Bank) at the highest operational levels by the ISC management structure.
        </p>

        <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-6">
          Context of the Theft
        </h3>
        <p>
          The theft is categorized as a &quot;predicate offense&quot;—the underlying criminal act that generated the illicit funds. This specific crime provided the <strong>initial IQD illicit capital</strong> that was subsequently placed into the Qi Card liquidity pool:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <strong>Institutional Capture:</strong> Bahaa Abdul-Hussein Hadi was separately convicted and sentenced to four years of severe imprisonment for bribing <strong>Ahmed Abdul-Jalil Al-Sa&apos;edi</strong>, the former head of the <strong>National Board of Pensions</strong>. This act was crucial, as it secured the network&apos;s deep access to the state payroll and pension mechanisms managed by the Qi Card system, enabling further financial misconduct.
          </li>
          <li>
            <strong>Placement and Layering:</strong> The stolen <strong>13.173 billion IQD</strong> were electronically injected directly into the high-volume Qi Card operational liquidity pool. This action immediately laundered the stolen dinars by <strong>commingling them</strong> with the massive, legitimate flow of state salary and pension payments processed daily, obscuring the funds&apos; criminal origin. Once placed, this stolen capital became the cheap, high-volume base required to fuel the massive cross-border currency arbitrage scheme run by the network.
          </li>
        </ul>

        <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-6">
          Legal Caveat
        </h3>
        <p>
          It is important to note the complex legal status of Bahaa Abdul-Hussein Hadi&apos;s corruption cases. While he was initially convicted for both bribery and theft (in January and July 2021, respectively), he was later <strong>acquitted of all charges by Iraq&apos;s Court of Cassation</strong> on December 11, 2023. Furthermore, his initial arrest in September 2020 by the Anti-Corruption Committee (Committee No. 29)—a body later deemed unconstitutional—was accompanied by <strong>documented allegations of severe physical and psychological torture</strong>. Despite the ultimate acquittal, the initial convictions serve as the documented legal record establishing the existence of the specific theft that generated the illicit capital used in the network&apos;s financial schemes.
        </p>
        <p>
          A <strong>secondary,</strong> and strategically critical, predicate offense was institutional capture through bribery. <strong>Hadi was also convicted for bribing Ahmed Abdul-Jalil Al-Sa&apos;edi</strong>, the former director of Iraq&apos;s National Board of Pensions. Controlling the national pension authority was crucial for maintaining the network&apos;s deep access to the state payroll and pension mechanisms managed by the Qi Card system. <strong>This institutional capture provided the militia-linked network with direct control over the payroll system for the Popular Mobilization Forces (PMF)</strong>, an umbrella organization of state-funded militias that includes designated FTOs.
        </p>

        <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-8">
          3.0 The Layering Phase: Weaponizing Financial Technology for Currency Arbitrage
        </h2>
        <p>
          The &quot;layering&quot; stage of a money laundering cycle is designed to obscure the illicit origin of funds by creating complex layers of financial transactions. This section deconstructs the sophisticated mechanisms employed by the Hadi network, which leveraged the Qi Card&apos;s state-integrated infrastructure to convert stolen Iraqi Dinars into hard currency (USD) and move them into the global financial system.
        </p>

        <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-6">
          The Strategic Advantage of the Public-Private Partnership (PPP)
        </h3>
        <p>
          The foundation of the entire scheme rests on the corporate structure of International Smart Card (ISC). Established in 2007, ISC is a Public-Private Partnership (PPP), structured as a joint venture between the private Iraqi Electronic Payment Systems Company (IEPS) and state-owned financial institutions, most notably Al-Rafidain Bank and Al-Rasheed Bank.
        </p>
        <p>
          This deep integration with the state&apos;s payroll, pension, and liquidity mechanisms allowed the state itself to become the primary vehicle for funding Iran-aligned militias. The state payroll mechanism, managed by Qi Card, processed payments for over 200,000 members of the Popular Mobilization Forces (PMF), including fighters from Kata&apos;ib Hezbollah—a U.S.-designated FTO responsible for lethal attacks, including the drone attack that killed three U.S. service members in January 2024. This arrangement transformed a tool intended for financial modernization into a highly efficient mechanism for state capture, providing a technical facade of legitimacy for its threat finance operations.
        </p>

        <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-6">
          The Mechanics of the Scheme
        </h3>
        <p>
          The layering process was executed with technical precision, exploiting both the company&apos;s operational capabilities and structural weaknesses in Iraq&apos;s currency exchange regime.
        </p>
        <p>
          First, the stolen 13.173 billion Iraqi Dinars were injected directly into the Qi Card operational liquidity pool. This simple action immediately laundered the funds by commingling them with the legitimate, high-volume flow of state salary and pension payments processed by the system daily. This step integrated the stolen capital into the legitimate financial system, making it nearly impossible to distinguish from legal funds.
        </p>
        <p>
          Second, the network executed a systemic exchange rate arbitrage scheme. This exploited the significant and persistent differential between the Central Bank of Iraq&apos;s official, subsidized exchange rate for the U.S. dollar and the much weaker parallel market rate. By facilitating large-volume purchases or cash withdrawals on Qi Cards outside of Iraq, the network converted the Iraqi Dinars at the highly favorable official rate. This process not only laundered the initial stolen capital but also generated substantial, ongoing profits from the currency spread, effectively weaponizing the state&apos;s own subsidy mechanism to fuel a massive capital flight and terror finance operation.
        </p>
        <p>
          This mechanism successfully converted stolen local currency into highly liquid and globally fungible U.S. dollar profits, setting the stage for the final phase of the money laundering cycle: converting those profits into durable, defensible assets.
        </p>

        <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-snug sm:leading-snug text-black mb-4 mt-8">
          4.0 The Integration Phase: Asset Diversification via Secondary Corporate Vehicles
        </h2>
        <p>
          This section focuses on two specific corporate entities: <strong>Wadi Al-Maalumat</strong> and <strong>Saqr Al-Rafidain Company</strong> for Aviation—which have been identified and flagged by Iraqi regulators.
        </p>
        <p>
          The Central Bank of Iraq&apos;s investigation specifically required the submission of corporate registration documents for Wadi Al-Maalumat and Saqr Al-Rafidain Company. The original Arabic order (and its translations) confirms the CBI sought information from all licensed banks regarding the available balances and financial transfers made by these companies and the Hadi family members (Ibrahim, Safaa, and Alaa Abdul-Hussein Hadi) to locations outside Iraq and the Kurdistan Region.
        </p>
      </div>
    </div>
  );
};

export default VideoTranscriptPlayer;

