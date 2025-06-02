package cm.amcloud.platform.reservation.controller;

import cm.amcloud.platform.reservation.model.Reservation;
import cm.amcloud.platform.reservation.dto.ReservationDTO;
import cm.amcloud.platform.reservation.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
// @CrossOrigin(origins = "http://localhost:3000") 
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public Reservation createReservation(@RequestBody ReservationDTO reservationDTO) {
        return reservationService.save(reservationDTO);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAll();
    }
}
