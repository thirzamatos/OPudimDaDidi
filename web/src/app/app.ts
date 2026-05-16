import { Component} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
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
}
