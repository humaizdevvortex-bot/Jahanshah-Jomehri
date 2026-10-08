import heroEstateImg from '../assets/images/hero_socal_estate_1791488119333.jpg';
import luxuryResidencesImg from '../assets/images/luxury_residences_card_1791488134527.jpg';
import modernHomesImg from '../assets/images/modern_homes_card_1791488149162.jpg';
import commercialInvestmentImg from '../assets/images/investment_commercial_card_1791488167842.jpg';
import canogaParkLifestyleImg from '../assets/images/canoga_park_lifestyle_1791488183560.jpg';
import architecturalViewEstateImg from '../assets/images/architectural_view_estate_card_1791489264625.jpg';
import multifamilyPortfolioImg from '../assets/images/multifamily_portfolio_card_1791489278014.jpg';
import hospitalityRetailImg from '../assets/images/hospitality_retail_development_card_1791489296654.jpg';

export const CLIENT_INFO = {
  name: 'Jahanshah Jomehri',
  title: 'Luxury Real Estate Advisor',
  brokerage: 'Keller Williams Luxury',
  location: 'Canoga Park, CA',
  fullLocation: 'Canoga Park, California',
  phoneDisplay: '(626) 213-1847',
  phoneHref: 'tel:+16262131847',
  whatsappHref:
    'https://wa.me/16262131847?text=' +
    encodeURIComponent('Jahanshah, I’d like to learn more about your real estate services.'),
  smsHref:
    'sms:+16262131847?body=' +
    encodeURIComponent('Jahanshah, I’d like to learn more about your real estate services.'),
  suggestedMessage: 'Jahanshah, I’d like to learn more about your real estate services.',
  officeAddressLine1: '21133 Victory Blvd Ste 217',
  officeAddressLine2: 'Canoga Park, CA 91303',
  officeFullAddress: '21133 Victory Blvd Ste 217, Canoga Park, CA 91303',
  portraitUrl:
    'https://media.licdn.com/dms/image/v2/D5603AQH2zF9Fm9GI1w/profile-displayphoto-shrink_100_100/B56ZTY5W6IGQAY-/0/1738805704905?e=1793232000&v=beta&t=c7e7anKNZJnic0PzjmNlHPV8bMUYlXM7eT1cMfuBc1c',
};

export const IMAGES = {
  heroEstate: heroEstateImg,
  luxuryResidences: luxuryResidencesImg,
  modernHomes: modernHomesImg,
  commercialInvestment: commercialInvestmentImg,
  canogaParkLifestyle: canogaParkLifestyleImg,
  architecturalViewEstate: architecturalViewEstateImg,
  multifamilyPortfolio: multifamilyPortfolioImg,
  hospitalityRetail: hospitalityRetailImg,
};

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  inquiryValue: string;
  description: string;
  highlights: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'buying',
    number: '01',
    title: 'Buying',
    inquiryValue: 'Buying',
    description:
      'Guidance through property search, evaluation, negotiation, and closing tailored to your lifestyle and long-term priorities.',
    highlights: ['Curated Property Search', 'Due Diligence & Valuation', 'Closing Coordination'],
  },
  {
    id: 'selling',
    number: '02',
    title: 'Selling',
    inquiryValue: 'Selling',
    description:
      'Positioning, marketing, negotiation, and transaction guidance designed to present your property with distinction.',
    highlights: ['Strategic Positioning', 'Luxury Presentation', 'Contract Negotiation'],
  },
  {
    id: 'luxury',
    number: '03',
    title: 'Luxury Real Estate',
    inquiryValue: 'Luxury Property',
    description:
      'Personalized support for clients exploring premier estates, architectural residences, and luxury properties across Los Angeles.',
    highlights: ['Keller Williams Luxury Network', 'Discreet Representation', 'Architectural Focus'],
  },
  {
    id: 'investment',
    number: '04',
    title: 'Investment Opportunities',
    inquiryValue: 'Investment',
    description:
      'Property guidance for clients evaluating residential and multi-asset real estate opportunities and long-term portfolio acquisitions.',
    highlights: ['Acquisition Strategy', 'Asset Evaluation', 'Hold & Exit Perspective'],
  },
  {
    id: 'commercial',
    number: '05',
    title: 'Commercial Real Estate',
    inquiryValue: 'Commercial Real Estate',
    description:
      'Support for relevant commercial property opportunities including sales, leasing, multifamily, retail, hospitality, industrial, and land/development.',
    highlights: ['Sales & Leasing Advisory', 'Multifamily & Retail', 'Land & Development'],
  },
  {
    id: 'market-guidance',
    number: '06',
    title: 'Market Guidance',
    inquiryValue: 'General Inquiry',
    description:
      'Local perspective and strategic guidance across Canoga Park and the San Fernando Valley to help clients make informed decisions.',
    highlights: ['Neighborhood Insights', 'Timing & Strategy', 'Custom Consultation'],
  },
];

