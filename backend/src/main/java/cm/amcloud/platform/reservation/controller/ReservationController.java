package cm.amcloud.platform.reservation.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cm.amcloud.platform.reservation.dto.ReservationDTO;
import cm.amcloud.platform.reservation.model.Reservation;
import cm.amcloud.platform.reservation.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/create")
    public Reservation createReservation(@RequestBody ReservationDTO reservationDTO,
                                         @RequestHeader(name = "X-User-ID", required = false) String userId,
                                         @RequestHeader(name = "X-User-Roles", required = false) String userRoles,
                                         @RequestHeader(name = "X-User-Scopes", required = false) String userScopes) {
        System.out.println("User ID: " + userId + ", Roles: " + userRoles + ", Scopes: " + userScopes + " is creating a reservation.");
        return reservationService.save(reservationDTO);
    }

    @GetMapping("/list")
    public List<Reservation> getAllReservations(
            @RequestHeader(name = "X-User-ID", required = false) String userId,
            @RequestHeader(name = "X-User-Roles", required = false) String userRoles,
            @RequestHeader(name = "X-User-Scopes", required = false) String userScopes) {
        System.out.println("User ID: " + userId + ", Roles: " + userRoles + ", Scopes: " + userScopes + " is requesting all reservations.");
        return reservationService.getAll();
    }
}
