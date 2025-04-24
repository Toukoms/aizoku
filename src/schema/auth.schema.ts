import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const SignUpSchema = z.object({
  username: z.string().min(3).max(47),
  password: z.string().min(8).max(56),
  secretQuestion: z.string().min(12).max(72),
  secretAnswer: z.string().min(3).max(72),
})