export interface PropertyOpportunity {
  id: string;
  category: 'residential' | 'architectural' | 'commercial';
  categoryLabel: string;
  representativeLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  inquiryValue: string;
  advisoryFocus: string[];
  idealFor: string;
}

export const PROPERTY_OPPORTUNITIES: PropertyOpportunity[] = [
  {
    id: 'luxury-residences',
    category: 'residential',
    categoryLabel: 'Luxury Estates & Residences',
    representativeLabel: 'Representative Property Style',
    title: 'Luxury Residences',
    subtitle: 'Canoga Park · San Fernando Valley · Greater Los Angeles',
    description:
      'Private hillside estates, gated residences, and custom properties featuring refined indoor-outdoor Southern California living.',
    image: IMAGES.luxuryResidences,
    imageAlt:
      'Representative luxury hillside residence in Southern California with limestone facade and reflecting pool',
    inquiryValue: 'Luxury Property',
    advisoryFocus: [
      'Private & off-market search coordination through Keller Williams Luxury',
      'Architectural, lot, and neighborhood evaluation across the West Valley and Los Angeles',
      'Tailored representation for both residential buyers and estate sellers',
    ],
    idealFor:
      'Discerning buyers and sellers seeking bespoke architectural quality, privacy, and premier Southern California living.',
  },
  {
    id: 'modern-homes',
    category: 'architectural',
    categoryLabel: 'Single-Family & Contemporary',
    representativeLabel: 'Representative Property Style',
    title: 'Modern Homes',
    subtitle: 'Canoga Park · Woodland Hills · West Hills · Encino',
    description:
      'Thoughtfully designed contemporary residences and updated single-family homes tailored for modern daily living and entertaining.',
    image: IMAGES.modernHomes,
    imageAlt:
      'Representative modern architectural home in San Fernando Valley with warm stucco, oak accents, and olive tree courtyard',
    inquiryValue: 'Buying',
    advisoryFocus: [
      'Comprehensive search across Canoga Park and neighboring San Fernando Valley communities',
      'Clear property comparisons, inspection guidance, and contract strategy',
      'Strategic preparation and positioning when transitioning from your current home',
    ],
    idealFor:
      'Homebuyers and sellers looking for well-located residences with modern comfort, functional layouts, and long-term value.',
  },
  {
    id: 'commercial-investment',
    category: 'commercial',
    categoryLabel: 'Investment & Commercial',
    representativeLabel: 'Explore Property Opportunities',
    title: 'Investment & Commercial Properties',
    subtitle: 'Multifamily · Retail · Leasing · Hospitality · Land',
    description:
      'Strategic guidance for investors and owners evaluating multifamily residences, retail corridors, industrial space, leasing, or land development.',
    image: IMAGES.commercialInvestment,
    imageAlt:
      'Representative upscale mixed-use commercial and multifamily investment property in Los Angeles',
    inquiryValue: 'Commercial Real Estate',
    advisoryFocus: [
      'Evaluation of multifamily, retail, hospitality, industrial, and land/development opportunities',
      'Support for commercial sales, leasing, and long-term investment positioning',
      'Objective assessment aligned with your capital goals and timeline',
    ],
    idealFor:
      'Investors, business owners, and developers seeking informed representation across residential investment and commercial asset classes.',
  },
  {
    id: 'architectural-view-estates',
    category: 'residential',
    categoryLabel: 'Hillside & Canyon View Estates',
    representativeLabel: 'Representative Property Style',
    title: 'Architectural View Estates',
    subtitle: 'West Valley Hills · Calabasas Corridor · Santa Monica Mountains',
    description:
      'Elevated glass-and-stone residences designed around panoramic canyon and valley vistas, resort-caliber terraces, and serene privacy.',
    image: IMAGES.architecturalViewEstate,
    imageAlt:
      'Representative luxury contemporary view estate in the West San Fernando Valley overlooking sunset hills with infinity pool',
    inquiryValue: 'Luxury Property',
    advisoryFocus: [
      'Identification of view-oriented estates and custom architectural residences',
      'Careful evaluation of hillside siting, privacy, and indoor-outdoor livability',
      'High-touch marketing and presentation for distinctive luxury listings',
    ],
    idealFor:
      'Clients seeking statement architecture, expansive Southern California views, and private entertaining spaces.',
  },
  {
    id: 'multifamily-residential-portfolios',
    category: 'architectural',
    categoryLabel: 'Multifamily & Income Residences',
    representativeLabel: 'Explore Property Opportunities',
    title: 'Multifamily & Income Properties',
    subtitle: 'Canoga Park · Warner Center · San Fernando Valley',
    description:
      'Boutique apartment communities, multi-unit residential buildings, and income-oriented properties positioned in high-demand Los Angeles corridors.',
    image: IMAGES.multifamilyPortfolio,
    imageAlt:
      'Representative boutique multifamily residential property in Los Angeles with warm plaster, cedar louvers, and landscaped courtyard',
    inquiryValue: 'Investment',
    advisoryFocus: [
      'Acquisition and disposition guidance for multifamily and income-producing residences',
      'Local insight into West San Fernando Valley rental and neighborhood dynamics',
      'Support for portfolio repositioning, 1031 exchange timelines, and long-term hold strategies',
    ],
    idealFor:
      'Real estate investors and property owners looking to acquire, expand, or sell multifamily residential assets.',
  },
  {
    id: 'hospitality-retail-development',
    category: 'commercial',
    categoryLabel: 'Retail, Hospitality & Development',
    representativeLabel: 'Explore Property Opportunities',
    title: 'Retail, Hospitality & Land Opportunities',
    subtitle: 'Canoga Park · Greater Los Angeles · Southern California',
    description:
      'Commercial properties spanning boutique retail centers, hospitality venues, industrial space, commercial leasing, and strategic land parcels.',
    image: IMAGES.hospitalityRetail,
    imageAlt:
      'Representative upscale boutique hospitality and retail courtyard property in Southern California at twilight',
    inquiryValue: 'Commercial Real Estate',
    advisoryFocus: [
      'Commercial sales, leasing, and site acquisition across retail, hospitality, and industrial sectors',
      'Evaluation of zoning, visibility, corridor growth, and development potential',
      'Dedicated advisory from initial site review through contract negotiation and closing',
    ],
    idealFor:
      'Commercial operators, hospitality groups, developers, and private capital investors across Greater Los Angeles.',
  },
];

