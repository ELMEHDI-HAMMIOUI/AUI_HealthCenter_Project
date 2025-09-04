package com.AUI.healthCenter.models.entities;


import jakarta.persistence.*;
import lombok.*;
import lombok.NoArgsConstructor;


import jakarta.persistence.*;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sortie_stock")
public class SortieStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_consultation", nullable = false)
    private Consultation consultation;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_medicament", nullable = false)
    private Medicament medicament;

    private Boolean parUnite; // true = par unité, false = par paquet
    private Integer quantite; // dépend de parUnite
    private LocalDate dateSortie;
}