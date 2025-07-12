package cm.amcloud.platform.reservation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Agence {
    @Id
    @Setter
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String logo;
    private String couleurs;
    private String localisation;
    private String themeColorPrimary;
    private String themeColorSecondary;
    private String logoUrl;
    private String description;
    private String ville;
    private String quartier;
    
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getLogo() {
        return logo;
    }
    public void setLogo(String logo) {
        this.logo = logo;
    }
    public String getCouleurs() {
        return couleurs;
    }
    public void setCouleurs(String couleurs) {
        this.couleurs = couleurs;
    }
    public String getLocalisation() {
        return localisation;
    }
    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }
    public String getThemeColorPrimary() {
        return themeColorPrimary;
    }
    public void setThemeColorPrimary(String themeColorPrimary) {
        this.themeColorPrimary = themeColorPrimary;
    }
    public String getThemeColorSecondary() {
        return themeColorSecondary;
    }
    public void setThemeColorSecondary(String themeColorSecondary) {
        this.themeColorSecondary = themeColorSecondary;
    }
    public String getLogoUrl() {
        return logoUrl;
    }
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getVille() {
        return ville;
    }
    public void setVille(String ville) {
        this.ville = ville;
    }
    public String getQuartier() {
        return quartier;
    }
    public void setQuartier(String quartier) {
        this.quartier = quartier;
    }

    // Getters et setters
}