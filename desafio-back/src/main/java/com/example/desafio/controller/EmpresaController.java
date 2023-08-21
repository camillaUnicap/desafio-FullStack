package com.example.desafio.controller;

import com.example.desafio.service.EmpresaService;
import org.springframework.http.HttpStatus;
import com.example.desafio.entity.Empresa;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Data
@RequestMapping(value = "/empresas")
@RequiredArgsConstructor
public class EmpresaController {

    private final EmpresaService empresaService;

    @GetMapping(value = "/{id}")
    public Optional<Empresa> findById(@PathVariable(name = "id") Long id) {
        return empresaService.findById(id);
    }
    @GetMapping
    public ResponseEntity<List<Empresa>> findAll() {
        return ResponseEntity.ok().body(empresaService.findAll());
    }

    @GetMapping("/{fornecedorId}/fornecedores")
    public ResponseEntity<List<Empresa>> getEmpresasByFornecedorId(@PathVariable Long fornecedorId) {
        List<Empresa> empresas = empresaService.getEmpresasByFornecedorId(fornecedorId);
        return ResponseEntity.ok(empresas);
    }

    @PostMapping
    public ResponseEntity<Empresa> register(@RequestBody Empresa empresa) {
        return new ResponseEntity<>(empresaService.register(empresa), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Empresa> update(@RequestBody Empresa empresaData, @PathVariable(name = "id") Long id) {
        Optional<Empresa> empresaOpt = empresaService.findById(id);
        if(empresaOpt.isPresent()){
            Empresa empresa = empresaOpt.get();
            empresa.setNameFantasia(empresaData.getNameFantasia());
            empresa.setCnpj(empresaData.getCnpj());
            empresa.setCep(empresaData.getCep());
            return ResponseEntity.ok(empresa);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) {
        String result = empresaService.delete(id);
        return ResponseEntity.ok(result);
    }
}
