import { Product } from './product-model';

export interface OrderItem {
    id: number;
    productId: number;
    product: Product;
    quantidade: number;
    precoUnitario: number;
}

export interface Order {
    id: number;
    status: string;
    criadoEm: string;
    total: number;
    endereco: string;
    formaPagamento: string;
    items: OrderItem[];
}