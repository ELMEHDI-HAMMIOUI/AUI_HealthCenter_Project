package com.AUI.healthCenter.models.dto;

import com.AUI.healthCenter.models.entities.Consultation;
import com.AUI.healthCenter.models.entities.Personnel;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationDTO {
    private Integer id;
    private PatientDTO patient;
    private Personnel personnel;
    private LocalDateTime dateConsultation;
    private String diagnostic;
    private String traitement;

}