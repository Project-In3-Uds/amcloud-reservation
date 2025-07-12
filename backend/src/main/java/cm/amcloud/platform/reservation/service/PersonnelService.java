package cm.amcloud.platform.reservation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import cm.amcloud.platform.reservation.dto.PersonnelDTO;
import cm.amcloud.platform.reservation.model.Personnel;
import cm.amcloud.platform.reservation.repository.PersonnelRepository;

@Service
public class PersonnelService {

    private final PersonnelRepository personnelRepository;

    public PersonnelService(PersonnelRepository personnelRepository) {
        this.personnelRepository = personnelRepository;
    }

    public Personnel save(PersonnelDTO personnelDTO) {
        Personnel personnel = new Personnel();
        personnel.setNom(personnelDTO.getNom());
        personnel.setPoste(personnelDTO.getPoste());
        personnel.setIdAgence(personnelDTO.getIdAgence());
        personnel.setUserAccountId(personnelDTO.getUserAccountId());
        personnel.setSalaire(personnelDTO.getSalaire());
        personnel.setEmail(personnelDTO.getEmail());
        personnel.setTelephone(personnelDTO.getTelephone());
        personnel.setAdresse(personnelDTO.getAdresse());
        personnel.setDateEmbauche(personnelDTO.getDateEmbauche());
        personnel.setDateNaissance(personnelDTO.getDateNaissance());
        personnel.setDateDepart(personnelDTO.getDateDepart());
        personnel.setDateFinContrat(personnelDTO.getDateFinContrat());
        return personnelRepository.save(personnel);
    }

    public List<Personnel> getAll() {
        return personnelRepository.findAll();
    }


    public List<Personnel> findAll() {
        return personnelRepository.findAll();
    }

    public Optional<Personnel> findById(Long id) {
        return personnelRepository.findById(id);
    }

    public List<Personnel> findByAgence(Long idAgence) {
        return personnelRepository.findByIdAgence(idAgence);
    }

    public void delete(Long id) {
        personnelRepository.deleteById(id);
    }
}