import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginData, UserLoginSchema } from '@/interface/Data/Data';
import { zodResolver } from "@hookform/resolvers/zod";

import useAuthStore from '@/zustand/auth/useAuthStore';
import { HOME_ROUTE } from '@/configs/path-consts';
import useActiveItemStore from '@/zustand/activeItem/useActiveItemStore';

const useLoginPage = () => {
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
    resolver: zodResolver(UserLoginSchema),
  });

  const { activeItem } = useActiveItemStore();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await login(data);
      const redirectUrl = activeItem?.url || HOME_ROUTE;
      navigate(redirectUrl, { replace: true });
    } catch {
      console.error("Login failed");
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
};

export default useLoginPage;
