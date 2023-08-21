package com.example.desafio.service;

import com.example.desafio.entity.Empresa;
import com.example.desafio.entity.Fornecedor;
import com.example.desafio.repository.EmpresaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    public List<Empresa> getEmpresasByFornecedorId(Long fornecedorId) {
        return empresaRepository.findByFornecedoresId(fornecedorId);
    }
    public Optional<Empresa>findById(Long id) {
        return empresaRepository.findById(id);
    }

    public List<Empresa> findAll() {
        return empresaRepository.findAll();
    }

    public Empresa register(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public Empresa addFornecedor(Long empresaId, Fornecedor fornecedor) {
        Optional<Empresa> empresaOpt = empresaRepository.findById(empresaId);

        if (empresaOpt.isPresent()) {
            Empresa empresa = empresaOpt.get();
            empresa.getFornecedores().add(fornecedor); // Adicione o fornecedor à lista de fornecedores da empresa
            fornecedor.getEmpresas().add(empresa); // Adicione a empresa à lista de empresas do fornecedor
            return empresaRepository.save(empresa);
        } else {
            return null;
        }
    }

    public Empresa update(Long id, Empresa empresaAtualizada) {
        Optional<Empresa> empresaOpt = empresaRepository.findById(id);
        if(empresaOpt.isPresent()) {
            Empresa empresa = empresaOpt.get();
            empresa.setNameFantasia(empresaAtualizada.getNameFantasia());
            empresa.setCep(empresaAtualizada.getCep());
            empresa.setCnpj(empresaAtualizada.getCnpj());
            empresaRepository.save(empresa);
            return empresa;
        } else {
            return null;
        }
    }

    public String delete(Long id) {
        empresaRepository.deleteById(id);
        return "Empresa id: "+id+" deleted";
    }

    private Empresa returnEmpresa(Long id) {
        return empresaRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Empresa wasn't fount on database"));
    }
}
