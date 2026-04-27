import { useState, useEffect } from "preact/hooks";

export type Language = "python" | "typescript";

const STORAGE_KEY = "gsd-lang-pref";
const DEFAULT_LANG: Language = "python";

function readStorage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "python" || stored === "typescript") return stored;
  } catch {}
  return DEFAULT_LANG;
}

export function useLanguagePreference(): [Language, (lang: Language) => void] {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANG);

  useEffect(() => {
    setLangState(readStorage());

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setLangState(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
    } catch {}
  };

  return [lang, setLang];
}
