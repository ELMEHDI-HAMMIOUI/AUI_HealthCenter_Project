package com.AUI.healthCenter.repositories;

import com.AUI.healthCenter.models.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
}
