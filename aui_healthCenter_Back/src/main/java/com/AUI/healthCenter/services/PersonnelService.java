package com.AUI.healthCenter.services;

import com.AUI.healthCenter.models.entities.Personnel;
import com.AUI.healthCenter.repositories.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonnelService {

    @Autowired
    private PersonnelRepository personnelRepository;

    public List<Personnel> findAll() {
        return personnelRepository.findAll();
    }

    public Optional<Personnel> findById(Integer id) {
        return personnelRepository.findById(id);
    }

    public Personnel save(Personnel personnel) {
        return personnelRepository.save(personnel);
    }

    public Personnel update(Integer id, Personnel personnel) {
        personnel.setId(id);
        return personnelRepository.save(personnel);
    }

    public void deleteById(Integer id) {
        personnelRepository.deleteById(id);
    }
    public Optional<Personnel> findByUsernameAndPasswd(String username, String passwd) {
        return personnelRepository.findByUsernameAndPasswd(username, passwd);
    }
}