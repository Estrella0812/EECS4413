import { Product } from "./product";

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}