// src/main/java/repository/PersonnelRepository.java
package com.AUI.healthCenter.repositories;

import com.AUI.healthCenter.models.entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonnelRepository extends JpaRepository<Personnel, Integer> {
    Optional<Personnel> findByUsernameAndPasswd(String username, String passwd);
}