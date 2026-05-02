import type {
  PropertySection,
  PropertyType,
  SectionType,
} from "./types";

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  camp: "Safari camp",
  hotel: "Hotel",
  boutique: "Boutique stay",
  airbnb: "BnB / Airbnb",
};

const sec = (
  id: string,
  type: SectionType,
  title: string,
  content: string,
): PropertySection => ({ id, type, title, content, enabled: true });

const CAMP_PRESET: PropertySection[] = [
  sec("welcome", "welcome", "Welcome", "A warm note from the camp. Speak in your voice — it sets the tone for everything else."),
  sec("camp-info", "info", "Camp Info", "Meals, Wi-Fi, power, water, check-in / check-out."),
  sec("activities", "activities", "Safari Activities", "Game drives, walking safaris, balloon flights, cultural visits."),
  sec("services", "services", "Services", "Tea & coffee in tent, laundry, hot water bottles, on-request items."),
  sec("safety", "safety", "Safety", "Night escort, emergency line, tent radio."),
  sec("sightings", "sightings", "Recent Sightings", "What guides spotted in the last 48 hours."),
];

const HOTEL_PRESET: PropertySection[] = [
  sec("welcome", "welcome", "Welcome", "A note from the hotel."),
  sec("hotel-info", "info", "Hotel Info", "Reception hours, restaurants, spa, gym."),
  sec("amenities", "amenities", "Amenities", "Wi-Fi, parking, business centre, room service."),
  sec("policies", "policies", "Policies", "Check-in, check-out, children, pets, cancellations."),
  sec("experiences", "experiences", "Experiences", "Local tours, partnerships, in-house activities."),
];

const BOUTIQUE_PRESET: PropertySection[] = [
  sec("welcome", "welcome", "Welcome", "A warm welcome to your stay."),
  sec("info", "info", "Stay Info", "Hours, dining, services, and how to reach us."),
  sec("amenities", "amenities", "Amenities", "What's included with your stay."),
  sec("experiences", "experiences", "Experiences", "What we can arrange for you in town."),
  sec("policies", "policies", "Policies", "House rules and details to make the stay easy."),
];

const AIRBNB_PRESET: PropertySection[] = [
  sec("welcome", "welcome", "Welcome", "A note from your host."),
  sec("house-info", "info", "House Info", "Wi-Fi, keys, parking, contact."),
  sec("rules", "rules", "Rules", "House rules and quiet hours."),
  sec("check-in", "check-in", "Check-in", "How to get in and the lock-up routine."),
  sec("local-tips", "local-tips", "Local Tips", "Coffee, food, walks, transit."),
];

export const PRESETS: Record<PropertyType, PropertySection[]> = {
  camp: CAMP_PRESET,
  hotel: HOTEL_PRESET,
  boutique: BOUTIQUE_PRESET,
  airbnb: AIRBNB_PRESET,
};

/** Returns a fresh, mutable copy of the preset for the given type. */
export function presetFor(type: PropertyType): PropertySection[] {
  return PRESETS[type].map((s) => ({ ...s }));
}
