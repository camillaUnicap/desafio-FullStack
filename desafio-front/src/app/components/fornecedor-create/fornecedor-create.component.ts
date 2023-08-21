import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent {

  name: string = '';
  cep: string = '';
  cnpjCpf: string = '';
  data_nascimento: string = '';
  email: string = '';
  rg: string = '';
  empresa_id: string = '';
  tipo_pessoa: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  handleSubmit() {
    if (this.validateFields()) {
      this.http.get(`http://cep.la/api/${this.cep}`)
        .subscribe(
          (response: any) => {
            if (response.uf === 'PR' && this.tipo_pessoa === 'fisica' && !this.isValidAge(this.data_nascimento)) {
              this.errorMessage = 'Não é permitido cadastrar um fornecedor pessoa física menor de idade do Paraná.';
            } else {
              // Dados válidos, enviar para a API de criação
              const novosDados = {
                name: this.name,
                cep: this.cep,
                cnpjCpf: this.cnpjCpf,
                data_nascimento: this.data_nascimento,
                email: this.email,
                rg: this.rg,
                empresa_id: this.empresa_id,
                tipo_pessoa: this.tipo_pessoa,
              };

              this.http.post('http://localhost:8080/fornecedores', novosDados).subscribe(
                (response) => {
                  this.router.navigate(['/fornecedor']);
                  console.log(response);
                },
                (error) => {
                  console.error(error);
                }
              );
            }
          },
          (error) => {
            console.error(error);
            this.errorMessage = 'Erro ao validar o CEP. Verifique se o CEP é válido e tente novamente.';
          }
        );
    }
  }

  validateFields(): boolean {
    this.errorMessage = '';

    if (!this.name || !this.cep || !this.cnpjCpf || !this.email || !this.empresa_id || !this.tipo_pessoa) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      return false;
    }

    if (!this.isValidCnpjCpf(this.cnpjCpf)) {
      this.errorMessage = 'CNPJ/CPF inválido.';
      return false;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Email inválido.';
      return false;
    }

    if (this.tipo_pessoa === 'fisica' && !this.isValidAge(this.data_nascimento)) {
      this.errorMessage = 'O fornecedor pessoa física deve ser maior de idade.';
      return false;
    }

    return true;
  }

  isValidCnpjCpf(cnpjCpf: string): boolean {
    const cleanedCnpjCpf = cnpjCpf.replace(/\D/g, '');

    if (cleanedCnpjCpf.length === 11) {
      return true;
    } else if (cleanedCnpjCpf.length === 14) {
      return true;
    } else {
      return false;
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  isValidAge(dataNascimento: string): boolean {
    const birthDate = new Date(dataNascimento);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18; 
    }

    return age >= 18;
  }

}
