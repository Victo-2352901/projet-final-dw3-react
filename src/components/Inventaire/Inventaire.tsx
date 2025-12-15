import axios from "axios";
import { useContext, useEffect, useState } from "react";
import type { IMoto } from "../../models/imoto.model";
import TopBar from "../TopBar";
import { ConnexionContext } from "../../contexts/ConnectionContext";

import { FormattedMessage } from "react-intl";


function Inventaire() {

    const { estConnecter, jeton } = useContext(ConnexionContext)

    const [motos, setMotos] = useState<IMoto[]>([]); 

    const [filtreMarque, setFiltreMarque] = useState<string>("Aucune");

    const [filtreKiloMax, setFiltreKiloMax] = useState<number>(0);




    useEffect(() => {
    axios.get("http://localhost:3000/api/motos/all").then((response) => {
      setMotos(response.data.motos);
      // console.log(response.data.motos);
    })
    .catch((err) => {
      console.error("ERREUR axios :", err);
    });;
    // initial load only; filtreMarque default already "Aucune"
  }, []);

  useEffect(() => {
    if (filtreMarque === "Aucune") {
      axios.get("http://localhost:3000/api/motos/all").then((response) => {
      setMotos(response.data.motos);
    })
    .catch((err) => {
      console.error("ERREUR axios :", err);
    });;
    }
    else{
      axios.get(`http://localhost:3000/api/motos/filtre/marque?marque=${filtreMarque}`).then((response) => {
      setMotos(response.data.motos);
      // console.log(response.data.motos);
    })
    .catch((err) => {
      console.error("ERREUR axios :", err);
    });;
    }
   
  }, [filtreMarque]);


  const requeteParKilo = () => {
    axios.get(`http://localhost:3000/api/motos/filtre/kiloMax?kilometrage=${filtreKiloMax}`)
      .then((response) => {
      // console.log(response.data.motos);

      setFiltreMarque("Aucune");

      setMotos(response.data.motos);
    });
    
  }

  const SupprimerMoto = (idMoto: string) => {
    console.log(jeton);
    axios.delete(`http://localhost:3000/api/motos/delete/${idMoto}`,
      {
        headers: {
            Authorization: `Bearer ${jeton}`,
          },
      }
    )
      .then(() => {
        alert("Moto supprimée avec succès !");
      })
      .catch((err) => {
        console.log("ERREUR axios :", err);
      });
    }

  return (
    <>

    <TopBar></TopBar>
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="font-bold text-4xl">     
          <FormattedMessage
            id="inventaire.titre"
            defaultMessage="Inventaire des motos"
          />
      </h1>

      <div className="flex flex-col">


        <div className="flex items-center justify-center">

        <div className="flex flex-col justify-between">
        <h1 className="">
          <FormattedMessage
            id="inventaire.filtre.marque"
            defaultMessage="Marques"
          />
        </h1>

        <div className="flex justify-between p-1">
          <label htmlFor="Aucune">
          
          <FormattedMessage
            id="inventaire.filtre.aucune"
            defaultMessage="Aucune préférence"
          />

          </label>
          <input type="radio"
            value={filtreMarque}
            onChange={() => setFiltreMarque("Aucune")}
            name="filtreMarque"
          />
        </div>
        
        <div className="flex justify-between p-1">
        <label htmlFor="Honda">          
          <FormattedMessage
            id="inventaire.marque.honda"
            defaultMessage="Honda"
          />
        </label>
        <input type="radio"
          value={filtreMarque}
          onChange={() => setFiltreMarque("Honda")}
          name="filtreMarque"
        />
        </div>

        <div className="flex justify-between p-1">
          <label htmlFor="Yamaha">          
          <FormattedMessage
            id="inventaire.marque.yamaha"
            defaultMessage="Yamaha"
          />
        </label>
          <input type="radio"
            value={filtreMarque}
            onChange={() => setFiltreMarque("Yamaha")}
            name="filtreMarque"
          />
        </div>
        <div className="flex justify-between p-1">
          <label htmlFor="Aprilia">          
          <FormattedMessage
            id="inventaire.marque.aprilia"
            defaultMessage="Aprilia"
          />
        </label>
          <input type="radio"
            value={filtreMarque}
            onChange={() => setFiltreMarque("Aprilia")}
            name="filtreMarque"
          />
        </div>
        <div className="flex justify-between p-1">
          <label htmlFor="Triumph">          
          <FormattedMessage
            id="inventaire.marque.triumph"
            defaultMessage="Triumph"
          />
        </label>
          <input type="radio"
            value={filtreMarque}
            onChange={() => setFiltreMarque("Triumph")}
            name="filtreMarque"
          />
        </div>


        <div className="flex justify-between p-1">
          <label htmlFor="Kawasaki">          
          <FormattedMessage
            id="inventaire.marque.kawasaki"
            defaultMessage="Kawasaki"
          />
        </label>
          <input type="radio"
            value={filtreMarque}
            onChange={() => setFiltreMarque("Kawasaki")}
            name="filtreMarque"
          />  
        </div>
        
        <div className="flex justify-between p-1">
          <label htmlFor="Suzuki">          
          <FormattedMessage
            id="inventaire.marque.suzuki"
            defaultMessage="Suzuki"
          />
        </label>
          <input type="radio"
            value={filtreMarque}
            onChange={() => setFiltreMarque("Suzuki")}
            name="filtreMarque"
          />  
        </div>




        <label htmlFor="kiloMax">          
          <FormattedMessage
            id="inventaire.filtre.kilometrage_max"
            defaultMessage="Kilomètrage maximum"
          />
        </label>
          <input type="text"
            className="w-full border p-2"
            value={filtreKiloMax}
            onChange={(e) => setFiltreKiloMax(Number(e.target.value))}
            name="kiloMax"
          ></input>

          <button onClick={() => requeteParKilo()}>
            <FormattedMessage
              id="inventaire.filtre.bouton_kilo"
              defaultMessage="Chercher par kilomètre maximum"
            />
          </button>
        </div>



      <div className="flex flex-col items-center justify-center p-4">

        <div className="grid grid-cols-4 font-bold gap-6 mt-4">
  {motos.length === 0 ? (
    <p className="col-span-4 text-center text-gray-700">
      Nous ne possédont pas de motos correspondant à vos critères de recherche.
    </p>
  ) : (
    motos.map((moto, index) => (
      <div key={index} className="border p-4 rounded shadow">
        <img src={moto.photo} className="h-50 w-50" />
        <h2>{moto.marque} {moto.modele}</h2>
        <p>
          <FormattedMessage
              id="inventaire.moto.annee"
              defaultMessage="Année: {annee}"
              values={{ annee : moto.annee }}
          />
        </p>
        <p>
          <FormattedMessage
              id="inventaire.moto.prix"
              defaultMessage="Prix : {prix}"
              values={{ prix : moto.prix }}
          />
        </p>
        
        <p>
          
          <FormattedMessage
              id="inventaire.moto.kilometrage"
              defaultMessage="Kilomètrage : {kilometrage}"
              values={{ kilometrage : moto.kilometrage }}
          />
          </p>
        
        
        <div className="flex gap-4 mt-2">
        
        {estConnecter && 
          <a href={`/modifier-moto/${moto._id}`}>
            <img className="h-12 w-12" src="data:image/png;base64,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"/>
          </a>
        }



        {estConnecter &&
         <button onClick={() => SupprimerMoto(moto._id)}> <img className="h-12 w-12" src="data:image/jpeg;base64,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"/>
         </button>
        }

         </div>
      </div>
    ))
  )}
  </div>
  
            </div>
          </div>

        </div>
      </div>
  </>
  )
}

export default Inventaire;