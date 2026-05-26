import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Cart } from '../models/cart-model';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/api/products`;
  cartAtualizado$ = new Subject<void>();

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  verCarrinho(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl, { headers: this.headers() });
  }

  adicionarItem(productId: number, quantidade: number): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, { productId, quantidade }, { headers: this.headers() }).pipe(
      tap(() => this.cartAtualizado$.next())
    );
  }

  removerItem(productId: number): Observable<Cart> {
  return this.http.delete<Cart>(`${this.apiUrl}/remover/${productId}`, { headers: this.headers() }).pipe(
    tap(() => this.cartAtualizado$.next())
  );
}

  limpar(): Observable<any> {
  return this.http.delete(`${this.apiUrl}/limpar`, { 
    headers: this.headers(),
    responseType: 'text'
  }).pipe(
    tap(() => this.cartAtualizado$.next())
  );
}
}