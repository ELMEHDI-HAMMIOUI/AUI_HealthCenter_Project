package com.AUI.healthCenter.models.dto;


import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SortieStockDTO {
    private Integer id;
    private ConsultationDTO consultation;
    private MedicamentDTO medicament;
    private Integer prixUnite;
    private LocalDate dateExpiration;
    private Integer perUnite;
    private Integer qte;
    private LocalDate dateSortie;
}