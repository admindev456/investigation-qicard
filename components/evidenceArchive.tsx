"use client";

import React, { useState, useEffect } from "react";

type DocFile = {
  label: string;
  filename: string;
};

type EvidenceItem = {
  title: string;
  date?: string;
  category?: string;
  keyFact?: string;
  files?: {
    originals?: DocFile[];
    translations?: DocFile[];
  };
};

type EvidenceGroup = {
  heading: string;
  items: EvidenceItem[];
};

const groups: EvidenceGroup[] = [
  {
    heading: "Court Documents",
    items: [
      {
        title: "Criminal Conviction — Bahaa Abdul Hussein Hadi",
        date: "24 Jan 2021",
        keyFact: "4-year sentence and 10M IQD fine (Al-Karkh Federal Appeal Court)",
        files: {
          originals: [{ label: "Original", filename: "tpic2.jpg" }],
          translations: [{ label: "English", filename: "tpic2english.png" }],
        },
      },
      {
        title: "Witness Testimony — Ahmed Abdulhussain Al-Zubaidi",
        date: "2023",
        keyFact: "Testimony on $54M project and management approvals",
        files: {
          translations: [{ label: "English", filename: "tpic21english.png" }],
        },
      },
    ],
  },
  {
    heading: "Banking & Financial",
    items: [
      {
        title: "Rafidain Bank Discrepancy",
        date: "2 Mar 2021",
        keyFact: "2.8B IQD shortfall in Fawri/ISC system",
        files: {
          originals: [{ label: "Original", filename: "tpic1.jpg" }],
          translations: [{ label: "English", filename: "tpic1english.png" }],
        },
      },
      {
        title: "CBI Secret / Urgent Inquiry",
        date: "4 Oct 2020",
        keyFact: "Inquiry into accounts tied to Hadi family and ISC",
        files: {
          originals: [{ label: "Original", filename: "tpic25.jpg" }],
          translations: [{ label: "English", filename: "tpic25english.png" }],
        },
      },
    ],
  },
  {
    heading: "Corporate Ownership / Registrations",
    items: [
      {
        title: "Shareholding Records",
        keyFact: "Muhammad Zuhdi / Najm Hadi holdings",
        files: {
          originals: [{ label: "Original", filename: "tpic7.jpg" }, { label: "Original", filename: "tpic11.jpg" }],
          translations: [{ label: "English", filename: "tpic7english.png" }, { label: "English", filename: "tpic11english.png" }],
        },
      },
      {
        title: "Company Registrations — Wadi Al-Maalumat, Rikaz, Saqr Al-Rafidain",
        keyFact: "50M–1.5B IQD capitalized entities",
        files: {
          originals: [
            { label: "Original", filename: "tpic5.jpg" },
            { label: "Original", filename: "tpic10.jpg" },
            { label: "Original", filename: "tpic15.jpg" },
          ],
          translations: [
            { label: "English", filename: "tpic5tenglish.png" },
            { label: "English", filename: "tpic10english.png" },
            { label: "English", filename: "tpic15english.png" },
          ],
        },
      },
    ],
  },
  {
    heading: "ISC Governance / Actions",
    items: [
      {
        title: "ISC Meeting Minutes & Appointment",
        date: "25 Feb 2021",
        keyFact: "Management change and authorities recorded",
        files: {
          originals: [{ label: "Original", filename: "tpic22.jpg" }, { label: "Original", filename: "tpic23.jpg" }],
          translations: [{ label: "English", filename: "tpic22english.png" }, { label: "English", filename: "tpic23english.png" }],
        },
      },
      {
        title: "ISC Request to Block Sites",
        date: "6 Sep 2020",
        keyFact: "Formal request to block pages critical of ISC",
        files: {
          originals: [{ label: "Original", filename: "tpic47.jpg" }],
          translations: [{ label: "English", filename: "tpic47english.png" }],
        },
      },
    ],
  },
  {
    heading: "Militia / Political Links",
    items: [
      {
        title: "Shibl al-Zaydi / Muhammad al-Bawi",
        keyFact: "IRGC coordination and Hezbollah financing",
        files: {
          originals: [{ label: "Original", filename: "tpic30.jpg" }],
          translations: [{ label: "English", filename: "tpic30english.png" }],
        },
      },
      {
        title: "Satirical Post with Shibl / Bahaa / Al-Kawtharani",
        keyFact: "14M USD reference tied to Ministry of Communications",
        files: {
          originals: [{ label: "Original", filename: "tpic45.jpg" }],
          translations: [{ label: "English", filename: "tpic45english.png" }],
        },
      },
    ],
  },
  {
    heading: "Media / Public Evidence",
    items: [
      {
        title: "Qi Card deducts 4k IQD per retiree (330B annually)",
        date: "1 Jun 2020",
        files: {
          originals: [{ label: "Original", filename: "tpic40.jpg" }],
          translations: [{ label: "English", filename: "tpic40english.png" }],
        },
      },
      {
        title: "Twitter Allegations — Ahmed Abdul Jalil / Bahaa Qi Card",
        files: {
          originals: [{ label: "Original", filename: "tpic35.jpg" }],
          translations: [{ label: "English", filename: "tpic35english.png" }],
        },
      },
    ],
  },
];

