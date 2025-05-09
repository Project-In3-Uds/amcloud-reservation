package cm.amcloud.platform.reservation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cm.amcloud.platform.reservation.dto.ReservationDTO;
import cm.amcloud.platform.reservation.model.Reservation;
import cm.amcloud.platform.reservation.repository.ReservationRepository;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public Reservation save(ReservationDTO reservationDTO) {
        Reservation reservation = new Reservation();
        reservation.setTravelerName(reservationDTO.getTravelerName());
        reservation.setDestination(reservationDTO.getDestination());
        reservation.setAgencyName(reservationDTO.getAgencyName());
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
}
