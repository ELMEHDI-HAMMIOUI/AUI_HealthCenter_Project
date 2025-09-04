package com.AUI.healthCenter.services;

import com.AUI.healthCenter.models.entities.Medicament;
import com.AUI.healthCenter.models.entities.SortieStock;
import com.AUI.healthCenter.repositories.MedicamentRepository;
import com.AUI.healthCenter.repositories.SortieStockRepository;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SortieStockService {
    @Autowired
    private MedicamentRepository medicamentRepository;
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
        if (medicament.getQteStock() == 0) {
            return null; // Stock épuisé
        }

        if (sortieStock.getParUnite()) {
            medicament.setCompteurPiles(medicament.getCompteurPiles() + sortieStock.getQuantite());
            if (medicament.getCompteurPiles() >= medicament.getDefaultSize()) {
                medicament.setCompteurPiles(0);
                medicament.setQteStock(medicament.getQteStock() - 1);
                if (medicament.getQteStock() < 0) {
                    medicament.setQteStock(0);
                    return null;
                }
            }
        } else { // sortie par paquet
            medicament.setQteStock(medicament.getQteStock() - sortieStock.getQuantite());
            if (medicament.getQteStock() < 0) {
                medicament.setQteStock(0);
                return null;
            }
        }


        medicamentRepository.save(medicament);
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