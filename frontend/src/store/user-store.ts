import { create } from 'zustand';
import { toast } from 'sonner';
import { User } from '@/lib/types';

interface UserState {
    users: User[];
    user: User | null;
    loading: boolean;
    error: string | null;

    fetchAllUsers: () => Promise<void>;
    deleteUser: (email: string) => Promise<void>;

    fetchUser: (id: string) => Promise<void>;
    updateProfile: (id: string, data: Partial<User>) => Promise<void>;
    updatePassword: (id: number, currentPassword: string, newPassword: string) => Promise<void>;
    clearError: () => void;
}

const useUserStore = create<UserState>((set) => ({
    users: [],
    user: null,
    loading: false,
    error: null,

    fetchUser: async (id: string) => {
        set({ loading: true });
        try {
            const response = await fetch(`http://localhost:8000/users/${id}`);

            if (!response.ok) throw new Error('Failed to fetch user');
            const data = await response.json();
            set({ user: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch user' });
            toast.error('Failed to fetch user data');
        } finally {
            set({ loading: false });
        }
    },

    updateProfile: async (id: string, data: Partial<User>) => {
        set({ loading: true });
        try {
            const response = await fetch(`http://localhost:8000/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Failed to update profile');
            const updatedUser = await response.json();
            set({ user: updatedUser });
            toast.success('Profile updated successfully');
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to update profile' });
            toast.error('Failed to update profile');
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    fetchAllUsers: async () => {
        set({ loading: true });
        try {
            const response = await fetch('http://localhost:8000/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            set({ users: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch users' });
            toast.error('Failed to fetch users');
        } finally {
            set({ loading: false });
        }
    },

    deleteUser: async (email: string) => {
        set({ loading: true });
        try {
            const response = await fetch(`http://localhost:8000/users/${email}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete user');

            set((state) => ({
                users: state.users.filter(user => user.email !== email)
            }));

            toast.success('User deleted successfully');
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to delete user' });
            toast.error('Failed to delete user');
        } finally {
            set({ loading: false });
        }
    },

    updatePassword: async (id: number, currentPassword: string, newPassword: string) => {
        set({ loading: true });
        try {
            const response = await fetch(`http://localhost:8000/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            if (!response.ok) throw new Error('Failed to update password');
            toast.success('Password updated successfully');
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to update password' });
            toast.error('Failed to update password');
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    clearError: () => set({ error: null })
}));

export default useUserStore;