package com.example.desafio.service;

import com.example.desafio.entity.Empresa;
import com.example.desafio.entity.Fornecedor;
import com.example.desafio.repository.FornecedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Period;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class FornecedorService {

    private final FornecedorRepository fornecedorRepository;
    private final EmpresaService empresaService;

    public List<Fornecedor> getFornecedoresByEmpresaId(Long empresaId) {
        return fornecedorRepository.findByEmpresasId(empresaId);
    }
    public Optional<Fornecedor> findById(Long id) {
        return fornecedorRepository.findById(id);
    }

    public List<Fornecedor> findByName(String name) {
        return fornecedorRepository.findByNameContaining(name);
    }

    public List<Fornecedor> findByCnpjCpf(String cnpjCpf) {
        return fornecedorRepository.findByCnpjCpfContaining(cnpjCpf);
    }
    public List<Fornecedor> findAll() {
        return fornecedorRepository.findAll();
    }

    public Fornecedor register(Fornecedor fornecedor) {
        return fornecedorRepository.save(fornecedor);
    }

    public Fornecedor addFornecedor(Fornecedor fornecedor, Long empresaId) {
        Optional<Empresa> empresaOpt = empresaService.findById(empresaId);

        if (empresaOpt.isPresent()) {
            Empresa empresa = empresaOpt.get();
            List<Fornecedor> fornecedores = empresa.getFornecedores();
            fornecedores.add(fornecedor);
            empresa.setFornecedores(fornecedores);
            empresaService.register(empresa);

            // Associate the empresa with the fornecedor
           // fornecedor.setEmpresas(Collections.singletonList(empresa));

            if ("Parana".equals(empresa.getEstado())) {
                // Verifica se o fornecedor é menor de idade
                if (fornecedor.isPessoaFisica()) {
                    if (fornecedor.getRg() == null || fornecedor.getData_nascimento() == null) {
                        throw new IllegalArgumentException("Para cadastro de pessoa física é necessário preencher o RG e a data de nascimento");
                    }

                    LocalDate hoje = LocalDate.now();
                    LocalDate dataNascimento = fornecedor.getData_nascimento();
                    if (Period.between(dataNascimento, hoje).getYears() < 18) {
                        throw new RuntimeException("Não é permitido cadastrar fornecedor pessoa física menor de idade no Paraná");
                    }
                }
        }
            return fornecedorRepository.save(fornecedor);
        } else {
            return null;
        }
    }

    public Fornecedor update(Long id, Fornecedor fornecedorAtualizada) {

        Optional<Fornecedor> fornecedorOpt = fornecedorRepository.findById(id);
        if (fornecedorOpt.isPresent()) {
            Fornecedor fornecedor = fornecedorOpt.get();
            fornecedor.setName(fornecedorAtualizada.getName());
            fornecedor.setCnpjCpf(fornecedorAtualizada.getCnpjCpf());
            fornecedor.setRg(fornecedorAtualizada.getRg());
            fornecedor.setData_nascimento(fornecedorAtualizada.getData_nascimento());
            fornecedor.setEmail(fornecedorAtualizada.getEmail());
            fornecedor.setCep(fornecedorAtualizada.getCep());
            fornecedorRepository.save(fornecedor);
            return fornecedor;
        } else {
            return null;
        }
    }

    public String delete(Long id) {
        fornecedorRepository.deleteById(id);
        return "Fornecedor id: "+id+" deleted";
    }

    private Fornecedor returnFornecedor(Long id) {
        return fornecedorRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Fornecedor wasn't fount on database"));
    }

    private static final String CEP_API_URL = "http://cep.la/";

    public boolean validarCep(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        String url = CEP_API_URL + cep;

        try {
            // Faz a requisição à API
            String response = restTemplate.getForObject(url, String.class);

            // Verifica se a resposta contém o CEP buscado
            if (response.contains(cep)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            // Caso ocorra algum erro na requisição, retorna falso
            return false;
        }
    }
}
