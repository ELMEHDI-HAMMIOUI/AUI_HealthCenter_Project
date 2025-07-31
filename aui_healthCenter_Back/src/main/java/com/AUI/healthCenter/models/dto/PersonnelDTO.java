package com.AUI.healthCenter.models.dto;

import com.AUI.healthCenter.models.entities.Personnel;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonnelDTO {
    private Integer id;
    private String nom;
    private String prenom;
    private String username;
    private String passwd;
    private String role;
    private String specialite;
    private String telephone;
    private String email;

    public static PersonnelDTO fromEntity(Personnel personnel) {
        if (personnel == null) return null;
        String maskedPasswd = personnel.getPasswd() == null ? null
                : "*".repeat(personnel.getPasswd().length());
        return new PersonnelDTO(
                personnel.getId(),
                personnel.getNom(),
                personnel.getPrenom(),
                personnel.getUsername(),
                maskedPasswd,
                personnel.getRole(),
                personnel.getSpecialite(),
                personnel.getTelephone(),
                personnel.getEmail()
        );
    }

    public static Personnel toEntity(PersonnelDTO dto) {
        if (dto == null) return null;
        Personnel personnel = new Personnel();
        personnel.setId(dto.getId());
        personnel.setNom(dto.getNom());
        personnel.setPrenom(dto.getPrenom());
        personnel.setUsername(dto.getUsername());
        personnel.setPasswd(dto.getPasswd());
        personnel.setRole(dto.getRole());
        personnel.setSpecialite(dto.getSpecialite());
        personnel.setTelephone(dto.getTelephone());
        personnel.setEmail(dto.getEmail());
        return personnel;
    }
}

