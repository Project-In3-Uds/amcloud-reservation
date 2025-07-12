package cm.amcloud.platform.reservation.dto;

import lombok.Data;

@Data
public class SeatDTO {
    private Long id;
    private int numero;
    private Long busId;
    public Object getPrix() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getPrix'");
    }
    public Object getDisponible() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getDisponible'");
    }
}