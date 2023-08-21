package com.example.desafio.data;

import com.example.desafio.entity.Empresa;
import com.example.desafio.entity.Fornecedor;
import com.example.desafio.repository.EmpresaRepository;
import com.example.desafio.repository.FornecedorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    private final EmpresaRepository empresaRepository;
    private final FornecedorRepository fornecedorRepository;

    public DataLoader(EmpresaRepository empresaRepository, FornecedorRepository fornecedorRepository) {
        this.empresaRepository = empresaRepository;
        this.fornecedorRepository = fornecedorRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Create or retrieve empresas
        Empresa empresa1 = empresaRepository.findByCnpj("12345678901234")
                .orElse(Empresa.builder()
                        .nameFantasia("Empresa 1")
                        .cnpj("12345678901234")
                        .cep(12345332)
                        .estado("Pernambuco")
                        .build());

        Empresa empresa2 = empresaRepository.findByCnpj("98765432109876")
                .orElse(Empresa.builder()
                        .nameFantasia("Empresa 2")
                        .cnpj("98765432109876")
                        .cep(54321223)
                        .estado("São Paulo")
                        .build());

        empresa1 = empresaRepository.save(empresa1);
        empresa2 = empresaRepository.save(empresa2);


           Fornecedor fornecedor1 = fornecedorRepository.findByCnpjCpf("12345678912")
                   .orElse(Fornecedor.builder()
                    .name("Fornecedor 1")
                    .cnpjCpf("12345678912")
                    .rg("0098675")
                    .email("teste@gmail.com")
                    .cep(12123459)
                    .tipoPessoa(Fornecedor.TipoPessoa.JURIDICA)
                    .data_nascimento(LocalDate.parse("2000-12-20"))
                    .empresas(new ArrayList<>())
                    .build());

        fornecedor1.setEmpresas(Arrays.asList(empresa1, empresa2));
        empresa1.setFornecedores(Arrays.asList(fornecedor1));
        empresa2.setFornecedores(Arrays.asList(fornecedor1));

        fornecedorRepository.save(fornecedor1);
        empresaRepository.save(empresa1);
        empresaRepository.save(empresa2);
    }
}