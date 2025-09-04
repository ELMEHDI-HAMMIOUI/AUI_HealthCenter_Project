package com.AUI.healthCenter.models.entities;


import com.AUI.healthCenter.models.Enum.ERole;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "personnel")
public class Personnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;
    private String prenom;
    private String username;
    private String passwd;
    private ERole role;
    private String specialite;
    private String telephone;
    private String email;
    private String status;
}

