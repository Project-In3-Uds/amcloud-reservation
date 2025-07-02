package cm.amcloud.platform.reservation.dto;

public class TrajetDTO {
    private String villeDepart;
    private String villeArrivee;
    private Double distance;
    private Long idAgence;
    private String description;
    private String heureDepart;   // Utilise String ou LocalTime selon ton besoin
    private String heureArrivee;  // Utilise String ou LocalTime selon ton besoin

    public TrajetDTO() {}

    public TrajetDTO(String villeDepart, String villeArrivee, Double distance, Long idAgence, String description, String heureDepart, String heureArrivee) {
        this.villeDepart = villeDepart;
        this.villeArrivee = villeArrivee;
        this.distance = distance;
        this.idAgence = idAgence;
        this.description = description;
        this.heureDepart = heureDepart;
        this.heureArrivee = heureArrivee;
    }

    public String getVilleDepart() {
        return villeDepart;
    }

    public void setVilleDepart(String villeDepart) {
        this.villeDepart = villeDepart;
    }

    public String getVilleArrivee() {
        return villeArrivee;
    }

    public void setVilleArrivee(String villeArrivee) {
        this.villeArrivee = villeArrivee;
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

    public void setIdAgence(Long idAgence) {
        this.idAgence = idAgence;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHeureDepart() {
        return heureDepart;
    }

    public void setHeureDepart(String heureDepart) {
        this.heureDepart = heureDepart;
    }

    public String getHeureArrivee() {
        return heureArrivee;
    }

    public void setHeureArrivee(String heureArrivee) {
        this.heureArrivee = heureArrivee;
    }
}