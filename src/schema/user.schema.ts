import * as z from "zod";

export const UserSchema = z.object({
  username: z.string().min(3).max(47),
  password: z.string().min(8).max(56),
});

export type TUser = z.infer<typeof UserSchema>;
