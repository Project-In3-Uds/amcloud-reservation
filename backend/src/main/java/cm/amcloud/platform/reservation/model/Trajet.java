package cm.amcloud.platform.reservation.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// Trajet.java
@Entity
public class Trajet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String villeDepart;
    private String villeArrivee;
    private Double distance;
    private Long idAgence;
    private String description;
    private Double prix;

    // ou @ManyToOne si tu as une entité Agence
    public void setVilleDepart(String villeDepart2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setVilleDepart'");
    }
    public void setVilleArrivee(String villeArrivee2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setVilleArrivee'");
    }
    public void setIdAgence(Long agence) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setIdAgence'");
    }
    public void setDistance(Object distance2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setDistance'");
    }
    public void setDescription(String description2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setDescription'");
    }
    public void setHeureDepart(String heureDepart) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setHeureDepart'");
    }
    public void setHeureArrivee(String heureArrivee) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setHeureArrivee'");
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getVilleDepart() {
        return villeDepart;
    }
    public String getVilleArrivee() {
        return villeArrivee;
    }
    public Double getDistance() {
        return distance;
    }
    public void setDistance(Double distance) {
        this.distance = distance;
    }
    public Long getIdAgence() {
        return idAgence;
    }
    public String getDescription() {
        return description;
    }
    public Double getPrix() {
        return prix;
    }
    public void setPrix(Double prix) {
        this.prix = prix;
    }

    // getters/setters
}

