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
          <strong>Ali Kairm Hussein Zuhair Al-Fatlawi</strong>: Currently serving as the Director General of Al-Rafidain Bank. He is specifically named in US Congressional correspondence advocating for immediate sanctions against him for his role in allowing state banks to launder US dollars on behalf of Iran and its proxies. Another piece of evidence highlighting the exposure of the Central Bank to Iranian backed terror proxies and illicit financial schemes, and by extension, Qi Card.
        </p>
        <p>
          As Director General of Al-Rafidain Bank, Al-Fatlawi is the head of the state institution that is the primary joint-venture partner of International Smart Card (Qi Card) in the Public-Private Partnership (PPP). He authored a report praising Rafidain Bank&apos;s Anti-Money Laundering (AML) leadership, in which he explicitly highlights the &quot;Collaboration with QI Card&quot; as a key factor in upgrading the bank&apos;s financial compliance systems. He states that Qi Card played a key role in supporting the bank&apos;s development of AML policies.
        </p>
        <p>
          As a reminder, the bedrock of the entire Qi Card ecosystem is its status as a Public-Private Partnership (PPP) established in 2007. This is not merely a commercial agreement but a structural integration with the Iraqi state.
        </p>
        <p>
          Partnering with Al-Rafidain Bank and Al-Rasheed Bank (Iraq&apos;s two largest state-owned banks) granted ISC a state-sanctioned monopoly over the digitization and disbursement of government salaries, pensions, and social welfare benefits.
        </p>
        <p>
          The very same partnership that Director Al-Fatlawi is praising with the Qi Card network at improving financial integrity in the Iraqi financial system, was exploited by Bahaa Abdul Hussein Hadi when he and his network gained direct access to the operational liquidity pools of state banks, and exploited this access to inject the 13.173 billion IQD in stolen bank revenues directly into the legitimate financial stream.. following his conviction for his involvement in the theft of the funds, alongside Al-Rafidain Bank officials.
        </p>

        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold leading-snug text-black mb-4 mt-8">
          <strong>Profile: Shibl al-Zaydi</strong>
        </h2>
        <p>
          <strong>Name:</strong> Shibl Mohsen Obaid al-Zaydi
        </p>
        <p>
          <strong>Current Role:</strong> Secretary-General of Kata&apos;ib al-Imam Ali (KIA) / 40th Brigade of the Popular Mobilization Forces (PMF).
        </p>
        <p>
          <strong>U.S. Status:</strong> Sanctioned as a Specially Designated Global Terrorist (SDGT) by the U.S. Treasury since November 2018.
        </p>
        <p>
          <strong>Shibl al-Zaydi</strong> is a prime example of how militia leaders in Iraq have evolved from battlefield commanders into wealthy business tycoons. As the head of <strong>Kata&apos;ib al-Imam Ali</strong>, he uses his military power to build a vast business empire. Intelligence reports describe him as one of the richest militia leaders in the country, managing a portfolio that reaches deep into Iraq&apos;s government financial systems, including the <strong>Qi Card</strong> network.
        </p>
        <p>
          &quot;...وهو أحد أبرز قادة الميليشيات و&quot;الحشد الشعبي&quot; من حيث النشاط التجاري والثراء، إذ يدير عمليات واسعة النطاق في تهريب النفط والاتصالات والتجارة والزراعة والعقارات ونظام الدفع الإلكتروني &quot;كي كارد
        </p>
        <p>
          Translation: &quot;...He is one of the most prominent militia and &apos;Popular Mobilization&apos; leaders in terms of commercial activity and wealth, as he manages large-scale operations in oil smuggling, telecommunications, trade, agriculture, real estate, and the electronic payment system &apos;Qi Card&apos;.&quot;
        </p>
        <p>
          Unlike leaders who focus solely on fighting, al-Zaydi has heavily invested in economic activities. His profile explicitly lists the management of the <strong>&quot;electronic payment system &apos;Qi Card&apos;&quot;</strong> as a key part of his business operations, alongside oil smuggling, real estate, and telecommunications.
        </p>
        <p>
          Al-Zaydi himself was designated by the <strong>U.S. Treasure Department&apos;s Office of Foreign Assets Control</strong> on November 14, 2018 for acting on behalf of Iran&apos;s Islamic Revolutionary Guard Corps-Qods Force (IRGC-QF), highlighting his role as a financial liaison who facilitates transactions and coordinates between the IRGC and armed factions in Iraq. The designation detailed his involvement in oil smuggling operations from Iran to Syria, funding Lebanese Hezbollah&apos;s operations in Syria, and mobilizing Iraqi fighters to Syria under Soleimani&apos;s direction.
        </p>
        <p>
          He worked closely with the late Qasem Soleimani, the head of the Qods Force at the time. Al-Zaydi has maintained close business ties to Hizballah officials and Hizballah financier Adham Tabaja (Tabaja). These activities have included providing protection for companies in Iraq allegedly financed by Hizballah and facilitating the movement of Hizballah funding into Iraq for investments.
        </p>
        <p>
          <strong>Kata&apos;ib al-Imam Ali (KIA)</strong>
        </p>
        <p>
          Al-Zaydi commands <strong>Kata&apos;ib al-Imam Ali</strong>, also known as the 40th Brigade of the PMF. Under his command, the organization has transitioned from an insurgency militia force into a hybrid entity that leverages state authority to secure revenue streams, specifically the exploitation of the Qi Card ecosystem and the appropriation of state resources managed by Bahaa Abdul-Hussein Hadi.
        </p>
        <p>
          The specific mechanism connecting KIA to the Qi Card network is the Public-Private Partnership (PPP) between International Smart Card (ISC) and state-owned banks. The Qi Card system processes salaries for the PMF&apos;s estimated 200,000 members. Commanders like al-Zaydi leverage their authority to control these salary disbursements, often by seizing cards or registering &quot;ghost soldiers&quot;—fictitious identities that generate salary payments collected by the militia leadership.
        </p>
        <p>
          Bahaa Abdul-Hussein Hadi provided the technological infrastructure (biometric cards and the &quot;guaranteed exchange rate&quot; mechanism) that enabled the conversion of Iraqi dinars into hard currency. Al-Zaydi, designated by the U.S. Treasury as a financial coordinator for the IRGC-Qods Force, utilized this infrastructure to industrialize threat finance. By embedding his operations within the Qi Card system, al-Zaydi facilitated the movement of liquidity from the Iraqi state budget into the operational coffers of the IRGC and Lebanese Hezbollah, effectively laundering state funds through a legitimate fintech vehicle.
        </p>
      </div>
    </div>
  );
};

export default VideoTranscriptPlayer;

