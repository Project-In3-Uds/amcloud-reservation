package cm.amcloud.platform.reservation.controller;

import cm.amcloud.platform.reservation.model.Agence;
import cm.amcloud.platform.reservation.service.AgenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/agences")
public class AgenceController {

    @Autowired
    private AgenceService agenceService;

   

    @PostMapping
    public Agence create(@RequestBody Agence agence) {
        return agenceService.save(agence);
    }

    @GetMapping
    public List<Agence> getAll() {
        return agenceService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agence> getById(@PathVariable Long id) {
        return agenceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        agenceService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // API de personnalisation d'agence (exemple)
    // POST /api/agences/{id}/customization
    @PostMapping("/{id}/customization")
    public ResponseEntity<Agence> customizeAgence(
            @PathVariable Long id,
            @RequestBody CustomizationRequest customization
    ) {
        Agence updated = agenceService.customizeAgence(id, customization);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }
}