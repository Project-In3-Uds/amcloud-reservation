package cm.amcloud.platform.reservation.repository;

import cm.amcloud.platform.reservation.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepository extends JpaRepository<Bus, Long> {
}