import { Component} from '@angular/core';
import { RouterOutlet, Router, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    Header
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mostrarHeader = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const rotasSemHeader = ['/login', '/cadastro'];
      this.mostrarHeader = !rotasSemHeader.includes(e.url);
    });
  }
}
