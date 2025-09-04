
package com.AUI.healthCenter.controller;

import com.AUI.healthCenter.models.entities.Personnel;
import com.AUI.healthCenter.services.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/personnels")
public class PersonnelController {

    @Autowired
    private PersonnelService personnelService;

    @GetMapping
    public List<Personnel> getAllPersonnels() {
        return personnelService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Personnel> getPersonnelById(@PathVariable Integer id) {
        return personnelService.findById(id);
    }

    @PostMapping
    public Personnel createPersonnel(@RequestBody Personnel personnel) {
        return personnelService.save(personnel);
    }

    @PutMapping("/{id}")
    public Personnel updatePersonnel(@PathVariable Integer id, @RequestBody Personnel personnel) {
        return personnelService.update(id, personnel);
    }

    @DeleteMapping("/{id}")
    public void deletePersonnel(@PathVariable Integer id) {
        personnelService.deleteById(id);
    }
    @PostMapping("/login")
    public ResponseEntity<Personnel> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String passwd = credentials.get("passwd");
        Optional<Personnel> personnel = personnelService.findByUsernameAndPasswd(username, passwd);
        if (personnel.isPresent()) {
            Personnel p = personnel.get();
            p.setPasswd(null);
            return ResponseEntity.ok(p);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    
}