export const WHY_WORK_PILLARS = [
  {
    number: '01',
    title: 'Personalized Attention',
    description:
      'Real estate guidance shaped around your specific goals, timeline, and priorities rather than a one-size-fits-all script.',
  },
  {
    number: '02',
    title: 'Market Perspective',
    description:
      'Thoughtful insight into Canoga Park, the San Fernando Valley, and Greater Los Angeles to help you understand your options.',
  },
  {
    number: '03',
    title: 'Strategic Guidance',
    description:
      'Clear, composed support through property evaluation, positioning, negotiations, and important transaction decisions.',
  },
  {
    number: '04',
    title: 'Client-First Service',
    description:
      'A responsive, relationship-focused experience backed by the resources and reach of Keller Williams Luxury.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Tell Us Your Goals',
    description:
      'Share what you are looking for, your property priorities, and your ideal timeline in a private initial conversation.',
  },
  {
    step: '02',
    title: 'Explore Your Options',
    description:
      'Review relevant properties, market opportunities, and tailored strategies aligned with your objectives.',
  },
  {
    step: '03',
    title: 'Make an Informed Decision',
    description:
      'Receive clear, steady guidance through property evaluation, terms, negotiations, and key milestones.',
  },
  {
    step: '04',
    title: 'Move Forward With Confidence',
    description:
      'Stay supported through due diligence and the final stages of your transaction for a smooth closing.',
  },
];

