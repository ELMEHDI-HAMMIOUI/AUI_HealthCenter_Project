package com.AUI.healthCenter.controller;

import com.AUI.healthCenter.models.dto.PatientDTO;
import com.AUI.healthCenter.models.entities.Patient;
import com.AUI.healthCenter.services.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<PatientDTO> getAllPatients() {
        return patientService.getAllPatients().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    public PatientDTO getPatientById(@PathVariable Integer id) {
        return toDTO(patientService.getPatientById(id));
    }

    @PostMapping
    public void createPatient(@RequestBody PatientDTO dto) {
        patientService.savePatient(toEntity(dto));
    }

    @PutMapping("/{id}")
    public void updatePatient(@PathVariable Integer id, @RequestBody PatientDTO dto) {
        Patient existing = patientService.getPatientById(id);
        if (existing != null) {
            dto.setId(id);
            patientService.savePatient(toEntity(dto));
        }
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Integer id) {
        patientService.deletePatient(id);
    }

    private PatientDTO toDTO(Patient p) {
        return new PatientDTO(
                p.getId(), p.getNom(), p.getPrenom(), p.getCne(),
                p.getDateNaissance(), p.getSexe(), p.getTelephone(), p.getEmail()
        );
    }

    private Patient toEntity(PatientDTO dto) {
        return new Patient(
                dto.getId(), dto.getNom(), dto.getPrenom(), dto.getCne(),
                dto.getDateNaissance(), dto.getSexe(), dto.getTelephone(), dto.getEmail()
        );
    }
}
