"use client";

import React, { useState } from "react";

// Types
interface Person {
  id: string;
  type: "person";
  name: string;
  nameAr?: string;
  role?: string;
  relation?: string;
  note?: string;
  highlight?: boolean;
  image?: string;
  // Dossier fields
  sanctionsRelevance?: string;
  concerns?: string[];
  associatedEntities?: string[];
  connections?: { name: string; relationship: string }[];
}

interface Company {
  id: string;
  type: "company";
  name: string;
  nameAr?: string;
  jurisdiction: "iraq" | "uae" | "saudi" | "international";
  note?: string;
  ownership?: string;
  // Dossier fields
  sanctionsRelevance?: string;
  concerns?: string[];
  keyFigures?: string[];
  connections?: { name: string; relationship: string }[];
}

type DossierItem = Person | Company;

// === DATA ===

const bahaa: Person = {
  id: "bahaa",
  type: "person",
  name: "Bahaa Abdul Hussein Abdul Hadi",
  nameAr: "بهاء عبد الحسين عبد الهادي",
  role: "Founder & Chairman",
  relation: "Principal",
  highlight: true,
  image: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/Profiles/Bahaa.png",
  sanctionsRelevance: "Principal architect of the Qi Card payment infrastructure. Explicitly named in U.S. congressional sanctions letter detailing alleged facilitation of payments to Iranian-backed militias and systematic sanctions evasion through shell company networks.",
  concerns: [
    "Alleged architect of payment systems facilitating militia financing",
    "Controls network of shell companies across Iraq, UAE, and Saudi Arabia",
    "Family members placed in key positions to maintain control",
    "Uses front owners and name variations to obscure beneficial ownership",
  ],
  associatedEntities: ["International Smart Card (ISC)", "Qi Card", "Aqsati", "Digital Zone", "Jinni", "Blanco", "Trade X"],
  connections: [
    { name: "Ali Hussein Muneam", relationship: "CEO / Direct Report" },
    { name: "Ahmed Abdul Hussein Abdul Hadi", relationship: "Brother" },
    { name: "Ammar Abdul Hussein Abdul Hadi", relationship: "Brother" },
    { name: "Trade X", relationship: "40% Shareholder" },
  ],
};

const familyMembers: Person[] = [
  bahaa,
  {
    id: "ahmed-brother",
    type: "person",
    name: "Ahmed Abdul Hussein Abdul Hadi",
    nameAr: "احمد عبد الحسين عبد الهادي",
    relation: "Brother",
    sanctionsRelevance: "Brother of principal. Part of family network maintaining control over Qi Card operations.",
    concerns: [
      "Direct family member of sanctionable principal",
      "Likely beneficial owner in corporate structure",
      "Part of coordinated family control network",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Brother (Principal)" },
    ],
  },
  {
    id: "ammar-brother",
    type: "person",
    name: "Ammar Abdul Hussein Abdul Hadi",
    nameAr: "عمار عبد الحسين عبد الهادي",
    relation: "Brother",
    sanctionsRelevance: "Brother of principal. Part of family network maintaining control over Qi Card operations.",
    concerns: [
      "Direct family member of sanctionable principal",
      "Likely beneficial owner in corporate structure",
      "Part of coordinated family control network",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Brother (Principal)" },
    ],
  },
  {
    id: "safa-brother",
    type: "person",
    name: "Safa Abdul Hussein Abdul Hadi",
    nameAr: "صفاء عبد الحسين عبد الهادي",
    relation: "Brother",
    sanctionsRelevance: "Brother of principal. Part of family network maintaining control over Qi Card operations.",
    concerns: [
      "Direct family member of sanctionable principal",
      "Likely beneficial owner in corporate structure",
      "Part of coordinated family control network",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Brother (Principal)" },
    ],
  },
  {
    id: "alaa-brother",
    type: "person",
    name: "Alaa Abdul Hussein Abdul Hadi",
    nameAr: "علاء عبد الحسين عبد الهادي",
    relation: "Brother",
    sanctionsRelevance: "Brother of principal. Part of family network maintaining control over Qi Card operations.",
    concerns: [
      "Direct family member of sanctionable principal",
      "Likely beneficial owner in corporate structure",
      "Part of coordinated family control network",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Brother (Principal)" },
    ],
  },
  {
    id: "zulfiqar-brother",
    type: "person",
    name: "Zulfiqar Jaafar",
    nameAr: "ذو الفقار جعفر",
    relation: "Brother",
    note: "Also: Jaafar Abdul Hussein Abdul Hadi",
    sanctionsRelevance: "Brother of principal using alternate name structure. Pattern consistent with efforts to obscure family connections in corporate records.",
    concerns: [
      "Uses different surname structure (Jaafar vs Abdul Hadi)",
      "Name variation may be intentional to obscure family ties",
      "Part of coordinated family control network",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Brother (Principal)" },
    ],
  },
];

