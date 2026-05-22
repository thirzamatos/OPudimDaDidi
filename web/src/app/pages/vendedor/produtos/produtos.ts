import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product';
import { Product } from '../../../models/product-model';

@Component({
  selector: 'app-produtos',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit{
  products: Product[] = [];
  carregando = true;
  editando: Product | null = null;
  salvando = false;
  criando = false;
  confirmandoDelete: number | null = null;

  form = {
    nome: '',
    sabor: '',
    tamanho: '',
    descricao: '',
    preco: 0,
    imagemUrl: ''
  };

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.productService.listar().subscribe({
      next: (products) => {
        this.products = products;
        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.carregando = false;
        this.cdr.markForCheck();
      }
    });
  }

  editar(product: Product): void {
    this.editando = product;
    this.form = {
      nome: product.nome,
      sabor: product.sabor,
      tamanho: product.tamanho,
      descricao: product.descricao,
      preco: product.preco,
      imagemUrl: product.imagemUrl,
    };

    setTimeout(() => {
      document.querySelector('.form-inline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  cancelar(): void {
    this.editando = null;
    this.criando = false;
  }

  salvar(): void {
    if(!this.editando)
      return;
    this.salvando = true;

    this.productService.editar(this.editando.id, this.form).subscribe({
      next: (updated) => {
        const idx = this.products.findIndex(p => p.id === updated.id);
        if(idx !== -1) this.products[idx] = updated;

        this.editando = null;
        this.salvando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.salvando = false;
        this.cdr.markForCheck();
      }
    });
  }

  desativar(product: Product): void {
    if(!confirm(`Desativar "${product.nome}"?`)) 
      return;

    this.productService.deletar(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.cdr.markForCheck();
      }
    });
  }

  confirmarDesativar(product: Product): void {
  this.confirmandoDelete = null;
  this.productService.deletar(product.id).subscribe({
    next: () => {
      this.products = this.products.filter(p => p.id !== product.id);
      this.cdr.markForCheck();
    }
  });
}

  abrirCriar(): void {
    this.criando = true;
    this.editando = null;
    this.form = {
      nome: '',
      sabor: '',
      tamanho: '',
      descricao: '',
      preco: 0,
      imagemUrl: ''
    };

    setTimeout(() => {
      document.querySelector('.form-inline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  criar(): void {
    this.salvando = true;
    this.productService.criar(this.form).subscribe({
      next: (product) => {
        this.products.push(product);
        this.criando = false;
        this.salvando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.salvando = false;
        this.cdr.markForCheck();
      }
    });
  }
}
