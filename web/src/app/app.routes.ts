import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { vendedorGuard } from './guards/vendedor-guard';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    {path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login)},
    {path: 'cadastro', loadComponent: () => import('./pages/cadastro/cadastro').then(m => m.Cadastro)},
    {path: 'carrinho', loadComponent: () => import('./pages/carrinho/carrinho').then(m => m.Carrinho), canActivate: [authGuard]},
    {path: 'checkout', loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout), canActivate: [authGuard]},
    {path: 'meus-pedidos', loadComponent: () => import('./pages/meus-pedidos/meus-pedidos').then(m => m.MeusPedidos), canActivate: [authGuard]},
    {path: 'pedido/:id', loadComponent: () => import('./pages/detalhe-pedido/detalhe-pedido').then(m => m.DetalhePedido), canActivate: [authGuard]},
    {path: 'vendedor', canActivate: [vendedorGuard], children: [
        {path: 'dashboard', loadComponent: () => import('./pages/vendedor/dashboard/dashboard').then(m => m.Dashboard)},
        {path: 'produtos', loadComponent: () => import('./pages/vendedor/produtos/produtos').then(m => m.Produtos)},
        {path: 'pedidos', loadComponent: () => import('./pages/vendedor/pedidos/pedidos').then(m => m.Pedidos)},
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]},
    {path: '**', redirectTo: ''}
];
