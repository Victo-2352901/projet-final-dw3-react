/* eslint-disable react-refresh/only-export-components */


import { createContext, useState } from "react";
import { IntlProvider } from "react-intl";

import Francais from "../lang/fr.json"

import Anglais from "../lang/en.json"


export type LanguageContextType = {
  locale: string;
  changerLangage: (lang: "fr" | "en") => void;
};

export const LangageContext = createContext<LanguageContextType>({
  locale: "fr",
  changerLangage: () => {},
});

type Props = {
  children: React.ReactNode;
};


function LangageProvider({ children }: Props) {

const langueActuel = localStorage.getItem("langage") ?? "fr";

  const [locale, setLocale] = useState<"fr" | "en">(langueActuel === "en" ? "en" : "fr");
  const [messages, setMessages] = useState(locale === "en" ? Anglais : Francais);
 

  // Ça c'étais mon code mais pour régler les problème de build et pouvoir mettre sur azure j'ai demander à 
  // l'IA qu'elle m'aide a régler les problèmes
 
  // useEffect(() =>{
  //       if(langueActuel == "fr"){
  //         setMessages(Francais)
  //       }
  //       else if(langueActuel == "en"){
  //         setMessages(Anglais)
  //       }
  //       else{
  //         setMessages(Francais)
  //         localStorage.setItem("langage", "fr")
  //       }
  //     },[])
  // const changerLangage = (lang: string) => {
  //   setLocale(lang);

  //   localStorage.setItem("langage", lang)

  //   if(localStorage.getItem("langage") == "fr"){
  //     setMessages(Francais);
  //   }
  //   else{
  //     setMessages(Anglais);
  //   }
  // };
  const changerLangage = (lang: "fr" | "en") => {
    setLocale(lang);
    localStorage.setItem("langage", lang);

    if (lang == "fr") {
      setMessages(Francais);
    } else {
      setMessages(Anglais);
    }
  };

  return (
    <LangageContext.Provider value={{ locale, changerLangage }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </LangageContext.Provider>
  );
}

export default LangageProvider;