package com.AUI.healthCenter.services;

import com.AUI.healthCenter.models.entities.Medicament;
import com.AUI.healthCenter.repositories.MedicamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicamentService {

    @Autowired
    private MedicamentRepository medicamentRepository;

    public List<Medicament> findAll() {
        return medicamentRepository.findAll();
    }

    public Medicament findById(Integer id) {
        return medicamentRepository.findById(id).orElse(null);
    }

    public Medicament save(Medicament medicament) {
        return medicamentRepository.save(medicament);
    }

    public Medicament update(Integer id, Medicament medicament) {
        Optional<Medicament> existing = medicamentRepository.findById(id);
        if (existing.isPresent()) {
            medicament.setId(id);
            return medicamentRepository.save(medicament);
        }
        return null;
    }

    public void deleteById(Integer id) {
        medicamentRepository.deleteById(id);
    }
}