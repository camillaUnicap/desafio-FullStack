package com.example.desafio.repository;

import com.example.desafio.entity.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    List<Fornecedor> findByEmpresasId(Long empresaId);
    List<Fornecedor> findByNameContaining(String name);
    List<Fornecedor> findByCnpjCpfContaining(String cnpjCpf);
    Optional<Fornecedor> findByCnpjCpf(String cnpjCpf);

}
