"use client";

import React from "react";
import InlineEvidenceCarousel from "@/components/inlineEvidenceCarousel";

interface ISCGovernanceAndSuppressionProps {
  section: {
    id: string;
    content?: any;
  };
}

const ISCGovernanceAndSuppression: React.FC<ISCGovernanceAndSuppressionProps> = ({ section }) => {
  return (
    <div className="my-8 sm:my-10 md:my-12" id={section.id}>
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold leading-snug text-black mb-3">
          ISC Governance & Suppression of Criticism
        </h2>
        <div className="h-px w-12 bg-slate-300"></div>
      </div>

      {/* Intro Text */}
      <div className="mb-8">
        <p className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">
          Official governance documents reveal the formal structure of ISC&apos;s operations and enumerated executive powers. These records also document efforts to suppress public criticism through formal and informal channels.
        </p>
      </div>

      {/* Governance Minutes */}
      <div className="mb-8 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
            Governance Minutes (25 Feb 2021)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Official meeting minutes document ISC governance decisions and enumerate extensive executive powers: bank facilities, contracting, customs clearance, tenders, and litigation. The minutes also record participation of representatives from Iraq&apos;s state banks (Rafidain and Rasheed), demonstrating the formal PPP structure in practice.
        </p>
        <InlineEvidenceCarousel
          title="Primary Source"
          documents={[
            {
              src: "/PrimarySources/tpic22.jpg",
              alt: "ISC meeting minutes page 1 (Arabic) — governance decisions and powers",
              label: "Original (Arabic) — P1",
            },
            {
              src: "/PrimarySources/tpic23.jpg",
              alt: "ISC meeting minutes page 2 (Arabic)",
              label: "Original (Arabic) — P2",
            },
            {
              src: "/PrimarySources/tpic22english.png",
              alt: "ISC meeting minutes page 1 (English translation)",
              label: "English Translation — P1",
            },
            {
              src: "/PrimarySources/tpic23english.png",
              alt: "ISC meeting minutes page 2 (English translation)",
              label: "English Translation — P2",
            },
          ]}
          caption="ISC Meeting Minutes · 25 Feb 2021 · Ministry of Trade — Companies Registration Department"
        />
      </div>

      {/* Suppression Evidence */}
      <div className="mb-8 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
            Suppression of Criticism (Sep 2020)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Internal WhatsApp coordination shows informal planning for a formal request to block websites and pages critical of ISC/Qi Card. The formal letter—signed by Bahaa Abdul Hussein—requests the Ministry of Communications to block and close pages that &quot;attack our company&quot; and &quot;disseminate lies.&quot; This demonstrates the connection between informal coordination and official suppression efforts.
        </p>
        <InlineEvidenceCarousel
          title="Primary Source"
          documents={[
            {
              src: "/PrimarySources/tpic32.jpg",
              alt: "WhatsApp coordination about drafting site-blocking letter (Arabic)",
              label: "WhatsApp (Arabic)",
            },
            {
              src: "/PrimarySources/tpic32english.png",
              alt: "WhatsApp coordination about drafting site-blocking letter (English)",
              label: "WhatsApp (English)",
            },
            {
              src: "/PrimarySources/tpic47.jpg",
              alt: "ISC formal request to block sites and pages (Arabic)",
              label: "Formal Letter (Arabic)",
            },
            {
              src: "/PrimarySources/tpic47english.png",
              alt: "ISC formal request to block sites and pages (English)",
              label: "Formal Letter (English)",
            },
          ]}
          caption="Internal coordination → formal request · Website/Page Blocking Committee · Sep 2020"
        />
      </div>

      {/* Judicial Corruption Evidence */}
      <div className="mb-8 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
            Judicial Corruption: Bribing Investigative Judges
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          WhatsApp communications reveal Bahaa receiving passport documents of investigative judge <strong>Alaa Salih Ali Al-Zubaidi</strong> (Passport #A9454950, DOB: 1983-09-16, Baghdad). The conversation explicitly discusses issuing the judge a <strong>MasterCard from the company</strong> — with Bahaa approving the request.
        </p>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          The context makes the corrupt intent clear: the sender states these are &quot;the documents of the investigative judge with whom we filed the complaint&quot; and notes that once the Media and Communications Commission is supplied with names, <strong>&quot;he will record your statements and issue arrest warrants against them.&quot;</strong> This demonstrates a quid pro quo — company benefits (MasterCards) exchanged for favorable judicial action against critics.
        </p>
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Key Details from Judge&apos;s Passport:</span><br/>
            • Name: Alaa Salih Ali Al-Zubaidi<br/>
            • Passport: A9454950 (Iraq)<br/>
            • DOB: 1983-09-16 · Place: Baghdad<br/>
            • Mother: Ameera Ahmed
          </p>
        </div>
        <InlineEvidenceCarousel
          title="Primary Source"
          documents={[
            {
              src: "/PrimarySources/tpic29.jpg",
              alt: "WhatsApp showing Bahaa receiving judge's passport and approving MasterCard issuance (Arabic)",
              label: "WhatsApp (Arabic)",
            },
            {
              src: "/PrimarySources/tpic29english.png",
              alt: "WhatsApp translation showing judicial bribery (English)",
              label: "WhatsApp (English)",
            },
          ]}
          caption="WhatsApp with 'Bahaa Qi Card' · Judge passport + MasterCard issuance request · Timestamp: 7:25-8:06 PM"
        />
        <p className="mt-3 text-xs sm:text-sm text-slate-500 italic">
          Note: The conversation also references a forwarded PDF titled &quot;Websites and social media pages targeting the Qi Card&quot; (6 pages, 198 KB) — connecting this judicial corruption directly to the suppression efforts documented above.
        </p>
      </div>
    </div>
  );
};

export default ISCGovernanceAndSuppression;

