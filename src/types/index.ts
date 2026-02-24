import { StaticImageData } from "next/image";


export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    discount: number;
    image: StaticImageData;
    images?: StaticImageData[];
    category: string;
    tags: string[];
    rating: number;
    reviews: number;
    inStock: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    description?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
    image: string;
    productCount: number;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    image: string;
    author: string;
    authorImage?: string;
    date: string;
    category: string;
    readTime: string;
}

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface Banner {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    bgColor: string;
    link: string;
    badge?: string;
}
