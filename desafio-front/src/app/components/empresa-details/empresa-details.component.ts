import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa-details',
  templateUrl: './empresa-details.component.html',
  styleUrls: ['./empresa-details.component.css']
})
export class EmpresaDetailsComponent implements OnInit{

  id: string = '';
  nameFantasia: string = '';
  cnpj: string = '';
  cep: string = '';
  estado: string = '';

  constructor(private empresaService:EmpresaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchEmpresaDetails();
  }

  fetchEmpresaDetails() {
    this.empresaService.getEmpresaById(this.id)
      .subscribe(
        (response: any) => {
          console.log(response)
          this.nameFantasia = response.nameFantasia;
          this.cnpj = response.cnpj;
          this.cep = response.cep;
          this.estado = response.estado;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  handleSubmit() {
    const novosDados = {
      nameFantasia: this.nameFantasia,
      cnpj: this.cnpj,
      cep: this.cep,
      estado: this.estado,
    };

    this.empresaService.updateEmpresa(this.id, novosDados)
      .subscribe(
        () => {
          this.router.navigate(['/empresa']);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
