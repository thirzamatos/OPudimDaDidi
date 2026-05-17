import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  categorias = [
    {
      nome: 'TRADICIONAL',
      produtos: [
        {
          nome: 'Pudim Tradicional',
          descricao: 'O clássico pudim de leite condensado, cremoso e irresistível, com calda dourada de caramelo.',
          imagem: '/imagens/tradicional-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 9.00, id: 1 },
            { label: '500g', porcoes: '4 porções', preco: 32.00, id: 2 },
            { label: '1kg', porcoes: '8 porções', preco: 60.00, id: 3 }
          ]
        }
      ]
    },
    {
      nome: 'ESPECIAIS',
      produtos: [
        {
          nome: 'Pudim de Café',
          descricao: 'Pudim feito com café premium, perfeito para os amantes de um sabor mais intenso.',
          imagem: '/imagens/cafe-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 10.00, id: 4 },
            { label: '500g', porcoes: '4 porções', preco: 38.00, id: 5 },
            { label: '1kg', porcoes: '8 porções', preco: 72.00, id: 6 }
          ]
        },
        {
          nome: 'Pudim de Doce de Leite',
          descricao: 'Pudim suave com doce de leite artesanal, uma combinação que derrete na boca.',
          imagem: '/imagens/doce-de-leite-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 10.00, id: 7 },
            { label: '500g', porcoes: '4 porções', preco: 38.00, id: 8 },
            { label: '1kg', porcoes: '8 porções', preco: 72.00, id: 9 }
          ]
        },
        {
          nome: 'Pudim de Ovomaltine',
          descricao: 'Pudim cremoso com Ovomaltine, equilibrando o sabor de chocolate e malte de forma única.',
          imagem: '/imagens/chocolate-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 10.00, id: 10 },
            { label: '500g', porcoes: '4 porções', preco: 38.00, id: 11 },
            { label: '1kg', porcoes: '8 porções', preco: 72.00, id: 12 }
          ]
        },
        {
          nome: 'Pudim Zero Lactose',
          descricao: 'Todo o sabor do pudim tradicional sem lactose, para você aproveitar sem restrições.',
          imagem: '/imagens/tradicional-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 10.00, id: 13 },
            { label: '500g', porcoes: '4 porções', preco: 38.00, id: 14 },
            { label: '1kg', porcoes: '8 porções', preco: 72.00, id: 15 }
          ]
        },
        {
          nome: 'Pudim de Chocolate',
          descricao: 'Pudim intenso de chocolate com calda aveludada, uma explosão de sabor em cada colherada.',
          imagem: '/imagens/chocolate-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 10.00, id: 16 },
            { label: '500g', porcoes: '4 porções', preco: 38.00, id: 17 },
            { label: '1kg', porcoes: '8 porções', preco: 72.00, id: 18 }
          ]
        }
      ]
    },
    {
      nome: 'PREMIUM',
      produtos: [
        {
          nome: 'Pudim de Ninho com Ganache de Nutella',
          descricao: 'Pudim de leite Ninho com generosa camada de ganache de Nutella. Sofisticação em cada colherada.',
          imagem: '/imagens/ninho-com-nutella-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 12.00, id: 19 },
            { label: '500g', porcoes: '4 porções', preco: 40.00, id: 20 },
            { label: '1kg', porcoes: '8 porções', preco: 77.00, id: 21 }
          ]
        },
        {
          nome: 'Pudim de Coco com Cocada Cremosa',
          descricao: 'Pudim de coco com cobertura de cocada cremosa artesanal, um sabor tropical inconfundível.',
          imagem: '/imagens/tradicional-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 12.00, id: 22 },
            { label: '500g', porcoes: '4 porções', preco: 40.00, id: 23 },
            { label: '1kg', porcoes: '8 porções', preco: 77.00, id: 24 }
          ]
        },
        {
          nome: 'Pudim de Chocolate Branco com Geleia de Morango',
          descricao: 'Pudim de chocolate branco com geleia de morango artesanal, uma combinação delicada e irresistível.',
          imagem: '/imagens/chocolate-branco-com-calda-pudim.jpeg',
          tamanhos: [
            { label: '120g', porcoes: '1 porção', preco: 12.00, id: 25 },
            { label: '500g', porcoes: '4 porções', preco: 40.00, id: 26 },
            { label: '1kg', porcoes: '8 porções', preco: 77.00, id: 27 }
          ]
        }
      ]
    }
  ];

  tamanhosSelecionados: { [nome: string]: number } = {};
  quantidades: { [nome: string]: number } = {};
  mensagem: { [nome: string]: string } = {};

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {
    this.categorias.forEach(cat => {
      cat.produtos.forEach(p => {
        this.tamanhosSelecionados[p.nome] = 0;
        this.quantidades[p.nome] = 1;
        this.mensagem[p.nome] = '';
      });
    });
  }

  getTotal(produto: any): number {
    const idx = this.tamanhosSelecionados[produto.nome] ?? 0;
    const tamanho = produto.tamanhos[idx];
    if (!tamanho) return 0;
    return tamanho.preco * (this.quantidades[produto.nome] ?? 1);
  }

  incrementar(nome: string) { this.quantidades[nome]++; }
  decrementar(nome: string) { if (this.quantidades[nome] > 1) this.quantidades[nome]--; }

  adicionarAoCarrinho(produto: any): void {
    if (!this.auth.isLogado()) {
      this.router.navigate(['/login']);
      return;
    }

    const idx = this.tamanhosSelecionados[produto.nome] !== undefined
      ? this.tamanhosSelecionados[produto.nome]
      : 0;

    const tamanho = produto.tamanhos[idx];

    if (!tamanho) {
      console.error('Tamanho não encontrado', produto.nome, idx);
      return;
    }

    this.cartService.adicionarItem(tamanho.id, this.quantidades[produto.nome]).subscribe({
      next: () => {
        this.mensagem[produto.nome] = 'Adicionado!';
        setTimeout(() => this.mensagem[produto.nome] = '', 2000);
      },
      error: () => {
        this.mensagem[produto.nome] = 'Erro ao adicionar.';
        setTimeout(() => this.mensagem[produto.nome] = '', 2000);
      }
    });
  }
}