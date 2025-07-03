export interface Personnel {
  id: number;
  nom: string;
  poste: string;
  idAgence: number;
  userAccountId?: number;
  salaire?: number;
  dateEmbauche?: Date;
  email?: string;
  telephone?: string;
  adresse?: string;
  dateNaissance?: Date;
  dateDepart?: Date;
  dateFinContrat?: Date;

}