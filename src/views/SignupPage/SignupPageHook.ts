import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignupData, UserSignupSchema } from '@/interface/Data/Data';
import { zodResolver } from "@hookform/resolvers/zod";

import useAuthStore from '@/zustand/auth/useAuthStore';
import { LOG_IN_ROUTE } from '@/configs/path-consts';


const useSignupPageHook = () => {
  const signup = useAuthStore(state => state.signup);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupData>({
    resolver: zodResolver(UserSignupSchema),
  });

  const onSubmit: SubmitHandler<SignupData> = async (data) => {
    try {
      await signup(data);
      navigate(LOG_IN_ROUTE, { replace: true });
    } catch {
      console.error("Signup failed");
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting };
};

export default useSignupPageHook;

