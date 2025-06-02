package cm.amcloud.platform.reservation.dto;

import java.time.LocalDateTime;
import java.util.Date;

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
    private String depart;
  private LocalDateTime heureDepart;
    private String classe;
    public ReservationDTO(String travelerName, String destination, String agencyName, String depart,LocalDateTime heureDepart, String classe) {
        this.travelerName = travelerName;
        this.destination = destination;
        this.agencyName = agencyName;
        this.depart=depart;
        this.heureDepart=heureDepart;
        this.classe=classe;
    }
}
