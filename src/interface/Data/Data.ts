import { FieldError, UseFormRegister, Path } from "react-hook-form";
import { z, ZodType } from "zod";
import { ITask } from "@/interface/Components/Tasks/Task";
import i18n from 'i18next';

export type FormData = {
  email: string;
  password: string;
  name: string;
  hometown: string;
  confirmPassword?: string;
};

export type LoginData = Pick<FormData, "email" | "password">;
export type SignupData = FormData;

export type FormFields<T extends LoginData | SignupData | Partial<ITask>> = {
  type: string;
  placeholder: string;
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export const UserLoginSchema: ZodType<LoginData> = z.object({
  email: z.string().email({ message: i18n.t('error.emailInvalid') }), 
  password: z
    .string()
    .min(8, { message: i18n.t('error.passwordTooShort') })
    .max(20, { message: i18n.t('error.passwordTooLong') }),
});

export const UserSignupSchema: ZodType<SignupData> = z
  .object({
    email: z.string().email({ message: i18n.t('error.emailInvalid') }), 
    password: z
      .string()
      .min(8, { message: i18n.t('error.passwordTooShort') })
      .max(20, { message: i18n.t('error.passwordTooLong') }),
    name: z
      .string()
      .min(5, { message: i18n.t('error.nameTooShort') })
      .max(100, { message: i18n.t('error.nameTooLong') }),
    hometown: z
      .string()
      .min(5, { message: i18n.t('error.hometownTooShort') })
      .max(100, { message: i18n.t('error.hometownTooLong') }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: i18n.t('error.passwordsDoNotMatch'), 
    path: ["confirmPassword"],
  });

export const TaskSchema: ZodType<Partial<ITask>> = z.object({
  title: z
    .string()
    .min(1, { message: i18n.t('error.nameRequired') })
    .max(40, { message: i18n.t('error.nameTooLong') }), 
  content: z
    .string()
    .max(100, { message: i18n.t('error.descriptionTooLong') })
});
