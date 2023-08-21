import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/empresas');
  }

  getEmpresaById(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/empresas/${id}`);
  }

  deleteEmpresa(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/empresas/${id}`);
  }

  updateEmpresa(id:string, novosDados: any):Observable<any> {
    return this.http.put(`http://localhost:8080/empresas/${id}`, novosDados);
  }

  createEmpresa(dados: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/empresas/`, dados);
  }

}
