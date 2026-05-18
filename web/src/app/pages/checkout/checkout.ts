import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { Cart } from '../../models/cart-model';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit{
  cart: Cart | null = null;
  carregando = true;
  processando = false;
  erro = '';
  endereco = '';
  formaPagamento = '';

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cartService.verCarrinho().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getTotal(): number {
    if(!this.cart)
      return 0;

    return this.cart.items.reduce((acc, item) => acc + (item.product.preco * item.quantidade), 0);
  }

  confirmar(): void {
    if (!this.endereco.trim()) {
      this.erro = 'Por favor, informe o endereço de entrega.';
      return;
    }

    if (!this.formaPagamento) {
      this.erro = 'Por favor, selecione a forma de pagamento.';
      return;
    }

    if (!this.cart || this.cart.items.length === 0) {
      this.erro = 'Seu carrinho está vazio.';
      return;
    }

    this.processando = true;
    this.erro = '';

    const cart = this.cart;
    const items = cart.items.map(item => ({
      productId: item.productId,
      quantidade: item.quantidade
    }));

    this.orderService.criarPedido(items, this.endereco, this.formaPagamento).subscribe({
      next: (order) => {
        this.cartService.limpar().subscribe();
        this.router.navigate(['/pedido', order.id]);
      },
      error: () => {
        this.processando = false;
        this.erro = 'Erro ao finalizar pedido. Tente novamente.';
        this.cdr.detectChanges();
      }
    });
  }
}
