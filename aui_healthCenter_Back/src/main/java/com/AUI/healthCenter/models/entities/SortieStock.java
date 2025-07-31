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

    private Integer prixUnite;
    private LocalDate dateExpiration;
    private Integer perUnite;//0 oui 1 non
    private Integer qte;//si perUnite = 0, c'est la quantité de médicaments sortis, sinon c'est le nombre de paquets sortis
    private LocalDate dateSortie;
}