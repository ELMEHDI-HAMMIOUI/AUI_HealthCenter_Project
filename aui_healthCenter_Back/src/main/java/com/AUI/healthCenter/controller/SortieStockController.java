package com.AUI.healthCenter.controller;

import com.AUI.healthCenter.models.entities.SortieStock;
import com.AUI.healthCenter.services.SortieStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sortiestocks")
public class SortieStockController {

    @Autowired
    private SortieStockService sortieStockService;

    @GetMapping
    public List<SortieStock> getAllSortieStocks() {
        return sortieStockService.findAll();
    }

    @GetMapping("/{id}")
    public SortieStock getSortieStockById(@PathVariable Integer id) {
        return sortieStockService.findById(id).orElse(null);
    }

    @PostMapping
    public SortieStock createSortieStock(@RequestBody SortieStock sortieStock) {
        return sortieStockService.save(sortieStock);
    }

    @PutMapping("/{id}")
    public SortieStock updateSortieStock(@PathVariable Integer id, @RequestBody SortieStock sortieStock) {
        return sortieStockService.update(id, sortieStock);
    }

    @DeleteMapping("/{id}")
    public void deleteSortieStock(@PathVariable Integer id) {
        sortieStockService.deleteById(id);
    }
}