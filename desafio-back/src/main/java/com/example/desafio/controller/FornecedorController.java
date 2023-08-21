package com.example.desafio.controller;

import com.example.desafio.entity.Fornecedor;
import com.example.desafio.service.FornecedorService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Data
@RequestMapping(value = "/fornecedores")
@RequiredArgsConstructor
public class FornecedorController {
    private final FornecedorService fornecedorService;

    @GetMapping(value = "/{id}")
    public Optional<Fornecedor> findById(@PathVariable(name = "id") Long id) {
        return fornecedorService.findById(id);
    }

    @GetMapping
    public ResponseEntity<List<Fornecedor>> findAll(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "cnpjCpf", required = false) String cnpjCpf
    ) {
        List<Fornecedor> fornecedores;

        if (name != null) {
            fornecedores = fornecedorService.findByName(name);
        } else if (cnpjCpf != null) {
            fornecedores = fornecedorService.findByCnpjCpf(cnpjCpf);
        } else {
            fornecedores = fornecedorService.findAll();
        }

        return ResponseEntity.ok(fornecedores);
    }
    @GetMapping("/{empresaId}/empresas")
    public ResponseEntity<List<Fornecedor>> getFornecedoresByEmpresaId(@PathVariable Long empresaId) {
        List<Fornecedor> fornecedores = fornecedorService.getFornecedoresByEmpresaId(empresaId);
        return ResponseEntity.ok(fornecedores);
    }

    @PostMapping
    public ResponseEntity<Fornecedor> register(@RequestBody Fornecedor fornecedor) {
        return new ResponseEntity<>(fornecedorService.register(fornecedor), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Fornecedor> update(@RequestBody Fornecedor fornecedorData, @PathVariable(name = "id") Long id) {
        Optional<Fornecedor> fornecedorOpt = fornecedorService.findById(id);
        if (fornecedorOpt.isPresent()) {
            Fornecedor fornecedor = fornecedorOpt.get();
            fornecedor.setName(fornecedorData.getName());
            fornecedor.setCnpjCpf(fornecedorData.getCnpjCpf());
            fornecedor.setRg(fornecedorData.getRg());
            fornecedor.setData_nascimento(fornecedorData.getData_nascimento());
            fornecedor.setEmail(fornecedorData.getEmail());
            fornecedor.setCep(fornecedorData.getCep());
            fornecedorService.register(fornecedor);
            return ResponseEntity.ok(fornecedor);
        } else {
            return ResponseEntity.notFound().build(); // Use NOT_FOUND status
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) {
        String result = fornecedorService.delete(id);
        return ResponseEntity.ok(result);
    }
}
