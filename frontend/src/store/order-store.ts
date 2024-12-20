import { create } from 'zustand';
import { toast } from 'sonner';
import { Product, User } from '@/lib/types';

interface OrderCreate {
    user_id: string;
    product_id: string;
    quantity: number;
}

interface Order {
    id: string;
    quantity: number;
    total_price: number;
    created_at: string;
    product: Product;
    user?: User;
}

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;

    fetchAllOrders: () => Promise<void>;
    fetchUserOrders: (userId: string) => Promise<void>;
    downloadOrder: (orderId: string) => Promise<void>;
    createOrder: (order: OrderCreate) => Promise<void>;
}

const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    loading: false,
    error: null,

    fetchAllOrders: async () => {
        set({ loading: true });
        try {
            const response = await fetch('http://localhost:8000/orders');
            if (!response.ok) throw new Error('Failed to fetch orders');
            const data = await response.json();
            set({ orders: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch orders' });
            toast.error('Failed to load orders');
        } finally {
            set({ loading: false });
        }
    },
    fetchUserOrders: async (userId: string) => {
        set({ loading: true });
        try {
            const response = await fetch(`http://localhost:8000/orders/${userId}/orders`);
            if (!response.ok) throw new Error('Failed to fetch orders');
            const data = await response.json();
            set({ orders: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch orders' });
            console.error('Failed to load order history');
        } finally {
            set({ loading: false });
        }
    },

    downloadOrder: async (orderId: string) => {
        try {
            const response = await fetch(`http://localhost:8000/orders/${orderId}/download`)
            if (!response.ok) throw new Error('Failed to download order');

            // Handle PDF/document download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `order-${orderId}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            toast.success('Order downloaded successfully');
        } catch (error) {
            console.error(error);
            console.error('Failed to download order');
        }
    },

    createOrder: async (orderData: OrderCreate) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('http://localhost:8000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })

            if (!response.ok) throw new Error('Failed to create order');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to place order';
            set({ error: message });
            toast.error(message);
            throw error;
        } finally {
            set({ loading: false });
        }
    },
}));

export default useOrderStore;