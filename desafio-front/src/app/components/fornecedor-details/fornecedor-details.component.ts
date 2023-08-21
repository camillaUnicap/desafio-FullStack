import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fornecedor-details',
  templateUrl: './fornecedor-details.component.html',
  styleUrls: ['./fornecedor-details.component.css']
})
export class FornecedorDetailsComponent implements OnInit {

  id: string = '';
  nome: string = '';
  cnpj_cpf: string = '';
  rg: string = '';
  data_nascimento: string = '';
  email: string = '';
  cep: string = '';
  id_empresa: string = '';
  tipo_pessoa: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchFornecedorDetails();
  }

  isMenorDeIdade(): boolean {
    const dataNascimento = new Date(this.data_nascimento);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    return idade < 18;
  }

  fetchFornecedorDetails() {
    this.http.get(`http://localhost:8080/fornecedor/${this.id}`).subscribe(
      (response: any) => {
        this.nome = response.nome;
        this.cnpj_cpf = response.cnpj_cpf;
        this.rg = response.rg;
        this.data_nascimento = response.data_nascimento;
        this.email = response.email;
        this.cep = response.cep;
        this.id_empresa = response.id_empresa;
        this.tipo_pessoa = response.tipo_pessoa;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleSubmit() {

    if (this.tipo_pessoa === 'fisica' && this.isMenorDeIdade()) {
      // Tratar caso não seja permitido cadastrar fornecedor pessoa física menor de idade
      console.error("Não é permitido cadastrar fornecedor pessoa física menor de idade.");
      return;
    } else {
      const novosDados = {
        nome: this.nome,
        cnpj_cpf: this.cnpj_cpf,
        cep: this.cep,
        email: this.email,
        rg: this.rg,
        data_nascimento: this.data_nascimento,
        tipo_pessoa: this.tipo_pessoa,
      };
  
      this.http.put(`http://localhost:8080/fornecedor/${this.id}`, novosDados).subscribe(
        (response) => {
          this.router.navigate(['/fornecedor']);
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }

   
  }
}
