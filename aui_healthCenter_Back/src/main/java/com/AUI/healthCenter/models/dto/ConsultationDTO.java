package com.AUI.healthCenter.models.dto;

import com.AUI.healthCenter.models.entities.Consultation;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationDTO {
    private Integer id;
    private PatientDTO patient;
    private PersonnelDTO personnel;
    private LocalDateTime dateConsultation;
    private String diagnostic;
    private String traitement;

}