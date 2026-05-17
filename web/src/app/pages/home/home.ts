import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule
  ],
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
            { label: '120g', porcoes: '1 porção', preco: 9.00 },
            { label: '500g', porcoes: '4 porções', preco: 32.00 },
            { label: '1kg', porcoes: '8 porções', preco: 60.00 }
          ]
        }
      ]
    },
    {
      nome: 'ESPECIAIS',
      produtos: [
        {
          nome: 'Pudim de Café',
          descricao: 'Pudim feito com café premium, prefeito para os amantes de um sabor mais intenso.',
          imagem: '/imagens/cafe-pudim.jpeg',
          tamanhos: [
            {label: '120g', porcoes: '1 porção', preco: '10.00'},
            {label: '500g', porcoes: '6 porção', preco: '38.00'},
            {label: '1kg', porcoes: '12 porção', preco: '72.00'}
          ]
        },
        {
          nome: 'Pudim de Doce de Leite',
          descricao: 'Pudim suave com doce de leite artesanal, uma combinação que derrete na boca.',
          imagem: '/imagens/doce-de-leite-pudim.jpeg',
          tamanhos: [
            {label: '120g', porcoes: '1 porção', preco: '10.00'},
            {label: '500g', porcoes: '6 porção', preco: '38.00'},
            {label: '1kg', porcoes: '12 porção', preco: '72.00'}
          ]
        },
        {
          nome: 'Pudim de Ovomaltine',
          descricao: 'Pudim cremoso com Ovomlatine, equilibrando o sabor de chocolate e malte de forma única.',
          imagem: '/imagens/ovomaltine-pudim.jpeg',
          tamanhos: [
            {label: '120g', porcoes: '1 porção', preco: '10.00'},
            {label: '500g', porcoes: '6 porção', preco: '38.00'},
            {label: '1kg', porcoes: '12 porção', preco: '72.00'}
          ]
        },
        {
          nome: 'Pudim Zero Lactose',
          descricao: 'Todo o sabor do pudim tradicional sem lactose, para você aproveitar sem restrições.',
          imagem: '/imagens/zero-lactose-pudim.jpeg',
          tamanhos: [
            {label: '120g', porcoes: '1 porção', preco: '10.00'},
            {label: '500g', porcoes: '6 porção', preco: '38.00'},
            {label: '1kg', porcoes: '12 porção', preco: '72.00'}
          ]
        },
        {
          nome: 'Pudim de Chocolate',
          descricao: 'Todo o sabor do pudim tradicional sem lactose, para você aproveitar sem restrições.',
          imagem: '/imagens/chocolate-pudim.jpeg',
          tamanhos: [
            {label: '120g', porcoes: '1 porção', preco: '10.00'},
            {label: '500g', porcoes: '6 porção', preco: '38.00'},
            {label: '1kg', porcoes: '12 porção', preco: '72.00'}
          ]
        }
      ]
    },
    {
      nome: 'PREMIUM',
      produtos: [
        {
          nome: 'Pudim de Ninho com Ganache de Nutella',
          descricao: 'Pudim de leite ninho com generosa camada de ganache de Nutella.. Sofisticação em cada colherada',
          imagem: '/imagens/ninho-com-nutella-pudim.jpeg',
          tamanhos: [
            {label: '120g', porcoes: '1 porção', preco: '12.00'},
            {label: '500g', porcoes: '6 porção', preco: '40.00'},
            {label: '1kg', porcoes: '12 porção', preco: '77.00'}
          ]
        },
        {
          nome: 'Pudim de Coco com Cocada Cremosa',
          descricao: 'Pudim de coco com cobertura de cocada cremosa artesanal, um sabor tropical inconfundível.',
          imagem: '/imagens/coco-com-cocada-cremosa-pudim.jpeg',
          tamanhos: [
            {label: '120g', porcoes: '1 porção', preco: '12.00'},
            {label: '500g', porcoes: '6 porção', preco: '40.00'},
            {label: '1kg', porcoes: '12 porção', preco: '77.00'}
          ]
        },
        {
          nome: 'Pudim de Chocolate Branco com Geleia de Morango',
          descricao: 'Pudim de chocolate branco com geleia de morango artesanal, uma combinação delicada e irresistível.',
          imagem: '/imagens/chocolate-branco-com-calda-pudim.jpeg',
          tamanhos: [
            {label: '120g', porcoes: '1 porção', preco: '12.00'},
            {label: '500g', porcoes: '6 porção', preco: '40.00'},
            {label: '1kg', porcoes: '12 porção', preco: '77.00'}
          ]
        }
      ]
    }
  ];

  tamanhosSelecionados: {[nome: string]: number} = {};
  quantidades: {[nome: string]: number} = {};

  constructor() {
    this.categorias.forEach(cat => {
      cat.produtos.forEach(p => {
        this.tamanhosSelecionados[p.nome] = 0;
        this.quantidades[p.nome] = 1;
      });
    });
  }

  getTotal(produto: any): number {
    const idx = this.tamanhosSelecionados[produto.nome] ?? 0;
    const tamanho = produto.tamanhos[idx];

    if(!tamanho)
      return 0;

    return tamanho.preco * (this.quantidades[produto.nome] ?? 1);
  }

  incrementar(nome: string) {this.quantidades[nome]++;}
  decrementar(nome: string) {if(this.quantidades[nome] > 1) this.quantidades[nome]--;}
}
