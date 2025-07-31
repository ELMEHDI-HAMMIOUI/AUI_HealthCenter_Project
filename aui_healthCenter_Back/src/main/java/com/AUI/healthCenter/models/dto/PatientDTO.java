package com.AUI.healthCenter.models.dto;


import com.AUI.healthCenter.models.entities.Patient;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private Integer id;
    private String nom;
    private String prenom;
    private String cne;
    private LocalDate dateNaissance;
    private String sexe;
    private String telephone;
    private String email;



}