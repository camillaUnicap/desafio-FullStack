import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css'],
})
export class EmpresaListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nomeFantasia', 'cnpj', 'cep', 'estado', 'actions'];
  empresas: any[] = [];
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: TemplateRef<any>;
  selectedEmpresaId: string | null = null;
  dataSource:any;

  constructor(private router: Router, private empresaService: EmpresaService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchEmpresas();
  }

  fetchEmpresas() {
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
      this.dataSource = new MatTableDataSource(this.empresas);
      console.log(this.empresas);
    });
  }

  openDeleteConfirmationModal(empresaId: string) {
    this.selectedEmpresaId = empresaId;
    this.modalService.open(this.deleteConfirmationModal);
  }

  confirmDelete() {
    if (this.selectedEmpresaId !== null) {
      this.empresaService.deleteEmpresa(this.selectedEmpresaId).subscribe(() => {
        this.empresas = this.empresas.filter((empresa) => empresa.id !== this.selectedEmpresaId);
        this.selectedEmpresaId = null;
        this.modalService.dismissAll();
      });
    }
  }

  handleUpdate(id: number) {
    this.router.navigate(['/empresa', id]);
  }

}
