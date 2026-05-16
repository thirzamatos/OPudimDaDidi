import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order-model';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5157/api/orders';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${this.auth.getToken()}`});
  }

  criarPedido(items: {productId: number, quantidade: number}[]): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, {items}, {headers: this.headers()});
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
    return this.http.put<Order>(`${this.apiUrl}/${id}/status`, JSON.stringify(status), {headers: this.headers()});
  }
}
