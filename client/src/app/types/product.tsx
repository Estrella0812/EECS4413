export interface ProductResult{
    content: Product[],
    page: Page
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  mainImageUrl: string;

  description?: string;
  category?: string;
  brand?: string;
  images?: Image[];
}

export interface Image{
    id: number;
    isMain: boolean;
    url: string;
    altText: string;
    product: Product;
}

export interface Page{
    size?: number,
    number: number,
    totalElements?: number,
    totalPages?: number,
}
