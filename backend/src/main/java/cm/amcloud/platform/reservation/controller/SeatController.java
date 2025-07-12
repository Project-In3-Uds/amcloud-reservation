package cm.amcloud.platform.reservation.controller;

import cm.amcloud.platform.reservation.dto.SeatDTO;
import cm.amcloud.platform.reservation.model.Seat;
import cm.amcloud.platform.reservation.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @PostMapping
    public Seat create(@RequestBody SeatDTO seat) {
        return seatService.save(seat);
    }

    @GetMapping
    public List<Seat> getAll() {
        return seatService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seat> getById(@PathVariable Long id) {
        return seatService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        seatService.delete(id);
        return ResponseEntity.noContent().build();
    }
}