import {create} from "zustand";
import {User} from "@/src/generated/prisma/client"
import {getUserSession, logout as logoutAction} from "@/src/actions/auth.action";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  getUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  getUser: async () => {
    try {
      set({isLoading: true, error: null});
      const user = await getUserSession();
      if (!user) throw new Error('Failed to get user');
      set({user});
    } catch (error) {
      set({error: (error as Error).message});
    } finally {
      set({isLoading: false});
    }
  },

  logout: async () => {
    try {
      set({isLoading: true, error: null});
      set({user: null});
      await logoutAction();
    } catch (error) {
      set({error: (error as Error).message});
    } finally {
      set({isLoading: false});
    }
  }
}));