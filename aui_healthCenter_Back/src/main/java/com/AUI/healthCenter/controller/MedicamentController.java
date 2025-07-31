package com.AUI.healthCenter.controller;

import com.AUI.healthCenter.models.entities.Medicament;
import com.AUI.healthCenter.services.MedicamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/medicaments")
public class MedicamentController {

    @Autowired
    private MedicamentService medicamentService;

    @GetMapping
    public List<Medicament> getAllMedicaments() {
        return medicamentService.findAll();
    }

    @GetMapping("/{id}")
    public Medicament getMedicamentById(@PathVariable Integer id) {
        return medicamentService.findById(id);
    }

    @PostMapping
    public Medicament createMedicament(@RequestBody Medicament medicament) {
        return medicamentService.save(medicament);
    }

    @PutMapping("/{id}")
    public Medicament updateMedicament(@PathVariable Integer id, @RequestBody Medicament medicament) {
        return medicamentService.update(id, medicament);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicament(@PathVariable Integer id) {
        medicamentService.deleteById(id);
    }
}