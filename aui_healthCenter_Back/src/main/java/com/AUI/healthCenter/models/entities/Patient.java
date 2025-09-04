package com.AUI.healthCenter.models.entities;

import com.AUI.healthCenter.models.Enum.ETypePaient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;
    private String prenom;
    private String cne;
    private LocalDate dateNaissance;
    private String sexe;
    private String telephone;
    private String email;
    private String departement;
    private ETypePaient typePatient;
}
