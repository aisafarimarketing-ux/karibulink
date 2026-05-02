import { presetFor } from "./presets";
import type {
  Operator,
  Organization,
  Property,
} from "./types";

export const ORGANIZATIONS: Organization[] = [
  {
    id: "org-serengeti-view",
    name: "Serengeti View Camp Co.",
    type: "camp",
    country: "Tanzania",
    region: "Serengeti",
    contactEmail: "hello@serengetiview.example",
    phone: "+255 700 000 000",
  },
  {
    id: "org-mara-north",
    name: "Mara North Conservancy",
    type: "lodge",
    country: "Kenya",
    region: "Maasai Mara",
    contactEmail: "stay@maranorth.example",
    phone: "+254 700 000 100",
  },
  {
    id: "org-stone-town",
    name: "Stone Town Hospitality",
    type: "bnb",
    country: "Tanzania",
    region: "Zanzibar",
    contactEmail: "karibu@stonetown.example",
    phone: "+255 700 000 200",
  },
  {
    id: "org-kilimanjaro-trails",
    name: "Kilimanjaro Trails",
    type: "tour_operator",
    country: "Tanzania",
    region: "Arusha",
    contactEmail: "ops@kilimanjarotrails.example",
    phone: "+255 700 000 002",
  },
];

export const PROPERTIES: Property[] = [
  {
    id: "prop-serengeti-view",
    organizationId: "org-serengeti-view",
    name: "Serengeti View Camp",
    slug: "serengeti-view-camp",
    welcomeMessage: "Welcome. Your tent is ready and waiting.",
    heroTitle: "Welcome to Serengeti View Camp",
    heroSubtitle: "Karibu — welcome",
    location: "Central Serengeti, Tanzania",
    rules: [
      "Please stay inside camp boundaries after dark — call reception for an escort.",
      "Drone flights are not permitted inside the national park.",
      "Single-use plastics: please refill bottles from the filtered station in the lounge.",
      "Quiet hours from 22:00 — sound carries far in the bush.",
    ],
    amenities: [
      {
        iconKey: "coffee",
        label: "Meals",
        detail:
          "Breakfast 6–9, lunch 12:30, sundowners 17:30, dinner from 19:30. Dietary needs taken at registration.",
      },
      {
        iconKey: "wifi",
        label: "Wi-Fi",
        detail:
          "Network: SerengetiView · Password at the bar. Best signal in the lounge tent.",
      },
      {
        iconKey: "bolt",
        label: "Power",
        detail:
          "Solar 24/7 in tents. Generator 06:00–10:00 and 17:00–22:00 for hot water and charging the heavy stuff.",
      },
      {
        iconKey: "droplet",
        label: "Water",
        detail:
          "Filtered drinking water in your tent and at the bar. Hot water bottles on request after 18:00.",
      },
      {
        iconKey: "tent",
        label: "Check-in / Check-out",
        detail:
          "Arrival from 13:00 · Departure by 10:00. Late check-out on request, subject to bookings.",
      },
    ],
    services: [
      {
        iconKey: "coffee",
        label: "Tea & coffee in tent",
        detail: "Brought to your tent at your wake-up time.",
      },
      {
        iconKey: "droplet",
        label: "Hot water bottle",
        detail: "Tucked into your bed before turn-down.",
      },
      {
        iconKey: "leaf",
        label: "Laundry",
        detail: "Drop at reception by 09:00, returned same day.",
      },
      {
        iconKey: "compass",
        label: "Book an activity",
        detail: "Game drive, walking safari, cultural visit, balloon.",
      },
    ],
    safetyNotes: [
      {
        iconKey: "user",
        label: "Night escort",
        detail:
          "After dark, please call reception on the radio in your tent and a staff member will walk you to and from the lounge.",
      },
      {
        iconKey: "phone",
        label: "Emergency contact",
        detail:
          "Press the red button on your tent radio, or dial 0 from any in-camp phone. 24-hour response.",
      },
      {
        iconKey: "shield",
        label: "Whistle in your tent",
        detail:
          "Three short blasts brings the night askari. Use only in emergency — wildlife may be near camp at night.",
      },
    ],
    emergencyContact: {
      label: "Reception (24h)",
      phone: "+255 700 000 000",
    },
    staff: [
      {
        name: "Esther Mollel",
        role: "Camp Manager",
        bio: "12 years welcoming guests across the northern circuit.",
      },
      {
        name: "James Lekishon",
        role: "Head Guide",
        bio: "Maasai-born; a quiet expert on big cats and birdlife.",
      },
      {
        name: "Neema Kileo",
        role: "Guide",
        bio: "Botanist by training; loves the small things on a walking safari.",
      },
      {
        name: "Baraka Said",
        role: "Chef",
        bio: "Coastal Swahili fusion. Ask about the slow-cooked goat.",
      },
    ],
    sightings: [
      {
        day: "Today, sunrise",
        animal: "Leopard with cub",
        area: "Seronera river crossing",
        spotter: "Guide James",
      },
      {
        day: "Yesterday, dusk",
        animal: "Pride of 11 lions",
        area: "Naabi Hill kopjes",
        spotter: "Guide Neema",
      },
      {
        day: "Yesterday, midday",
        animal: "Cheetah on a kill",
        area: "Central plains",
        spotter: "Guide Kibet",
      },
      {
        day: "Two days ago",
        animal: "Black rhino",
        area: "Moru kopjes",
        spotter: "Guide Sarah",
      },
    ],
    yourStayIntro:
      "Everything you need for a calm, comfortable stay in the bush.",
    experiencesIntro: "What we can make happen for you today.",
    helpIntro: "We're a tap away, day or night.",
    waiverText:
      "By staying with us, you agree to follow camp safety guidance, respect the conservancy, and never leave camp on foot after dark without an escort.",
    fairMode: {
      tagline: "Sixteen tents on the Serengeti migration plains.",
      highlights: ["16 luxury tents", "20 min from airstrip", "Open all year"],
      about:
        "Serengeti View Camp blends classic safari hospitality with thoughtful, low-impact design. Each tent opens onto the migration plains; our team — most of them born within the conservancy — is what guests remember most.",
      bestFor: "Couples and small groups, May – November",
      accessNote: "20-min charter from Arusha (HTM)",
      operatorResponseNote: "Within 24 hours, weekdays",
      guidingNote: "Maasai-born guides, average 12 years' experience",
      accommodation: {
        rooms: 16,
        capacity: 32,
        features: [
          "King and twin tents",
          "Private bathroom · hot shower",
          "Solar power 24/7",
          "Veranda with plains view",
          "Daily housekeeping",
        ],
      },
      policies: {
        childPolicy:
          "Children 8+ welcome. Family tents (sleeps 4) on request.",
        occupancy:
          "Maximum 32 guests at any time. Single supplement applies in low season.",
      },
      rates: {
        priceRange:
          "$650 – $980 per person, per night, full board",
        paymentTerms:
          "30% deposit at booking, balance 60 days before arrival",
        discounts:
          "10% rebooking discount · 5% group discount (8+ guests)",
      },
      uniqueSellingPoints: [
        "Front-row seats on the Great Migration, June – October",
        "Resident leopard family in the kopjes behind camp",
        "Walking safaris with Maasai trackers",
        "100% solar — no diesel generators",
      ],
      activities: [
        "Game drives (sunrise & sunset)",
        "Walking safari with a Maasai guide",
        "Hot air balloon (premium add-on)",
        "Cultural visit to a nearby Maasai boma",
        "Bush sundowner with a private chef",
      ],
      whatsappPhone: "+255700000000",
      email: "operators@serengetiview.example",
    },
    type: "camp",
    sections: presetFor("camp"),
  },
  {
    id: "prop-mara-north",
    organizationId: "org-mara-north",
    name: "Mara North Lodge",
    slug: "mara-north-lodge",
    welcomeMessage: "Welcome. The conservancy is yours.",
    heroTitle: "Welcome to Mara North Lodge",
    heroSubtitle: "Karibu — welcome to the conservancy",
    location: "Mara North Conservancy, Kenya",
    rules: [
      "Off-road driving is permitted only in the conservancy — never in the reserve.",
      "Maximum 5 vehicles per sighting. We rotate.",
      "Please don't feed any wildlife.",
    ],
    amenities: [
      {
        iconKey: "coffee",
        label: "Meals",
        detail: "Breakfast 6:30, lunch 12:30, dinner 19:30 in the main mess.",
      },
      {
        iconKey: "wifi",
        label: "Wi-Fi",
        detail: "Available in the lounge. Password at reception.",
      },
    ],
    services: [
      {
        iconKey: "compass",
        label: "Walking safari",
        detail: "Conservancy walks at sunrise with a Maasai guide.",
      },
    ],
    safetyNotes: [
      {
        iconKey: "user",
        label: "Night escort",
        detail: "Please use the radio after dark — askari will walk you back.",
      },
    ],
    emergencyContact: {
      label: "Reception",
      phone: "+254 700 000 100",
    },
    staff: [
      {
        name: "Joseph Sankale",
        role: "Lodge Manager",
        bio: "Born inside the conservancy; knows every corner.",
      },
    ],
    sightings: [
      {
        day: "Today, midday",
        animal: "Cheetah brothers",
        area: "Olare plains",
        spotter: "Guide Kosen",
      },
    ],
  },
  {
    id: "prop-stone-town",
    organizationId: "org-stone-town",
    name: "Stone Town BnB",
    slug: "stone-town-bnb",
    welcomeMessage: "Karibu Zanzibar. Your room is ready.",
    heroTitle: "Welcome to Stone Town BnB",
    heroSubtitle: "Karibu — welcome to the island",
    location: "Stone Town, Zanzibar",
    rules: [
      "Doors close at 23:00 — please ring the bell if you're returning later.",
      "Quiet inside the building during call to prayer.",
      "Tap water for washing only; bottled water provided.",
    ],
    amenities: [
      {
        iconKey: "coffee",
        label: "Breakfast",
        detail: "Served on the rooftop 7–10. Mango, eggs, mandazi, spiced coffee.",
      },
      {
        iconKey: "wifi",
        label: "Wi-Fi",
        detail: "Network: StoneTownGuest · password on the welcome card.",
      },
      {
        iconKey: "droplet",
        label: "Hot water",
        detail: "All day. Solar-fed — best after midday.",
      },
    ],
    services: [
      {
        iconKey: "compass",
        label: "Spice tour booking",
        detail: "We book direct with a small local operator. Half-day, with lunch.",
      },
      {
        iconKey: "leaf",
        label: "Laundry drop",
        detail: "Drop by 9:00 next door, back by sunset.",
      },
    ],
    safetyNotes: [
      {
        iconKey: "shield",
        label: "Stay aware in the alleys at night",
        detail: "Walk in pairs after dark. The host will arrange a tuktuk if you'd prefer.",
      },
    ],
    emergencyContact: {
      label: "Host on call",
      phone: "+255 700 000 200",
    },
    staff: [
      {
        name: "Layla Hamad",
        role: "Host",
        bio: "Third-generation Stone Towner. Spice tour expert.",
      },
    ],
    sightings: [],
  },
];

