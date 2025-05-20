"use client";

import { resetPassword } from "@/src/actions/auth.action";
import PasswordInput from "@/src/components/password-input";
import { Button } from "@/src/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password must not exceed 72 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type TNewPasswordSchema = z.infer<typeof NewPasswordSchema>;

export default function StepNewPassword({
  username,
  onNext,
  onPrev,
}: {
  username: string;
  onNext: () => void;
  onPrev: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const onSubmit: SubmitHandler<TNewPasswordSchema> = async (data) => {
    const res = await resetPassword(username, data.password);
    if (!res.success) {
      return;
    }
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <div className="grid gap-2">
        <Label htmlFor="password">New Password</Label>
        <PasswordInput
          id="password"
          placeholder="Enter your new password"
          {...register("password")}
        />
        {errors?.password && (
          <p className="text-destructive text-sm">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <PasswordInput
          id="confirmPassword"
          placeholder="Confirm your new password"
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && (
          <p className="text-destructive text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="flex w-full gap-4">
        <Button
          type="button"
          variant={"outline"}
          className="flex-1 cursor-pointer"
          onClick={onPrev}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Next"}
        </Button>
      </div>
    </form>
  );
}
