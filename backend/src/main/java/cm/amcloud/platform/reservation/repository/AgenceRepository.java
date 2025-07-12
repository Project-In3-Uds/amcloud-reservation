

package cm.amcloud.platform.reservation.repository;

import cm.amcloud.platform.reservation.model.Agence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgenceRepository extends JpaRepository<Agence, Long> {
    // Additional query methods can be defined here if needed{
    
}
