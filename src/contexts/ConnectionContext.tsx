/* eslint-disable react-refresh/only-export-components */

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export type ConnexionContextType = {
    estConnecter: boolean;
    jeton: string;
    connexion: (email: string, motDePasse: string) => Promise<boolean>;
    deconnexion: () => void;
};

export const ConnexionContext = createContext<ConnexionContextType>({
    estConnecter: false,
    jeton: "",
    connexion: () => new Promise<boolean>(() => false),
    deconnexion: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function ConnexionProvider({children} : Props){
    const [estConnecter, setEstConnecter] = useState(false);
    const [jeton, setJeton] = useState("");

    useEffect(()=>{

      if(localStorage.getItem("JetonUtilisateur")){
        setEstConnecter(true)
        setJeton(localStorage.getItem("JetonUtilisateur")!.toString())
      }
    },[]);


    async function connexion(email: string, motDePasse: string) {
        return axios
      .post('http://localhost:3000/api/generatetoken', {
        userLogin: {
          email: email,
          motDePasse: motDePasse,
      },
      })
      .then((response) => {
        const { token } = response.data;

        if (token) {
          setEstConnecter(true);

          /// Inspiré de https://stackoverflow.com/questions/28314368/how-to-maintain-state-after-a-page-refresh-in-react-js
          localStorage.setItem("JetonUtilisateur", token);
          setJeton(token);
          return true;
        } else {
          setEstConnecter(false);
          setJeton('');
          return false;
        }
      });
    }

    function deconnexion() {
        setJeton('');
        setEstConnecter(false);
        localStorage.removeItem("JetonUtilisateur");
    }

    const valeurContext = {
        estConnecter,
        jeton,
        connexion,
        deconnexion,
    };

    return(
      <ConnexionContext.Provider value={valeurContext}>
        {children}
      </ConnexionContext.Provider>
    );
}