import axios from "axios";
import { createContext, useState } from "react";

export type ConnectionContextType = {
    estConnecter: boolean;
    jeton: string;
    connexion: (email: string, motDePasse: string) => Promise<boolean>;
    deconnexion: () => void;
};

export const ConnectionContext = createContext<ConnectionContextType>({
    estConnecter: false,
    jeton: "",
    connexion: () => new Promise<boolean>(() => false),
    deconnexion: () => {},
});

export default function ConnectionProvider(props:any){
    const [estConnecter, setEstConnecter] = useState(false);
    const [jeton, setJeton] = useState("");


    async function connexion(email: string, motDePasse: string) {
        return axios
      .post('http://localhost:3001/api/users/generatetoken', {
        email,
        motDePasse,
      })
      .then((response) => {
        const { jeton } = response.data;
        if (jeton) {
          setEstConnecter(true);
          setJeton(jeton);
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
    }

    const valeurContext = {
        estConnecter,
        jeton,
        connexion,
        deconnexion,
    };

    return(
      <ConnectionContext.Provider value={valeurContext}>
        {props.children}
      </ConnectionContext.Provider>
    );
}