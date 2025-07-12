package cm.amcloud.platform.reservation.repository;

import cm.amcloud.platform.reservation.model.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonnelRepository extends JpaRepository<Personnel, Long> {
    List<Personnel> findByIdAgence(Long idAgence);
}