import { Product } from './product-model';

export interface CartItem {
    id: number;
    productId: number;
    product: Product;
    quantidade: number;
}

export interface Cart {
    id: number;
    items: CartItem[];
}