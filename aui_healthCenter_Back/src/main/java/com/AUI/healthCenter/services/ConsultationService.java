package com.AUI.healthCenter.services;

import com.AUI.healthCenter.models.entities.Consultation;
import com.AUI.healthCenter.repositories.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultationService {

    @Autowired
    private ConsultationRepository consultationRepository;

    public List<Consultation> findAll() {
        return consultationRepository.findAll();
    }

    public Optional<Consultation> findById(Integer id) {
        return consultationRepository.findById(id);
    }

    public Consultation save(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    public Consultation update(Integer id, Consultation consultation) {
        consultation.setId(id);
        return consultationRepository.save(consultation);
    }

    public void deleteById(Integer id) {
        consultationRepository.deleteById(id);
    }
}