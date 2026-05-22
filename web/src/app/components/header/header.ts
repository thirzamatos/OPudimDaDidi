import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  cartCount = 0;
  private sub: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.atualizarCarrinho();

    this.sub.add(
      this.cartService.cartAtualizado$.subscribe(() => {
        this.atualizarCarrinho();
      })
    );

    this.sub.add(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        this.atualizarCarrinho();
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  atualizarCarrinho(): void {
    if (this.auth.isLogado()) {
      this.cartService.verCarrinho().subscribe({
        next: (cart) => {
          this.cartCount = cart.items.reduce((acc, item) => acc + item.quantidade, 0);
          this.cdr.detectChanges();
        }
      });
    } else {
      this.cartCount = 0;
      this.cdr.detectChanges();
    }
  }
}