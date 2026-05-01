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
