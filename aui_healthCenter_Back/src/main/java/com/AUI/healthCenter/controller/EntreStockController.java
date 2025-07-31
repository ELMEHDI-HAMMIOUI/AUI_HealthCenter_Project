package com.AUI.healthCenter.controller;

import com.AUI.healthCenter.models.entities.EntreStock;
import com.AUI.healthCenter.services.EntreStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entreStocks")
public class EntreStockController {

    @Autowired
    private EntreStockService entreStockService;

    @GetMapping
    public List<EntreStock> getAllEntreStocks() {
        return entreStockService.findAll();
    }

    @GetMapping("/{id}")
    public EntreStock getEntreStockById(@PathVariable Integer id) {
        return entreStockService.findById(id);
    }

    @PostMapping
    public EntreStock createEntreStock(@RequestBody EntreStock entreStock) {
        return entreStockService.save(entreStock);
    }

    @PutMapping("/{id}")
    public EntreStock updateEntreStock(@PathVariable Integer id, @RequestBody EntreStock entreStock) {
        return entreStockService.update(id, entreStock);
    }

    @DeleteMapping("/{id}")
    public void deleteEntreStock(@PathVariable Integer id) {
        entreStockService.deleteById(id);
    }
}