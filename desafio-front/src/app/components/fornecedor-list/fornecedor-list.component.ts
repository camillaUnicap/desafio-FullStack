import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nomeFantasia', 'cnpj', 'rg', 'cep', 'data_nascimento', 'email', 'actions'];
  fornecedores: any[] = [];
  searchId: string = '';
  searchResult: any = null;
  dataSource: any;
  selectedEmpresaId: string | null = null;

  @ViewChild('deleteConfirmationModal', { static: true }) deleteConfirmationModal: any;


  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    public dialog: MatDialog, 
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchFornecedores();
  }

  fetchFornecedores() {
    this.fornecedorService.getFornecedores().subscribe(
      (response: any) => {
        this.fornecedores = response;
        this.dataSource = new MatTableDataSource(this.fornecedores);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleSearch() {
    if (this.searchId.trim() !== '') {
      this.fornecedorService.getFornecedorById(this.searchId).subscribe(
        (response: any) => {
          this.searchResult = response;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.searchResult = null;
    }
  }

  openDeleteConfirmationModal(id: string) {
    this.selectedEmpresaId = id;
    const dialogRef = this.dialog.open(this.deleteConfirmationModal);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.handleDelete();
      }
    });
  }

  handleDelete() {
    if (this.selectedEmpresaId !== null) {
      this.fornecedorService.deleteFornecedor(this.selectedEmpresaId).subscribe(
        () => {
          this.fornecedores = this.fornecedores.filter(fornecedor => fornecedor.id !== this.selectedEmpresaId);
          this.searchResult = null;
          this.modalService.dismissAll();
        },
        (error) => {
          console.error(error);
        }
      );
    }
    
  }

  handleUpdate(id: string) {
    this.router.navigate([`/fornecedor/${id}`]);
  }
}
