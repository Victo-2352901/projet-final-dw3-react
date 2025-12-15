// Inspiré du LoginContext de Étienne Rivard
// Les fichiers fr.json et en.json ont été généré par l'intelligence artificielle 
// Pour le reste c'est moi ! :)

import { createContext, useState } from "react";

import { createIntl, type IntlShape } from "react-intl";
import Francais from "../lang/fr.json";
import Anglais from "../lang/en.json";

interface IntlContextType {
  locale: string;
  intl: IntlShape;
  changerLangue: () => void;
}

export const IntlContext = createContext<IntlContextType>({
  locale: "",
  intl: createIntl({
    locale: "fr",
    messages: Francais,
  }),
  changerLangue: () => {},
});

export default function IntlProvider(props: any) {
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState(Anglais);

  const intl = createIntl({
    locale: locale,
    messages: messages,
  });

  function changerLangue() {
    if (locale === "fr") {
      setLocale("en");
      setMessages(Anglais);
    } else {
      setLocale("fr");
      setMessages(Francais);
    }
  }

  const values = { locale, intl, changerLangue };

  return (
    <IntlContext.Provider value={values}>{props.children}</IntlContext.Provider>
  );
}
