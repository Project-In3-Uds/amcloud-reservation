package cm.amcloud.platform.reservation.repository;

import cm.amcloud.platform.reservation.model.Trajet;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrajetRepository extends JpaRepository<Trajet, Long> {
    Page<Trajet> findByIdAgence(Long idAgence, Pageable pageable);
    List<Trajet> findByVilleDepartContainingIgnoreCaseOrVilleArriveeContainingIgnoreCase(String villeDepart, String villeArrivee);
}