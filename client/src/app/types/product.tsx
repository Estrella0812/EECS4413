export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    brand: string;
    images: Image[];
    mainImageUrl: string;
}

export interface Image{
    id: number;
    isMain: boolean;
    url: string;
    altText: string;
    product: Product;
}