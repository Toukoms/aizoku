"use client";

import { checkSecretAnswer } from "@/src/actions/auth.action";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const SecretAnswerSchema = z.object({
  secretAnswer: z
    .string()
    .min(3, "Answer must be at least 3 characters long")
    .max(72, "Answer must not exceed 72 characters"),
});

type TSecretAnswerSchema = z.infer<typeof SecretAnswerSchema>;

export default function StepSecretQuestion({
  username,
  secretQuestion,
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
  secretQuestion: string;
  username: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSecretAnswerSchema>({
    resolver: zodResolver(SecretAnswerSchema),
  });

  const onSubmit: SubmitHandler<TSecretAnswerSchema> = async (data) => {
    // Here you would typically validate the secret answer against the stored answer
    // For this example, we'll just simulate a successful validation
    const res = await checkSecretAnswer(username, data.secretAnswer);

    if (res.success) {
      onNext();
    } else {
      setError("secretAnswer", {
        type: "manual",
        message: "Incorrect answer. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <h3 className="text-accent-foreground text-3xl font-semibold">
        {secretQuestion}
      </h3>
      <div className="grid gap-2">
        <Label htmlFor="secretAnswer">Your Answer</Label>
        <Input
          id="secretAnswer"
          type="text"
          placeholder="Enter your answer"
          {...register("secretAnswer")}
        />
        {errors?.secretAnswer && (
          <p className="text-destructive text-sm">
            {errors.secretAnswer.message}
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
          {isSubmitting ? "Verifying..." : "Next"}
        </Button>
      </div>
    </form>
  );
}
