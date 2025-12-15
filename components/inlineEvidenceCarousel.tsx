"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface EvidenceDoc {
  src: string;
  alt: string;
  label: string;
}

interface InlineEvidenceCarouselProps {
  title: string;
  caption?: string;
  documents: EvidenceDoc[];
}

const InlineEvidenceCarousel: React.FC<InlineEvidenceCarouselProps> = ({
  title,
  caption,
  documents,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? documents.length - 1 : i - 1));
    setZoomed(false);
  }, [documents.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i === documents.length - 1 ? 0 : i + 1));
    setZoomed(false);
  }, [documents.length]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setModalOpen(false); setZoomed(false); }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalOpen, prev, next]);

  const current = documents[currentIndex];

  // Preload all document images for instant modal display
  const preloadImages = documents.map((doc) => (
    <link key={doc.src} rel="preload" as="image" href={doc.src} />
  ));

  return (
    <>
      {/* Hidden preload hints */}
      {preloadImages}
      {/* Inline Carousel */}
      <div className="my-4 border border-slate-200 rounded-md bg-white">
        {/* Header */}
        <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
          <svg
            className="w-3.5 h-3.5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            {title}
          </span>
        </div>

        {/* Image container */}
        <div
          className="relative cursor-pointer group bg-slate-50"
          onClick={() => setModalOpen(true)}
        >
          <div className="h-44 sm:h-52 overflow-hidden flex items-center justify-center">
            <Image
              src={current.src}
              alt={current.alt}
              width={400}
              height={280}
              className="max-h-full w-auto object-contain"
              priority={currentIndex === 0}
            />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/[0.03] transition-colors flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium text-slate-500 bg-white/95 px-2.5 py-1 rounded border border-slate-200">
              Click to expand
            </span>
          </div>
        </div>

        {/* Navigation footer */}
        <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="p-1 text-slate-300 hover:text-slate-500 transition-colors"
            aria-label="Previous document"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-3">
            {/* Dots */}
            <div className="flex gap-1.5">
              {documents.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === currentIndex ? "bg-slate-500" : "bg-slate-200"
                  }`}
                  aria-label={`View document ${i + 1}`}
                />
              ))}
            </div>
            {/* Label */}
            <span className="text-[10px] text-slate-400 font-medium min-w-[100px] text-center">
              {current.label}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="p-1 text-slate-300 hover:text-slate-500 transition-colors"
            aria-label="Next document"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Caption */}
        {caption && (
          <div className="px-3 py-1.5 border-t border-slate-100">
            <p className="text-[9px] text-slate-500 leading-relaxed">{caption}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center"
          onClick={() => { setModalOpen(false); setZoomed(false); }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white/90 transition-colors"
            onClick={() => { setModalOpen(false); setZoomed(false); }}
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {/* Left navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 sm:left-6 p-2 text-white/40 hover:text-white/80 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>

          {/* Image container */}
          <div
            className="max-w-4xl w-full mx-4 sm:mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className={`max-h-[80vh] bg-white rounded shadow-2xl p-2 ${zoomed ? 'overflow-auto cursor-zoom-out' : 'overflow-hidden cursor-zoom-in flex items-center justify-center'}`}
              onClick={() => setZoomed(!zoomed)}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={1200}
                height={1600}
                className={`${zoomed ? 'w-[150%] max-w-none' : 'max-w-full max-h-[76vh] w-auto h-auto object-contain'} transition-all duration-200`}
                priority
              />
            </div>

            {/* Modal footer */}
            <div className="mt-4 flex flex-col items-center gap-3">
              <span className="text-white/70 text-xs font-medium tracking-wide">
                {current.label}
              </span>
              <div className="flex gap-2">
                {documents.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex ? "bg-white/90" : "bg-white/30"
                    }`}
                    aria-label={`View document ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 sm:right-6 p-2 text-white/40 hover:text-white/80 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </>
  );
};

export default InlineEvidenceCarousel;

