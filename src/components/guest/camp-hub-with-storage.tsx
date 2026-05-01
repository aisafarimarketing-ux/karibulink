"use client";

import { useEffect, useState } from "react";
import { CampHub } from "./camp-hub";
import type { Property } from "@/data/types";

const storageKey = (slug: string) => `kl-property-${slug}`;

/**
 * Renders the live CampHub for a camp guest page. On mount it tries to
 * hydrate the property from localStorage so any edits a camp owner made
 * in /admin/properties show up here too. Listens to the `storage` event
 * so live edits in another tab update this page in real time.
 */
export function CampHubWithStorage({
  initialProperty,
}: {
  initialProperty: Property;
}) {
  const [property, setProperty] = useState<Property>(initialProperty);

  useEffect(() => {
    const key = storageKey(initialProperty.slug);
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        setProperty(JSON.parse(stored) as Property);
      }
    } catch {
      /* ignore */
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      if (!e.newValue) {
        setProperty(initialProperty);
        return;
      }
      try {
        setProperty(JSON.parse(e.newValue) as Property);
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [initialProperty]);

  return <CampHub property={property} />;
}
