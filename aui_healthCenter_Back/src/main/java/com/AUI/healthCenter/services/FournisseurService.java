package com.AUI.healthCenter.services;

import com.AUI.healthCenter.models.entities.Fournisseur;
import com.AUI.healthCenter.repositories.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FournisseurService {

    @Autowired
    private FournisseurRepository fournisseurRepository;

    public List<Fournisseur> findAll() {
        return fournisseurRepository.findAll();
    }

    public Optional<Fournisseur> findById(Integer id) {
        return fournisseurRepository.findById(id);
    }

    public Fournisseur save(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    public Fournisseur update(Integer id, Fournisseur fournisseur) {
        fournisseur.setId(id);
        return fournisseurRepository.save(fournisseur);
    }

    public void deleteById(Integer id) {
        fournisseurRepository.deleteById(id);
    }
}