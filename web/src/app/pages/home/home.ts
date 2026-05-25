import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product-model';

interface Tamanho {
  label: string;
  porcoes: string;
  preco: number;
  id: number;
}

interface ProdutoHome {
  nome: string;
  descricao: string;
  imagem: string;
  tamanhos: Tamanho[];
}

interface Categoria {
  nome: string;
  produtos: ProdutoHome[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  categorias: Categoria[] = [];
  carregando = true;
  tamanhosSelecionados: { [nome: string]: number } = {};
  quantidades: { [nome: string]: number } = {};
  mensagem: { [nome: string]: string } = {};

  constructor(
    private cartService: CartService,
    public auth: AuthService,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.listar().subscribe({
      next: (products) => {
        this.categorias = this.organizarPorCategoria(products);
        this.categorias.forEach(cat => {
          cat.produtos.forEach(p => {
            this.tamanhosSelecionados[p.nome] = 0;
            this.quantidades[p.nome] = 1;
            this.mensagem[p.nome] = '';
          });
        });
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  organizarPorCategoria(products: Product[]): Categoria[] {
    const ordemCategorias = ['Tradicional', 'Especiais', 'Premium'];

    const categoriasMap: { [key: string]: string[] } = {
      'Tradicional': ['Tradicional'],
      'Especiais': ['Café', 'Doce de Leite', 'Ovomaltine', 'Zero Lactose', 'Chocolate'],
      'Premium': ['Ninho com Nutella', 'Coco com Cocada', 'Chocolate Branco com Morango']
    };

    const grupos: { [cat: string]: { [nome: string]: Product[] } } = {};

    products.forEach(p => {
      let categoriaNome = 'Especiais';
      for (const [cat, sabores] of Object.entries(categoriasMap)) {
        if (sabores.includes(p.sabor)) {
          categoriaNome = cat;
          break;
        }
      }
      if (!grupos[categoriaNome]) grupos[categoriaNome] = {};
      if (!grupos[categoriaNome][p.nome]) grupos[categoriaNome][p.nome] = [];
      grupos[categoriaNome][p.nome].push(p);
    });

    return ordemCategorias
      .filter(cat => grupos[cat])
      .map(cat => ({
        nome: cat.toUpperCase(),
        produtos: Object.entries(grupos[cat]).map(([nome, prods]) => ({
          nome,
          descricao: prods[0].descricao,
          imagem: prods[0].imagemUrl,
          tamanhos: prods
            .sort((a, b) => Number(a.preco) - Number(b.preco))
            .map(p => ({
              label: p.tamanho,
              porcoes: p.tamanho === '120g' ? '1 porção' : p.tamanho === '500g' ? '4 porções' : '8 porções',
              preco: Number(p.preco),
              id: p.id
            }))
        }))
      }));
  }

  getTotal(produto: ProdutoHome): number {
    const idx = this.tamanhosSelecionados[produto.nome] ?? 0;
    const tamanho = produto.tamanhos[idx];
    if (!tamanho) return 0;
    return tamanho.preco * (this.quantidades[produto.nome] ?? 1);
  }

  incrementar(nome: string) { this.quantidades[nome]++; }
  decrementar(nome: string) { if (this.quantidades[nome] > 1) this.quantidades[nome]--; }

    adicionarAoCarrinho(produto: ProdutoHome): void {
    if (!this.auth.isLogado()) {
      this.router.navigate(['/login']);
      return;
    }

    const idx = this.tamanhosSelecionados[produto.nome] ?? 0;
    const tamanho = produto.tamanhos[idx];

    if (!tamanho) return;

    this.cartService.adicionarItem(tamanho.id, this.quantidades[produto.nome]).subscribe({
      next: () => {
        this.mensagem[produto.nome] = 'Adicionado!';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.mensagem[produto.nome] = '';
          this.cdr.detectChanges();
        }, 2000);
      },
      error: () => {
        this.mensagem[produto.nome] = 'Erro ao adicionar.';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.mensagem[produto.nome] = '';
          this.cdr.detectChanges();
        }, 2000);
      }
    });
  }
}