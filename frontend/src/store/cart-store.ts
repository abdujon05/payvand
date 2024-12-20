import { CartItem } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (item) =>
                set((state) => {
                    const existingItem = state.cart.find((i) => i.id === item.id);
                    if (existingItem) {
                        return {
                            cart: state.cart.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        };
                    }
                    return { cart: [...state.cart, item] };
                }),
            removeFromCart: (productId) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== productId),
                })),
            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                })),
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: 'cart-store',
        }
    )
);
