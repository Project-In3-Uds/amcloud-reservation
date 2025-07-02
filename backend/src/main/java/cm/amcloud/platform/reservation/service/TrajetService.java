package cm.amcloud.platform.reservation.service;

import cm.amcloud.platform.reservation.model.Trajet;
import cm.amcloud.platform.reservation.repository.TrajetRepository;
import cm.amcloud.platform.reservation.dto.TrajetDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class TrajetService {

    @Autowired
    private TrajetRepository trajetRepository;

    // Ajouter un trajet depuis un DTO
    public Trajet ajouterTrajet(TrajetDTO trajetDTO) {
        Trajet trajet = fromDTO(trajetDTO);
        return trajetRepository.save(trajet);
    }

    // Modifier un trajet depuis un DTO
    public Optional<Trajet> modifierTrajet(Long id, TrajetDTO trajetDTO) {
        return trajetRepository.findById(id).map(trajet -> {
            trajet.setVilleDepart(trajetDTO.getVilleDepart());
            trajet.setVilleArrivee(trajetDTO.getVilleArrivee());
            trajet.setDistance(trajetDTO.getDistance());
            trajet.setIdAgence(trajetDTO.getIdAgence());
            trajet.setDescription(trajetDTO.getDescription());
            trajet.setHeureDepart(trajetDTO.getHeureDepart());
            trajet.setHeureArrivee(trajetDTO.getHeureArrivee());
            return trajetRepository.save(trajet);
        });
    }


    // Supprimer un trajet
    public void supprimerTrajet(Long id) {
        trajetRepository.deleteById(id);
    }

    // Rechercher les trajets par agence (avec pagination)
    public Page<Trajet> rechercherTrajetsParAgence(Long agenceId, Pageable pageable) {
        return trajetRepository.findByIdAgence(agenceId, pageable);
    }

    // Rechercher tous les trajets (optionnel)
    public List<Trajet> rechercherTousLesTrajets() {
        return trajetRepository.findAll();
    }

    // Rechercher par ville de départ ou d'arrivée (optionnel)
    public List<Trajet> rechercherParVille(String ville) {
        return trajetRepository.findByVilleDepartContainingIgnoreCaseOrVilleArriveeContainingIgnoreCase(ville, ville);
    }

    // Méthode utilitaire pour convertir un DTO en entité
    private Trajet fromDTO(TrajetDTO dto) {
        Trajet trajet = new Trajet();
        trajet.setVilleDepart(dto.getVilleDepart());
        trajet.setVilleArrivee(dto.getVilleArrivee());
        trajet.setDistance(dto.getDistance());
        trajet.setIdAgence(dto.getIdAgence());
        trajet.setDescription(dto.getDescription());
        trajet.setHeureDepart(dto.getHeureDepart());
        trajet.setHeureArrivee(dto.getHeureArrivee());
        return trajet;
    }

    public Page<Trajet> findByAgence(Long agenceId, Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByAgence'");
    }
}