const executives: Person[] = [
  {
    id: "ali-ceo",
    type: "person",
    name: "Ali Hussein Muneam",
    nameAr: "علي حسين منعم",
    role: "Chief Executive Officer",
    image: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/Profiles/Ali.jpg",
    sanctionsRelevance: "Chief Executive with direct operational control of Qi Card.",
    concerns: [
      "Operational oversight of systems flagged for potential sanctions evasion",
      "Direct report to sanctionable principal",
      "Day-to-day control of payment processing infrastructure",
    ],
    associatedEntities: ["Qi Card", "International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Ahmed Kadhim Mohammed", relationship: "Colleague (CIO)" },
      { name: "Haider Abdul Amir Dakhil", relationship: "Colleague (CFO)" },
    ],
  },
  {
    id: "ahmed-cio",
    type: "person",
    name: "Ahmed Kadhim Mohammed",
    nameAr: "احمد كاظم",
    role: "Chief Investment Officer",
    sanctionsRelevance: "Oversees investment activities and capital allocation. Position provides visibility into fund flows and potential diversion mechanisms.",
    concerns: [
      "Controls investment decisions and capital allocation",
      "Potential role in directing funds through shell company network",
      "Access to sensitive financial transaction data",
    ],
    associatedEntities: ["International Smart Card (ISC)", "Qi Card"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Ali Hussein Muneam", relationship: "Colleague (CEO)" },
    ],
  },
  {
    id: "haider-cfo",
    type: "person",
    name: "Haider Abdul Amir Dakhil",
    nameAr: "حيدر عبد الامير دخيل",
    role: "Chief Financial Officer",
    note: "Known as 'Abu Al-Hisabat' (The Accountant)",
    sanctionsRelevance: "Chief Financial Officer with control over all financial operations. Position critical to any money movement or sanctions evasion schemes.",
    concerns: [
      "Direct control over financial operations and reporting",
      "Would have visibility into all fund flows and transactions",
      "Essential position for executing any financial schemes",
    ],
    associatedEntities: ["Qi Card", "International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Ali Hussein Muneam", relationship: "Colleague (CEO)" },
    ],
  },
  {
    id: "haitham-exec",
    type: "person",
    name: "Haitham Laith",
    nameAr: "هيثم ليث",
    role: "Executive",
    note: "Known as 'Abu Jinni' — connected to Jinni subsidiary",
    sanctionsRelevance: "Executive with direct connection to Jinni subsidiary. Nickname indicates operational role in subsidiary company.",
    concerns: [
      "Subsidiary relationship may be used for fund segregation",
      "Part of executive structure reporting to principal",
    ],
    associatedEntities: ["Jinni", "Qi Card"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Jinni", relationship: "Connected subsidiary" },
    ],
  },
  {
    id: "ali-fattah",
    type: "person",
    name: "Ali Fattah",
    nameAr: "علي فتاح",
    role: "Executive",
    note: "Connected to Aqsati subsidiary",
    sanctionsRelevance: "Executive connected to Aqsati installment payments subsidiary. Position in subsidiary structure may facilitate layered transactions.",
    concerns: [
      "Connected to Aqsati subsidiary operations",
      "Installment payment systems can obscure fund origins",
      "Part of subsidiary network under principal's control",
    ],
    associatedEntities: ["Aqsati", "Qi Card"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Aqsati", relationship: "Connected subsidiary" },
    ],
  },
  {
    id: "dr-ammar",
    type: "person",
    name: "Dr. Ammar Abdul Fattah",
    nameAr: "د. عمار عبد الفتاح",
    role: "Executive",
    sanctionsRelevance: "Senior executive in organizational structure. Position indicates significant operational responsibilities.",
    concerns: [
      "Senior role in executive structure",
      "Reports to sanctionable principal",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
    ],
  },
  {
    id: "ghazwan",
    type: "person",
    name: "Ghazwan Jassem",
    nameAr: "غزوان جاسم",
    role: "Administrative Manager",
    sanctionsRelevance: "Administrative manager with operational oversight. Position provides access to internal documentation and processes.",
    concerns: [
      "Administrative control over internal operations",
      "Access to documentation and records",
      "Part of management structure under principal",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
    ],
  },
  {
    id: "ahmed-fandi",
    type: "person",
    name: "Ahmed Fandi",
    nameAr: "احمد فندي",
    role: "Legal Manager",
    sanctionsRelevance: "Legal manager overseeing compliance and legal structure. Position critical to maintaining corporate structures and responding to regulatory inquiries.",
    concerns: [
      "Oversees legal compliance and corporate structure",
      "Would be aware of shell company arrangements",
      "Key role in structuring entities to obscure ownership",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
    ],
  },
];

