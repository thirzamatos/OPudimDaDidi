import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public auth: AuthService) {}
}
