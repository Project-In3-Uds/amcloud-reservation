package cm.amcloud.platform.reservation.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ReservationDTO {

    private String travelerName;
    private String destination;
    private String agencyName;
    public ReservationDTO(String travelerName, String destination, String agencyName) {
        this.travelerName = travelerName;
        this.destination = destination;
        this.agencyName = agencyName;
    }
}
