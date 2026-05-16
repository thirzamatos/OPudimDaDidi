import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart-model';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5157/api/cart';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${this.auth.getToken()}`});
  }

  verCarrinho(): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, {headers: this.headers()});
  }

  adicionarItem(productId: number, quantidade: number): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, {productId, quantidade}, {headers: this.headers()});
  }

  removerItem(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/remover/${productId}`, {headers: this.headers()});
  }

  limpar(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/limpar`, {headers: this.headers()});
  }
}
