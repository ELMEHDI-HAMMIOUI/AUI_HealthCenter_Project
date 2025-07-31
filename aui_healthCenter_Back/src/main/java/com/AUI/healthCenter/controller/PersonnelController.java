package com.AUI.healthCenter.controller;

import com.AUI.healthCenter.models.dto.PersonnelDTO;
import com.AUI.healthCenter.models.entities.Personnel;
import com.AUI.healthCenter.services.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/personnels")
public class PersonnelController {

    @Autowired
    private PersonnelService personnelService;

    @GetMapping
    public List<PersonnelDTO> getAllPersonnels() {
        return personnelService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<PersonnelDTO> getPersonnelById(@PathVariable Integer id) {
        return personnelService.findById(id);
    }

    @PostMapping
    public PersonnelDTO createPersonnel(@RequestBody PersonnelDTO personnel) {
        return personnelService.save(personnel);
    }

    @PutMapping("/{id}")
    public PersonnelDTO updatePersonnel(@PathVariable Integer id, @RequestBody PersonnelDTO personnel) {
        return personnelService.update(id, personnel);
    }

    @DeleteMapping("/{id}")
    public void deletePersonnel(@PathVariable Integer id) {
        personnelService.deleteById(id);
    }
}