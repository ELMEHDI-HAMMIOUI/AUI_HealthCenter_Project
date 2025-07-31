// src/main/java/com/AUI/healthCenter/services/EntreStockService.java
package com.AUI.healthCenter.services;

import com.AUI.healthCenter.models.entities.EntreStock;
import com.AUI.healthCenter.repositories.EntreStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntreStockService {

    @Autowired
    private EntreStockRepository entreStockRepository;

    public List<EntreStock> findAll() {
        return entreStockRepository.findAll();
    }

    public EntreStock findById(Integer id) {
        return entreStockRepository.findById(id).orElse(null);
    }

    public EntreStock save(EntreStock entreStock) {
        return entreStockRepository.save(entreStock);
    }

    public EntreStock update(Integer id, EntreStock entreStock) {
        Optional<EntreStock> existing = entreStockRepository.findById(id);
        if (existing.isPresent()) {
            entreStock.setId(id);
            return entreStockRepository.save(entreStock);
        }
        return null;
    }

    public void deleteById(Integer id) {
        entreStockRepository.deleteById(id);
    }
}