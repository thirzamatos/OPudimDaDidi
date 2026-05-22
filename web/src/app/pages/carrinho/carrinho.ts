import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart';
import { Cart } from '../../models/cart-model';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  cart: Cart | null = null;
  carregando = true;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cartService.verCarrinho().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Erro:', err);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  remover(productId: number): void {
  console.log('Removendo productId:', productId);
  this.cartService.removerItem(productId).subscribe({
    next: (cart) => {
      this.cart = cart;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log('Erro ao remover:', err);
    }
  });
}

  limpar(): void {
    this.cartService.limpar().subscribe({
      next: () => {
        this.cart = null;
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getTotal(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((acc, item) => acc + (item.product.preco * item.quantidade), 0);
  }
}