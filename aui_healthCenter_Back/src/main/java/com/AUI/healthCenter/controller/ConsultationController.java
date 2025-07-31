package com.AUI.healthCenter.controller;

import com.AUI.healthCenter.models.entities.Consultation;
import com.AUI.healthCenter.services.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    @GetMapping
    public List<Consultation> getAllConsultations() {
        return consultationService.findAll();
    }

    @GetMapping("/{id}")
    public Consultation getConsultationById(@PathVariable Integer id) {
        return consultationService.findById(id).orElse(null);
    }

    @PostMapping
    public Consultation createConsultation(@RequestBody Consultation consultation) {
        return consultationService.save(consultation);
    }

    @PutMapping("/{id}")
    public Consultation updateConsultation(@PathVariable Integer id, @RequestBody Consultation consultation) {
        return consultationService.update(id, consultation);
    }

    @DeleteMapping("/{id}")
    public void deleteConsultation(@PathVariable Integer id) {
        consultationService.deleteById(id);
    }
}