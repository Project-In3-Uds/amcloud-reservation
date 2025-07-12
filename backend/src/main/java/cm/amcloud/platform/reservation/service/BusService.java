package cm.amcloud.platform.reservation.service;

import cm.amcloud.platform.reservation.model.Bus;
import cm.amcloud.platform.reservation.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusService {
    @Autowired
    private BusRepository busRepository;

    public Bus save(Bus bus) {
        return busRepository.save(bus);
    }

    public List<Bus> findAll() {
        return busRepository.findAll();
    }

    public Optional<Bus> findById(Long id) {
        return busRepository.findById(id);
    }

    public void delete(Long id) {
        busRepository.deleteById(id);
    }
}