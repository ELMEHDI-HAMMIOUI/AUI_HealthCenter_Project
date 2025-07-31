package com.AUI.healthCenter.services;

import com.AUI.healthCenter.models.entities.Medicament;
import com.AUI.healthCenter.models.entities.SortieStock;
import com.AUI.healthCenter.repositories.SortieStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SortieStockService {

    @Autowired
    private SortieStockRepository sortieStockRepository;
    @Autowired
    private MedicamentService medicamentService;

    public List<SortieStock> findAll() {
        return sortieStockRepository.findAll();
    }

    public Optional<SortieStock> findById(Integer id) {
        return sortieStockRepository.findById(id);
    }

    public SortieStock save(SortieStock sortieStock) {
        Medicament medicament = sortieStock.getMedicament();
        Integer qteSortie = sortieStock.getQte();

        if (sortieStock.getPerUnite() == 0) {
            // Sortie par unités
            int qteCourante = medicament.getCompteurPiles() + qteSortie;
            int paquetsUtilises = qteCourante / medicament.getDefaultSize();
            int reste = qteCourante % medicament.getDefaultSize();

            if (medicament.getQteStock() < paquetsUtilises) {
                throw new RuntimeException("Stock insuffisant (en paquets) !");
            }

            medicament.setQteStock(medicament.getQteStock() - paquetsUtilises);
            medicament.setCompteurPiles(reste);

        } else if (sortieStock.getPerUnite() == 1) {
            // Sortie par paquets
            if (medicament.getQteStock() < qteSortie) {
                throw new RuntimeException("Stock insuffisant (en paquets) !");
            }

            medicament.setQteStock(medicament.getQteStock() - qteSortie);
        }

        medicamentService.save(medicament);

        // Sauvegarde de la sortie
        return sortieStockRepository.save(sortieStock);
    }


    public SortieStock update(Integer id, SortieStock sortieStock) {
        sortieStock.setId(id);
        return sortieStockRepository.save(sortieStock);
    }

    public void deleteById(Integer id) {
        sortieStockRepository.deleteById(id);
    }
}