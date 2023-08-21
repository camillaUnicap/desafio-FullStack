import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { EmpresaDetailsComponent } from './components/empresa-details/empresa-details.component';
import { EmpresaCreateComponent } from './components/empresa-create/empresa-create.component';
import { FornecedorDetailsComponent } from './components/fornecedor-details/fornecedor-details.component';
import { FornecedorListComponent } from './components/fornecedor-list/fornecedor-list.component';
import { FornecedorCreateComponent } from './components/fornecedor-create/fornecedor-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'empresas', pathMatch: 'full' },
  { path: 'empresas', component: EmpresaListComponent },
  { path: 'empresa/:id', component: EmpresaDetailsComponent },
  { path: 'create', component: EmpresaCreateComponent },
  { path: 'fornecedor/:id', component: FornecedorDetailsComponent },
  { path: 'fornecedores', component: FornecedorListComponent },
  { path: 'create', component: FornecedorCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
