package cm.amcloud.platform.reservation.repository;

import cm.amcloud.platform.reservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
