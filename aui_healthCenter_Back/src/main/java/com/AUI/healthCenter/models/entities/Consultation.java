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
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_patient", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "id_personnel", nullable = false)
    private Personnel personnel;

    private LocalDateTime dateConsultation;
    private String diagnostic;
    private String traitement;
}

