import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order';
import { Order } from '../../../models/order-model';

@Component({
  selector: 'app-pedidos',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit{
  orders: Order[] = [];
  carregando = true;
  atualizando: {[id: number]: boolean} = {};

  statusOptions = ['pendente', 'confirmado', 'em preparo', 'entregue', 'cancelado'];

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.orderService.todosPedidos().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.carregando = false;
        this.cdr.markForCheck();
      }
    });
  }

  atualizarStatus(order: Order, novoStatus: string): void {
    this.atualizando[order.id] = true;
    this.orderService.atualizarStatus(order.id, novoStatus).subscribe({
      next: (updated) => {
        order.status = updated.status;
        this.atualizando[order.id] = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.atualizando[order.id] = false;
        this.cdr.markForCheck();
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
