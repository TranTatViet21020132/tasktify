import { LoginData, SignupData } from "@/interface/Data/Data";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { toast } from "sonner";
import { AuthError, IAuthState } from "@/interface/Zustand/Auth/Auth";
import { EXPIRED_AT_INTERVAL, EXPIRED_SHORT_AT_INTERVAL } from "@/configs/helper";
import { t } from "i18next";

const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userData: null,
      expiredAt: new Date(Date.now() + EXPIRED_AT_INTERVAL),
      expiredShortAt: new Date(Date.now() + EXPIRED_SHORT_AT_INTERVAL),

      signup: async (data: SignupData) => {
        set({
          isAuthenticated: true,
          userData: data,
        });
        toast.success(t('toast.signup.success'));
      },

      login: async (data: LoginData) => {
        try {
          const user = get().userData;

          if (!user || user.email !== data.email) {
            toast.error('User not found');
            throw {
              type: 'INVALID_CREDENTIALS',
              message: 'User not found',
            } as AuthError;
          }

          if (user.password !== data.password) {
            toast.error('Invalid password');
            throw {
              type: 'INVALID_CREDENTIALS',
              message: 'Invalid password',
            } as AuthError;
          }

          toast.success(t('toast.login.success'));

          set({
            isAuthenticated: true,
            expiredAt: new Date(Date.now() + EXPIRED_AT_INTERVAL),
            expiredShortAt: new Date(Date.now() + EXPIRED_SHORT_AT_INTERVAL),
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({ isAuthenticated: false, expiredAt: null, expiredShortAt: null });
        toast.success(t('toast.logout.success'));
      },

      checkExpiration: () => {
        const now = new Date();
        const { expiredAt, expiredShortAt } = get();
        
        const expiredAtDate = expiredAt ? new Date(expiredAt) : null;
        const expiredShortAtDate = expiredShortAt ? new Date(expiredShortAt) : null;
      
        if (expiredAtDate && now >= expiredAtDate) {
          set({
            isAuthenticated: false,
            expiredAt: null,
            expiredShortAt: null,
          });
          toast.info(t('toast.session.expired'));
        } else if (expiredShortAtDate && now >= expiredShortAtDate) {
          set({
            expiredShortAt: new Date(Date.now() + EXPIRED_SHORT_AT_INTERVAL),
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userData: state.userData,
        expiredAt: state.expiredAt,
        expiredShortAt: state.expiredShortAt,
      }),
    }
  )
);

export default useAuthStore;
