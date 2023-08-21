package com.example.desafio.repository;

import com.example.desafio.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    List<Empresa> findByFornecedoresId(Long fornecedorId);

    Optional<Empresa> findByCnpj(String cnpj);

}
