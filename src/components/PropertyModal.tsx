import React, { useEffect } from 'react';
import { X, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { PropertyOpportunity, CLIENT_INFO } from '../data/siteContent';
import { ResilientPropertyImage } from './BrandMark';

interface PropertyModalProps {
  opportunity: PropertyOpportunity | null;
  onClose: () => void;
  onSelectInquiry: (inquiryValue: string, topicTitle: string) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  opportunity,
  onClose,
  onSelectInquiry,
}) => {
  useEffect(() => {
    if (!opportunity) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [opportunity, onClose]);

  if (!opportunity) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111318]/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-opportunity-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FCFBF8] text-[#17191D] rounded-[22px] overflow-hidden shadow-2xl border border-[#D9AE55]/30 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-60 sm:h-72 w-full shrink-0">
          <ResilientPropertyImage
            src={opportunity.image}
            alt={opportunity.imageAlt}
            title={opportunity.title}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-[#111318]/35 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close property opportunity details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#111318]/75 text-white hover:bg-[#D9AE55] hover:text-[#111318] flex items-center justify-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#D9AE55]"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6">
            <p className="text-xs tracking-widest uppercase text-[#E8C878] font-medium">
              {opportunity.representativeLabel} · {opportunity.categoryLabel}
            </p>
            <h3
              id="modal-opportunity-title"
              className="font-serif-luxury text-3xl sm:text-4xl text-white font-semibold mt-1"
            >
              {opportunity.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1">{opportunity.subtitle}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-base text-[#17191D]/90 leading-relaxed">{opportunity.description}</p>

          <div className="border-t border-[#17191D]/10 pt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6F7277] mb-3">
              How Jahanshah Supports Your Search & Strategy
            </h4>
            <ul className="space-y-2.5">
              {opportunity.advisoryFocus.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#17191D]">
                  <CheckCircle2 className="w-4 h-4 text-[#D9AE55] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F8F5EF] p-4 rounded-xl border border-[#D9AE55]/25">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111C2C]">
              Tailored Consultation Note
            </p>
            <p className="text-sm text-[#6F7277] mt-1 leading-relaxed">
              {opportunity.idealFor} Every property search or disposition strategy is customized
              around current availability and your specific criteria.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onSelectInquiry(opportunity.inquiryValue, opportunity.title);
                onClose();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D9AE55] hover:bg-[#E8C878] text-[#111318] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm whitespace-nowrap cursor-pointer"
            >
              <span>Discuss {opportunity.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={CLIENT_INFO.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#17191D]/20 hover:border-[#17191D] text-[#17191D] font-medium text-sm transition-colors duration-200 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#D9AE55]" />
              <span>Call {CLIENT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
