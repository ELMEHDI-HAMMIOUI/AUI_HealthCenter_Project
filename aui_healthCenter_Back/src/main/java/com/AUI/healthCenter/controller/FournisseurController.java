package com.AUI.healthCenter.controller;

import com.AUI.healthCenter.models.entities.Fournisseur;
import com.AUI.healthCenter.services.FournisseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fournisseurs")
public class FournisseurController {

    @Autowired
    private FournisseurService fournisseurService;

    @GetMapping
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurService.findAll();
    }

    @GetMapping("/{id}")
    public Fournisseur getFournisseurById(@PathVariable Integer id) {
        return fournisseurService.findById(id).orElse(null);
    }

    @PostMapping
    public Fournisseur createFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.save(fournisseur);
    }

    @PutMapping("/{id}")
    public Fournisseur updateFournisseur(@PathVariable Integer id, @RequestBody Fournisseur fournisseur) {
        return fournisseurService.update(id, fournisseur);
    }

    @DeleteMapping("/{id}")
    public void deleteFournisseur(@PathVariable Integer id) {
        fournisseurService.deleteById(id);
    }
}