package cm.amcloud.platform.reservation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import cm.amcloud.platform.reservation.controller.CustomizationRequest;
import cm.amcloud.platform.reservation.model.Agence;
import cm.amcloud.platform.reservation.repository.AgenceRepository;

@Service
public class AgenceService {

    private final AgenceRepository agenceRepository;

    public AgenceService(AgenceRepository agenceRepository) {
        this.agenceRepository = agenceRepository;
    }

    public Agence save(Agence agence2) {
        Agence agence = new Agence();
        agence.setNom(agence2.getNom());
        agence.setLogo(agence2.getLogo());
        agence.setCouleurs(agence2.getCouleurs());
        agence.setLocalisation(agence2.getLocalisation());
        agence.setThemeColorPrimary(agence2.getThemeColorPrimary());
        agence.setThemeColorSecondary(agence2.getThemeColorSecondary());
        agence.setLogoUrl(agence2.getLogoUrl());
        agence.setDescription(agence2.getDescription());
        agence.setVille(agence2.getVille());
        agence.setQuartier(agence2.getQuartier());
        return agenceRepository.save(agence);
    }

    public List<Agence> getAll() {
        return agenceRepository.findAll();
    }


    public List<Agence> findAll() {
        return agenceRepository.findAll();
    }

    public Optional<Agence> findById(Long id) {
        return agenceRepository.findById(id);
    }

    public void delete(Long id) {
        agenceRepository.deleteById(id);
    }

    public Agence customizeAgence(Long id, CustomizationRequest customization) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'customizeAgence'");
    }
}