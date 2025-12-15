"use client";

import React from "react";
import InlineEvidenceCarousel from "@/components/inlineEvidenceCarousel";

interface ShellCompaniesProps {
  section: {
    id: string;
    content?: any;
  };
}

const ShellCompanies: React.FC<ShellCompaniesProps> = ({ section }) => {
  return (
    <div className="my-8 sm:my-10 md:my-12" id={section.id}>
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold leading-snug text-black mb-3">
          Corporate Network: Ownership & Shell Companies
        </h2>
        <div className="h-px w-12 bg-slate-300"></div>
      </div>

      {/* Intro Text */}
      <div className="mb-8">
        <p className="text-xs sm:text-sm md:text-base font-medium sm:font-normal leading-relaxed text-slate-800">
          Complex ownership structures and shell companies are deliberately used to obscure beneficial ownership and frustrate investigators. The following documents reveal both the family shareholding structure and the network of related entities.
        </p>
      </div>

      {/* Shareholding Records Subsection */}
      <div className="mb-10">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
          Shareholding Records
        </h3>

        {/* Shareholder Registry */}
        <div className="mb-6 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            <span className="font-semibold text-slate-800">Family control documented:</span> Official Ministry of Trade shareholder registry showing <strong>Muhammad Zuhdi Abdul Hadi</strong> (30%, 15M shares) and <strong>Najm Hadi Najm</strong> (70%, 35M shares). The &quot;Abdul Hadi&quot; surname indicates direct family connection to Bahaa Abdul Hussein Abdul Hadi.
          </p>
          <InlineEvidenceCarousel
            title="Primary Source"
            documents={[
              {
                src: "/PrimarySources/tpic7.jpg",
                alt: "Official shareholder registry showing Muhammad Zuhdi Abdul Hadi and Najm Hadi Najm holdings",
                label: "Original (Arabic)",
              },
              {
                src: "/PrimarySources/tpic7english.png",
                alt: "English translation of shareholder registry",
                label: "English Translation",
              },
            ]}
            caption="Shareholder Registry · Ministry of Trade — Companies Registration Department · Muhammad Zuhdi (30%) · Najm Hadi (70%)"
          />
        </div>

        {/* Share Transfer Documents */}
        <div className="mb-6 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            <span className="font-semibold text-slate-800">Suspicious timing:</span> Share transfer documents dated <strong>July 15, 2020</strong> showing transfer of 35 million shares from <strong>Najm Hadi Najm</strong> to <strong>Noor Khalil Ibrahim</strong>, facilitated by lawyer Sarah Dhiaa Hashim.
          </p>
          <p className="text-xs text-slate-700 leading-relaxed mb-4 p-2 bg-amber-50 border-l-2 border-amber-400 rounded-r">
            <strong>Critical timing:</strong> This transfer occurred just <strong>2 months before</strong> Bahaa&apos;s September 17, 2020 arrest—potentially an attempt to restructure ownership before anticipated legal action.
          </p>
          <InlineEvidenceCarousel
            title="Primary Source"
            documents={[
              {
                src: "/PrimarySources/tpic11.jpg",
                alt: "Share transfer documents dated July 2020 showing ownership restructuring",
                label: "Original (Arabic)",
              },
              {
                src: "/PrimarySources/tpic11english.png",
                alt: "English translation of share transfer documents",
                label: "English Translation",
              },
            ]}
            caption="Share Transfer Agreement · July 15, 2020 · Companies Law No. 21 of 1997 · Seller: Najm Hadi Najm → Buyer: Noor Khalil Ibrahim"
          />
        </div>
      </div>

      {/* Shell Companies Subsection */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
          Related Shell Companies
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          Ministry of Trade registrations document multiple entities with overlapping purposes—IT, biometrics, and logistics—that could facilitate layering transactions or moving assets:
        </p>
      </div>

      {/* Company 1: Wadi Al-Maalumat */}
      <div className="mb-8 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
            Wadi Al-Maalumat Company for Information Technology
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-xs text-slate-500">
            <span><strong className="text-slate-700">Capital:</strong> 50,000,000 IQD</span>
            <span><strong className="text-slate-700">Location:</strong> Baghdad</span>
            <span><strong className="text-slate-700">Type:</strong> Limited Liability</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          IT company specializing in <strong>biometrics, fingerprint and facial recognition attendance monitoring</strong>, and software development. These capabilities directly complement Qi Card&apos;s biometric card infrastructure.
        </p>
        <InlineEvidenceCarousel
          title="Primary Source"
          documents={[
            {
              src: "/PrimarySources/tpic5.jpg",
              alt: "Wadi Al-Maalumat company registration document (Arabic)",
              label: "Original (Arabic)",
            },
            {
              src: "/PrimarySources/tpic5tenglish.png",
              alt: "Wadi Al-Maalumat company registration translation",
              label: "English Translation",
            },
          ]}
          caption="Articles of Association · Ministry of Trade — Companies Registration Department"
        />
      </div>

      {/* Company 2: Saqr Al-Rafidain */}
      <div className="mb-8 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
            Saqr Al-Rafidain for Aviation and Air Cargo
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-xs text-slate-500">
            <span><strong className="text-slate-700">Capital:</strong> 1,500,000,000 IQD (1.5 Billion)</span>
            <span><strong className="text-slate-700">Location:</strong> Najaf</span>
            <span><strong className="text-slate-700">Type:</strong> Limited Liability</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Aviation and cargo company with <strong>30x the capital</strong> of the IT shell companies. Headquartered in <strong>Najaf</strong>—a major militia stronghold—with stated purposes including international aviation, cargo transport, and aircraft crew training. Such an entity could facilitate cross-border movement of funds or goods.
        </p>
        <InlineEvidenceCarousel
          title="Primary Source"
          documents={[
            {
              src: "/PrimarySources/tpic15.jpg",
              alt: "Saqr Al-Rafidain company registration document (Arabic)",
              label: "Original (Arabic)",
            },
            {
              src: "/PrimarySources/tpic15english.png",
              alt: "Saqr Al-Rafidain company registration translation",
              label: "English Translation",
            },
          ]}
          caption="Contract of Establishment · Ministry of Trade — Companies Registration Department"
        />
      </div>

      {/* Company 3: Rikaz Al-Ma'loumat */}
      <div className="mb-8 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="mb-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
            Rikaz Al-Ma&apos;loumat Company for Information Technology
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-xs text-slate-500">
            <span><strong className="text-slate-700">Capital:</strong> 50,000,000 IQD</span>
            <span><strong className="text-slate-700">Location:</strong> Baghdad</span>
            <span><strong className="text-slate-700">Founder:</strong> Salah Hussein Hwaidi</span>
            <span><strong className="text-slate-700">Established:</strong> April 2017</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          IT company whose establishment certificate was formally distributed to: <strong>Central Bank of Iraq</strong>, General Commission for Taxes, Ministry of Labor, General Commission for Customs, Federation of Iraqi Chambers of Commerce, Baghdad Chamber of Commerce, Bar Association, and <strong>Retirement and Social Security Department</strong>. This distribution list suggests integration with government financial infrastructure.
        </p>
        <InlineEvidenceCarousel
          title="Primary Source"
          documents={[
            {
              src: "/PrimarySources/tpic10.jpg",
              alt: "Rikaz Al-Ma'loumat company establishment certificate (Arabic)",
              label: "Original (Arabic)",
            },
            {
              src: "/PrimarySources/tpic10english.png",
              alt: "Rikaz Al-Ma'loumat company establishment translation",
              label: "English Translation",
            },
          ]}
          caption="Establishment Certificate M. Sh – 02 – 00002445 · 17 April 2017 · Ministry of Trade"
        />
      </div>

      {/* Summary Note */}
      <div className="p-4 border-l-4 border-slate-300 bg-slate-50/50">
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
          The pattern is clear: family-controlled shareholding with suspiciously-timed transfers before arrest, combined with a network of IT companies featuring biometric capabilities and a heavily-capitalized aviation entity in a militia-controlled city. Together, these documents illustrate the layered corporate structure designed to obscure beneficial ownership within the Qi Card ecosystem.
        </p>
      </div>
    </div>
  );
};

export default ShellCompanies;

