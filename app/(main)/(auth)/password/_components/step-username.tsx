"use client";

import { checkUserName } from "@/src/actions/auth.action";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { GetByUserNameSchema, TGetByUserNameSchema } from "@/src/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { SubmitHandler, useForm } from "react-hook-form";

export default function StepUserName({onNext}:{onNext: (secretQuestion: string, username: string) => void}) {
  const {register, handleSubmit, formState: {errors, isLoading}, setError} = useForm<TGetByUserNameSchema>({
    resolver: zodResolver(GetByUserNameSchema)
  })

  const onSubmit:SubmitHandler<TGetByUserNameSchema> = async(data)=> {
    const res = await checkUserName(data.username)
    if (!res.errors && res.secretQuestion && res.username) {
      onNext(res.secretQuestion, res.username)
      return;
    }
    setError("username", {
      message: res.errors?.username
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className="w-full flex flex-col gap-6"
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="username"
          required
          {...register("username")}
        />
        {errors?.username && (
          <p className="text-destructive text-sm">{errors.username.message}</p>
        )}
      </div>
      <Button type={"submit"} className="w-full cursor-pointer" disabled={isLoading}>
        {isLoading ? "Checking..." : "Next"}
      </Button>
    </form>
  );
}
