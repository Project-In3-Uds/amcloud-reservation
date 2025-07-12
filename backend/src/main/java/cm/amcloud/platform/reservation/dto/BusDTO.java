package cm.amcloud.platform.reservation.dto;

import lombok.Data;

@Data
public class BusDTO {
    private Long id;
    private String immatriculation;
    private int capacite;
    private Long trajetId;
    private Long agenceId;
}