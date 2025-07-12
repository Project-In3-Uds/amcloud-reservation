package cm.amcloud.platform.reservation.dto;

import lombok.Data;

@Data
public class AgenceDTO {
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
}