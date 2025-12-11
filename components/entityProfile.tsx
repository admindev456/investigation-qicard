import React from "react";

type ProfileLink = {
  label: string;
  href?: string;
  filename?: string;
};

type EvidenceRef = {
  title: string;
  detail?: string;
  originals?: string[];
  translations?: string[];
};

type Profile = {
  name: string;
  status?: string;
  role?: string;
  summary?: string;
  relatedEntities?: string[];
  relatedDocs?: ProfileLink[];
  evidence?: EvidenceRef[];
};

const profile: Profile = {
  name: "Bahaa Abdul Hussein Abdul Hadi",
  status: "Convicted (Jan 2021); later overturned on appeal (Dec 2023)",
  role: "Founder & Chairman, International Smart Card (Qi Card)",
  summary:
    "Central figure across multiple corruption, theft, and sanctions-evasion cases tied to Iraq's electronic payments ecosystem. Documented in court verdicts, banking inquiries, and corporate governance records.",
  relatedEntities: [
    "International Smart Card (Qi Card)",
    "Rafidain Bank",
    "Central Bank of Iraq",
    "Ibrahim / Safaa / Alaa Hadi",
  ],
  relatedDocs: [
    { label: "Criminal Conviction", filename: "tpic2english.png" },
    { label: "Rafidain Bank Discrepancy", filename: "tpic1english.png" },
    { label: "CBI Secret Inquiry", filename: "tpic25english.png" },
    { label: "ISC Site-Blocking Request", filename: "tpic47english.png" },
    { label: "Shareholding Records", filename: "tpic7english.png" },
  ],
  evidence: [
    {
      title: "Criminal Conviction",
      detail: "4-year sentence + 10M IQD fine (Central Anti-Corruption Criminal Court)",
      translations: ["tpic2english.png"],
    },
    {
      title: "Banking Discrepancy",
      detail: "2.8B IQD shortfall flagged by Rafidain Bank (Fawri/ISC system)",
      originals: ["tpic1.jpg"],
      translations: ["tpic1english.png"],
    },
    {
      title: "CBI Secret / Urgent Inquiry",
      detail: "Investigation into accounts tied to Hadi family and ISC",
      originals: ["tpic25.jpg"],
      translations: ["tpic25english.png"],
    },
    {
      title: "Corporate Control",
      detail: "Shareholding and control records for ISC-related entities",
      originals: ["tpic7.jpg", "tpic11.jpg"],
      translations: ["tpic7english.png", "tpic11english.png"],
    },
    {
      title: "Censorship Action",
      detail: "Request to block critical electronic pages and sites",
      originals: ["tpic47.jpg"],
      translations: ["tpic47english.png"],
    },
  ],
};

const EntityProfile: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-10 space-y-8">
      <header className="space-y-2 border-b border-slate-200 pb-4">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-black">{profile.name}</h1>
        {profile.status && <p className="text-sm text-slate-700">{profile.status}</p>}
        {profile.role && <p className="text-sm text-slate-800">{profile.role}</p>}
        {profile.summary && <p className="text-sm sm:text-base text-slate-800 max-w-3xl">{profile.summary}</p>}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-black border-b border-slate-200 pb-2">Key Evidence</h2>
            <ul className="space-y-3">
              {profile.evidence?.map((item) => (
                <li key={item.title} className="space-y-1 border-l border-slate-200 pl-3">
                  <div className="text-sm text-slate-900 font-medium">{item.title}</div>
                  {item.detail && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.detail}</p>}
                  <div className="flex flex-wrap gap-3 text-xs text-slate-700">
                    {item.originals && item.originals.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="text-slate-500">Originals:</span>
                        <span className="flex flex-wrap gap-1">
                          {item.originals.map((file) => (
                            <span key={`${item.title}-${file}`} className="underline underline-offset-2 decoration-slate-400">
                              {file}
                            </span>
                          ))}
                        </span>
                      </span>
                    )}
                    {item.translations && item.translations.length > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="text-slate-500">English:</span>
                        <span className="flex flex-wrap gap-1">
                          {item.translations.map((file) => (
                            <span key={`${item.title}-${file}`} className="underline underline-offset-2 decoration-slate-400">
                              {file}
                            </span>
                          ))}
                        </span>
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          {profile.relatedEntities && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-black border-b border-slate-200 pb-2">Related Entities</h3>
              <ul className="space-y-1 text-sm text-slate-800">
                {profile.relatedEntities.map((entity) => (
                  <li key={entity}>{entity}</li>
                ))}
              </ul>
            </div>
          )}

          {profile.relatedDocs && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-black border-b border-slate-200 pb-2">Related Documents</h3>
              <ul className="space-y-1 text-sm text-slate-800">
                {profile.relatedDocs.map((doc) => (
                  <li key={doc.label} className="flex flex-wrap gap-2">
                    <span className="font-medium text-slate-900">{doc.label}</span>
                    {doc.filename && (
                      <span className="text-xs text-slate-700 underline underline-offset-2 decoration-slate-400">{doc.filename}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};

export default EntityProfile;

