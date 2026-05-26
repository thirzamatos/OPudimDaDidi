import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order-model';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${this.auth.getToken()}`});
  }

  criarPedido(items: {productId: number, quantidade: number}[], endereco: string, formaPagamento: string): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, {items, endereco, formaPagamento}, {headers: this.headers()});
  }

  meusPedidos(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/meus-pedidos`, {headers: this.headers()});
  }

  detalhe(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, {headers: this.headers()});
  }

  todosPedidos(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, {headers: this.headers()});
  }

  atualizarStatus(id: number, status: string): Observable<Order> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.auth.getToken()}`,
    'Content-Type': 'application/json'
  });
  return this.http.put<Order>(`${this.apiUrl}/${id}/status`, { status }, { headers });
}
}
