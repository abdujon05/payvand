import { create } from 'zustand';
import { toast } from 'sonner';
import { Product } from '@/lib/types';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    selectedProduct: Product | null;

    // Actions
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: string) => Promise<void>;
    createProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    clearError: () => void;
}

const useProductStore = create<ProductState>((set) => ({
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('http://localhost:8000/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            set({ products: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An error occurred' });
            toast.error('Failed to fetch products');
        } finally {
            set({ loading: false });
        }
    },

    fetchProductById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`http://localhost:8000/products/${id}`);
            if (!response.ok) throw new Error('Failed to fetch product');
            const data = await response.json();
            set({ selectedProduct: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An error occurred' });
            toast.error('Failed to fetch product details');
        } finally {
            set({ loading: false });
        }
    },

    createProduct: async (product: Omit<Product, 'id'>) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('http://localhost:8000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) throw new Error('Failed to create product');
            const newProduct = await response.json();

            set((state) => ({
                products: [...state.products, newProduct],
            }));

            toast.success('Product created successfully');
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An error occurred' });
            toast.error('Failed to create product');
        } finally {
            set({ loading: false });
        }
    },

    updateProduct: async (id: string, productData: Partial<Product>) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) throw new Error('Failed to update product');
            const updatedProduct = await response.json();

            set((state) => ({
                products: state.products.map((product) =>
                    product.id === id ? { ...product, ...updatedProduct } : product
                ),
                selectedProduct: updatedProduct,
            }));

            toast.success('Product updated successfully');
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An error occurred' });
            toast.error('Failed to update product');
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete product');

            set((state) => ({
                products: state.products.filter((product) => product.id !== id),
                selectedProduct: null,
            }));

            toast.success('Product deleted successfully');
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An error occurred' });
            toast.error('Failed to delete product');
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: null }),
}));

export default useProductStore;