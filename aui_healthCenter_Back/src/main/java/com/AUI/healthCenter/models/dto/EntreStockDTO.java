package com.AUI.healthCenter.models.dto;


import java.time.LocalDate;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntreStockDTO {
    private Integer idEntre;
    private MedicamentDTO medicament;
    private FournisseurDTO fournisseur;
    private LocalDate dateEntre;
    private Integer qte;
    private String badge;
}