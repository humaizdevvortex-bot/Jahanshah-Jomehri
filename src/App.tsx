import React, { useState, useEffect } from 'react';
import {
  Phone,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Plus,
  Minus,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Building2,
  Home,
  KeyRound,
  Briefcase,
  LineChart,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import {
  CLIENT_INFO,
  IMAGES,
  SERVICES,
  PROPERTY_OPPORTUNITIES,
  WHY_WORK_PILLARS,
  PROCESS_STEPS,
  LOCAL_AREAS,
  FAQ_ITEMS,
  PropertyOpportunity,
} from './data/siteContent';
import {
  ArchitecturalMonogram,
  AgentPortrait,
  ResilientPropertyImage,
} from './components/BrandMark';
import { PropertyModal } from './components/PropertyModal';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'residential' | 'architectural' | 'commercial'>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<PropertyOpportunity | null>(null);
  const [activeAreaId, setActiveAreaId] = useState<string>(LOCAL_AREAS[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    interest: 'Buying',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sticky Header & Active Section Observer
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);

      const sections = ['home', 'about', 'services', 'properties', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquiryPrefill = (inquiryValue: string, topicTitle?: string) => {
    setFormSubmitted(false);
    setFormData((prev) => ({
      ...prev,
      interest: inquiryValue,
      message:
        prev.message.trim().length > 0
          ? prev.message
          : topicTitle
          ? `Jahanshah, I’d like to learn more about ${topicTitle} and discuss my real estate goals.`
          : CLIENT_INFO.suggestedMessage,
    }));
    scrollToSection('contact');
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    const cleanedPhone = formData.phone.replace(/[^\d+]/g, '');
    if (!formData.phone.trim() || cleanedPhone.length < 7) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.interest.trim()) {
      errors.interest = 'Please select what you are interested in.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errors.message = 'Please share a brief message about your property goals.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  };

  const filteredOpportunities =
    propertyFilter === 'all'
      ? PROPERTY_OPPORTUNITIES
      : PROPERTY_OPPORTUNITIES.filter((item) => item.category === propertyFilter);

  const activeLocalArea =
    LOCAL_AREAS.find((area) => area.id === activeAreaId) || LOCAL_AREAS[0];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'buying':
        return <Home className="w-5 h-5 text-[#D9AE55]" />;
      case 'selling':
        return <KeyRound className="w-5 h-5 text-[#D9AE55]" />;
      case 'luxury':
        return <Sparkles className="w-5 h-5 text-[#D9AE55]" />;
      case 'investment':
        return <LineChart className="w-5 h-5 text-[#D9AE55]" />;
      case 'commercial':
        return <Building2 className="w-5 h-5 text-[#D9AE55]" />;
      default:
        return <Compass className="w-5 h-5 text-[#D9AE55]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8] text-[#17191D]">
      {/* 1. HEADER / NAVIGATION (Strict 3-Zone Top Bar Contract) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#111318]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg'
            : 'bg-gradient-to-b from-[#111318]/85 via-[#111318]/45 to-transparent py-5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Title (Single clean wordmark with custom architectural icon) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#D9AE55] rounded-lg shrink-0"
          >
            <ArchitecturalMonogram className="w-9 h-9 transition-transform duration-200 group-hover:scale-105" />
            <span className="font-serif-luxury text-xl sm:text-2xl font-semibold tracking-wide text-white whitespace-nowrap">
              Jahanshah Jomehri
            </span>
          </a>

          {/* Zone 2: Navigation Links (Clean text links with subtle gold hover/active underline) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/85"
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'properties', label: 'Properties' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`relative py-1 transition-colors duration-200 whitespace-nowrap hover:text-white ${
                    isActive ? 'text-[#E8C878]' : 'text-white/80'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D9AE55] transition-all duration-200 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href={CLIENT_INFO.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-[#E8C878] transition-colors duration-200 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#D9AE55]" />
              <span className="tabular-nums">{CLIENT_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D9AE55] hover:bg-[#E8C878] text-[#111318] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm whitespace-nowrap cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Compact Actions & Menu Button */}
          <div className="flex md:hidden items-center gap-2.5">
            <a
              href={CLIENT_INFO.phoneHref}
              aria-label={`Call ${CLIENT_INFO.phoneDisplay}`}
              className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#D9AE55] hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE NAVIGATION PANEL */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111318] text-white flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <ArchitecturalMonogram className="w-9 h-9" />
              <div>
                <p className="font-serif-luxury text-xl font-semibold text-white">
                  {CLIENT_INFO.name}
                </p>
                <p className="text-xs text-[#E8C878] tracking-wider uppercase">
                  Luxury Real Estate
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:text-[#D9AE55] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="my-auto py-8 flex flex-col gap-5" aria-label="Mobile Menu Links">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Jahanshah' },
              { id: 'services', label: 'Real Estate Services' },
              { id: 'properties', label: 'Property Opportunities' },
              { id: 'faq', label: 'Frequently Asked Questions' },
              { id: 'contact', label: 'Contact & Consultation' },
            ].map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="flex items-center justify-between py-2 border-b border-white/10 text-2xl font-serif-luxury font-medium text-white hover:text-[#E8C878] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs font-sans-modern text-[#D9AE55] tabular-nums">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="w-full py-4 px-6 rounded-xl bg-[#D9AE55] hover:bg-[#E8C878] text-[#111318] font-semibold text-base flex items-center justify-center gap-2 transition-colors"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={CLIENT_INFO.phoneHref}
              className="w-full py-3.5 px-6 rounded-xl border border-white/20 text-white font-medium text-base flex items-center justify-center gap-2 hover:border-[#D9AE55] transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#D9AE55]" />
              <span>Call {CLIENT_INFO.phoneDisplay}</span>
            </a>
            <p className="text-center text-xs text-white/60 pt-1">
              {CLIENT_INFO.brokerage} · {CLIENT_INFO.officeFullAddress}
            </p>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section
        id="home"
        className="relative min-h-[740px] lg:min-h-[820px] flex flex-col justify-between bg-[#111318] text-white overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-14"
      >
        {/* Background Luxury Southern California Residence */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ResilientPropertyImage
            src={IMAGES.heroEstate}
            alt="Luxury modern Southern California architectural residence at golden hour with infinity pool and warm lighting"
            title="Southern California Luxury Real Estate"
            priority={true}
            className="w-full h-full"
            imgClassName="hero-bg-motion object-center"
          />
          {/* Measured multi-layer contrast scrims */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111318]/95 via-[#111318]/75 to-[#111318]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-[#111318]/60" />
        </div>

        {/* Main Hero Grid */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 w-full my-auto py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            {/* Left Column: Primary Value Proposition */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm tracking-[0.18em] uppercase text-[#E8C878] font-semibold">
                <span>Luxury Real Estate</span>
                <span aria-hidden="true" className="text-white/40">
                  |
                </span>
                <span>Canoga Park, CA</span>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.08] tracking-tight text-white max-w-3xl">
                Find the Right Property.{' '}
                <span className="text-[#E8C878] italic font-normal">
                  Make Your Next Move
                </span>{' '}
                With Confidence.
              </h1>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl font-normal">
                Personalized real estate guidance for buyers, sellers, investors, and clients
                seeking exceptional property opportunities across Canoga Park and the greater Los
                Angeles area.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#D9AE55] hover:bg-[#E8C878] text-[#111318] font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg whitespace-nowrap cursor-pointer group"
                >
                  <span>Schedule a Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <a
                  href={CLIENT_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 text-white font-medium text-base backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#D9AE55]" />
                  <span>Call {CLIENT_INFO.phoneDisplay}</span>
                </a>
              </div>

              {/* Subtle Location Indicator */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/75">
                <MapPin className="w-4 h-4 text-[#D9AE55] shrink-0" />
                <span>Canoga Park, California</span>
                <span aria-hidden="true">·</span>
                <span>Associated with {CLIENT_INFO.brokerage}</span>
              </div>
            </div>

            {/* Right Column: Refined Floating Advisor Profile Element */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="w-full max-w-sm rounded-[22px] bg-[#111318]/85 backdrop-blur-md border border-[#D9AE55]/40 p-5 shadow-2xl">
                <div className="flex items-center gap-4">
                  <AgentPortrait
                    src={CLIENT_INFO.portraitUrl}
                    alt="Jahanshah Jomehri — Luxury Real Estate Advisor in Canoga Park, CA"
                    className="w-20 h-20 rounded-2xl border border-[#D9AE55]/60 shrink-0 shadow-md"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#E8C878] font-semibold">
                      Luxury Real Estate Advisor
                    </p>
                    <h2 className="font-serif-luxury text-2xl font-semibold text-white truncate mt-0.5">
                      {CLIENT_INFO.name}
                    </h2>
                    <p className="text-xs text-white/75 mt-0.5">{CLIENT_INFO.brokerage}</p>
                    <p className="text-xs text-white/60 mt-0.5">{CLIENT_INFO.fullLocation}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-2 text-xs text-white/80">
                  <span>Direct Advisory Line</span>
                  <a
                    href={CLIENT_INFO.phoneHref}
                    className="text-[#E8C878] hover:underline font-medium tabular-nums"
                  >
                    {CLIENT_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip & Explore Cue */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 w-full pt-8 border-t border-white/15">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full lg:w-auto">
              {[
                { label: 'Personalized Guidance', sub: 'Tailored to Your Goals' },
                { label: 'Local Market Focus', sub: 'Canoga Park & Greater LA' },
                { label: 'Luxury Property Perspective', sub: 'Keller Williams Luxury' },
                { label: 'Client-Focused Service', sub: 'Clear & Responsive' },
              ].map((item, index) => (
                <div key={index} className="border-l-2 border-[#D9AE55]/60 pl-3.5">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-white/65 mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              aria-label="Explore about Jahanshah Jomehri"
              className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/75 hover:text-[#E8C878] transition-colors shrink-0"
            >
              <span>Explore</span>
              <ChevronDown className="w-4 h-4 text-[#D9AE55] animate-scroll-cue" />
            </a>
          </div>
        </div>
      </section>

      <main>
        {/* 3. ABOUT JAHANSHAH SECTION */}
        <section
          id="about"
          className="py-20 sm:py-24 lg:py-32 bg-[#FCFBF8] border-b border-[#17191D]/8"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Portrait & Architectural Framing */}
              <div className="lg:col-span-5">
                <div className="relative rounded-[24px] bg-[#111318] p-6 sm:p-8 text-white shadow-xl border border-[#D9AE55]/30 overflow-hidden">
                  {/* Subtle decorative architectural frame lines */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 bg-radial from-[#D9AE55]/15 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-6">
                    <div className="relative">
                      <AgentPortrait
                        src={CLIENT_INFO.portraitUrl}
                        alt="Portrait of Jahanshah Jomehri, Keller Williams Luxury Real Estate Agent in Canoga Park"
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-[20px] border-2 border-[#D9AE55] shadow-lg"
                      />
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-[#E8C878] font-semibold">
                          {CLIENT_INFO.brokerage}
                        </p>
                        <h3 className="font-serif-luxury text-3xl font-semibold text-white mt-1">
                          {CLIENT_INFO.name}
                        </h3>
                        <p className="text-sm text-white/75 mt-0.5">
                          Real Estate Advisor · {CLIENT_INFO.location}
                        </p>
                      </div>
                    </div>

                    <div className="w-full pt-5 border-t border-white/15 space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#D9AE55] shrink-0 mt-1" />
                        <div>
                          <p className="text-xs uppercase tracking-wider text-white/60">
                            Office Location
                          </p>
                          <p className="text-white/90 mt-0.5">{CLIENT_INFO.officeAddressLine1}</p>
                          <p className="text-white/90">{CLIENT_INFO.officeAddressLine2}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 pt-2">
                        <Phone className="w-4 h-4 text-[#D9AE55] shrink-0 mt-1" />
                        <div>
                          <p className="text-xs uppercase tracking-wider text-white/60">
                            Direct Telephone
                          </p>
                          <a
                            href={CLIENT_INFO.phoneHref}
                            className="text-[#E8C878] hover:underline font-medium tabular-nums mt-0.5 inline-block"
                          >
                            {CLIENT_INFO.phoneDisplay}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Editorial Biography & Positioning */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#D9AE55] font-semibold">
                  Meet Jahanshah
                </p>

                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#17191D] leading-[1.12]">
                  Real Estate Guidance Built Around Your Goals
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-[#17191D]/85 leading-relaxed">
                  <p>
                    Jahanshah Jomehri provides personalized real estate guidance for clients
                    navigating property decisions in Canoga Park and the greater Los Angeles area.
                    With a client-first approach and access to the Keller Williams Luxury network,
                    his focus is on making every stage of the real estate journey clear, informed,
                    and purposeful.
                  </p>
                  <p>
                    Whether you are acquiring a primary residence, positioning a luxury property for
                    sale, or evaluating commercial and investment real estate—spanning multifamily,
                    retail, leasing, hospitality, industrial, or land opportunities—Jahanshah brings
                    measured strategy and attentive communication to every conversation.
                  </p>
                </div>

                {/* Editorial Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#17191D]/10">
                  <div className="py-2">
                    <h3 className="text-base font-semibold text-[#17191D]">
                      Buyer & Seller Representation
                    </h3>
                    <p className="text-sm text-[#6F7277] mt-1">
                      Dedicated guidance from initial evaluation and property positioning through
                      negotiation and closing.
                    </p>
                  </div>
                  <div className="py-2">
                    <h3 className="text-base font-semibold text-[#17191D]">
                      Luxury & Commercial Scope
                    </h3>
                    <p className="text-sm text-[#6F7277] mt-1">
                      Versatile support across premier residential estates, investment acquisitions,
                      and commercial property needs.
                    </p>
                  </div>
                </div>

                {/* Refined Brand Monogram Divider & CTA */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-[1px] bg-[#D9AE55]" />
                    <span className="font-serif-luxury italic text-xl text-[#111C2C]">
                      Jahanshah Jomehri · Keller Williams Luxury
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111318] hover:bg-[#111C2C] text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer group"
                  >
                    <span>Get to Know Jahanshah</span>
                    <ArrowRight className="w-4 h-4 text-[#D9AE55] transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SERVICES SECTION */}
        <section id="services" className="py-20 sm:py-24 lg:py-32 bg-[#F8F5EF]">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#D9AE55] font-semibold">
                  Real Estate Services
                </p>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#17191D] leading-[1.12] mt-2">
                  A Smarter Approach to Your Next Property Move
                </h2>
              </div>
              <p className="text-base text-[#6F7277] max-w-md">
                Comprehensive real estate representation tailored to residential buyers, sellers,
                luxury property clients, and commercial investors across Greater Los Angeles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleInquiryPrefill(service.inquiryValue, service.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleInquiryPrefill(service.inquiryValue, service.title);
                    }
                  }}
                  className="group bg-[#FCFBF8] rounded-[20px] p-7 sm:p-8 border border-[#17191D]/8 shadow-sm hover:shadow-xl hover:border-[#D9AE55]/50 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between cursor-pointer text-left"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-11 h-11 rounded-xl bg-[#111318] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                        {getServiceIcon(service.id)}
                      </div>
                      <span className="font-serif-luxury text-lg font-semibold text-[#D9AE55] tabular-nums">
                        {service.number}.
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl font-semibold text-[#17191D] group-hover:text-[#111C2C]">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#6F7277] leading-relaxed mt-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-7 pt-5 border-t border-[#17191D]/8">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6F7277] mb-4">
                      {service.highlights.map((hl, i) => (
                        <React.Fragment key={hl}>
                          <span>{hl}</span>
                          {i < service.highlights.length - 1 && (
                            <span aria-hidden="true" className="text-[#D9AE55]">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#17191D] group-hover:text-[#D9AE55] transition-colors">
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROPERTY / FEATURED OPPORTUNITIES SECTION */}
        <section id="properties" className="py-20 sm:py-24 lg:py-32 bg-[#FFFFFF]">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#D9AE55] font-semibold">
                  Property Opportunities
                </p>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#17191D] leading-[1.12] mt-2">
                  Explore Exceptional Real Estate
                </h2>
              </div>

              {/* Functional Category Filter Controls */}
              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F8F5EF] rounded-xl border border-[#17191D]/8 self-start lg:self-auto"
                role="tablist"
                aria-label="Filter property opportunity categories"
              >
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'residential', label: 'Luxury Residences' },
                  { id: 'architectural', label: 'Modern Homes' },
                  { id: 'commercial', label: 'Commercial & Investment' },
                ].map((tab) => {
                  const active = propertyFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() =>
                        setPropertyFilter(
                          tab.id as 'all' | 'residential' | 'architectural' | 'commercial'
                        )
                      }
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#111318] text-[#E8C878] shadow-sm'
                          : 'text-[#6F7277] hover:text-[#17191D]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-sm text-[#6F7277] mb-8 max-w-3xl">
              Explore representative property styles and asset categories below. Every property
              search or sale is tailored to your specific criteria across Canoga Park, the San
              Fernando Valley, and Greater Los Angeles.
            </p>

            {/* 3 Cards Across on Desktop, 2 on Tablet, 1 on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredOpportunities.map((item) => (
                <article
                  key={item.id}
                  className="group bg-[#FCFBF8] rounded-[22px] overflow-hidden border border-[#17191D]/10 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* 4:3 Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111C2C]">
                      <ResilientPropertyImage
                        src={item.image}
                        alt={item.imageAlt}
                        title={item.title}
                        className="w-full h-full"
                        imgClassName="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 via-[#111318]/20 to-transparent" />

                      {/* Clean unboxed metadata overlay */}
                      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/90">
                        <span className="uppercase tracking-wider text-[#E8C878] font-semibold">
                          {item.representativeLabel}
                        </span>
                        <span>{item.categoryLabel}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <p className="text-xs text-[#6F7277] mb-1.5">{item.subtitle}</p>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#17191D]">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6F7277] leading-relaxed mt-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-3 border-t border-[#17191D]/8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedOpportunity(item)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#17191D] group-hover:text-[#D9AE55] transition-colors cursor-pointer"
                    >
                      <span>Explore Opportunities</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInquiryPrefill(item.inquiryValue, item.title)}
                      aria-label={`Request consultation for ${item.title}`}
                      className="w-9 h-9 rounded-lg bg-[#F8F5EF] hover:bg-[#D9AE55] text-[#17191D] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. WHY WORK WITH JAHANSHAH (Dark Cinematic Section) */}
        <section className="relative py-20 sm:py-24 lg:py-32 bg-[#111318] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ResilientPropertyImage
              src={IMAGES.canogaParkLifestyle}
              alt="Luxury Southern California interior overlooking the San Fernando Valley at twilight"
              title="A More Personal Real Estate Experience"
              className="w-full h-full"
              imgClassName="object-center opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111318]/90 via-[#111318]/80 to-[#111318]/95" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="max-w-2xl mb-14">
              <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#E8C878] font-semibold">
                Why Work With Jahanshah
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] font-semibold text-white leading-[1.12] mt-2">
                A More Personal Real Estate Experience
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mt-4">
                From the first conversation to the final decision, every step is approached with
                clarity, attention, and a focus on what matters to you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_WORK_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="rounded-[20px] bg-white/[0.06] backdrop-blur-md border border-white/15 p-7 hover:border-[#D9AE55]/60 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#D9AE55]/20 border border-[#D9AE55]/50 flex items-center justify-center text-[#E8C878] font-serif-luxury text-lg font-semibold mb-6 tabular-nums">
                      {pillar.number}
                    </div>
                    <h3 className="font-serif-luxury text-2xl font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed mt-3">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#E8C878]">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Keller Williams Luxury Standard</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CANOGA PARK / LOCAL MARKET SECTION */}
        <section className="py-20 sm:py-24 lg:py-32 bg-[#F8F5EF]">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Local Market Narrative & Interactive Area Selector */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.18em] text-[#D9AE55] font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Local Market Perspective</span>
                </div>

                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] font-semibold text-[#17191D] leading-[1.12]">
                  Rooted in Canoga Park. Connected to Greater Los Angeles.
                </h2>

                <p className="text-base sm:text-lg text-[#17191D]/85 leading-relaxed">
                  Whether you're searching for a home, preparing to sell, exploring luxury property,
                  or evaluating an investment opportunity, Jahanshah provides a personalized
                  starting point for navigating the local real estate landscape.
                </p>

                {/* Interactive Regional Focus Selector */}
                <div className="pt-2">
                  <div
                    className="flex flex-wrap gap-2 mb-5"
                    role="tablist"
                    aria-label="Select service area focus"
                  >
                    {LOCAL_AREAS.map((area) => {
                      const isSelected = area.id === activeAreaId;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setActiveAreaId(area.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-[#111318] text-[#E8C878] shadow-sm'
                              : 'bg-white text-[#6F7277] hover:text-[#17191D] border border-[#17191D]/10'
                          }`}
                        >
                          {area.name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-[#FCFBF8] rounded-[20px] p-6 sm:p-7 border border-[#17191D]/10 shadow-sm space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif-luxury text-2xl font-semibold text-[#17191D]">
                        {activeLocalArea.name}
                      </h3>
                      <span className="text-xs text-[#6F7277]">{activeLocalArea.region}</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#6F7277] leading-relaxed">
                      {activeLocalArea.summary}
                    </p>
                    <ul className="space-y-2 pt-2 border-t border-[#17191D]/8">
                      {activeLocalArea.focusPoints.map((pt, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-[#17191D]">
                          <CheckCircle2 className="w-4 h-4 text-[#D9AE55] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D9AE55] hover:bg-[#E8C878] text-[#111318] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm whitespace-nowrap cursor-pointer group"
                  >
                    <span>Discuss Your Property Goals</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Column: Southern California Visual + Office Location Card */}
              <div className="lg:col-span-6 space-y-6">
                <div className="relative rounded-[24px] overflow-hidden shadow-xl border border-[#17191D]/10 aspect-[16/11]">
                  <ResilientPropertyImage
                    src={IMAGES.canogaParkLifestyle}
                    alt="Panoramic Southern California residence overlooking Canoga Park and the San Fernando Valley"
                    title="Canoga Park & San Fernando Valley"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#E8C878] font-semibold">
                      Southern California Service Footprint
                    </p>
                    <p className="font-serif-luxury text-2xl sm:text-3xl font-medium mt-1">
                      Canoga Park · San Fernando Valley · Greater Los Angeles
                    </p>
                  </div>
                </div>

                {/* Verified Office Address Bar */}
                <div className="rounded-[20px] bg-[#111318] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#D9AE55]/30">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#D9AE55]/15 border border-[#D9AE55]/40 flex items-center justify-center text-[#E8C878] shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#E8C878] font-semibold">
                        {CLIENT_INFO.brokerage} Office
                      </p>
                      <p className="text-sm sm:text-base font-medium text-white mt-0.5">
                        {CLIENT_INFO.officeFullAddress}
                      </p>
                    </div>
                  </div>
                  <a
                    href={CLIENT_INFO.phoneHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8C878] hover:underline whitespace-nowrap tabular-nums"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{CLIENT_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SIMPLE BUYING / SELLING PROCESS SECTION */}
        <section className="py-20 sm:py-24 lg:py-32 bg-[#FFFFFF] border-t border-[#17191D]/8">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#D9AE55] font-semibold">
                How We Work Together
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#17191D] leading-[1.12] mt-2">
                A Clear Path From First Conversation to Closing
              </h2>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((item, idx) => (
                <div
                  key={item.step}
                  className="relative bg-[#FCFBF8] rounded-[20px] p-7 border border-[#17191D]/10 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#111318] border-2 border-[#D9AE55] text-[#E8C878] font-serif-luxury text-xl font-semibold flex items-center justify-center shrink-0 tabular-nums shadow-sm">
                        {item.step}
                      </div>
                      {idx < PROCESS_STEPS.length - 1 && (
                        <div
                          className="hidden lg:block h-[1px] flex-1 bg-gradient-to-r from-[#D9AE55]/60 to-[#17191D]/10"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <h3 className="font-serif-luxury text-2xl font-semibold text-[#17191D]">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6F7277] leading-relaxed mt-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#17191D]/8 flex items-center justify-between text-xs text-[#6F7277]">
                    <span>Step {item.step}</span>
                    <span className="text-[#D9AE55] font-semibold">Client-First Process</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. TRUST / PERSONAL BRAND STATEMENT SECTION */}
        <section className="py-20 sm:py-24 bg-[#111C2C] text-white relative overflow-hidden">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-8 relative z-10">
            <div className="rounded-[24px] bg-[#111318]/90 border border-[#D9AE55]/35 p-8 sm:p-12 lg:p-16 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <AgentPortrait
                    src={CLIENT_INFO.portraitUrl}
                    alt="Jahanshah Jomehri — Keller Williams Luxury"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#D9AE55] shadow-xl mb-4"
                  />
                  <h3 className="font-serif-luxury text-2xl font-semibold text-white">
                    {CLIENT_INFO.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#E8C878] mt-1 font-medium">
                    {CLIENT_INFO.brokerage}
                  </p>
                  <p className="text-xs text-white/65 mt-1">{CLIENT_INFO.fullLocation}</p>
                </div>

                <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
                  <p className="font-serif-luxury italic text-2xl sm:text-3xl lg:text-4xl text-white leading-[1.25]">
                    “Real estate decisions deserve a thoughtful strategy and a personal approach.”
                  </p>

                  <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                    Whether you are preparing for an upcoming purchase, considering selling a
                    property, or evaluating commercial and investment avenues in Southern
                    California, start with a straightforward, confidential conversation.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D9AE55] hover:bg-[#E8C878] text-[#111318] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                    >
                      <span>Start a Conversation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={CLIENT_INFO.phoneHref}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/25 hover:border-[#D9AE55] text-white font-medium text-sm transition-colors whitespace-nowrap tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-[#D9AE55]" />
                      <span>{CLIENT_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. FAQ SECTION */}
        <section id="faq" className="py-20 sm:py-24 lg:py-32 bg-[#F8F5EF]">
          <div className="max-w-[1024px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#D9AE55] font-semibold">
                Common Questions
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#17191D] leading-[1.12] mt-2">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-[#6F7277] mt-3">
                Clear answers about working with Jahanshah Jomehri and Keller Williams Luxury in
                Canoga Park and Greater Los Angeles.
              </p>
            </div>

            <div className="space-y-3.5">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                const contentId = `faq-answer-${idx}`;
                const buttonId = `faq-question-${idx}`;
                return (
                  <div
                    key={idx}
                    className={`rounded-[18px] transition-colors duration-200 border ${
                      isOpen
                        ? 'bg-[#FFFFFF] border-[#D9AE55]/60 shadow-md'
                        : 'bg-[#FCFBF8] border-[#17191D]/10 hover:border-[#17191D]/25'
                    }`}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-6 py-5 sm:px-7 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9AE55] rounded-[18px]"
                      >
                        <span className="font-serif-luxury text-xl sm:text-2xl font-semibold text-[#17191D]">
                          {faq.question}
                        </span>
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                            isOpen
                              ? 'bg-[#111318] text-[#E8C878]'
                              : 'bg-[#F8F5EF] text-[#17191D]'
                          }`}
                        >
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-sm sm:text-base text-[#6F7277] leading-relaxed border-t border-[#17191D]/6"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 11. CONTACT / CONSULTATION CTA SECTION */}
        <section
          id="contact"
          className="relative py-20 sm:py-24 lg:py-32 bg-[#111318] text-white overflow-hidden"
        >
          {/* Subtle Architectural Background */}
          <div className="absolute inset-0 z-0">
            <ResilientPropertyImage
              src={IMAGES.heroEstate}
              alt="Southern California luxury real estate consultation background"
              title="Schedule a Consultation with Jahanshah Jomehri"
              className="w-full h-full"
              imgClassName="object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/95 to-[#111C2C]/90" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Direct Contact Info & Quick Actions */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#E8C878] font-semibold">
                    Private Consultation
                  </p>
                  <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[50px] font-semibold text-white leading-[1.1] mt-2">
                    Let's Talk About Your Next Move
                  </h2>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed mt-4">
                    Whether you're buying, selling, investing, or simply exploring your options,
                    start with a conversation.
                  </p>
                </div>

                {/* Direct Contact Details */}
                <div className="space-y-5 pt-2 border-t border-white/15">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#D9AE55]/15 border border-[#D9AE55]/40 flex items-center justify-center text-[#E8C878] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">
                        Call Directly
                      </p>
                      <a
                        href={CLIENT_INFO.phoneHref}
                        className="font-serif-luxury text-2xl font-semibold text-white hover:text-[#E8C878] transition-colors tabular-nums mt-0.5 inline-block"
                      >
                        {CLIENT_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#D9AE55]/15 border border-[#D9AE55]/40 flex items-center justify-center text-[#E8C878] shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">Brokerage</p>
                      <p className="text-base font-medium text-white mt-0.5">
                        {CLIENT_INFO.name} · {CLIENT_INFO.brokerage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#D9AE55]/15 border border-[#D9AE55]/40 flex items-center justify-center text-[#E8C878] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/60">
                        Office Address
                      </p>
                      <p className="text-base text-white/90 mt-0.5">
                        {CLIENT_INFO.officeAddressLine1}
                      </p>
                      <p className="text-base text-white/90">{CLIENT_INFO.officeAddressLine2}</p>
                    </div>
                  </div>
                </div>

                {/* Suggested Message Quick-Fill Card */}
                <div className="rounded-[20px] bg-white/[0.05] border border-white/15 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#E8C878] font-semibold">
                    <MessageSquare className="w-4 h-4" />
                    <span>Quick Inquiry Prompt</span>
                  </div>
                  <p className="text-sm text-white/85 italic">
                    “{CLIENT_INFO.suggestedMessage}”
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          message: CLIENT_INFO.suggestedMessage,
                        }));
                        const msgInput = document.getElementById('contact-message');
                        msgInput?.focus();
                      }}
                      className="text-xs font-semibold text-[#D9AE55] hover:text-[#E8C878] underline cursor-pointer"
                    >
                      Use this message in form
                    </button>
                    <span aria-hidden="true" className="text-white/30">
                      ·
                    </span>
                    <a
                      href={CLIENT_INFO.smsHref}
                      className="text-xs font-semibold text-white/80 hover:text-white underline"
                    >
                      Send via Text / SMS
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Hostinger-Ready Consultation Form */}
              <div className="lg:col-span-7">
                <div className="rounded-[24px] bg-[#FCFBF8] text-[#17191D] p-7 sm:p-10 shadow-2xl border border-[#D9AE55]/30">
                  {formSubmitted ? (
                    <div
                      className="py-10 px-4 text-center space-y-5"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#111318] text-[#D9AE55] flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif-luxury text-3xl font-semibold text-[#17191D]">
                        Consultation Request Received
                      </h3>
                      <p className="text-base text-[#6F7277] max-w-md mx-auto leading-relaxed">
                        Thank you. Your message has been received. Jahanshah's team will be in
                        touch soon.
                      </p>
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={CLIENT_INFO.phoneHref}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D9AE55] text-[#111318] font-semibold text-sm tabular-nums"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call {CLIENT_INFO.phoneDisplay}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                              fullName: '',
                              email: '',
                              phone: '',
                              interest: 'Buying',
                              message: '',
                            });
                          }}
                          className="px-5 py-3 rounded-xl border border-[#17191D]/20 text-sm font-medium text-[#17191D] hover:bg-[#F8F5EF] transition-colors cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleFormSubmit}
                      noValidate
                      name="jahanshah-consultation-form"
                      method="POST"
                      data-hostinger-form="true"
                      className="space-y-5"
                    >
                      <div className="border-b border-[#17191D]/10 pb-4 mb-2">
                        <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#17191D]">
                          Schedule a Consultation
                        </h3>
                        <p className="text-sm text-[#6F7277] mt-1">
                          Complete the form below or call{' '}
                          <a
                            href={CLIENT_INFO.phoneHref}
                            className="text-[#17191D] font-semibold underline tabular-nums"
                          >
                            {CLIENT_INFO.phoneDisplay}
                          </a>
                          .
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                          <label
                            htmlFor="contact-fullName"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#17191D] mb-2"
                          >
                            Full Name <span className="text-[#D9AE55]">*</span>
                          </label>
                          <input
                            id="contact-fullName"
                            name="fullName"
                            type="text"
                            required
                            autoComplete="name"
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData({ ...formData, fullName: e.target.value });
                              if (formErrors.fullName)
                                setFormErrors({ ...formErrors, fullName: undefined });
                            }}
                            placeholder="Your full name"
                            className={`w-full px-4 py-3.5 rounded-xl bg-white border text-sm text-[#17191D] placeholder:text-[#6F7277]/60 focus:outline-none focus:ring-2 focus:ring-[#D9AE55] transition-all ${
                              formErrors.fullName ? 'border-red-600' : 'border-[#17191D]/15'
                            }`}
                          />
                          {formErrors.fullName && (
                            <p className="text-xs text-red-600 mt-1.5" role="alert">
                              {formErrors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#17191D] mb-2"
                          >
                            Email Address <span className="text-[#D9AE55]">*</span>
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (formErrors.email)
                                setFormErrors({ ...formErrors, email: undefined });
                            }}
                            placeholder="you@example.com"
                            className={`w-full px-4 py-3.5 rounded-xl bg-white border text-sm text-[#17191D] placeholder:text-[#6F7277]/60 focus:outline-none focus:ring-2 focus:ring-[#D9AE55] transition-all ${
                              formErrors.email ? 'border-red-600' : 'border-[#17191D]/15'
                            }`}
                          />
                          {formErrors.email && (
                            <p className="text-xs text-red-600 mt-1.5" role="alert">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Phone Number */}
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#17191D] mb-2"
                          >
                            Phone Number <span className="text-[#D9AE55]">*</span>
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (formErrors.phone)
                                setFormErrors({ ...formErrors, phone: undefined });
                            }}
                            placeholder="(626) 000-0000"
                            className={`w-full px-4 py-3.5 rounded-xl bg-white border text-sm text-[#17191D] placeholder:text-[#6F7277]/60 focus:outline-none focus:ring-2 focus:ring-[#D9AE55] transition-all tabular-nums ${
                              formErrors.phone ? 'border-red-600' : 'border-[#17191D]/15'
                            }`}
                          />
                          {formErrors.phone && (
                            <p className="text-xs text-red-600 mt-1.5" role="alert">
                              {formErrors.phone}
                            </p>
                          )}
                        </div>

                        {/* I'm Interested In */}
                        <div>
                          <label
                            htmlFor="contact-interest"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#17191D] mb-2"
                          >
                            I'm Interested In <span className="text-[#D9AE55]">*</span>
                          </label>
                          <select
                            id="contact-interest"
                            name="interest"
                            value={formData.interest}
                            onChange={(e) =>
                              setFormData({ ...formData, interest: e.target.value })
                            }
                            className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#17191D]/15 text-sm text-[#17191D] focus:outline-none focus:ring-2 focus:ring-[#D9AE55] transition-all"
                          >
                            <option value="Buying">Buying</option>
                            <option value="Selling">Selling</option>
                            <option value="Luxury Property">Luxury Property</option>
                            <option value="Investment">Investment</option>
                            <option value="Commercial Real Estate">Commercial Real Estate</option>
                            <option value="General Inquiry">General Inquiry</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#17191D] mb-2"
                        >
                          Message <span className="text-[#D9AE55]">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => {
                            setFormData({ ...formData, message: e.target.value });
                            if (formErrors.message)
                              setFormErrors({ ...formErrors, message: undefined });
                          }}
                          placeholder="Tell Jahanshah about your property goals, preferred areas, or questions..."
                          className={`w-full px-4 py-3.5 rounded-xl bg-white border text-sm text-[#17191D] placeholder:text-[#6F7277]/60 focus:outline-none focus:ring-2 focus:ring-[#D9AE55] transition-all resize-y ${
                            formErrors.message ? 'border-red-600' : 'border-[#17191D]/15'
                          }`}
                        />
                        {formErrors.message && (
                          <p className="text-xs text-red-600 mt-1.5" role="alert">
                            {formErrors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 px-7 rounded-xl bg-[#D9AE55] hover:bg-[#E8C878] text-[#111318] font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <span>Request a Consultation</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER */}
      <footer className="bg-[#0d0f13] text-white border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3.5">
                <ArchitecturalMonogram className="w-10 h-10" />
                <div>
                  <p className="font-serif-luxury text-2xl font-semibold text-white">
                    {CLIENT_INFO.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#D9AE55]">
                    Luxury Real Estate
                  </p>
                </div>
              </div>
              <p className="text-sm text-white/70 max-w-sm leading-relaxed">
                Personalized real estate guidance for Canoga Park and the greater Los Angeles area.
              </p>
              <p className="text-xs text-white/55">
                Associated with {CLIENT_INFO.brokerage}
              </p>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E8C878]">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm text-white/75">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'services', label: 'Services' },
                  { id: 'properties', label: 'Properties' },
                  { id: 'faq', label: 'FAQ' },
                  { id: 'contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className="hover:text-[#E8C878] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E8C878]">
                Contact & Office
              </h3>
              <p className="text-sm font-medium text-white">{CLIENT_INFO.brokerage}</p>
              <address className="not-italic text-sm text-white/75 space-y-1">
                <p>{CLIENT_INFO.officeAddressLine1}</p>
                <p>{CLIENT_INFO.officeAddressLine2}</p>
              </address>
              <div className="pt-2">
                <a
                  href={CLIENT_INFO.phoneHref}
                  className="inline-flex items-center gap-2 text-base font-semibold text-[#E8C878] hover:underline tabular-nums"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CLIENT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
            <p>© 2026 Jahanshah Jomehri. All rights reserved.</p>
            <p className="max-w-xl sm:text-right">
              Each Keller Williams brokerage office is independently owned and operated. Information
              on this website is provided for general informational purposes.
            </p>
          </div>
        </div>
      </footer>

      {/* Property Opportunity Detail Modal */}
      <PropertyModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onSelectInquiry={handleInquiryPrefill}
      />
    </div>
  );
}
