package cm.amcloud.platform.reservation.repository;

import cm.amcloud.platform.reservation.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}