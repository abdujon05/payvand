import { clsx, type ClassValue } from 'clsx';
import { format } from "date-fns";
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  const formattedPrice = new Intl.NumberFormat('kk-KZ', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return `${formattedPrice} 〒`;
}
interface Product {
  id: string;
  name: string;
  price: number;
}

interface Order {
  id: string;
  quantity: number;
  total_price: number;
  created_at: string;
  product: Product;
}

export const downloadOrdersAsCsv = (orders: Order[]) => {
  const headers = ["Order ID", "Product", "Quantity", "Price per Unit", "Total", "Date"];

  const rows = orders.map(order => [
    `#${order.id.slice(-5)}`,
    order.product.name,
    order.quantity.toString(),
    formatPrice(order.product.price),
    formatPrice(order.total_price),
    format(new Date(order.created_at), 'MMM d, yyyy')
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `orders-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
