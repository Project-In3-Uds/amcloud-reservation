package cm.amcloud.platform.reservation.controller;

import cm.amcloud.platform.reservation.model.Trajet;
import cm.amcloud.platform.reservation.dto.TrajetDTO;
import cm.amcloud.platform.reservation.service.TrajetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trajets")
public class TrajetController {

    @Autowired
    private TrajetService trajetService;

    // Ajouter un trajet
    @PostMapping
    public Trajet ajouterTrajet(@RequestBody TrajetDTO trajetDTO) {
        return trajetService.ajouterTrajet(trajetDTO);
    }

    // Modifier un trajet
    @PutMapping("/{id}")
    public ResponseEntity<Trajet> modifierTrajet(@PathVariable Long id, @RequestBody TrajetDTO trajetDTO) {
        Optional<Trajet> updated = trajetService.modifierTrajet(id, trajetDTO);
        return updated.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Supprimer un trajet
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerTrajet(@PathVariable Long id) {
        trajetService.supprimerTrajet(id);
        return ResponseEntity.noContent().build();
    }

    // Rechercher les trajets par agence (avec pagination)
            @GetMapping("/agence/{agenceId}/trajets")
        public Page<Trajet> getTrajetsByAgence(@PathVariable Long agenceId, Pageable pageable) {
            return trajetService.findByAgence(agenceId, pageable);
        }

    // Rechercher tous les trajets
    @GetMapping
    public List<Trajet> rechercherTousLesTrajets() {
        return trajetService.rechercherTousLesTrajets();
    }

    // Rechercher par ville de départ ou d'arrivée
    @GetMapping("/search")
    public List<Trajet> rechercherParVille(@RequestParam String ville) {
        return trajetService.rechercherParVille(ville);
    }
}