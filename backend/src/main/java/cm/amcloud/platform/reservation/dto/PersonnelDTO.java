package cm.amcloud.platform.reservation.dto;

import lombok.Data;

@Data
public class PersonnelDTO {
    private Long id;
    private String nom;
    private String poste;
    private Long idAgence;
    private Long userAccountId;
    private Double salaire;
    private String email;
    private String telephone;
    private String adresse;
    private String dateEmbauche;
    private String dateNaissance;
    private String dateDepart;
    private String dateFinContrat;
}