import * as i18n from "i18next";
import type { Callback, InitOptions } from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationENG from "@/locales/en.json";
import translationVI from "@/locales/vi.json";

export const supportedLngs = {
  vi: "Tiếng việt",
  en: "English",
};

const resources = {
  vi: {
    translation: translationVI,
  },
  en: {
    translation: translationENG,
  },
};

class I18nTranslation {
  public async initialize(
    initOptions?: InitOptions,
    callback?: Callback
  ): Promise<void> {
    await i18n
      .use(detector)
      .use(initReactI18next)
      .init(
        initOptions ?? {
          resources,
          lng: localStorage.getItem("i18nextLng") || "vi",
          supportedLngs: Object.keys(supportedLngs),
          fallbackLng: "vi",
          keySeparator: false,
          interpolation: {
            escapeValue: false,
          },
        },
        callback
      );
  }
}

const i18nTranslation = new I18nTranslation();

export default i18nTranslation;
