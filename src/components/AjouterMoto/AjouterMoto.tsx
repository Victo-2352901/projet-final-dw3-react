import axios from "axios";
import { useEffect, useState } from "react";
// import type { IMoto } from "../../models/imoto.model";
import TopBar from "../TopBar";
import { FormattedMessage } from "react-intl";

function AjouterMoto() {
  const [numeroConcessionnaire, setNumeroConcessionnaire] = useState("");

  const [marque, setMarque] = useState("");

  const [modele, setModele] = useState("");

  const [annee, setAnnee] = useState<number>(0);

  const [dateMiseEnVente, setDateMiseEnVente] = useState<string>("");

  const [disponible, setDisponible] = useState<boolean>(false);

  const [prix, setPrix] = useState<number>(0);

  const [categories, setCategories] = useState<string[]>([]);

  const [kilometrage, setKilometrage] = useState<number>(0);

  const [photo, setPhoto] = useState("");

  //const [nombreCategories, setNombreCategories] = useState<number>(1);

  const [erreurNumero, setErreurNumero] = useState("");
  const [/*erreurMarque*/, setErreurMarque] = useState("");
  const [erreurModele, setErreurModele] = useState("");
  const [erreurAnnee, setErreurAnnee] = useState("");
  const [erreurDateMiseEnVente, setErreurDateMiseEnVente] = useState("");
  const [erreurDisponible /*setErreurDisponible*/] = useState("");
  const [erreurPrix, setErreurPrix] = useState("");
  const [erreurCategories /*setErreurCategories*/] = useState("");
  const [erreurKilometrage, setErreurKilometrage] = useState("");
  const [erreurPhoto, setErreurPhoto] = useState("");

  const erreurChampObligatoire = "Ce champ est obligatoire.";

  useEffect(() => {
    if (numeroConcessionnaire.length == 0) {
      setErreurNumero(erreurChampObligatoire);
    } else {
      setErreurNumero("");
    }
  }, [numeroConcessionnaire]);

  useEffect(() => {
    if (marque.length == 0) {
      setErreurMarque(erreurChampObligatoire);
    } else {
      setErreurMarque("");
    }
  }, [marque]);

  useEffect(() => {
    if (modele.length == 0) {
      setErreurModele(erreurChampObligatoire);
    } else {
      setErreurModele("");
    }
  }, [modele]);

  useEffect(() => {
    if (annee < 1900) {
      setErreurAnnee("L'année doit être supérieure ou égale à 1900.");
    } else {
      setErreurAnnee("");
    }
  }, [annee]);

  useEffect(() => {
    if (dateMiseEnVente) setDateMiseEnVente(dateMiseEnVente);
    console.log("Date mise en vente modifiée : " + dateMiseEnVente);
  }, [dateMiseEnVente]);

  useEffect(() => {
    setDisponible(disponible);

    // console.log("Disponible modifié : " + disponible);
    // Retourne true ou false correctement
  }, [disponible]);

  useEffect(() => {
    if (prix < 100) {
      setErreurPrix("Le prix doit être au moins de 100 $.");
    } else {
      setErreurPrix("");
    }
  }, [prix]);

  useEffect(() => {
    if (categories) setCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (kilometrage < 0) {
      setErreurKilometrage("Le kilométrage ne peut pas être négatif.");
    } else {
      setErreurKilometrage("");
    }
  }, [kilometrage]);

  useEffect(() => {
    if (photo.length == 0) {
      setErreurPhoto(erreurChampObligatoire);
    } else {
      setErreurPhoto("");
    }
  }, [photo]);

  function Validation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let formulaireValide = true;

    if (numeroConcessionnaire.length == 0) {
      setErreurNumero(erreurChampObligatoire);
      formulaireValide = false;
    } else {
      setErreurNumero("");
    }

    if (marque.length == 0) {
      setErreurMarque(erreurChampObligatoire);
      formulaireValide = false;
    }

    if (modele.length == 0) {
      setErreurModele(erreurChampObligatoire);
      formulaireValide = false;
    }

    if (annee < 1900) {
      setErreurAnnee("L'année doit être supérieure ou égale à 1900.");
      formulaireValide = false;
    }

    if (dateMiseEnVente == null) {
      setErreurDateMiseEnVente(erreurChampObligatoire);
      formulaireValide = false;
    }

    if (prix < 100) {
      setErreurPrix("Le prix doit être au moins de 100 $.");
      formulaireValide = false;
    }

    if (kilometrage < 0) {
      setErreurKilometrage("Le kilométrage ne peut pas être négatif.");
      formulaireValide = false;
    }

    if (photo.length == 0) {
      setErreurPhoto(erreurChampObligatoire);
      formulaireValide = false;
    }

    if (formulaireValide == true) {
      // console.log("numeroConcessionnaire : " + numeroConcessionnaire);
      // console.log("marque : " + marque);
      // console.log("modele : " + modele);
      // console.log("annee : " + annee);
      // console.log("dateMiseEnVente : " + dateMiseEnVente);
      // console.log("disponible : " + disponible);
      // console.log("prix : " + prix);
      // console.log("categories : " + categories);
      // console.log("kilometrage : " + kilometrage);
      // console.log("photo : " + photo);

      axios
        .post(`http://localhost:3000/api/motos/add`, {
          moto: {
            numero_concessionnaire: numeroConcessionnaire,
            marque: marque,
            modele: modele,
            annee: annee,
            dateMiseEnVente: dateMiseEnVente,
            disponible: disponible,
            prix: prix,
            categories: categories,
            kilometrage: kilometrage,
            photo: photo,
          },
        })
        .then((response) => {
          alert("Moto ajoutée avec succès !");
          console.log(response.data);
        })
        .catch((error) => {
          alert("Impossible d'ajouter la moto : ");
          console.log(error);
        });
    }
  }

  return (
    <>
      <TopBar></TopBar>

      <div className="w-full flex justify-center p-6">
        <form
          className="w-full max-w-xl bg-white p-6 rounded shadow space-y-4"
          onSubmit={Validation}
        >
          <h1 className="text-2xl font-bold text-center mb-4">
            <FormattedMessage
              id="ajouterMoto.titre"
              defaultMessage="Ajouter une moto"
            />
          </h1>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.numero_concessionnaire"
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
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.marque"
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
            {erreurNumero && <p className="text-red-500">{erreurNumero}</p>}
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.modele"
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
            {erreurModele && <p className="text-red-500">{erreurModele}</p>}
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.annee"
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
            {erreurAnnee && <p className="text-red-500">{erreurAnnee}</p>}
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.date_mise_en_vente"
                defaultMessage="Date mise en vente"
              />
            </label>
            <input
              type="date"
              name="dateMiseEnVente"
              className="w-full border p-2"
              value={dateMiseEnVente}
              onChange={(e) => setDateMiseEnVente(e.target.value)}
              required
            />
            {erreurDateMiseEnVente && (
              <p className="text-red-500">{erreurDateMiseEnVente}</p>
            )}
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.disponible"
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
            {erreurDisponible && (
              <p className="text-red-500">{erreurDisponible}</p>
            )}
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.prix"
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
            {erreurPrix && <p className="text-red-500">{erreurPrix}</p>}
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.categorie"
                defaultMessage="Catégories"
              />
            </label>

            {categories.length == 0 && (
              <input
                type="text"
                name="categories"
                className="w-full border p-2 mb-2"
                value={categories[0] || ""}
                onChange={(e) => setCategories([e.target.value])}
                placeholder="ex : sport, naked, custom"
                required
              />
            )}

            {categories.map((categorie, index) => (
              <input
                key={index}
                type="text"
                name="categories"
                className="w-full border p-2 mb-2"
                value={categorie}
                onChange={(e) => {
                  const nouvellesCategories = [...categories];
                  nouvellesCategories[index] = e.target.value;
                  setCategories(nouvellesCategories);
                }}
                placeholder="ex : sport, naked, custom"
                required
              />
            ))}

            {erreurCategories && (
              <p className="text-red-500">{erreurCategories}</p>
            )}

            <button
              type="button"
              onClick={() => setCategories([...categories, ""])}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              <FormattedMessage
                id="ajouterMoto.bouton.ajouter_categorie"
                defaultMessage="Ajouter une autre catégorie"
              />
            </button>
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.kilometrage"
                defaultMessage="Kilométrage"
              />
            </label>
            <input
              type="number"
              name="kilometrage"
              className="w-full border p-2"
              value={kilometrage}
              onChange={(e) => setKilometrage(Number(e.target.value))}
              required
            />
            {erreurKilometrage && (
              <p className="text-red-500">{erreurKilometrage}</p>
            )}
          </div>

          <div>
            <label>
              <FormattedMessage
                id="ajouterMoto.label.photo"
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
            {erreurPhoto && <p className="text-red-500">{erreurPhoto}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            <FormattedMessage
              id="ajouterMoto.bouton.submit"
              defaultMessage="Ajouter la moto"
            />
          </button>
        </form>
      </div>
    </>
  );
}

export default AjouterMoto;
