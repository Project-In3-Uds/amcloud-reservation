package cm.amcloud.platform.reservation.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Personnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String poste; // ex: GUICHETIER, CHEF_AGENCE, CHAUFFEUR, etc.
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