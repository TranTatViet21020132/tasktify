import { LoginData, SignupData } from "@/interface/Data/Data";
import { FormData } from "@/interface/Data/Data";

export type AuthError = {
  type: 'USER_EXISTS' | 'INVALID_CREDENTIALS' | 'UNKNOWN';
  message: string;
};

export interface IAuthState {
  isAuthenticated: boolean;
  userData: FormData | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  expiredAt: Date | null;
  expiredShortAt: Date | null;
  checkExpiration: () => void;
}
