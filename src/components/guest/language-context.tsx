"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGES = ["EN", "FR", "SW", "DE", "ES"] as const;
export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<Language, string> = {
  EN: "English",
  FR: "Français",
  SW: "Kiswahili",
  DE: "Deutsch",
  ES: "Español",
};

const DICTIONARY = {
  EN: {
    register: "Register",
    campInfo: "Camp Info",
    safety: "Safety",
    services: "Services",
    sightings: "Sightings",
    contact: "Contact",
    statusOpen: "Camp is open",
    statusOnSafari: "On safari",
    checkIn: "Check-in",
    registerYourStay: "Register your stay",
    registerHelp: "A quick check-in. Your details stay with the camp.",
    fullName: "Full name",
    email: "Email",
    country: "Country",
    tourOperator: "Tour operator",
    optional: "optional",
    submitRegister: "Register",
    demoOnly: "Demo — nothing is saved.",
    aboutTheCamp: "About the camp",
    recentSightings: "Recent sightings",
    meetTheTeam: "Meet the team",
    houseRules: "House rules",
    inEmergency: "In an emergency",
    weAreATapAway: "We're a tap away.",
    backToKaribuLink: "Back to KaribuLink",
    callLabel: "Call",
    whatsappLabel: "WhatsApp",
    directionsLabel: "Directions",
    request: "Request",
    emergency: "Emergency",
    todaysRoute: "Route",
    whatToExpect: "Expect",
    askGuide: "Guide",
    memories: "Memories",
  },
  FR: {
    register: "S'inscrire",
    campInfo: "Camp",
    safety: "Sécurité",
    services: "Services",
    sightings: "Observations",
    contact: "Contact",
    statusOpen: "Camp ouvert",
    statusOnSafari: "En safari",
    checkIn: "Arrivée",
    registerYourStay: "Enregistrer votre séjour",
    registerHelp: "Un enregistrement rapide. Vos données restent au camp.",
    fullName: "Nom complet",
    email: "E-mail",
    country: "Pays",
    tourOperator: "Tour opérateur",
    optional: "facultatif",
    submitRegister: "S'inscrire",
    demoOnly: "Démo — rien n'est enregistré.",
    aboutTheCamp: "Le camp",
    recentSightings: "Observations récentes",
    meetTheTeam: "L'équipe",
    houseRules: "Règles",
    inEmergency: "En cas d'urgence",
    weAreATapAway: "Toujours à portée.",
    backToKaribuLink: "Retour à KaribuLink",
    callLabel: "Appeler",
    whatsappLabel: "WhatsApp",
    directionsLabel: "Itinéraire",
    request: "Demander",
    emergency: "Urgence",
    todaysRoute: "Itinéraire",
    whatToExpect: "À prévoir",
    askGuide: "Votre guide",
    memories: "Souvenirs",
  },
  SW: {
    register: "Jisajili",
    campInfo: "Kambi",
    safety: "Usalama",
    services: "Huduma",
    sightings: "Wanyama",
    contact: "Mawasiliano",
    statusOpen: "Kambi imefunguliwa",
    statusOnSafari: "Safarini",
    checkIn: "Kuingia",
    registerYourStay: "Jisajili kuingia kwako",
    registerHelp: "Kujisajili haraka. Habari zako zinabaki kambini.",
    fullName: "Jina kamili",
    email: "Barua pepe",
    country: "Nchi",
    tourOperator: "Mwendeshaji wa utalii",
    optional: "si lazima",
    submitRegister: "Jisajili",
    demoOnly: "Demo — hakuna kinachohifadhiwa.",
    aboutTheCamp: "Kuhusu kambi",
    recentSightings: "Walioonekana hivi karibuni",
    meetTheTeam: "Wahudumu wetu",
    houseRules: "Sheria za kambi",
    inEmergency: "Katika dharura",
    weAreATapAway: "Tuko karibu nawe.",
    backToKaribuLink: "Rudi KaribuLink",
    callLabel: "Piga simu",
    whatsappLabel: "WhatsApp",
    directionsLabel: "Mwelekeo",
    request: "Omba",
    emergency: "Dharura",
    todaysRoute: "Safari ya leo",
    whatToExpect: "Cha kutarajia",
    askGuide: "Muulize kiongozi",
    memories: "Kumbukumbu",
  },
  DE: {
    register: "Anmelden",
    campInfo: "Camp",
    safety: "Sicherheit",
    services: "Service",
    sightings: "Sichtungen",
    contact: "Kontakt",
    statusOpen: "Camp geöffnet",
    statusOnSafari: "Auf Safari",
    checkIn: "Check-in",
    registerYourStay: "Aufenthalt anmelden",
    registerHelp: "Schnelle Anmeldung. Ihre Daten bleiben im Camp.",
    fullName: "Vollständiger Name",
    email: "E-Mail",
    country: "Land",
    tourOperator: "Reiseveranstalter",
    optional: "optional",
    submitRegister: "Anmelden",
    demoOnly: "Demo — nichts wird gespeichert.",
    aboutTheCamp: "Über das Camp",
    recentSightings: "Aktuelle Sichtungen",
    meetTheTeam: "Unser Team",
    houseRules: "Hausregeln",
    inEmergency: "Im Notfall",
    weAreATapAway: "Nur ein Tipp entfernt.",
    backToKaribuLink: "Zurück zu KaribuLink",
    callLabel: "Anrufen",
    whatsappLabel: "WhatsApp",
    directionsLabel: "Wegbeschreibung",
    request: "Anfragen",
    emergency: "Notfall",
    todaysRoute: "Heutige Route",
    whatToExpect: "Was Sie erwartet",
    askGuide: "Fragen Sie",
    memories: "Erinnerungen",
  },
  ES: {
    register: "Registrarse",
    campInfo: "Camp",
    safety: "Seguridad",
    services: "Servicios",
    sightings: "Avistamientos",
    contact: "Contacto",
    statusOpen: "Camp abierto",
    statusOnSafari: "De safari",
    checkIn: "Registro",
    registerYourStay: "Registre su estancia",
    registerHelp: "Un registro rápido. Sus datos quedan en el camp.",
    fullName: "Nombre completo",
    email: "Correo",
    country: "País",
    tourOperator: "Tour operador",
    optional: "opcional",
    submitRegister: "Registrarse",
    demoOnly: "Demo — nada se guarda.",
    aboutTheCamp: "Sobre el camp",
    recentSightings: "Avistamientos recientes",
    meetTheTeam: "Nuestro equipo",
    houseRules: "Normas",
    inEmergency: "En caso de emergencia",
    weAreATapAway: "A un toque.",
    backToKaribuLink: "Volver a KaribuLink",
    callLabel: "Llamar",
    whatsappLabel: "WhatsApp",
    directionsLabel: "Cómo llegar",
    request: "Solicitar",
    emergency: "Emergencia",
    todaysRoute: "Ruta de hoy",
    whatToExpect: "Qué esperar",
    askGuide: "Pregunte al guía",
    memories: "Recuerdos",
  },
} as const;

export type TranslationKey = keyof (typeof DICTIONARY)["EN"];

interface LangContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({
  children,
  initial = "EN",
}: {
  children: ReactNode;
  initial?: Language;
}) {
  const [lang, setLang] = useState<Language>(initial);
  const t = (key: TranslationKey): string =>
    (DICTIONARY[lang] as Record<string, string>)[key] ??
    (DICTIONARY.EN as Record<string, string>)[key] ??
    key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    // Outside provider: return EN fallback so components don't crash
    return {
      lang: "EN",
      setLang: () => {},
      t: (key) =>
        (DICTIONARY.EN as Record<string, string>)[key] ?? key,
    };
  }
  return ctx;
}

export function useT() {
  return useLanguage().t;
}
