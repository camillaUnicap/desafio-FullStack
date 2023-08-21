import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private baseUrl = 'http://localhost:8080/fornecedores';

  constructor(private http: HttpClient) {}

  getFornecedores(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getFornecedorById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createFornecedor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateFornecedor(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteFornecedor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchByName(name: any): Observable<any> {
    return this.http.get(`http://localhost:8080/fornecedores/?name=${name}`);
  }
}
