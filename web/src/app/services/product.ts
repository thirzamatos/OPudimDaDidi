import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product-model';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${this.auth.getToken()}`});
  }

  listar(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  buscar(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  criar(produto: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, produto, {headers: this.headers()});
  }

  editar(id: number, produto: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, produto, {headers: this.headers()});
  }

  deletar(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, { 
    headers: this.headers(),
    responseType: 'text'
  });
}
}
