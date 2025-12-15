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

      {/* Company 1: Wadi Al-Maalumat - EXPANDED */}
      <div className="mb-10 p-4 sm:p-6 bg-white border-2 border-slate-300 rounded-xl shadow-sm">
        {/* Header */}
        <div className="mb-5 pb-4 border-b border-slate-200">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                Wadi Al-Maalumat Company for Information Technology
              </h3>
              <p className="text-xs text-slate-500 italic">شركة وادي المعلومات لتكنولوجيا المعلومات المحدودة</p>
            </div>
            <span className="px-2.5 py-1 bg-red-100 text-red-700 text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wide">
              High Confidence Shell
            </span>
          </div>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Capital</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">50,000,000 IQD</p>
            <p className="text-[10px] text-slate-500">(~$34,000 USD)</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Address</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">Baghdad</p>
            <p className="text-[10px] text-slate-500">Al-Ma&apos;amoon, Dist. 608</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Chamber Reg.</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">#6319 / Fourth</p>
            <p className="text-[10px] text-slate-500">Feb 24, 2021</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Activity</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">IT Services</p>
            <p className="text-[10px] text-slate-500">Biometrics, Software</p>
          </div>
        </div>

        {/* The Family Connection - KEY */}
        <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
          <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            Key Connection: The &quot;Abdulhadi&quot; Family Link
          </h4>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            The Managing Director is <strong>Mohammed Zuhdi Abdulhadi</strong> — the surname &quot;Abdulhadi&quot; directly matches <strong>Bahaa Abdul Hussein Abdul Hadi</strong>, the founder and chairman of Qi Card. This is almost certainly a family member (brother, son, or close relative) serving as the operational front for this shell company.
          </p>
        </div>

        {/* Ownership Structure Table */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-slate-800 mb-3">Ownership Structure</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-slate-700">Shareholder</th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-700">Shares</th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-700">%</th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-700">City</th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-700">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200 bg-red-50">
                  <td className="px-3 py-2.5 font-medium text-slate-900">Mohammed Zuhdi Abdulhadi</td>
                  <td className="px-3 py-2.5 text-slate-700">15,000,000</td>
                  <td className="px-3 py-2.5 text-slate-700">30%</td>
                  <td className="px-3 py-2.5 text-slate-700">Basra</td>
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-red-200 text-red-800 rounded text-[10px] font-semibold">Managing Director</span></td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2.5 font-medium text-slate-900">Najm Hadi Najm</td>
                  <td className="px-3 py-2.5 text-slate-700">35,000,000</td>
                  <td className="px-3 py-2.5 text-slate-700">70%</td>
                  <td className="px-3 py-2.5 text-slate-700">Baghdad</td>
                  <td className="px-3 py-2.5"><span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-semibold">Passive Owner</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 italic">
            Note: Despite holding only 30% of shares, Mohammed Zuhdi was granted <strong>complete operational control</strong> — a classic nominee/straw-man arrangement.
          </p>
        </div>

        {/* Suspicious Timing */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-bold text-blue-800 mb-2">⏱️ Suspicious Timing Analysis</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2 bg-white rounded border border-blue-100">
              <p className="font-semibold text-blue-900">April 22, 2020</p>
              <p className="text-blue-700">General Assembly meeting grants Mohammed Zuhdi full powers</p>
            </div>
            <div className="p-2 bg-white rounded border border-blue-100">
              <p className="font-semibold text-blue-900">September 17, 2020</p>
              <p className="text-blue-700">Bahaa Abdul Hadi arrested at Baghdad Airport</p>
            </div>
            <div className="p-2 bg-white rounded border border-blue-100">
              <p className="font-semibold text-blue-900">February 24, 2021</p>
              <p className="text-blue-700">Company registered with Baghdad Chamber of Commerce</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-blue-800 leading-relaxed">
            <strong>Pattern:</strong> The company was activated and granted sweeping powers just months before Bahaa&apos;s arrest, then formally registered with the Chamber of Commerce one month after his first conviction. This timing suggests <strong>asset protection and operational continuity</strong> during legal troubles.
          </p>
        </div>

        {/* The 8 Powers */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-slate-800 mb-3">Powers Granted to Mohammed Zuhdi (April 2020)</h4>
          <p className="text-xs text-slate-600 mb-3">The General Assembly meeting granted the minority shareholder unprecedented control:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Sign ALL contracts with government & private entities",
              "Open and control bank accounts at licensed Iraqi banks",
              "Sign commercial papers, endorse checks, accept transfers",
              "Issue letters of guarantee for banking facilities",
              "Full legal representation in courts (plaintiff or defendant)",
              "Handle customs clearance, shipping, and deposits",
              "Appoint lawyers, customs agents, and other professionals",
              "Hire, fire, and set salaries for all employees"
            ].map((power, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 bg-slate-50 rounded text-xs">
                <span className="flex-shrink-0 w-5 h-5 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold">{idx + 1}</span>
                <span className="text-slate-700">{power}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] sm:text-xs text-slate-500 italic">
            This level of authority for a 30% shareholder is highly unusual and indicates the 70% owner (Najm Hadi Najm) is merely a nominee holding shares on behalf of others.
          </p>
        </div>

        {/* Document Evidence Grid */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800">Primary Source Documents</h4>

          {/* Doc 1: Chamber of Commerce Card */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              <span className="font-semibold text-slate-800">Baghdad Chamber of Commerce membership card</span> showing Mohammed Zuhdi Abdulhadi as the Authorized Manager of Wadi Al-Maalumat, registered February 2021.
            </p>
            <InlineEvidenceCarousel
              title="Chamber of Commerce Card"
              documents={[
                {
                  src: "/PrimarySources/tpic55.jpg",
                  alt: "Baghdad Chamber of Commerce membership card for Wadi Al-Maalumat (Arabic)",
                  label: "Original Card (Arabic)",
                },
                {
                  src: "/PrimarySources/tpic55english.png",
                  alt: "Baghdad Chamber of Commerce membership card translation",
                  label: "English Translation",
                },
              ]}
              caption="Baghdad Chamber of Commerce · Membership #6319 · Fourth Class · Valid 2021/02/24 - 2021/12/31"
            />
          </div>

          {/* Doc 2: Articles of Association */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              <span className="font-semibold text-slate-800">Articles of Association</span> establishing company purpose: IT, biometrics, fingerprint/facial recognition, attendance monitoring systems, and software development — capabilities that complement Qi Card&apos;s infrastructure.
            </p>
            <InlineEvidenceCarousel
              title="Articles of Association"
              documents={[
                {
                  src: "/PrimarySources/tpic5.jpg",
                  alt: "Wadi Al-Maalumat Articles of Association page 1 (Arabic)",
                  label: "Original (Arabic) — P1",
                },
                {
                  src: "/PrimarySources/tpic6.jpg",
                  alt: "Wadi Al-Maalumat Articles of Association page 2 showing capital and founders (Arabic)",
                  label: "Original (Arabic) — P2",
                },
                {
                  src: "/PrimarySources/tpic5tenglish.png",
                  alt: "Wadi Al-Maalumat Articles of Association page 1 translation",
                  label: "English Translation — P1",
                },
                {
                  src: "/PrimarySources/tpic6english.png",
                  alt: "Wadi Al-Maalumat Articles of Association page 2 translation",
                  label: "English Translation — P2",
                },
              ]}
              caption="Articles of Association · Ministry of Trade — Companies Registration Department · Capital: 50M IQD"
            />
          </div>

          {/* Doc 3: Meeting Minutes */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              <span className="font-semibold text-slate-800">General Assembly Meeting Minutes (April 22, 2020)</span> showing Mohammed Zuhdi Abdulhadi elected as Chairman and granted all 8 operational powers. Signed by both shareholders.
            </p>
            <InlineEvidenceCarousel
              title="Meeting Minutes"
              documents={[
                {
                  src: "/PrimarySources/tpic8.jpg",
                  alt: "General Assembly meeting minutes April 2020 (Arabic)",
                  label: "Original (Arabic)",
                },
                {
                  src: "/PrimarySources/tpic8english.png",
                  alt: "General Assembly meeting minutes translation",
                  label: "English Translation",
                },
              ]}
              caption="General Assembly Minutes · April 22, 2020 · Company HQ: Baghdad – Al-Ma'amoon – Dist. 608 – Alley 29 – House 3"
            />
          </div>

          {/* Doc 4: Shareholder Registry */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              <span className="font-semibold text-slate-800">Official Shareholder Registry</span> with Ministry of Trade stamp showing the 30/70 ownership split. Note Muhammad Zuhdi&apos;s registration from Basra (ID: 199387309597) and Najm Hadi from Baghdad.
            </p>
            <InlineEvidenceCarousel
              title="Shareholder Registry"
              documents={[
                {
                  src: "/PrimarySources/tpic7.jpg",
                  alt: "Official shareholder registry with ownership percentages (Arabic)",
                  label: "Original (Arabic)",
                },
                {
                  src: "/PrimarySources/tpic7english.png",
                  alt: "Official shareholder registry translation",
                  label: "English Translation",
                },
              ]}
              caption="Shareholder Registry · Ministry of Trade Stamp · Muhammad Zuhdi: 30% (15M shares) · Najm Hadi: 70% (35M shares)"
            />
          </div>

          {/* Doc 5: Manager Change with Photo/Fingerprint */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              <span className="font-semibold text-slate-800">Minutes of Changing the Authorized Manager</span> — official form showing Najm Hadi Najm&apos;s <strong>photo and fingerprint</strong>, confirming his identity as the seller/transferor in ownership restructuring.
            </p>
            <InlineEvidenceCarousel
              title="Manager Change Form"
              documents={[
                {
                  src: "/PrimarySources/tpic54.jpg",
                  alt: "Manager change minutes with seller photo and fingerprint (Arabic)",
                  label: "Original (Arabic)",
                },
                {
                  src: "/PrimarySources/tpic54english.png",
                  alt: "Manager change minutes translation",
                  label: "English Translation",
                },
              ]}
              caption="Minutes of Changing the Authorized Manager · Page 2 · Seller: Najm Hadi Najm · Photo + Fingerprint Verification"
            />
          </div>
        </div>

        {/* Conclusion Box */}
        <div className="mt-6 p-4 bg-slate-800 text-white rounded-lg">
          <h4 className="text-sm font-bold mb-2">Assessment</h4>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
            Wadi Al-Maalumat exhibits <strong>textbook shell company characteristics</strong>: a family member with the &quot;Abdulhadi&quot; surname controls operations despite minority ownership, the nominal 70% owner appears to be a passive straw man, the company was activated during Bahaa&apos;s legal troubles, and the business activity (IT/biometrics) directly complements Qi Card&apos;s infrastructure. These documents provide <strong>official Iraqi government verification</strong> that this entity exists and is structured in a manner consistent with concealing beneficial ownership.
          </p>
        </div>
      </div>

      {/* Company 2: Al-Shabakat Al-Mutakamila */}
      <div className="mb-8 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="mb-4">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                Al-Shabakat Al-Mutakamila Information Technology & General Trading Co.
              </h3>
              <p className="text-[10px] text-slate-500 italic">الشبكات المتكاملة لتكنولوجيا المعلومات والتجارة العامة</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-xs text-slate-500 mt-2">
            <span><strong className="text-slate-700">Manager:</strong> Zaid Hameed Muhsen</span>
            <span><strong className="text-slate-700">Number:</strong> 5147 / First Class</span>
            <span><strong className="text-slate-700">Trade #:</strong> 332998</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-xs text-slate-500 mt-1">
            <span><strong className="text-slate-700">Reg Date:</strong> 2021/03/31</span>
            <span><strong className="text-slate-700">Activity:</strong> Information Technology - General Trading</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          Another IT company registered with the Baghdad Chamber of Commerce just <strong>5 weeks after</strong> Wadi Al-Maalumat (March 31, 2021 vs February 24, 2021). The timing pattern—multiple IT shell companies registered during Bahaa&apos;s legal proceedings—suggests coordinated establishment of parallel entities.
        </p>
        <p className="text-xs text-slate-700 leading-relaxed mb-4 p-2 bg-slate-100 border-l-2 border-slate-400 rounded-r">
          <strong>Pattern identified:</strong> Both companies share the same business classification (Information Technology), were registered within weeks of each other in early 2021, and are structured as limited liability companies—consistent with a network designed for asset layering.
        </p>
        <InlineEvidenceCarousel
          title="Primary Source"
          documents={[
            {
              src: "/PrimarySources/tpic49.jpg",
              alt: "Al-Shabakat Al-Mutakamila membership ID card with photo of manager Zaid Hameed Mohsin (Arabic)",
              label: "Manager ID Card (Arabic)",
            },
            {
              src: "/PrimarySources/tpic49english.png",
              alt: "Al-Shabakat Al-Mutakamila ID card translation",
              label: "ID Card Translation",
            },
            {
              src: "/PrimarySources/tpic50.jpg",
              alt: "Al-Shabakat Al-Mutakamila Chamber of Commerce membership card (Arabic/English)",
              label: "Chamber Card",
            },
            {
              src: "/PrimarySources/tpic50english.png",
              alt: "Al-Shabakat Al-Mutakamila card translation",
              label: "Chamber Card Translation",
            },
          ]}
          caption="Baghdad Chamber of Commerce · Membership #5147 · First Class · Manager: Zaid Hameed Mohsin · Photo ID + Registration · Registered 2021/03/31"
        />
      </div>

      {/* Company 3: Saqr Al-Rafidain */}
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

      {/* Company 4: Rikaz Al-Ma'loumat */}
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

