export interface Trajet {
  id: number;
  villeDepart: string;
  villeArrivee: string;
  description: string;
  prix: number;
  distance: number;
  idAgence: number;
  heureDepart?: Date;
  heuresArrivee?: Date;
}