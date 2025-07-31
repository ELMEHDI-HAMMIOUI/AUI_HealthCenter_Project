package com.AUI.healthCenter.services;

import com.AUI.healthCenter.models.entities.Personnel;
import com.AUI.healthCenter.models.dto.PersonnelDTO;
import com.AUI.healthCenter.repositories.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PersonnelService {

    @Autowired
    private PersonnelRepository personnelRepository;

    public List<PersonnelDTO> findAll() {
        return personnelRepository.findAll()
                .stream()
                .map(PersonnelDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<PersonnelDTO> findById(Integer id) {
        return personnelRepository.findById(id)
                .map(PersonnelDTO::fromEntity);
    }

    public PersonnelDTO save(PersonnelDTO personnelDTO) {
        Personnel personnel = PersonnelDTO.toEntity(personnelDTO);
        Personnel saved = personnelRepository.save(personnel);
        return PersonnelDTO.fromEntity(saved);
    }

    public PersonnelDTO update(Integer id, PersonnelDTO personnelDTO) {
        Personnel personnel = PersonnelDTO.toEntity(personnelDTO);
        personnel.setId(id);
        Personnel updated = personnelRepository.save(personnel);
        return PersonnelDTO.fromEntity(updated);
    }

    public void deleteById(Integer id) {
        personnelRepository.deleteById(id);
    }
}