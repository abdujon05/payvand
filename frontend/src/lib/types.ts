export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  address: string | null;
  role: 'admin' | 'manager' | 'user';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}