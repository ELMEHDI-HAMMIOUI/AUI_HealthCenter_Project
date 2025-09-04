package com.AUI.healthCenter.models.entities;

import com.AUI.healthCenter.models.Enum.*;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "medicament")
public class Medicament {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        private String nomMedicament;

        @Column(columnDefinition = "TEXT")
        private String description;

        private String codeBarre39;

        //true or false
        private Boolean perPile; // true si le médicament est vendu à l'unité, false si en paquet

        @Enumerated(EnumType.STRING)
        private CategorieMedicament categorie; // Anti-inflammatoire, etc.

        private Double dosage; // 500 par exemple
        @Enumerated(EnumType.STRING)
        private Unite uniteDosage; // mg, ml...



        private Integer defaultSize; // nombre d'unités par paquet
        private Integer qteStock; // stock actuel en paquets
        private Integer compteurPiles = 0; // accumulation des unités sorties (pour convertir en paquet)
        private Integer qteMinimum; // seuil minimum (alerte)
}
