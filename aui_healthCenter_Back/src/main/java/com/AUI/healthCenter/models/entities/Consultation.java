package com.AUI.healthCenter.models.entities;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "consultation")
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_patient", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "id_personnel", nullable = false)
    private Personnel personnel;

    private LocalDateTime dateConsultation;

    private String motif;          // Raison de la visite
    private String diagnostic;     // Diagnostic du médecin
    private String traitement;     // Prescription ou traitement proposé
}

