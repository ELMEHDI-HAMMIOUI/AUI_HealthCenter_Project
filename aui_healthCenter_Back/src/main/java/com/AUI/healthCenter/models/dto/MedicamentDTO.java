package com.AUI.healthCenter.models.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicamentDTO {
    private Integer id;
    private String nomMedicament;
    private String dosage;
    private String description;
    private Double prixUnitaire;
    private String categorie;
    private Integer defaultSize;
    private Integer qteStock;
    private Integer qteMinimum;
    private String codeBarre39;
}
