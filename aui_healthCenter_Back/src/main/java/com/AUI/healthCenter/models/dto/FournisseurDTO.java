package com.AUI.healthCenter.models.dto;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FournisseurDTO {
    private Integer id;
    private String nomFournisseur;
    private String adresse;
    private String telephone;
    private String email;
}