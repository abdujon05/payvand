import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    token: string | null;
    user_id: string | null;
    role: string | null;

    // Auth methods
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    clearError: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            isLoading: false,
            error: null,
            token: null,
            user_id: null,
            role: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const formData = new URLSearchParams();
                    formData.append('username', email);
                    formData.append('password', password);

                    const response = await fetch('http://localhost:8000/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData,
                        credentials: 'include',
                    });

                    if (!response.ok) {
                        throw new Error('Invalid credentials');
                    }

                    const data = await response.json();

                    set({
                        isAuthenticated: true,
                        token: data.access_token,
                        user_id: data.user.id,
                        role: data.user.role,
                        error: null,
                    });
                } catch (error) {
                    set({
                        isAuthenticated: false,
                        token: null,
                        user_id: null,
                        role: null,
                        error: error instanceof Error ? error.message : 'Login failed',
                    });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            signup: async (email: string, password: string, name: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch('http://localhost:8000/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password, name, role: 'user' }),
                    });

                    if (!response.ok) {
                        const data = await response.json();
                        throw new Error(data.detail || 'Signup failed');
                    }
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Signup failed' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await fetch('http://localhost:8000/auth/logout', {
                        method: 'POST',
                        credentials: 'include',
                    });

                    set({
                        isAuthenticated: false,
                        token: null,
                        error: null,
                        user_id: null,
                        role: null,
                    });

                    toast.success('Logged out successfully');
                } catch (error) {
                    console.error(error);
                    toast.error('Logout failed');
                } finally {
                    set({ isLoading: false });
                }
            },

            forgotPassword: async (email: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch('http://localhost:8000/auth/forgot-password', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to process request');
                    }

                    toast.success('Password reset instructions sent to your email');
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Request failed' });
                    toast.error('Failed to send reset instructions');
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                token: state.token,
                user_id: state.user_id,
                role: state.role
            }),
        }
    )
)

export default useAuthStore;