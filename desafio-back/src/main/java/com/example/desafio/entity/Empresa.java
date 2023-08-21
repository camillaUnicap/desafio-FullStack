package com.example.desafio.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "empresa")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Builder
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(name = "nameFantasia", nullable = false)
    private String nameFantasia;

    @Column(name = "cnpj", nullable = false, unique = true)
    private String cnpj;

    @Column(name = "cep", nullable = false)
    private Integer cep;

    @Column(name = "estado", nullable = false)
    private String estado;

    @ManyToMany(mappedBy = "empresas")
    private List<Fornecedor> fornecedores;

}
