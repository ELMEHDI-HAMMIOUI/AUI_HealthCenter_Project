package com.AUI.healthCenter.repositories;

import com.AUI.healthCenter.models.entities.Medicament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicamentRepository  extends JpaRepository<Medicament, Integer>{
}
