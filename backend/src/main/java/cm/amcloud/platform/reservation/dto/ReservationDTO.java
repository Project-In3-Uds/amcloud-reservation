package cm.amcloud.platform.reservation.dto;

import lombok.AllArgsConstructor; 
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor; 
import lombok.Setter;

@Data 
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class ReservationDTO {

    private String travelerName;
    private String destination;
    private String agencyName;

     
}