export const OPERATORS: Operator[] = [
  {
    id: "op-kilimanjaro-trails",
    organizationId: "org-kilimanjaro-trails",
    name: "Kilimanjaro Trails",
    slug: "kilimanjaro-trails",
    routes: [
      {
        id: "route-day-1",
        day: 1,
        name: "Arusha to Tarangire",
        fromTo: "Arusha → Tarangire",
        stops: [
          {
            time: "07:30",
            title: "Depart Arusha",
            detail:
              "Coffee, water, and a rest stop at the Maasai market. Roughly 3 hours of road.",
          },
          {
            time: "10:30",
            title: "Mto wa Mbu — coffee + rooftop view",
            detail:
              "Stretch your legs, watch the Rift Valley wall rise on your left.",
          },
          {
            time: "11:30",
            title: "Tarangire gate — into the park",
            detail:
              "Park fees handled. Roof up, cameras out. We're on guide-time from here.",
          },
          {
            time: "13:00",
            title: "Picnic lunch under a baobab",
            detail:
              "The big-tusker matriarchs come down to drink at midday. We sit and watch.",
          },
          {
            time: "16:30",
            title: "Sundowners on the Tarangire River escarpment",
            detail:
              "Gin, tonic, and a herd of 200 elephants moving downriver in the gold light.",
          },
          {
            time: "18:00",
            title: "Camp",
            detail:
              "Hot showers, dinner, sleep to the sound of lions calling across the valley.",
          },
        ],
      },
    ],
    guides: [
      {
        initials: "JL",
        name: "James Lekishon",
        role: "Lead guide · Day 1",
        bio: "14 years in northern Tanzania. Maasai-born, quiet expert on big cats.",
        phone: "+255 700 000 001",
      },
    ],
    vehicles: [
      {
        type: "Toyota Land Cruiser (open roof)",
        registration: "T-440 KLT",
        capacity: 6,
      },
    ],
    emergencyContact: {
      label: "Operations (24h)",
      phone: "+255 700 000 002",
    },
    journeyNotes: {
      heroEyebrow: "Day 1 of 7 · Safari Journey",
      heroTitle: "Welcome to Your Safari Journey",
      heroSubtitle:
        "Today: Arusha to Tarangire. Your guide is James — Maasai-born, quiet expert on big cats. Everything you need is below. Tap any card.",
      expectations: [
        {
          iconKey: "leaf",
          label: "Landscape",
          detail:
            "Tarangire's signature: ancient baobabs, golden grasslands, and a river valley that holds water all year — which is why everything else gathers here.",
        },
        {
          iconKey: "user",
          label: "Culture",
          detail:
            "You'll pass through Maasai grazing land. If you'd like to visit a boma, ask your guide — it's an arranged visit, not a stop on a tour.",
        },
        {
          iconKey: "binoculars",
          label: "Wildlife — likely",
          detail:
            "Elephants in family groups, giraffe, zebra, impala, baboons. Tarangire is the elephant park.",
        },
        {
          iconKey: "star",
          label: "Wildlife — possible",
          detail:
            "Lion (especially in trees), leopard at dusk, cheetah on the open plains, the rare fringe-eared oryx.",
        },
      ],
      prompts: [
        "What's the most exciting thing you've seen this week?",
        "Why are the elephants here, and not somewhere else right now?",
        "Tell me about the baobabs — how old is the biggest one we passed?",
        "What's the bird I keep hearing? The one that sounds like water dripping.",
        "Where would you go if you had a free day in Tarangire?",
      ],
    },
  },
];

export const DEMO_PROPERTY_SLUG = "serengeti-view-camp";
export const DEMO_OPERATOR_SLUG = "kilimanjaro-trails";

export function listOrganizations(): Organization[] {
  return ORGANIZATIONS;
}

export function listProperties(): Property[] {
  return PROPERTIES;
}

export function listOperators(): Operator[] {
  return OPERATORS;
}

export function getOrganization(id: string): Organization | undefined {
  return ORGANIZATIONS.find((o) => o.id === id);
}

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getOperator(slug: string): Operator | undefined {
  return OPERATORS.find((o) => o.slug === slug);
}
