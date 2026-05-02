export type IconKey =
  | "coffee"
  | "wifi"
  | "bolt"
  | "droplet"
  | "tent"
  | "leaf"
  | "compass"
  | "user"
  | "info"
  | "shield"
  | "phone"
  | "binoculars"
  | "route"
  | "star"
  | "camera"
  | "moon"
  | "message";

export type OrganizationType = "camp" | "lodge" | "bnb" | "tour_operator";

/* --------------------------------------------------------------- */
/*  Property type + preset section system                            */
/* --------------------------------------------------------------- */

export type PropertyType = "camp" | "hotel" | "boutique" | "airbnb";

export type SectionType =
  | "welcome"
  | "info"
  | "amenities"
  | "activities"
  | "services"
  | "safety"
  | "sightings"
  | "policies"
  | "experiences"
  | "rules"
  | "check-in"
  | "team"
  | "local-tips"
  | "custom";

export interface PropertySection {
  id: string;
  type: SectionType;
  title: string;
  content: string;
  enabled: boolean;
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  country: string;
  region: string;
  contactEmail: string;
  phone: string;
}

export interface IconItem {
  iconKey: IconKey;
  label: string;
  detail: string;
}

export interface Sighting {
  day: string;
  animal: string;
  area: string;
  spotter: string;
}

export interface Staff {
  name: string;
  role: string;
  bio: string;
}

export interface EmergencyContact {
  label: string;
  phone: string;
}

export interface FairActivity {
  title: string;
  description?: string;
  /** Short trailing tag — e.g. "Daily · Included" or "Premium add-on". */
  meta?: string;
  iconKey?: IconKey;
  /** Drives the Experiences split: Included vs Optional add-ons. */
  category?: "included" | "optional";
}

export interface FairTradeOverview {
  /** Multi-line value lists. Each string is rendered on its own line. */
  location?: string[];
  bestFor?: string[];
  onTheGround?: string[];
  capacity?: string[];
  languages?: string[];
}

export interface FairContact {
  name: string;
  title: string;
  company?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  avatarUrl?: string;
}

export interface FairRoomSetup {
  iconKey?: IconKey;
  title: string;
  count: number;
  description?: string;
  thumbnailUrl?: string;
}

export interface FairDownloadable {
  title: string;
  fileType: string;
  url: string;
  iconKey?: IconKey;
}

export interface FairSocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface FairTripadvisor {
  rating: number;
  reviewCount?: number;
  url?: string;
}

export interface FairTestimonial {
  quote: string;
  author: string;
  role?: string;
}

export interface FairMatchAttributes {
  idealFor?: string[];
  experiences?: string[];
  styleTags?: string[];
  suitability?: string[];
  customFitNotes?: string;
}

export interface FairLeadCapture {
  headline: string;
  subcopy: string;
  bullets?: string[];
  ctaLabel: string;
  disclaimer?: string;
  /** Options for the "interest" dropdown. */
  interestOptions?: string[];
}

export interface FairSnapshotItem {
  label: string;
  value: string;
}

export interface FairMode {
  tagline?: string;
  highlights?: string[];
  about?: string;
  /** Conversion-trust signals for the "Why work with us" block. */
  bestFor?: string;
  /** Three-or-so phrases under the intro paragraph (e.g. "Couples"). */
  bestForList?: string[];
  accessNote?: string;
  operatorResponseNote?: string;
  guidingNote?: string;
  /** Structured rows for the Trade Overview section. */
  tradeOverview?: FairTradeOverview;
  /** Quick-info strip facts. All optional — render only what's set. */
  airstripDistance?: string;
  season?: string;
  guestType?: string;
  power?: string;
  accommodation?: {
    rooms?: number;
    capacity?: number;
    /** One-line lede above the feature bullets. */
    descriptor?: string;
    features?: string[];
  };
  policies?: {
    childPolicy?: string;
    occupancy?: string;
  };
  rates?: {
    priceRange?: string;
    paymentTerms?: string;
    discounts?: string;
  };
  uniqueSellingPoints?: string[];
  /** Accepts plain strings (legacy) or objects with a one-line description. */
  activities?: Array<string | FairActivity>;
  photos?: string[];
  whatsappPhone?: string;
  email?: string;

  /* --- Trade profile (full PNG-reference build) --- */

  /** Brand / collection metadata for hero + header */
  logoUrl?: string;
  collection?: string;
  rating?: { stars: number; source?: string };
  destinationTag?: string;
  budgetTag?: string;
  styleTag?: string;

  /** Overview block extras */
  vibeText?: string;
  overviewImageUrl?: string;

  /** Sales contact for the Contact Card */
  contact?: FairContact;

  /** Bordered Trade Snapshot grid — six labelled facts. */
  snapshot?: FairSnapshotItem[];

  /** Per-setup room types (family / double / single, etc.) */
  roomSetups?: FairRoomSetup[];

  /** What's in the rate vs not. */
  inclusions?: string[];
  exclusions?: string[];

  /** Offers & terms boxed section. */
  offersText?: string;
  termsText?: string;

  /** Smart trade-fit attributes used for the matching block. */
  matchAttributes?: FairMatchAttributes;

  /** Trade pack downloadables. */
  downloadables?: FairDownloadable[];

  /** Social proof. */
  socialLinks?: FairSocialLink[];
  tripadvisor?: FairTripadvisor;
  testimonial?: FairTestimonial;

  /** Lead capture form copy + interest options. */
  leadCapture?: FairLeadCapture;
}

export interface Property {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  welcomeMessage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  location: string;
  rules: string[];
  amenities: IconItem[];
  services: IconItem[];
  safetyNotes: IconItem[];
  emergencyContact: EmergencyContact;
  staff: Staff[];
  sightings: Sighting[];
  yourStayIntro?: string;
  experiencesIntro?: string;
  helpIntro?: string;
  waiverText?: string;
  fairMode?: FairMode;
  /** Optional preset-driven structure that supports non-camp property types. */
  type?: PropertyType;
  sections?: PropertySection[];
}

export interface RouteStop {
  time: string;
  title: string;
  detail: string;
}

export interface SafariRoute {
  id: string;
  day: number;
  name: string;
  fromTo: string;
  stops: RouteStop[];
}

export interface Guide {
  initials: string;
  name: string;
  role: string;
  bio: string;
  phone: string;
}

export interface Vehicle {
  type: string;
  registration: string;
  capacity: number;
}

export interface JourneyNotes {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  expectations: IconItem[];
  prompts: string[];
}

export interface Operator {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  routes: SafariRoute[];
  guides: Guide[];
  vehicles: Vehicle[];
  emergencyContact: EmergencyContact;
  journeyNotes: JourneyNotes;
}
