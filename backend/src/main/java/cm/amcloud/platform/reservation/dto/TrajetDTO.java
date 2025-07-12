package cm.amcloud.platform.reservation.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Data
public class TrajetDTO {
    private Long id;
    private String villeDepart;
    private String villeArrivee;
    private String description;
    private Double prix;
    private Double distance;
    private Long idAgence;
    private String heureDepart;
    private String heureArrivee;
}