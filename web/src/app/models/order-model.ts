import { Product } from './product-model';

export interface OrderUser {
    id: number;
    nome: string;
    email: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    product: Product;
    quantidade: number;
    precoUnitario: number;
}

export interface Order {
    id: number;
    userId: number;
    user?: OrderUser;
    status: string;
    criadoEm: string;
    total: number;
    endereco: string;
    formaPagamento: string;
    items: OrderItem[];
}