import { useContext, useState } from "react";
import { ConnexionContext } from "../../contexts/ConnectionContext";
import { FormattedMessage} from "react-intl";

import { LangageContext } from "../../contexts/LangueContext";

function TopBar() {

    const {estConnecter, deconnexion} = useContext(ConnexionContext)

    const [langue, setLangue] = useState<string>("Anglais");

    const {locale, changerLangage } = useContext(LangageContext);

    const ChangerLangue = () => {
        if(locale == "fr"){
            changerLangage("en");
            setLangue("Français");
        }
        else{
            changerLangage("fr");
            setLangue("Anglais");
        }        
    }



  return (
    <>
        <nav className="w-screen h-25 bg-gray-800 flex justify-between items-center p-4">

            <div>
                <h1 className="text-white">
                    <FormattedMessage
                        id="topbar.titre"
                        defaultMessage="Les motos de Bibinette"
                    />
                </h1>
            </div>

            <div className="flex items-center justify-between gap-10"> 



                <button onClick={ChangerLangue}>
                    <FormattedMessage
                        id="topbar.bouton.changer.langue"
                        defaultMessage="Changer la langue : {langue}"
                        values={{langue: langue}}
                    />
                </button>

                <a href="/" className="text-white hover:text-gray-400">
                    <FormattedMessage
                        id="topbar.lien.inventaire"
                        defaultMessage="INVENTAIRE"
                    />
                </a>

                {
                    estConnecter &&
                    <a href="/ajouter-moto" className="text-white hover:text-gray-400">
                        <FormattedMessage
                            id="topbar.lien.ajouter_moto"
                            defaultMessage="AJOUTER UNE MOTO"
                        />
                    </a>
                }
                

                {estConnecter ?
                 <div>
                    <button onClick={deconnexion}>
                        <FormattedMessage
                            id="topbar.auth.deconnexion"
                            defaultMessage="Déconnexion"
                        />
                        <img className="w-10 h-10" src="data:image/png;base64,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"/>
                    </button>
                </div>
                 :
                <div className="text-white">
                    <a href="authentification">
                        <FormattedMessage
                            id="topbar.auth.connexion"
                            defaultMessage="Authentification"
                        />
                        <img className="w-10 h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s"/>
                    </a>
                </div>
                }

            </div>

        </nav>
    </>
  )
}

export default TopBar;