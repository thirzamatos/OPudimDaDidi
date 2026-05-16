import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5157/api/auth';

  constructor(private http:HttpClient, private router: Router) {}

  registrar(nome: string, email: string, senha: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/registrar`, {nome, email, senha}).pipe(tap(res => this.salvarSessao(res)));
  }

  private salvarSessao(user: User): void {
    localStorage.setItem('token', user.token);
    localStorage.setItem('nome', user.nome);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getNome(): string | null {
    return localStorage.getItem('nome');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLogado(): boolean {
    return !!this.getToken();
  }

  isVendedor(): boolean {
    return this.getRole() === 'vendedor';
  }

}
