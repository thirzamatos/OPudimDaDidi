import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order-model';

@Component({
  selector: 'app-detalhe-pedido',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css',
})
export class DetalhePedido implements OnInit {
  order: Order | null = null;
  carregando = true;

  constructor (private orderService: OrderService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.detalhe(id).subscribe({
      next: (order) => {
        this.order = order;
        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.carregando = false;
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
    return map[status] ?? ''
  }

  getStatusIcon(status: string): string {
    const map: {[key: string]: string} = {
      'pendente': 'schedule',
      'confirmado': 'check_circle',
      'em preparo': 'restaurant',
      'entregue': 'local_shipping',
      'cancelado': 'cancel'
    };
    return map[status] ?? 'info';
  }
}
