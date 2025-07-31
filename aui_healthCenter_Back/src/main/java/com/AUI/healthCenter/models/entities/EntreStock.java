package com.AUI.healthCenter.models.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "entre_stock")
public class EntreStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_medicament", nullable = false)
    private Medicament medicament;

    @ManyToOne
    @JoinColumn(name = "id_fournisseur", nullable = false)
    private Fournisseur fournisseur;
    private LocalDate dateEntre;
    private Integer qte;
    private String badge;
}

