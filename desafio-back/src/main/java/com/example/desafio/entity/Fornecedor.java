package com.example.desafio.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "fornecedor")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Builder
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "cnpj_cpf", nullable = false, unique = true)
    private String cnpjCpf;

    @Column(name = "rg")
    private String rg;

    @Column(name = "data_nascimento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate data_nascimento;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "cep", nullable = false)
    private Integer cep;
    @ManyToMany
    @JoinTable(name = "empresa_fornecedor",
            joinColumns = @JoinColumn(name = "fornecedor_id"),
            inverseJoinColumns = @JoinColumn(name = "empresa_id"))
    private List<Empresa> empresas;
    public enum TipoPessoa {
        FISICA, JURIDICA;
    }

    @Column(name = "tipo_pessoa")
    @Enumerated(EnumType.STRING)
    private TipoPessoa tipoPessoa;

    public boolean isPessoaFisica() {
        return TipoPessoa.FISICA.equals(this.tipoPessoa);
    }
}
