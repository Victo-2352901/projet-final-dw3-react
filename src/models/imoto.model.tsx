export type IMoto = {
  _id: string,
  numero_concessionnaire: string
  marque: string,
  modele: string,
  annee: number,
  dateMiseEnVente: Date,
  disponible: boolean,
  prix: number,
  categories: string[],
  kilometrage: number,
  photo: string
}