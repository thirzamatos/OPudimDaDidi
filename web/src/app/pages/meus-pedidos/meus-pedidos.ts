import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order-model';

@Component({
  selector: 'app-meus-pedidos',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css',
})
export class MeusPedidos implements OnInit{
  orders: Order[] = [];
  carregando = true;

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.orderService.meusPedidos().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    const map: {[key: string]: string} = {
      'pendente': 'status-pendente',
      'confirmado': 'status-confirmado',
      'em preparo': 'status-preparo',
      'entregue': 'status-entregue',
      'cancelado': 'status-cancelado'
    };
    return map[status] ?? '';
  }
}
