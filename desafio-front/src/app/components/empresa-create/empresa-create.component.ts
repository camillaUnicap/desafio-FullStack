import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent {

  nameFantasia: string = '';
  cnpj: string = '';
  cep: string = '';
  estado: string = '';
  errorMessage: string = '';

  constructor(private empresaService: EmpresaService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (this.validateFields()) {
      // Realizar chamada à API de validação de CEP
      this.http.get(`http://cep.la/api/${this.cep}`)
        .subscribe(
          (response: any) => {
            if (response.uf === this.estado) {
              // Dados de CEP válidos, enviar para a API de criação
              const novaEmpresa = {
                nameFantasia: this.nameFantasia,
                cnpj: this.cnpj,
                cep: this.cep,
                estado: this.estado
              };
              this.empresaService.createEmpresa(novaEmpresa)
                .subscribe(
                  () => {
                    this.router.navigate(['/empresa']);
                  },
                  (error) => {
                    console.error(error);
                  }
                );
            } else {
              this.errorMessage = 'O estado do CEP não corresponde ao estado informado.';
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

    if (!this.nameFantasia || !this.cnpj || !this.cep || !this.estado) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      return false;
    }

    if (!this.isValidCNPJ(this.cnpj)) {
      this.errorMessage = 'CNPJ inválido.';
      return false;
    }

    if (!this.isValidCEP(this.cep)) {
      this.errorMessage = 'CEP inválido.';
      return false;
    }

    return true;
  }

  isValidCNPJ(cnpj: string): boolean {
    if (cnpj.length !== 14) {
      return false;
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }
    return true;
  }

  isValidCEP(cep: string): boolean {
    if (cep.length !== 8) {
      return false;
    }
    if (/^(\d)\1+$/.test(cep)) {
      return false;
    }
    return true;
  }


}
