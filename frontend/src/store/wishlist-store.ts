import { Product } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const useWishlist = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) =>
                set((state) => ({
                    items: [...state.items, product],
                })),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),
            isInWishlist: (productId) =>
                get().items.some((item) => item.id === productId),
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: "wishlist-storage",
        }
    )
);

export default useWishlist;