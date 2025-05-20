import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type TLoginSchema = z.infer<typeof LoginSchema>

export const SignUpSchema = z.object({
  username: z.string().min(3).max(47),
  password: z.string().min(8).max(56),
  secretQuestion: z.string().min(12).max(72),
  secretAnswer: z.string().min(3).max(72),
})

export type TSignUpSchema = z.infer<typeof SignUpSchema>

export const GetByUserNameSchema = z.object({
  username: z.string().min(3).max(47),
})

export type TGetByUserNameSchema = z.infer<typeof GetByUserNameSchema>

export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(8).max(56),
  confirmNewPassword: z.string().min(8).max(56),
})

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>