const EvidenceArchive: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
  };

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={handleModalClose}
        >
          <div className="max-w-7xl max-h-[90vh] overflow-auto">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full h-auto object-contain cursor-zoom-out"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-10 space-y-10">
      <header className="space-y-3 border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-black">Evidence Archive</h1>
          <span className="text-xs sm:text-sm text-slate-600">Originals + English translations</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 max-w-3xl">
          Primary source documents organized by category with side-by-side references for originals and English translations.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {groups.map((group) => (
          <div key={group.heading} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <h2 className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">{group.heading}</h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {group.items.map((item) => (
                <div key={item.title} className="space-y-3 border-l border-slate-200 pl-4">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-sm sm:text-base text-slate-900 font-medium">{item.title}</span>
                    {item.date && <span className="text-xs text-slate-600">• {item.date}</span>}
                    {item.category && <span className="text-xs text-slate-600">• {item.category}</span>}
                  </div>
                  {item.keyFact && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.keyFact}</p>}
                  {item.files && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {/* Original Images - Left Side */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Original</div>
                        <div className="space-y-2">
                          {(item.files.originals ?? []).map((file) => {
                            const imageSrc = `/PrimarySources/${file.filename}`;
                            return (
                              <div key={`${item.title}-original-${file.filename}`} className="border border-slate-200 rounded-sm overflow-hidden bg-slate-50 cursor-zoom-in">
                                <img
                                  src={imageSrc}
                                  alt={`Original document: ${file.filename}`}
                                  className="w-full h-auto object-contain max-h-[600px]"
                                  loading="lazy"
                                  onClick={() => handleImageClick(imageSrc, `Original document: ${file.filename}`)}
                                />
                              </div>
                            );
                          })}
                          {(item.files.originals ?? []).length === 0 && (
                            <div className="text-xs text-slate-400 italic py-8 text-center border border-slate-200 rounded-sm bg-slate-50">No original available</div>
                          )}
                        </div>
                      </div>
                      {/* English Translations - Right Side */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">English Translation</div>
                        <div className="space-y-2">
                          {(item.files.translations ?? []).map((file) => {
                            const imageSrc = `/PrimarySources/${file.filename}`;
                            return (
                              <div key={`${item.title}-translation-${file.filename}`} className="border border-slate-200 rounded-sm overflow-hidden bg-slate-50 cursor-zoom-in">
                                <img
                                  src={imageSrc}
                                  alt={`English translation: ${file.filename}`}
                                  className="w-full h-auto object-contain max-h-[600px]"
                                  loading="lazy"
                                  onClick={() => handleImageClick(imageSrc, `English translation: ${file.filename}`)}
                                />
                              </div>
                            );
                          })}
                          {(item.files.translations ?? []).length === 0 && (
                            <div className="text-xs text-slate-400 italic py-8 text-center border border-slate-200 rounded-sm bg-slate-50">No translation available</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default EvidenceArchive;

