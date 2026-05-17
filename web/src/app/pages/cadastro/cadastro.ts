import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  erro = '';
  carregando = false;

  constructor (private auth: AuthService, private router: Router) {}

  cadastrar() {
    this.erro = '';

    if(this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    if(this.senha.length < 6) {
      this.erro = 'A senha deve ter pelo menos 6 caracteres';
      return;
    }

    this.carregando = true;
    this.auth.registrar(this.nome, this.email, this.senha).subscribe({
      next: (res: User) => {
        this.carregando = false;
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.carregando = false;
        this.erro = err.error || 'Erro ao cadastrar. Tente novamente.'
      }
    });
  }
}