export const LOCAL_AREAS = [
  {
    id: 'canoga-park',
    name: 'Canoga Park',
    region: 'West San Fernando Valley Core',
    summary:
      'Home to Jahanshah’s Keller Williams Luxury office on Victory Blvd, Canoga Park offers a dynamic mix of established residential neighborhoods, contemporary housing, and evolving commercial corridors.',
    focusPoints: [
      'Single-family residences and contemporary homes',
      'Proximity to Warner Center, shopping, and dining corridors',
      'Residential & commercial investment opportunities',
    ],
  },
  {
    id: 'san-fernando-valley',
    name: 'San Fernando Valley',
    region: 'Surrounding Valley Communities',
    summary:
      'From tranquil hillside enclaves to vibrant boulevard districts, the San Fernando Valley provides diverse options for homeowners, luxury buyers, and multi-asset investors.',
    focusPoints: [
      'Hillside estates and architectural view properties',
      'Established residential pockets with spacious lots',
      'Multifamily, retail, and commercial leasing corridors',
    ],
  },
  {
    id: 'greater-la',
    name: 'Greater Los Angeles',
    region: 'Southern California Reach',
    summary:
      'Connected through the Keller Williams Luxury network, Jahanshah assists clients whose real estate goals extend across Greater Los Angeles and Southern California.',
    focusPoints: [
      'Luxury residential acquisitions and dispositions',
      'Cross-market relocation and portfolio strategy',
      'Commercial, hospitality, industrial, and land opportunities',
    ],
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Who is Jahanshah Jomehri?',
    answer:
      'Jahanshah Jomehri is a real estate agent with Keller Williams Luxury serving clients in Canoga Park and the surrounding Los Angeles area.',
  },
  {
    question: 'How can I contact Jahanshah Jomehri?',
    answer:
      'You can reach Jahanshah Jomehri directly at (626) 213-1847, or request a consultation using the contact form on this page.',
  },
  {
    question: "Where is Jahanshah's office located?",
    answer:
      'Keller Williams Luxury, 21133 Victory Blvd Ste 217, Canoga Park, CA 91303.',
  },
  {
    question: 'What types of real estate services are available?',
    answer:
      'Jahanshah provides personalized guidance for buying, selling, luxury real estate, investment opportunities, commercial real estate (including sales, leasing, multifamily, retail, hospitality, industrial, and land/development), and local market strategy.',
  },
  {
    question: 'Can Jahanshah help both buyers and sellers?',
    answer:
      'Yes. Whether you are searching for the right property, preparing a residence or commercial asset for sale, or evaluating both simultaneously, Jahanshah provides clear guidance through each step of the process.',
  },
  {
    question: 'Does Jahanshah work with luxury properties?',
    answer:
      'Yes. Associated with Keller Williams Luxury in Canoga Park, Jahanshah assists clients seeking or selling high-end residential estates and premier property opportunities across Greater Los Angeles.',
  },
  {
    question: 'How do I schedule a consultation?',
    answer:
      'Click any "Schedule a Consultation" button on this website to fill out a brief inquiry form, or call (626) 213-1847 to speak directly about your goals.',
  },
];
