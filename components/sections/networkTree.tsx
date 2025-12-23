"use client";

import React, { useState, useRef } from "react";

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
  linkedin?: string;
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
  linkedin: "https://www.linkedin.com/in/bahaa-abdul-hussein/",
  sanctionsRelevance: "Identified as the Ultimate Beneficial Owner (UBO) and principal architect of the Qi Card (International Smart Card) ecosystem. He was explicitly convicted in 2021 by the Al-Karkh Criminal Court for the predicate offense of embezzling 13.173 billion IQD from Al-Rafidain Bank revenues and separately convicted for bribing the head of the National Board of Pensions to secure institutional access. Congressional correspondence has identified his network as a primary vector for financing Iranian-aligned militias (PMF) and facilitating U.S. dollar arbitrage schemes.",
  concerns: [
    "Architect of State Capture: Established and controls the 'ghost employee' payroll mechanism within the Qi Card system, which diverts estimated hundreds of millions annually to U.S.-designated terrorist organizations, including Kata'ib Hezbollah",
    "Multi-Jurisdictional Layering: Controls a complex network of offshore and domestic layering entities, including GlobalX Group and TradeX (Dubai) for cross-border value transfer, and Wadi Al-Maalumat (Iraq) for domestic fund absorption",
    "Use of Proxies: Systematically utilizes immediate family members (Ibrahim, Safaa, and Alaa Abdul-Hussein Hadi) and corporate nominees to obscure beneficial ownership and evade asset seizure orders issued by the Central Bank of Iraq",
    "Currency Arbitrage: Orchestrated the 'guaranteed exchange rate' scheme, exploiting the spread between official and parallel market rates to generate illicit USD profits, estimated at up to 21% per transaction cycle",
  ],
  associatedEntities: ["International Smart Card (ISC)", "Qi Card", "Aqsati", "Digital Zone", "Jinni", "Blanco", "Trade X", "GlobalX Group", "Wadi Al-Maalumat"],
  connections: [
    { name: "Ali Hussein Muneam", relationship: "CEO / Direct Report" },
    { name: "Ahmed Abdul Hussein Abdul Hadi", relationship: "Brother" },
    { name: "Ammar Abdul Hussein Abdul Hadi", relationship: "Brother" },
    { name: "Trade X", relationship: "40% Shareholder" },
  ],
};

// Family members array kept for reference - now merged into networkParticipants
const familyMembers: Person[] = [bahaa];

