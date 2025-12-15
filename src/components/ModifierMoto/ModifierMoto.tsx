import axios from "axios";
import { use, useContext, useEffect, useState } from "react";
import type { IMoto } from "../../models/imoto.model";
import TopBar from "../TopBar";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";



const ModifierMoto = () => {
  
  const { motoId } = useParams();
                    
    const [numeroConcessionnaire, setNumeroConcessionnaire] = useState("");

    const [marque, setMarque] = useState("");

    const [modele, setModele] = useState("");

    const [annee, setAnnee] = useState<number>(0);

    const [dateMiseEnVente, setDateMiseEnVente] = useState<Date | null>(null);    

    const [disponible, setDisponible] = useState<boolean>(false);

    const [prix, setPrix] = useState<number>(0);

    const [categories, setCategories] = useState<string[]>([]);

    const [kilometrage, setKilometrage] = useState<number>(0);

    const [photo, setPhoto] = useState("");

    const [motoAModifier, setMotoAModifier] = useState<IMoto>({} as IMoto);

    const [messageErreur, setMessageErreur] = useState<string>("");

    const [erreurNumero, setErreurNumero] = useState("");
    const [erreurMarque, setErreurMarque] = useState("");
    const [erreurModele, setErreurModele] = useState("");
    const [erreurAnnee, setErreurAnnee] = useState("");
    const [erreurDateMiseEnVente, setErreurDateMiseEnVente] = useState("");
    const [erreurDisponible, setErreurDisponible] = useState("");
    const [erreurPrix, setErreurPrix] = useState("");
    const [erreurCategories, setErreurCategories] = useState("");
    const [erreurKilometrage, setErreurKilometrage] = useState("");
    const [erreurPhoto, setErreurPhoto] = useState("");

    const erreurChampObligatoire = "Ce champ est obligatoire.";



useEffect(() => {
  
      axios.get(`http://localhost:3000/api/motos/${motoId}`).then((response) => {
      if (response.data.moto != null){
        setMotoAModifier(response.data.moto);
        setNumeroConcessionnaire(response.data.moto.numero_concessionnaire);
        setMarque(response.data.moto.marque);
        setModele(response.data.moto.modele);
        setAnnee(response.data.moto.annee);
        setDateMiseEnVente(new Date(response.data.moto.dateMiseEnVente));
        setDisponible(response.data.moto.disponible);
        setPrix(response.data.moto.prix);
        setCategories(response.data.moto.categories);
        setKilometrage(response.data.moto.kilometrage);
        setPhoto(response.data.moto.photo);
      }
      else{
        setMessageErreur("Moto introuvable.");
      }
        
    })
    .catch((err) => {
      setMessageErreur("Impossible de récupérer la moto à modifier." + err);
    });;

    console.log("Moto à modifier : ", motoAModifier.dateMiseEnVente);

}, [motoId]);



useEffect(() => {
  if (numeroConcessionnaire.length == 0){
    setErreurNumero(erreurChampObligatoire);
  }
  else {
    setErreurNumero("");
  }

}, [numeroConcessionnaire]);


useEffect(() => {
  if (marque.length == 0){
    setErreurMarque(erreurChampObligatoire);
  }
  else {
    setErreurMarque("");
  }
}, [marque]);


useEffect(() => {
  if (modele.length == 0){
    setErreurModele(erreurChampObligatoire);
  }
  else {
    setErreurModele("");
  }
}, [modele]);


useEffect(() => {
  if (annee < 1900){
    setErreurAnnee("L'année doit être supérieure ou égale à 1900.");
  }
  else {
    setErreurAnnee("");
  }

}, [annee]);


useEffect(() => {
  if (dateMiseEnVente)
    setDateMiseEnVente(dateMiseEnVente);
    console.log("Date mise en vente modifiée : " + dateMiseEnVente);
}, [dateMiseEnVente]);


useEffect(() => {
  setDisponible(disponible);

  // console.log("Disponible modifié : " + disponible);
  // Retourne true ou false correctement
}, [disponible]);


useEffect(() => {
  if (prix < 100){
    setErreurPrix("Le prix doit être au moins de 100 $.");
  } 
  else {
    setErreurPrix("");
  }
}, [prix]);


useEffect(() => {
  if (categories)
    setCategories(categories);
}, [categories]);

useEffect(() => {
  if (kilometrage < 0){
    setErreurKilometrage("Le kilométrage ne peut pas être négatif.");
  }
  else {
    setErreurKilometrage("");
  }
}, [kilometrage]);

useEffect(() => {
  if (photo.length == 0){
    setErreurPhoto(erreurChampObligatoire);
  }
  else {
    setErreurPhoto("");
  }
}, [photo]);

  function Validation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let formulaireValide = true;
    
    if (numeroConcessionnaire.length == 0){
      setErreurNumero(erreurChampObligatoire);
      formulaireValide = false;
    }
    else {
      setErreurNumero("");
    }

    if (marque.length == 0){
      setErreurMarque(erreurChampObligatoire);
      formulaireValide = false;
    }

    if (modele.length == 0){
      setErreurModele(erreurChampObligatoire);
      formulaireValide = false;
    }

    if (annee < 1900){
      setErreurAnnee("L'année doit être supérieure ou égale à 1900.");
      formulaireValide = false;
    }

    if (dateMiseEnVente == null){
      setErreurDateMiseEnVente(erreurChampObligatoire);
      formulaireValide = false;
    }

    if (prix < 100){
      setErreurPrix("Le prix doit être au moins de 100 $.");
      formulaireValide = false;
    }

    if (kilometrage < 0){
      setErreurKilometrage("Le kilométrage ne peut pas être négatif.");
      formulaireValide = false;
    }

    if (photo.length == 0){
      setErreurPhoto(erreurChampObligatoire);
      formulaireValide = false;
    }
    

    if(formulaireValide == true){

      console.log(motoId);
      console.log("numeroConcessionnaire : " + numeroConcessionnaire);
      console.log("marque : " + marque);
      console.log("modele : " + modele);
      console.log("annee : " + annee);
      console.log("dateMiseEnVente : " + dateMiseEnVente);
      console.log("disponible : " + disponible);
      console.log("prix : " + prix);
      console.log("categories : " + categories);
      console.log("kilometrage : " + kilometrage);
      console.log("photo : " + photo);

      axios.put(`http://localhost:3000/api/motos/update`, {
        moto: {
        _id: motoId, 
        numero_concessionnaire: numeroConcessionnaire,
        marque: marque,
        modele: modele,
        annee: annee,
        dateMiseEnVente: dateMiseEnVente, 
        disponible: disponible,
        prix: prix,
        categories: categories,
        kilometrage: kilometrage,
        photo: photo
      }
      })
      .then((response) => {
        alert("Moto modifiée avec succès !");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Impossible de modifier la moto : ");
        console.log(error);
      });
    }
  }



  return (
    <>

    <TopBar></TopBar>
    
    <div className="w-full flex flex-col items-center justify-center p-6">
      <form
        className="w-full max-w-xl bg-white p-6 rounded shadow space-y-4"
        onSubmit={Validation}
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          <FormattedMessage
            id="modifierMoto.titre"
            defaultMessage="Modifier une moto"
          />
        </h1>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.numero_concessionnaire"
              defaultMessage="Numéro concessionnaire"
            />
          </label>
          <input
            type="text"
            name="numero_concessionnaire"
            className="w-full border p-2"
            value={numeroConcessionnaire}
            onChange={(e) => setNumeroConcessionnaire(e.target.value)}
            required
          />
          {erreurNumero && 
            <p 
              className="text-red-500">{erreurNumero}
            </p>
          }

        </div>

        <div>
          
          <label>
            <FormattedMessage
              id="modifierMoto.label.marque"
              defaultMessage="Marque"
            />
          </label>
          <input
            type="text"
            name="marque"
            className="w-full border p-2"
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
            required
          />

          {erreurMarque && 
            <p 
              className="text-red-500">{erreurMarque}
            </p>}

        </div>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.modele"
              defaultMessage="Modèle"
            />
          </label>
          <input
            type="text"
            name="modele"
            className="w-full border p-2"
            value={modele}
            onChange={(e) => setModele(e.target.value)}
            required
          />

          {erreurModele && 
            <p 
              className="text-red-500">{erreurModele}
            </p>
          }
        </div>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.annee"
              defaultMessage="Année"
            />
          </label>
          <input
            type="number"
            name="annee"
            className="w-full border p-2"
            value={annee}
            onChange={(e) => setAnnee(Number(e.target.value))}
            required
          />
          {erreurAnnee && 
            <p 
              className="text-red-500">{erreurAnnee}
            </p>
          }
        </div>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.date_mise_en_vente"
              defaultMessage="Date mise en vente"
            />
          </label>
          <input
            type="date"
            name="dateMiseEnVente"
            className="w-full border p-2"
            value={dateMiseEnVente?.toISOString().split('T')[0] || ''}
            onChange={(e) => setDateMiseEnVente(new Date(e.target.value))}
            required
          />

          {erreurDateMiseEnVente && 
            <p 
              className="text-red-500">{erreurDateMiseEnVente}
            </p>
          }
        </div>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.disponible"
              defaultMessage="Disponible"
            />
          </label>
          <input
            type="checkbox"
            name="disponible"
            className="ml-2"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
        </div>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.prix"
              defaultMessage="Prix ($)"
            />
          </label>
          <input
            type="number"
            name="prix"
            className="w-full border p-2"
            value={prix}
            onChange={(e) => setPrix(Number(e.target.value))}
            required
          />
          {erreurPrix && 
            <p 
              className="text-red-500">{erreurPrix}
            </p>
          }
        </div>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.categorie"
              defaultMessage="Catégories"
            />
          </label>

          {categories.map((categorie, index) => (
              <input
              key={index}
              type="text"
              name="categories"
              className="w-full border p-2 mb-2"
              value={categorie ? categorie : ''}
              onChange={(e) => {

              const nouvellesCategories = [...categories];
              nouvellesCategories[index] = e.target.value;
              setCategories(nouvellesCategories);
              }}
              placeholder="ex : sport, naked, custom"
              required
              />

          ))}

          
          <button type="button" onClick={() => setCategories([...categories, ""])}>
            <FormattedMessage
              id="modifierMoto.bouton.ajouter_categorie"
              defaultMessage="Ajouter une autre catégorie"
            />
          </button>
        </div>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.kilometrage"
              defaultMessage="Kilométrage"
            />
          </label>
          <input
            type="number"
            name="kilometrage"
            className="w-full border p-2"
            value={kilometrage}
            onChange= {(e) => setKilometrage(Number(e.target.value))}
            required
          />

          {erreurKilometrage && 
            <p 
              className="text-red-500">{erreurKilometrage}
            </p>
          }
        </div>

        <div>
          <label>
            <FormattedMessage
              id="modifierMoto.label.photo"
              defaultMessage="Photo (URL)"
            />
          </label>
          <input
            type="text"
            name="photo"
            className="w-full border p-2"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="https://image.jpg"
            required
          />
          {erreurPhoto && 
            <p 
              className="text-red-500">{erreurPhoto}
            </p>
          }
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          <FormattedMessage
            id="modifierMoto.bouton.submit"
            defaultMessage="Modifier la moto"
          />
        </button>
      </form>

      <a className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 m-2" href="/">
        <FormattedMessage
          id="modifierMoto.bouton.annuler"
          defaultMessage="Annuler"
        />
      </a>
    </div>
    </>
  )
}

export default ModifierMoto;