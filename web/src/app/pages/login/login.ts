import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user-model';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  senha = '';
  erro = '';
  carregando = false;

  constructor(private auth: AuthService, private router: Router) {}

  entrar () {
    this.erro = '';
    this.carregando = true;

    this.auth.login(this.email, this.senha).subscribe({
      next: (res: User) => {
        this.carregando = false;

        if(res.role === 'vendedor') {
          this.router.navigate(['/vendedor/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Email ou senha inválidos!';
      }
    });
  }
}