const iraqCompanies: Company[] = [
  {
    id: "isc",
    type: "company",
    name: "International Smart Card (ISC)",
    nameAr: "البطاقة الذكية العالمية",
    jurisdiction: "iraq",
    note: "Parent holding company / Global Smart Card",
    sanctionsRelevance: "Parent holding company for the Qi Card network. Central entity through which control is exercised over subsidiary operations.",
    concerns: [
      "Primary holding company for entire network",
      "Controlled by Bahaa Abdul Hussein Abdul Hadi",
      "Parent entity for subsidiaries used in alleged schemes",
      "Central node for fund flows across network",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi", "Ali Hussein Muneam", "Ahmed Kadhim Mohammed"],
    connections: [
      { name: "Qi Card", relationship: "Subsidiary" },
      { name: "Aqsati", relationship: "Subsidiary" },
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Chairman/Owner" },
    ],
  },
  {
    id: "qicard",
    type: "company",
    name: "Qi Card",
    nameAr: "كي كارد",
    jurisdiction: "iraq",
    note: "Primary consumer brand",
    sanctionsRelevance: "Primary consumer-facing payment brand. Processes transactions that allegedly include payments to Iranian-backed militia members and facilitates potential sanctions evasion.",
    concerns: [
      "Primary payment processing infrastructure",
      "Subject of Washington Institute investigation",
      "Allegedly processes militia-related transactions",
      "Consumer brand obscures underlying control structure",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi", "Ali Hussein Muneam"],
    connections: [
      { name: "International Smart Card (ISC)", relationship: "Parent Company" },
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Ultimate Beneficial Owner" },
    ],
  },
  {
    id: "aqsati",
    type: "company",
    name: "Aqsati",
    nameAr: "اقساطي",
    jurisdiction: "iraq",
    note: "Installment payments",
    sanctionsRelevance: "Installment payment subsidiary. Structure can be used to break up transactions and obscure fund origins or destinations.",
    concerns: [
      "Installment structure can obscure large transactions",
      "Subsidiary of ISC under principal's control",
      "Payment fragmentation useful for avoiding detection",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi", "Ali Fattah"],
    connections: [
      { name: "International Smart Card (ISC)", relationship: "Parent Company" },
      { name: "Ali Fattah", relationship: "Connected Executive" },
    ],
  },
  {
    id: "digitalzone",
    type: "company",
    name: "Digital Zone",
    nameAr: "ديجتال زون",
    jurisdiction: "iraq",
    sanctionsRelevance: "Subsidiary entity in the ISC network. Part of corporate structure under principal's control.",
    concerns: [
      "Part of subsidiary network",
      "Under control of sanctionable principal",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi"],
    connections: [
      { name: "International Smart Card (ISC)", relationship: "Parent Company" },
    ],
  },
  {
    id: "jinni",
    type: "company",
    name: "Jinni",
    nameAr: "جني",
    jurisdiction: "iraq",
    sanctionsRelevance: "Subsidiary connected to executive Haitham Laith.",
    concerns: [
      "Part of subsidiary structure for potential fund segregation",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi", "Haitham Laith"],
    connections: [
      { name: "International Smart Card (ISC)", relationship: "Parent Company" },
      { name: "Haitham Laith", relationship: "Connected Executive (Abu Jinni)" },
    ],
  },
];

const internationalCompanies: Company[] = [
  {
    id: "blanco",
    type: "company",
    name: "Blanco",
    jurisdiction: "uae",
    note: "UAE-based entity",
    sanctionsRelevance: "UAE-based entity in the network. International presence enables cross-border fund movement outside Iraqi regulatory oversight.",
    concerns: [
      "UAE jurisdiction outside Iraqi oversight",
      "Enables international fund movement",
      "Part of multi-jurisdictional structure",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Beneficial Owner" },
      { name: "Trade X", relationship: "Related UAE entity" },
    ],
  },
  {
    id: "tradex",
    type: "company",
    name: "Trade X",
    jurisdiction: "international",
    note: "UAE & Saudi Arabia operations",
    ownership: "UAE Front Owner: 50% · Bahaa: 40%",
    sanctionsRelevance: "Multi-jurisdictional entity with UAE front owner holding 50% while Bahaa retains 40%. Structure suggests use of front ownership to obscure beneficial control.",
    concerns: [
      "Uses UAE national as front owner (50%)",
      "Bahaa retains significant stake (40%)",
      "Front ownership structure obscures true control",
      "Multi-jurisdictional operations (UAE + Saudi)",
      "Pattern consistent with sanctions evasion structuring",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi", "UAE Front Owner (unnamed)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "40% Shareholder" },
      { name: "Blanco", relationship: "Related UAE entity" },
    ],
  },
];

// === COMPONENT ===

const NetworkTree: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    family: true,
    executives: true,
    iraq: true,
    international: true,
  });

  const [selectedItem, setSelectedItem] = useState<DossierItem | null>(bahaa);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelect = (item: DossierItem) => {
    setSelectedItem(item);
  };

  // Details Panel Component
  const DetailsPanel = ({ item }: { item: DossierItem | null }) => {
    if (!item) {
      return (
        <div className="h-full flex items-center justify-center text-slate-400 p-8">
          <div className="text-center">
            <div className="text-4xl mb-3">👆</div>
            <p className="text-sm">Select a person or entity to view details</p>
          </div>
        </div>
      );
    }

    const isPerson = item.type === "person";
    const person = isPerson ? (item as Person) : null;
    const company = !isPerson ? (item as Company) : null;

    return (
      <div>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-start gap-4">
              {person?.image && (
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-slate-200 flex-shrink-0"
                />
              )}
              {!isPerson && (
                <div className="w-20 h-20 rounded-lg bg-slate-100 border-2 border-slate-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">
                    {company?.jurisdiction === "iraq" ? "🇮🇶" : company?.jurisdiction === "uae" ? "🇦🇪" : "🌐"}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {item.name}
                </h2>
                {item.nameAr && (
                  <p className="text-sm text-slate-500 font-mono mt-1">{item.nameAr}</p>
                )}
                {person?.role && (
                  <span className="inline-block mt-2 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-semibold">
                    {person.role}
                  </span>
                )}
                {person?.relation && person.relation !== "Principal" && (
                  <span className="inline-block mt-2 ml-2 px-2.5 py-1 bg-red-50 text-red-700 text-xs rounded-md font-semibold">
                    {person.relation} of Bahaa
                  </span>
                )}
                {company && (
                  <span className="inline-block mt-2 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs rounded-md font-semibold">
                    {company.jurisdiction === "iraq" ? "Iraq" : company.jurisdiction === "uae" ? "UAE" : "International"} Entity
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sanctions Relevance */}
          {item.sanctionsRelevance && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Sanctions Relevance
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-red-50/50 border border-red-100 rounded-lg p-3">
                {item.sanctionsRelevance}
              </p>
            </div>
          )}

          {/* Key Concerns */}
          {item.concerns && item.concerns.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Key Concerns
              </h3>
              <ul className="space-y-2">
                {item.concerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Network Connections */}
          {item.connections && item.connections.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Network Connections
              </h3>
              <div className="space-y-2">
                {item.connections.map((conn, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-slate-50 rounded-md">
                    <span className="text-slate-400">→</span>
                    <span className="font-medium text-slate-800">{conn.name}</span>
                    <span className="text-slate-400 text-xs">({conn.relationship})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Associated Entities (for persons) */}
          {person?.associatedEntities && person.associatedEntities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Associated Entities
              </h3>
              <div className="flex flex-wrap gap-2">
                {person.associatedEntities.map((entity, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Figures (for companies) */}
          {company?.keyFigures && company.keyFigures.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Key Figures
              </h3>
              <div className="flex flex-wrap gap-2">
                {company.keyFigures.map((figure, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                    {figure}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ownership (for Trade X) */}
          {company?.ownership && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Ownership Structure
              </h3>
              <p className="text-sm font-mono text-slate-700 bg-slate-100 rounded-md p-3">
                {company.ownership}
              </p>
            </div>
          )}

          {/* Notes */}
          {item.note && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Additional Notes
              </h3>
              <p className="text-sm text-slate-600 italic">{item.note}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full lg:w-[calc(100vw-4rem)] lg:max-w-[1600px] lg:-ml-[calc((100vw-4rem-100%)/2)] lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-snug text-black mb-4">
          Beneficiary Network
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Organizational hierarchy showing family members, executive team, and corporate entities associated with the Qi Card network.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Click on any person or entity to view detailed intelligence profile.
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Panel - Tree */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto">
          {/* Root Node */}
          <div className="mb-6">
            <button
              onClick={() => handleSelect(bahaa)}
              className={`w-full text-left inline-flex items-center gap-4 px-4 py-3 rounded-lg shadow-lg transition-all ${
                selectedItem?.id === bahaa.id
                  ? "bg-slate-800 ring-2 ring-red-500 ring-offset-2"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={bahaa.image}
                  alt={bahaa.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border-2 border-slate-700"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-slate-900"></div>
              </div>
              <div>
                <div className="font-bold text-base sm:text-lg text-white">{bahaa.name}</div>
                <div className="text-xs sm:text-sm text-slate-300 font-mono">{bahaa.nameAr}</div>
                <div className="text-xs text-slate-400 mt-0.5">Founder & Chairman · International Smart Card</div>
              </div>
            </button>
          </div>

          {/* Main Branches */}
          <div className="ml-4 sm:ml-6 border-l-2 border-slate-200 space-y-6">
            
            {/* Executives Branch */}
            <div className="relative">
              <div className="absolute -left-[9px] top-4 w-4 h-[2px] bg-slate-200"></div>
              <div className="ml-6">
                <button
                  onClick={() => toggleSection('executives')}
                  className="flex items-center gap-2 mb-3 group"
                >
                  <span className={`w-6 h-6 flex items-center justify-center rounded border text-sm font-bold transition-colors ${expandedSections.executives ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    {expandedSections.executives ? '−' : '+'}
                  </span>
                  <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-slate-700 group-hover:text-slate-900">
                    Executive Team
                  </span>
                  <span className="text-xs text-slate-400 font-normal normal-case">
                    ({executives.length} members)
                  </span>
                </button>

                {expandedSections.executives && (
                  <div className="space-y-1 ml-7 border-l border-dashed border-slate-200 pl-4">
                    {executives.map((person) => (
                      <button
                        key={person.id}
                        onClick={() => handleSelect(person)}
                        className={`w-full text-left group relative py-2.5 px-3 rounded-md transition-colors ${
                          selectedItem?.id === person.id
                            ? "bg-blue-50 ring-1 ring-blue-300"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="absolute -left-[17px] top-1/2 w-3 h-[1px] bg-slate-200"></div>
                        <div className="flex items-start gap-3">
                          {person.image && (
                            <img
                              src={person.image}
                              alt={person.name}
                              className="w-10 h-10 rounded-md object-cover border border-slate-200 flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm sm:text-base font-medium text-slate-800">{person.name}</span>
                              {person.role && (
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] sm:text-xs rounded font-medium">
                                  {person.role}
                                </span>
                              )}
                            </div>
                            {person.nameAr && (
                              <div className="text-xs text-slate-400 font-mono mt-0.5">{person.nameAr}</div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Corporate Network */}
            <div className="relative pt-2">
              <div className="absolute -left-[9px] top-6 w-4 h-[2px] bg-slate-200"></div>
              <div className="ml-6">
                <div className="text-sm sm:text-base font-bold uppercase tracking-widest text-slate-700 mb-4">
                  Corporate Network
                </div>

                {/* Iraq Companies */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('iraq')}
                    className="flex items-center gap-2 mb-3 group ml-2"
                  >
                    <span className={`w-6 h-6 flex items-center justify-center rounded border text-sm font-bold transition-colors ${expandedSections.iraq ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                      {expandedSections.iraq ? '−' : '+'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-600 group-hover:text-slate-800 flex items-center gap-1.5">
                      <span className="text-lg">🇮🇶</span> Iraq-Based Entities
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      ({iraqCompanies.length})
                    </span>
                  </button>

                  {expandedSections.iraq && (
                    <div className="space-y-1 ml-9 border-l border-dashed border-amber-200 pl-4">
                      {iraqCompanies.map((company) => (
                        <button
                          key={company.id}
                          onClick={() => handleSelect(company)}
                          className={`w-full text-left group relative py-2.5 px-3 rounded-md transition-colors ${
                            selectedItem?.id === company.id
                              ? "bg-amber-50 ring-1 ring-amber-300"
                              : "hover:bg-amber-50/50"
                          }`}
                        >
                          <div className="absolute -left-[17px] top-1/2 w-3 h-[1px] bg-amber-200"></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm sm:text-base font-medium text-slate-800">{company.name}</div>
                            {company.nameAr && (
                              <div className="text-xs text-slate-400 font-mono mt-0.5">{company.nameAr}</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* International Companies */}
                <div>
                  <button
                    onClick={() => toggleSection('international')}
                    className="flex items-center gap-2 mb-3 group ml-2"
                  >
                    <span className={`w-6 h-6 flex items-center justify-center rounded border text-sm font-bold transition-colors ${expandedSections.international ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                      {expandedSections.international ? '−' : '+'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-600 group-hover:text-slate-800 flex items-center gap-1.5">
                      <span className="text-lg">🌐</span> UAE / International
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      ({internationalCompanies.length})
                    </span>
                  </button>

                  {expandedSections.international && (
                    <div className="space-y-1 ml-9 border-l border-dashed border-emerald-200 pl-4">
                      {internationalCompanies.map((company) => (
                        <button
                          key={company.id}
                          onClick={() => handleSelect(company)}
                          className={`w-full text-left group relative py-2.5 px-3 rounded-md transition-colors ${
                            selectedItem?.id === company.id
                              ? "bg-emerald-50 ring-1 ring-emerald-300"
                              : "hover:bg-emerald-50/50"
                          }`}
                        >
                          <div className="absolute -left-[17px] top-1/2 w-3 h-[1px] bg-emerald-200"></div>
                          <div className="flex items-start gap-2">
                            <span className="flex-shrink-0 text-base">
                              {company.jurisdiction === 'uae' ? '🇦🇪' : company.jurisdiction === 'saudi' ? '🇸🇦' : '🌐'}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm sm:text-base font-medium text-slate-800">{company.name}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Family Branch */}
            <div className="relative">
              <div className="absolute -left-[9px] top-4 w-4 h-[2px] bg-slate-200"></div>
              <div className="ml-6">
                <button
                  onClick={() => toggleSection('family')}
                  className="flex items-center gap-2 mb-3 group"
                >
                  <span className={`w-6 h-6 flex items-center justify-center rounded border text-sm font-bold transition-colors ${expandedSections.family ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    {expandedSections.family ? '−' : '+'}
                  </span>
                  <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-slate-700 group-hover:text-slate-900">
                    Family Members
                  </span>
                  <span className="text-xs text-slate-400 font-normal normal-case">
                    ({familyMembers.length - 1} relatives)
                  </span>
                </button>

                {expandedSections.family && (
                  <div className="space-y-1 ml-7 border-l border-dashed border-slate-200 pl-4">
                    {familyMembers.slice(1).map((person) => (
                      <button
                        key={person.id}
                        onClick={() => handleSelect(person)}
                        className={`w-full text-left group relative py-2.5 px-3 rounded-md transition-colors ${
                          selectedItem?.id === person.id
                            ? "bg-red-50 ring-1 ring-red-300"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="absolute -left-[17px] top-1/2 w-3 h-[1px] bg-slate-200"></div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm sm:text-base font-medium text-slate-800">{person.name}</span>
                            </div>
                            {person.nameAr && (
                              <div className="text-xs text-slate-400 font-mono mt-0.5">{person.nameAr}</div>
                            )}
                          </div>
                          <span className="flex-shrink-0 px-2 py-0.5 bg-red-50 text-red-700 text-[11px] sm:text-xs rounded-full font-medium">
                            {person.relation}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 pt-4 border-t border-slate-200">
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-semibold mb-3">Legend</div>
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-50 border border-red-200"></span>
                <span className="text-slate-600">Family</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-50 border border-blue-200"></span>
                <span className="text-slate-600">Executive</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-50 border border-amber-200"></span>
                <span className="text-slate-600">Iraq</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200"></span>
                <span className="text-slate-600">International</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Details */}
        <div className="bg-white border border-slate-200 rounded-xl lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto lg:sticky lg:top-6">
          <div className="border-b border-slate-200 px-4 py-3 bg-slate-50 rounded-t-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Intelligence Profile
            </h2>
          </div>
          <DetailsPanel item={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default NetworkTree;
