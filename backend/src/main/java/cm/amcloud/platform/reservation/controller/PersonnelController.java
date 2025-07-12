package cm.amcloud.platform.reservation.controller;

import cm.amcloud.platform.reservation.dto.PersonnelDTO;
import cm.amcloud.platform.reservation.model.Personnel;
import cm.amcloud.platform.reservation.service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personnel")
public class PersonnelController {

    @Autowired
    private PersonnelService personnelService;

    @PostMapping
    public Personnel create(@RequestBody PersonnelDTO personnel) {
        return personnelService.save(personnel);
    }

    @GetMapping
    public List<Personnel> getAll() {
        return personnelService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personnel> getById(@PathVariable Long id) {
        return personnelService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/agence/{idAgence}")
    public List<Personnel> getByAgence(@PathVariable Long idAgence) {
        return personnelService.findByAgence(idAgence);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personnelService.delete(id);
        return ResponseEntity.noContent().build();
    }
}