package cm.amcloud.platform.reservation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import cm.amcloud.platform.reservation.dto.SeatDTO;
import cm.amcloud.platform.reservation.model.Seat;
import cm.amcloud.platform.reservation.repository.SeatRepository;

@Service
public class SeatService {

    private final SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public Seat save(SeatDTO seatDTO) {
        Seat seat = new Seat();
        seat.setNumero(seatDTO.getNumero());
        seat.setClasse(seatDTO.getClass());
        seat.setPrix(seatDTO.getPrix());
        seat.setDisponible(seatDTO.getDisponible());

        // seat.setBus(...); // à mapper si besoin
        return seatRepository.save(seat);
    }

    public List<Seat> getAll() {
        return seatRepository.findAll();
    }


    public List<Seat> findAll() {
        return seatRepository.findAll();
    }

    public Optional<Seat> findById(Long id) {
        return seatRepository.findById(id);
    }

    public void delete(Long id) {
        seatRepository.deleteById(id);
    }
}