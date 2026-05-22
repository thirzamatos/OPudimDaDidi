import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../../services/order';
import { Order } from '../../../models/order-model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  orders: Order[] = [];
  carregando = true;

  constructor( private orderService: OrderService, private cdr: ChangeDetectorRef) {}

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

  get totalPedidos(): number {return this.orders.length;}
  get pedidosPendentes(): number {return this.orders.filter(o => o.status === 'pendente').length;}
  get pedidosEntregues(): number {return this.orders.filter(o => o.status === 'entregue').length;}
  get totalFaturado(): number {return this.orders.reduce((acc, o) => acc + o.total, 0);}
}
