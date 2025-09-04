    package com.AUI.healthCenter.services;

    import com.AUI.healthCenter.models.entities.*;
    import com.AUI.healthCenter.repositories.*;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;
    import java.util.Optional;

    @Service
    public class EntreStockService {

        @Autowired
        private EntreStockRepository entreStockRepository;

        @Autowired
        private MedicamentRepository medicamentRepository;

        public List<EntreStock> findAll() {
            return entreStockRepository.findAll();
        }

        public EntreStock findById(Integer id) {
            return entreStockRepository.findById(id).orElse(null);
        }

        public EntreStock save(EntreStock entreStock) {
            EntreStock saved = entreStockRepository.save(entreStock);
            ajouterStock(entreStock.getMedicament().getId(), entreStock.getQte());
            return saved;
        }

        public EntreStock update(Integer id, EntreStock entreStock) {
            Optional<EntreStock> existing = entreStockRepository.findById(id);
            if (existing.isPresent()) {
                EntreStock oldEntry = existing.get();
                Medicament medicament = oldEntry.getMedicament();

                Integer oldQte = oldEntry.getQte();
                Integer newQte = entreStock.getQte();


                if (newQte == null) {
                    throw new IllegalArgumentException("La quantité ne peut pas être nulle");
                }

                medicament.setQteStock(medicament.getQteStock() - (oldQte != null ? oldQte : 0) + newQte);
                medicamentRepository.save(medicament);

                entreStock.setId(id);
                entreStock.setMedicament(medicament);
                return entreStockRepository.save(entreStock);
            }
            return null;
        }

       public void deleteById(Integer id) {
           Optional<EntreStock> entryOpt = entreStockRepository.findById(id);
           if (entryOpt.isPresent()) {
               EntreStock entry = entryOpt.get();
               Medicament medicament = entry.getMedicament();
               Integer qte = entry.getQte();

               if (medicament != null && qte != null) {
                   medicament.setQteStock(medicament.getQteStock() - qte);
                   medicamentRepository.save(medicament);
               }
               entreStockRepository.deleteById(id);
           }
       }

        public void ajouterStock(Integer medicamentId, Integer qteAjoutee) {
            Medicament medicament = medicamentRepository.findById(medicamentId)
                .orElseThrow(() -> new RuntimeException("Médicament non trouvé"));
            medicament.setQteStock(medicament.getQteStock() + qteAjoutee);
            medicamentRepository.save(medicament);
        }
    }