const executives: Person[] = [
  {
    id: "ali-ceo",
    type: "person",
    name: "Ali Hussein Muneam",
    nameAr: "علي حسين منعم",
    role: "Chief Executive Officer & Managing Director",
    image: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/Profiles/Ali.jpg",
    linkedin: "https://www.linkedin.com/in/ali-muneam-3662a3103/",
    sanctionsRelevance: "Serving as Chief Executive Officer and Managing Director of International Smart Card (ISC/Qi Card) since his appointment in February 2021. He holds full legal signatory power over the private sector partner (IEPS) within the Qi Card joint venture. His tenure coincides with the 50-fold increase in monthly cross-border transaction volumes (from ~$10 million to ~$500 million) flagged by U.S. Treasury officials as indicative of systemic money laundering and sanctions evasion.",
    concerns: [
      "Operational Execution: Possesses direct administrative control over the biometric verification and payment processing systems that failed to detect or prevent the enrollment of thousands of fictitious militia members",
      "Regulatory Shielding: Acts as the public-facing executive for international partnerships (e.g., Visa, Mastercard), maintaining a veneer of compliance while the underlying infrastructure facilitates high-volume illicit arbitrage",
      "Signatory Authority: Corporate minutes grant him unrestricted authority to open accounts, sign contracts, and manage banking facilities, placing him at the functional center of the network's financial flows during periods of documented fraud",
    ],
    associatedEntities: ["Qi Card", "International Smart Card (ISC)", "IEPS"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Ahmed Kadhim Mohammed", relationship: "Colleague (CIO)" },
      { name: "Haider Abdul Amir Dakhil", relationship: "Colleague (Deputy Authorized Manager)" },
    ],
  },
  {
    id: "ahmed-cio",
    type: "person",
    name: "Ahmed Kadhim Mohammed",
    nameAr: "احمد كاظم",
    role: "Chief Investment Officer",
    image: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/Profiles/AhmedK.jpg",
    linkedin: "https://www.linkedin.com/in/ahmed-k-mohammed-3929352a/",
    sanctionsRelevance: "Chief Investment Officer (CIO) for International Smart Card. In this capacity, he directs the allocation of capital generated by the Qi Card network into subsidiary ventures and external investments. His role is critical to the 'integration' phase of the money laundering cycle, where illicitly obtained funds are converted into legitimate commercial assets.",
    concerns: [
      "Capital Deployment: Oversees the strategic investment of funds derived from the core payroll monopoly into diversified portfolios, potentially including the capitalization of layering vehicles such as Digital Zone and TradeX",
      "Asset Integration: Facilitates the movement of liquidity from the high-risk Iraqi environment into broader regional markets, effectively hardening soft currency profits into defensible assets",
      "Cross-Border Facilitation: Actively courts international technology and financial partners, creating commercial entanglements that complicate external sanctions enforcement and legitimize the network's capital base",
    ],
    associatedEntities: ["International Smart Card (ISC)", "Qi Card", "Digital Zone", "TradeX"],
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
    role: "Deputy Authorized Manager",
    note: "Known as 'Abu Al-Hisabat' (The Accountant) · Contingent Executive Authority",
    sanctionsRelevance: "Identified in corporate minutes as the designated Deputy Authorized Manager for the Iraqi Company for Information Technology and Modern Technologies (a core shareholder of Qi Card). He possesses contingent executive authority granting him full signatory powers equivalent to the Managing Director, Ali Hussein Muneam, during any absence. This legal structuring ensures the continuity of the network's command-and-control capabilities over banking facilities, customs clearance, and state contract management, preventing operational paralysis if primary leadership is detained or sanctioned.",
    concerns: [
      "Continuity of Command: His appointment ensures redundancy in the network's leadership structure, allowing for the uninterrupted execution of financial transfers and administrative decisions should the primary Authorized Manager be incapacitated by legal action",
      "Signatory Authority: Corporate documents grant him the power to 'open current and savings accounts,' 'withdraw and deposit funds,' and 'sign on all banking facilities,' placing him in a position to authorize the movement of illicit capital through the formal banking sector",
      "Customs and Trade Integration: Holds specific authority to approach Customs, clear goods, and manage shipping documents, a critical function for facilitating the trade-based money laundering (TBML) schemes alleged in the network's cross-border operations",
    ],
    associatedEntities: ["Qi Card", "International Smart Card (ISC)", "Iraqi Company for Information Technology and Modern Technologies"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Ali Hussein Muneam", relationship: "Primary Authorized Manager" },
    ],
  },
  {
    id: "haitham-exec",
    type: "person",
    name: "Haitham Laith",
    nameAr: "هيثم ليث",
    role: "Executive",
    note: "Known as 'Abu Jinni' — Jinni/GlobalX/TradeX linkage",
    sanctionsRelevance: "Operational executive linked to Jinni (Gini), the network's trade automation and digital logistics subsidiary. Jinni functions as the technological bridge between the Iraqi domestic market and the UAE-based GlobalX/TradeX ecosystem. By digitizing the documentation of cross-border trade (invoices, manifests), this entity reduces the physical audit trail available to customs inspectors, thereby facilitating Trade-Based Money Laundering (TBML).",
    concerns: [
      "Digitization of Money Laundering: Oversees the platform responsible for automating B2B transactions between Iraq and Dubai, a corridor identified as high-risk for capital flight and over-invoicing schemes",
      "Obfuscation of Origin: The Jinni platform integrates with the Qi Card payment gateway, allowing for the rapid settlement of trade invoices that may lack underlying physical goods, effectively scrubbing the origin of funds through 'digital commerce'",
      "Cross-Border Linkage: Serves as the functional link between the domestic collection of funds (via Qi Card) and their integration into the Dubai financial system, enabling the network to move value out of Iraq under the guise of legitimate technology and logistics services",
    ],
    associatedEntities: ["Jinni", "Qi Card", "GlobalX Group", "TradeX"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Jinni", relationship: "Connected subsidiary" },
      { name: "TradeX", relationship: "Cross-border integration" },
    ],
  },
  {
    id: "ali-fattah",
    type: "person",
    name: "Ali Fattah",
    nameAr: "علي عبد الجبار فتاح",
    role: "CEO of Aqsati · CBI Target #5",
    image: "https://mcrtnvfubthcnkolvjcp.supabase.co/storage/v1/object/public/Profiles/alifattah.jpg",
    linkedin: "https://www.linkedin.com/in/ali-abdulfattah-baa161123/?originalSubdomain=iq",
    note: "Full name: Ali Abdul Jabbar Fattah · Named in CBI Asset Seizure Order No. 9/7/125",
    sanctionsRelevance: "Identified as Ali Abdul Jabbar Fattah, he is the CEO of Aqsati (Aksati) installment payment subsidiary, the primary installment engine for the QiCard financial empire. Explicitly named as Target #5 in the Central Bank of Iraq (CBI) Secret & Urgent Asset Seizure Order (No. 9/7/125), alongside Bahaa Abdul-Hussein and his immediate family. This designation by the CBI confirms his status as a core financial proxy and asset holder within the immediate circle of the primary target.",
    concerns: [
      "Capital Capture via Debt: Manages the 'Aqsati' BNPL (Buy Now, Pay Later) system, which deducts installment payments directly from state employees' salaries. This mechanism creates a 'closed-loop' financial system where government funds are captured immediately upon disbursement, preventing leakage into the wider economy",
      "Regulatory Target: His inclusion in the specific list of individuals whose cross-border transfers were scrutinized by the CBI indicates his role in moving funds outside of Iraq and the Kurdistan Region on behalf of the Hadi network",
      "Asset Layering: Positioned within the subsidiary structure to manage the liquidity generated from consumer debt, effectively converting state payroll obligations into private corporate revenue streams for the network",
    ],
    associatedEntities: ["Aqsati", "Qi Card", "International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Aqsati", relationship: "CEO" },
    ],
  },
  {
    id: "dr-ammar",
    type: "person",
    name: "Dr. Ammar Abdul Fattah",
    nameAr: "د. عمار عبد الجبار فتاح الجاف",
    role: "Founder of Injaz · CBI Target #4",
    note: "Full name: Ammar Abdul Jabbar Fattah Al-Jaf · Named in CBI Asset Seizure Order No. 9/7/125",
    sanctionsRelevance: "The founder of Injaz and 10% shareholder of TradeX, explicitly identified as Target #4 in the Central Bank of Iraq (CBI) Secret & Urgent Asset Seizure Order (No. 9/7/125) dated October 4, 2020. His inclusion on this restrictive list, immediately following Bahaa Abdul-Hussein and his brothers (Ibrahim, Safaa), categorizes him as a Tier 1 financial proxy. The CBI mandate specifically targeted his accounts for facilitating financial transfers 'outside Iraq and the Kurdistan Region,' indicating his central role in the network's capital flight mechanism.",
    concerns: [
      "High-Level Asset Controller: His placement on the seizure list alongside the immediate Hadi family suggests he holds beneficial ownership or signatory authority over critical offshore accounts used to integrate laundered funds",
      "Capital Flight Execution: Implicated in the movement of illicit proceeds from the domestic banking sector to foreign jurisdictions, consistent with the 'Integration' phase of the money laundering cycle described in forensic reports",
      "Family-Level Trust: His grouping with the Hadi family in regulatory actions implies a position of absolute trust, likely managing assets that the principal (Bahaa) could not hold in his own name due to scrutiny",
    ],
    associatedEntities: ["International Smart Card (ISC)", "Injaz"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Injaz", relationship: "Founder" },
    ],
  },
  {
    id: "ghazwan",
    type: "person",
    name: "Ghazwan Jassem",
    nameAr: "غزوان جاسم",
    role: "Administrative Manager",
    note: "Key control point for Ghost Employee scheme oversight",
    sanctionsRelevance: "Functions as the Administrative Manager with operational oversight of the Qi Card internal ecosystem. In the context of the documented 'Ghost Employee' scheme, the administrative function is the critical control point for reconciling the massive discrepancies between legitimate payroll data and the inflated roster of fictitious identities used to siphon state funds.",
    concerns: [
      "Payroll Manipulation Oversight: Occupies the administrative vantage point necessary to oversee the 'origination' phase of the fraud, where bulk Qi Cards are issued to fictitious names on ministry payrolls",
      "Internal Accounting Swaps: Positioned to manage the internal ledgers that facilitate the 'internal swap' mechanism, where digital salary balances are transferred to agent accounts without corresponding physical cash payouts, a core component of the laundering process",
      "Operational Complicity: Administrative control implies knowledge of the logistical movement of bulk cards to exchange houses (hawaladars), shielding the network's 'cash-out' operations from internal audit",
    ],
    associatedEntities: ["International Smart Card (ISC)", "Qi Card"],
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
    note: "Corporate Layering Architect · Shell Company Structuring",
    sanctionsRelevance: "Legal Manager responsible for the corporate architecture that shields the network's Ultimate Beneficial Owners (UBOs). His role is central to the 'Layering' phase, specifically the creation and maintenance of the secondary corporate vehicles—such as Wadi Al-Maalumat and Saqr Al-Rafidain—that were used to absorb illicit proceeds under the guise of legitimate commercial equity.",
    concerns: [
      "Corporate Layering Architect: Oversees the registration and structuring of shell companies used to obfuscate the origin of funds, ensuring they meet regulatory requirements (such as 'bank support' for capitalization) while hiding the true source of capital",
      "Regulatory Evasion: Tasked with navigating the legal loopholes that allow the network to violate International Accounting Standard 24 (Related Party Disclosures) by channeling funds between affiliated entities without proper disclosure",
      "Beneficial Ownership Obfuscation: Critical to the strategy of using nominee shareholders to distance Bahaa Abdul-Hussein from the assets acquired via the currency arbitrage scheme, thereby frustrating asset recovery efforts",
    ],
    associatedEntities: ["International Smart Card (ISC)", "Wadi Al-Maalumat", "Saqr Al-Rafidain"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
    ],
  },
  {
    id: "mohammed-zuhdi",
    type: "person",
    name: "Mohammed Zuhdi Abdul Hadi",
    nameAr: "محمد زهدي عبد الهادي",
    role: "Chief Cyber Security Officer",
    note: "Also serves as Authorized Manager of shell company Wadi Al-Maalumat",
    sanctionsRelevance: "QiCard's Chief Cyber Security Officer simultaneously serving as the operational front for documented shell company Wadi Al-Maalumat. Was granted sweeping powers over the shell company on April 22, 2020—just 5 months before Bahaa's September 2020 arrest. Timing suggests asset protection planning.",
    concerns: [
      "Dual role: Senior QiCard executive AND shell company manager",
      "Controls Wadi Al-Maalumat despite only 30% ownership (classic nominee arrangement)",
      "Granted 8 sweeping powers: signing contracts, controlling bank accounts, full legal representation",
      "Power grant timing coincides with period before Bahaa's arrest",
      "Shell company registered 1 month after Bahaa's first conviction",
    ],
    associatedEntities: ["Qi Card", "International Smart Card (ISC)", "Wadi Al-Maalumat"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Reports to (Chairman)" },
      { name: "Wadi Al-Maalumat", relationship: "Authorized Manager (30% owner)" },
      { name: "Najm Hadi Najm", relationship: "Nominee co-owner at Wadi Al-Maalumat" },
    ],
  },
  // PMF-Linked Individuals (via SuperCell/Digital Zone Partnership)
  {
    id: "falah-fayyadh",
    type: "person",
    name: "Falah al-Fayyadh",
    nameAr: "فالح الفياض",
    role: "PMF Chairman (U.S. SANCTIONED)",
    sanctionsRelevance: "Chairman of the Popular Mobilization Forces. Designated by OFAC in December 2019 for human rights abuses. His brother Ghazzi controls SuperCell Internet Services, which entered an official partnership with Qi Card's Digital Zone in March 2025. Also co-manages U.S.-designated Muhandis General Company alongside Kata'ib Hezbollah's Abu Fadak. This creates a direct link between Bahaa's network and U.S.-sanctioned PMF leadership.",
    concerns: [
      "OFAC designated December 2019 (human rights abuses)",
      "Brother controls SuperCell (Qi Card/Digital Zone partner)",
      "Co-manages U.S.-designated Muhandis General Company",
      "Qi Card partnership routes revenue to his family network",
    ],
    associatedEntities: ["SuperCell Internet Services", "Muhandis General Company"],
    connections: [
      { name: "Ghazzi Faisal Fahad al-Fayyadh", relationship: "Brother (SuperCell owner)" },
      { name: "Digital Zone", relationship: "Brother's company is official partner" },
    ],
  },
  {
    id: "ghazzi-fayyadh",
    type: "person",
    name: "Ghazzi Faisal Fahad al-Fayyadh",
    nameAr: "غازي فيصل فهد الفياض",
    role: "SuperCell Beneficial Owner",
    sanctionsRelevance: "Beneficial owner of SuperCell Internet Services (Mahwar al-Kimma), which partnered with Qi Card's Digital Zone in March 2025. Brother of U.S.-sanctioned PMF Chairman Falah al-Fayyadh. Uses same accountant (Hossein Abdal Zahra al-Azzawi) identified in PMF oil smuggling and sanctions evasion networks. Controls corporate cluster including Atlas and Enkidu.",
    concerns: [
      "Brother of U.S.-sanctioned PMF Chairman",
      "SuperCell is official Qi Card/Digital Zone partner",
      "Same accountant as PMF oil smuggling networks",
      "Controls corporate cluster (SuperCell, Atlas, Enkidu)",
    ],
    associatedEntities: ["SuperCell Internet Services", "Atlas", "Enkidu"],
    connections: [
      { name: "Falah al-Fayyadh", relationship: "Brother (U.S. sanctioned PMF Chairman)" },
      { name: "Digital Zone", relationship: "SuperCell partnership (March 2025)" },
    ],
  },
  // Family Members
  {
    id: "ahmed-brother",
    type: "person",
    name: "Ahmed Abdul Hussein Abdul Hadi",
    nameAr: "احمد عبد الحسين عبد الهادي الزبيدي",
    role: "Family Member · Authorized Manager of Al-Sahel Company",
    note: "Full name: Ahmed Abdulhussain Abdulhadi Al-Zubaidi · Real Estate Layering Vehicle Manager",
    sanctionsRelevance: "Identified in judicial documents as the Authorized Manager of Al-Sahel Company for Real Estate, Agricultural, and Industrial Investments. This entity functions as a specialized layering vehicle within the network's 'Integration' phase, specifically tasked with converting illicit financial proceeds into tangible real estate assets. He is the brother of the principal, Bahaa Abdul-Hussein, and his role confirms the family's direct control over the network's non-financial diversification strategies.",
    concerns: [
      "Real Estate Layering: Testimony provided to the Rusafa Investigation Court confirms his management of Al-Sahel Company, which was used to secure high-value investment licenses (License No. 2017/377) for large-scale construction projects, including a $54 million sports complex and mall",
      "Asset Hardening: His operational role facilitates the conversion of liquid funds—potentially derived from the Qi Card currency arbitrage scheme—into fixed commercial real estate, thereby 'hardening' the assets against seizure and obscuring the audit trail of the original funds",
      "Family Proxy: As a direct sibling of the principal target, his placement in the real estate sector ensures that the network's most valuable physical assets remain under strict family beneficial ownership, circumventing standard corporate governance checks",
    ],
    associatedEntities: ["International Smart Card (ISC)", "Al-Sahel Company"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Brother (Principal)" },
      { name: "Al-Sahel Company", relationship: "Authorized Manager" },
    ],
  },
  {
    id: "ammar-brother",
    type: "person",
    name: "Ammar Abdul Hussein Abdul Hadi",
    nameAr: "عمار عبد الحسين عبد الهادي",
    role: "Family Member · Nominee Shareholder",
    note: "Part of coordinated asset dispersion strategy",
    sanctionsRelevance: "Immediate family member of the principal target, Bahaa Abdul-Hussein. Within the forensic context of the CBI's investigation into the Hadi family, the inclusion of brothers serves to fragment the placement of illicit capital. His role is consistent with the network's modus operandi of using immediate kin as nominee shareholders to dilute the visible concentration of wealth and evade beneficial ownership transparency requirements.",
    concerns: [
      "Nominee Ownership Risk: Functions as a likely nominee shareholder, holding equity in secondary or tertiary shell companies to obscure the Ultimate Beneficial Owner (UBO), Bahaa Abdul-Hussein",
      "Coordinated Asset Dispersion: His participation allows the network to split large capital deposits across multiple family-held accounts, complicating the tracking of aggregate funds by financial intelligence units (FIUs)",
      "Legacy Preservation: As a direct beneficiary of the network's activities, he represents a continuity risk; assets transferred to his name remain accessible to the principal even if the primary entities (ISC/Qi Card) face regulatory designation",
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
    role: "Family Member · CBI Target #3",
    note: "Named in CBI Asset Seizure Order No. 9/7/125 (October 4, 2020)",
    sanctionsRelevance: "Explicitly designated as Target #3 in the Central Bank of Iraq (CBI) Secret & Urgent Asset Seizure Order (No. 9/7/125) dated October 4, 2020. This regulatory action specifically targeted her accounts for facilitating financial transfers 'outside Iraq and the Kurdistan Region.' Her inclusion in the top tier of the seizure list, immediately following Bahaa and Ibrahim, identifies her as a primary operator in the network's capital flight mechanism.",
    concerns: [
      "Capital Flight Execution: The CBI investigation specifically flagged involvement in moving funds abroad, corroborating intelligence that Bahaa's network utilized family members to smuggle cards and transfer arbitrage profits to regional financial hubs (UAE, Jordan, Turkey)",
      "Financial Facilitator: The specific listing by the Banking Supervision Department indicates she held signatory authority over accounts used to aggregate and transfer the proceeds of the currency arbitrage scheme before they were layered into offshore vehicles",
      "Regulatory Evasion: Her role was integral to the network's strategy of bypassing capital controls; by distributing cross-border transfers through her personal accounts, the network attempted to avoid the scrutiny applied to corporate transfers from Qi Card/ISC",
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
    nameAr: "علاء عبد الحسين عبد الهادي الزبيدي",
    role: "Family Member · Major Shareholder (10M shares)",
    note: "Full name: Alaa Abdul-Hussein Abdul-Hadi Al-Zubaidi · Shareholder Proxy",
    sanctionsRelevance: "She is identified in corporate registry documents as a major shareholder, holding 10,000,000 shares in key network entities.",
    concerns: [
      "Shareholder Proxy: Corporate records confirm status as a substantial equity holder (10 million shares) in layering companies, a mechanism used to fragment ownership and dilute the visible control of the principal, Bahaa Abdul-Hussein, while retaining assets within the immediate family structure",
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
    nameAr: "ذو الفقار علي جعفر",
    role: "Family Member · Authorized Manager",
    note: "Full name: Zulfiqar Ali Jaafar · Also: Jaafar Abdul Hussein Abdul Hadi · Uses alternate name structure",
    sanctionsRelevance: "Identified in Ministry of Trade corporate registration documents as the Authorized Manager (Managing Director) for network-affiliated technology entities. His executive status grants him full signatory authority over corporate operations, enabling the execution of contracts and financial transactions without requiring the direct signature of the Ultimate Beneficial Owner (UBO).",
    concerns: [
      "Operational Signatory: As the registered Authorized Manager, he possesses the legal power to bind the company in financial and commercial agreements",
      "Uses different surname structure (Jaafar vs Abdul Hadi) — name variation may be intentional to obscure family ties in corporate filings",
      "Part of coordinated family control network enabling operational continuity",
    ],
    associatedEntities: ["International Smart Card (ISC)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Brother (Principal)" },
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
    note: "Holding Company · Public-Private Partnership · Founded 2007",
    sanctionsRelevance: "Parent holding company and legal foundation of the entire Qi Card ecosystem. Established in 2007 as a Public-Private Partnership with Iraq's two largest state-owned banks—Rafidain Bank and Rasheed Bank—along with the Iraqi Electronic Payment System. This structural integration with the Iraqi state processes government salaries, pensions, and social welfare payments for millions of Iraqi citizens. The company's exclusive access to state payment infrastructure creates a uniquely powerful position: any sanctions evasion or illicit fund flows would operate through channels that are fundamentally intertwined with legitimate government operations, making detection extremely difficult.",
    concerns: [
      "Public-Private Partnership with Rafidain Bank and Rasheed Bank (state-owned)",
      "Processes government salaries, pensions, and social welfare for millions",
      "11+ million cardholders across Iraq",
      "23,000+ POS terminals nationwide",
      "Exclusive access to Iraqi state payment infrastructure",
      "Integration with government makes illicit flows difficult to detect",
      "Central node through which all subsidiary transactions flow",
      "Bahaa exercises control as Chairman despite criminal convictions",
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
    note: "Consumer Payment Brand · 11M+ Cardholders · 23,000+ POS Terminals",
    sanctionsRelevance: "Primary consumer-facing payment brand and the public face of the ISC network. This is the brand that millions of Iraqis interact with daily for government salary payments, pension disbursements, and retail transactions. Explicitly named in U.S. congressional sanctions letters as the vehicle through which payments to Iranian-backed militia members allegedly flow. The scale is significant: over 11 million cardholders and 23,000 POS terminals means Qi Card touches virtually every sector of the Iraqi economy. The platform's integration with government payroll systems means that any militia members on government payrolls would receive payments through this infrastructure.",
    concerns: [
      "11+ million active cardholders across Iraq",
      "23,000+ point-of-sale terminals nationwide",
      "Processes Iraqi government payroll disbursements",
      "Named in U.S. congressional sanctions correspondence",
      "Platform allegedly used for militia salary payments",
      "Consumer brand creates legitimacy shield for parent structure",
      "Dominant market position makes it systemically important",
      "Any militia on government payroll receives funds via Qi Card",
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
    note: "Installment Payments Platform · Consumer Credit · Structuring Risk",
    sanctionsRelevance: "Installment payment and consumer credit subsidiary that introduces a critical capability to the network: transaction structuring. By breaking large payments into smaller installments, this platform can fragment fund flows in ways that avoid detection thresholds. The installment model means funds can be disbursed over time rather than in suspicious lump sums. This is a textbook structuring mechanism—converting what might be a flagged large transaction into multiple smaller payments that individually fall below reporting thresholds. Executive Ali Fattah's connection to this specific subsidiary is notable given its structuring capabilities.",
    concerns: [
      "Installment model enables transaction structuring",
      "Fragments large payments into smaller unflagged amounts",
      "Payments can be timed to avoid detection thresholds",
      "Consumer credit function obscures ultimate fund destinations",
      "Executive Ali Fattah specifically connected to this entity",
      "Textbook mechanism for avoiding AML reporting triggers",
      "Integrates with Qi Card infrastructure for seamless layering",
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
    note: "Acquired by Qi Card 2022 · 5M+ Users · SuperCell Partnership Mar 2025",
    sanctionsRelevance: "Digital commerce platform acquired by Qi Card in 2022, now serving as the retail gateway for millions of government salary recipients. In March 2025, Digital Zone announced an official partnership with SuperCell Internet Services—a company controlled by Ghazzi al-Fayyadh, brother of U.S.-sanctioned PMF Chairman Falah al-Fayyadh. This creates a closed-loop threat finance system where Iraqi government salaries flow through Qi Card → Digital Zone → SuperCell → directly into companies controlled by the PMF Chairman's family. The biometric backend is provided by TrueID (formerly 'BioQI'), an Indian firm whose original name explicitly referenced Qi Card.",
    concerns: [
      "Official March 2025 partnership with PMF-linked SuperCell",
      "SuperCell owned by brother of U.S.-sanctioned PMF Chairman",
      "Creates closed-loop: Qi Card → Digital Zone → SuperCell → PMF family",
      "5 million+ active users, 41 million+ orders processed",
      "Biometric backend by TrueID (formerly 'BioQI'—named after Qi Card)",
      "Revenue flows directly to militia-controlled entities",
      "Expanding to Saudi Arabia—potential 'Trojan Horse' risk",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi", "Saif al-Mufti (CEO)"],
    connections: [
      { name: "International Smart Card (ISC)", relationship: "Parent Company (acquired 2022)" },
      { name: "SuperCell Internet Services", relationship: "Official Partner (March 2025)" },
    ],
  },
  {
    id: "jinni",
    type: "company",
    name: "Jinni",
    nameAr: "جني",
    jurisdiction: "iraq",
    note: "Digital Wallet Services · Mobile Payments · Fund Segregation",
    sanctionsRelevance: "Digital wallet and mobile payment subsidiary with direct executive oversight from Haitham Laith. The Jinni platform enables rapid peer-to-peer transfers and mobile top-ups—capabilities that are useful for moving smaller amounts quickly without the paper trail of formal banking. Digital wallets are increasingly scrutinized by regulators precisely because they can facilitate rapid, hard-to-trace value transfers.",
    concerns: [
      "Digital wallet enables rapid peer-to-peer transfers",
      "Mobile payments harder to trace than bank transactions",
      "Executive Haitham Laith has direct operational oversight",
      "Platform enables quick value movement without banking trails",
      "Wallet-to-wallet transfers avoid traditional AML triggers",
      "Mobile top-up functions can be used for value conversion",
      "Direct executive connection suggests operational importance",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi", "Haitham Laith"],
    connections: [
      { name: "International Smart Card (ISC)", relationship: "Parent Company" },
      { name: "Haitham Laith", relationship: "Connected Executive" },
    ],
  },
  {
    id: "wadi-almaalumat",
    type: "company",
    name: "Wadi Al-Maalumat",
    nameAr: "شركة وادي المعلومات لتكنولوجيا المعلومات المحدودة",
    jurisdiction: "iraq",
    note: "HIGH CONFIDENCE SHELL · IT/Biometrics · Capital: 50M IQD · Est. Feb 2021",
    ownership: "Mohammed Zuhdi Abdul Hadi: 30% (Managing Director) · Najm Hadi Najm: 70% (Passive Nominee)",
    sanctionsRelevance: "Textbook shell company exhibiting every classic indicator of nominee ownership and asset protection structuring. QiCard's Chief Cyber Security Officer Mohammed Zuhdi Abdul Hadi serves as operational front despite holding only 30% ownership—the 70% 'owner' Najm Hadi Najm appears entirely passive with no operational role. The timing is damning: company registered February 2021, exactly one month after Bahaa's first criminal conviction. Powers granted to Mohammed Zuhdi in April 2020 included signing ALL contracts, controlling bank accounts, and full legal representation—sweeping authority inconsistent with minority ownership. Business activities (biometrics, facial recognition, fingerprint systems) directly complement and could integrate with Qi Card's payment verification infrastructure, suggesting this is not an independent venture but an extension of the network.",
    concerns: [
      "Minority shareholder (30%) controls company as Managing Director",
      "70% owner Najm Hadi Najm has no operational role—classic nominee",
      "Registered one month after Bahaa's first conviction (Feb 2021)",
      "Sweeping powers granted to Mohammed Zuhdi in April 2020",
      "Powers include: ALL contracts, bank accounts, full legal representation",
      "Biometrics/facial recognition directly complements Qi Card infrastructure",
      "Suspicious share transfers 2 months before Bahaa's September 2020 arrest",
      "Timing suggests asset protection planning during legal troubles",
    ],
    keyFigures: ["Mohammed Zuhdi Abdul Hadi", "Najm Hadi Najm"],
    connections: [
      { name: "Mohammed Zuhdi Abdul Hadi", relationship: "Managing Director (30% owner)" },
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Beneficial Owner (via executive)" },
      { name: "Qi Card", relationship: "Infrastructure complement" },
    ],
  },
  {
    id: "saqr-alrafidain",
    type: "company",
    name: "Saqr Al-Rafidain",
    nameAr: "صقر الرافدين للطيران والشحن الجوي",
    jurisdiction: "iraq",
    note: "Aviation & Air Cargo · Capital: 1.5 BILLION IQD · Najaf HQ · Cross-Border Capability",
    sanctionsRelevance: "Heavily-capitalized aviation and air cargo company representing a dramatic departure from the IT-focused shell companies. With 1.5 Billion IQD in registered capital (approximately 30x the IT shells), this entity has the resources for significant physical operations. Critically, it is headquartered in Najaf—a city with documented heavy presence of Iranian-backed militia groups including elements affiliated with Kata'ib Hezbollah and other Popular Mobilization Forces (PMF) factions. Aviation and cargo capabilities provide something the digital payment infrastructure cannot: physical cross-border movement of funds, goods, or personnel outside normal banking channels. This creates a complete ecosystem—digital payments for traceable transactions, physical aviation for moving value that cannot or should not go through electronic systems.",
    concerns: [
      "Capital of 1.5 Billion IQD—30x larger than IT shell companies",
      "Headquartered in Najaf, major Iranian-backed militia stronghold",
      "Aviation enables physical cross-border movement outside banking",
      "Air cargo can transport value (cash, goods) without electronic trail",
      "Completes the ecosystem: digital payments + physical logistics",
      "Najaf has documented Kata'ib Hezbollah and PMF presence",
      "International aircraft crew training suggests operational sophistication",
      "Physical capability for what digital infrastructure cannot move",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "Connected via network" },
      { name: "International Smart Card (ISC)", relationship: "Part of corporate network" },
    ],
  },
  {
    id: "supercell",
    type: "company",
    name: "SuperCell Internet Services",
    nameAr: "محور القمة (Mahwar al-Kimma)",
    jurisdiction: "iraq",
    note: "⚠️ PMF-LINKED · ISP/Fiber Optic · Fayyadh Family Controlled",
    sanctionsRelevance: "Iraqi ISP identified by CTC Sentinel (West Point) as controlled by Ghazzi Faisal Fahad al-Fayyadh—brother of U.S.-sanctioned PMF Chairman Falah al-Fayyadh. In March 2025, SuperCell entered an official partnership with Qi Card's Digital Zone. Uses the same accountant (Hossein Abdal Zahra al-Azzawi) identified in PMF oil smuggling and sanctions evasion networks. Controls significant portion of Iraq's internet infrastructure including IP registration—providing surveillance capability over domestic communications.",
    concerns: [
      "Owned by Ghazzi al-Fayyadh (brother of U.S.-sanctioned PMF Chairman)",
      "Official partnership with Qi Card/Digital Zone (March 2025)",
      "Same accountant as PMF oil smuggling networks",
      "Controls Iraq internet infrastructure and IP registration",
      "Part of Fayyadh corporate cluster (Atlas, Enkidu)",
      "Revenue from Qi Card users flows to PMF Chairman's family",
    ],
    keyFigures: ["Ghazzi Faisal Fahad al-Fayyadh", "Falah al-Fayyadh (brother)"],
    connections: [
      { name: "Digital Zone", relationship: "Official Partner (March 2025)" },
      { name: "Falah al-Fayyadh", relationship: "Brother of beneficial owner" },
    ],
  },
  {
    id: "muhandis-gc",
    type: "company",
    name: "Muhandis General Company",
    nameAr: "شركة المهندس العامة",
    jurisdiction: "iraq",
    note: "⚠️ U.S. DESIGNATED · Fiber Optic Infrastructure · PMF Controlled",
    sanctionsRelevance: "Named after Abu Mahdi al-Muhandis (killed in Soleimani strike). Managed by Falah al-Fayyadh and Kata'ib Hezbollah's Abu Fadak. Designated by the United States as a front for militia operations and threat financing. Awarded the 'National Alternate Fiber Optic Network' contract—1,152 km of cable across northern, eastern, and Baghdad routes (~$24M). Building parallel communications grid similar to Lebanese Hezbollah, enabling surveillance and internet blocking in cross-sectarian areas.",
    concerns: [
      "U.S. DESIGNATED as terrorist front",
      "Managed by PMF Chairman and Kata'ib Hezbollah's Abu Fadak",
      "Awarded $24M national fiber optic network contract",
      "Building Hezbollah-style parallel communications grid",
      "Enables Deep Packet Inspection and internet blocking",
      "Physical control over data infrastructure",
    ],
    keyFigures: ["Falah al-Fayyadh", "Abu Fadak (Kata'ib Hezbollah)"],
    connections: [
      { name: "SuperCell Internet Services", relationship: "Infrastructure synergy" },
      { name: "Kata'ib Hezbollah", relationship: "Co-managed by Abu Fadak" },
    ],
  },
];

const internationalCompanies: Company[] = [
  {
    id: "blanco",
    type: "company",
    name: "Blanco",
    jurisdiction: "uae",
    note: "UAE Jurisdiction · International Gateway · Outside Iraqi Oversight",
    sanctionsRelevance: "UAE-registered entity serving as the network's international gateway. The UAE's position as a global financial hub with significant Iraqi expatriate business community makes it ideal for offshore fund movement. Blanco operates entirely outside Iraqi regulatory oversight, meaning transactions through this entity face different (often lighter) scrutiny than domestic Iraqi operations. The UAE has historically been identified by international bodies as a jurisdiction requiring enhanced due diligence for Iraq-connected entities. This entity provides the critical international node that allows funds to exit the Iraqi regulatory environment and enter global financial flows.",
    concerns: [
      "UAE jurisdiction entirely outside Iraqi regulatory oversight",
      "Dubai/UAE identified as requiring enhanced Iraq due diligence",
      "International gateway for fund movement",
      "Significant Iraqi business community provides cover",
      "Enables conversion between Iraqi dinars and hard currency",
      "Part of multi-jurisdictional structure designed for layering",
      "Connected to Trade X for expanded regional operations",
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
    note: "Multi-Jurisdictional · UAE + Saudi Operations · Front Ownership Structure",
    ownership: "UAE National (Front): 50% · Bahaa: 40% · Dr. Ammar Abdul Fattah: 10%",
    sanctionsRelevance: "Multi-jurisdictional entity exhibiting classic front ownership structuring. A UAE national holds 50% ownership on paper, while Bahaa retains a disclosed 40% stake, and the remaining 10% to Dr. Ammar Abdul Fattah—a structure that allows Bahaa to claim minority status while potentially exercising actual control through side agreements or informal arrangements. Operations span both UAE and Saudi Arabia, creating a regional footprint across Gulf Cooperation Council (GCC) states. This multi-jurisdictional structure means investigators must coordinate across multiple regulatory regimes to trace fund flows. The use of a local national as majority owner is a textbook technique for obscuring foreign beneficial ownership in GCC jurisdictions, where local partnership requirements often create convenient cover for such arrangements.",
    concerns: [
      "UAE national holds 50% as apparent front owner",
      "Bahaa retains 40%—significant despite 'minority' status",
      "Side agreements may give Bahaa actual control",
      "Operations span UAE and Saudi Arabia",
      "Multi-jurisdictional structure complicates investigations",
      "GCC local partnership rules provide cover for front ownership",
      "Pattern consistent with sanctions evasion structuring",
      "Regional footprint enables diversified fund movement",
    ],
    keyFigures: ["Bahaa Abdul Hussein Abdul Hadi", "UAE National (Front Owner)"],
    connections: [
      { name: "Bahaa Abdul Hussein Abdul Hadi", relationship: "40% Shareholder" },
      { name: "Blanco", relationship: "Related UAE entity" },
    ],
  },
];

// === COMPONENT ===

const NetworkTree: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    executives: true,
    iraq: true,
    international: true,
  });

  const [selectedItem, setSelectedItem] = useState<DossierItem | null>(bahaa);
  const detailsPanelRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelect = (item: DossierItem) => {
    setSelectedItem(item);
    // On mobile, scroll to the details panel
    if (window.innerWidth < 1024 && detailsPanelRef.current) {
      setTimeout(() => {
        detailsPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
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
                {person?.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs rounded-md font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
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
                    Network Participants
                  </span>
                  <span className="text-xs text-slate-400 font-normal normal-case">
                    ({executives.length} individuals)
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

            {/* Corporate Vehicles */}
            <div className="relative pt-2">
              <div className="absolute -left-[9px] top-6 w-4 h-[2px] bg-slate-200"></div>
              <div className="ml-6">
                <div className="text-sm sm:text-base font-bold uppercase tracking-widest text-slate-700 mb-4">
                  Corporate Vehicles
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

          </div>

          {/* Legend */}
          <div className="mt-8 pt-4 border-t border-slate-200">
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-semibold mb-3">Legend</div>
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-50 border border-blue-200"></span>
                <span className="text-slate-600">Participant</span>
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
        <div 
          ref={detailsPanelRef}
          className="bg-white border border-slate-200 rounded-xl lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto lg:sticky lg:top-6"
        >
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
