"use client"

import { useEffect, useState } from "react"
import i18next from "i18next"
import {
  initReactI18next,
  useTranslation as useTranslationOrg
} from "react-i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { getOptions, languages } from "./settings"

const runsOnServerSide = typeof window === "undefined"

void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      async (language: string, namespace: string) =>
        await import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"]
    },
    preload: runsOnServerSide ? languages : []
  })

export function useTranslation(lng: string, ns: string, options = {}): any {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  if (
    runsOnServerSide &&
    typeof lng !== "undefined" &&
    i18n.resolvedLanguage !== lng
  ) {
    void i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (typeof lng === "undefined" || i18n.resolvedLanguage === lng) return
      void i18n.changeLanguage(lng)
    }, [lng, i18n])
  }
  return ret
}
