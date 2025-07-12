package cm.amcloud.platform.reservation.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor; 
import lombok.Setter;

@Data 
@Getter 
@Setter 
@NoArgsConstructor 
public class ReservationDTO {

    private String travelerName;
    private String destination;
    private String agencyName;
    private String depart;
    private LocalDateTime heureDepart;
    private String classe;
    
}
