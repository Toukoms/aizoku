"use client"
import React, {useActionState} from 'react';
import {cn} from "@/src/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Label} from "@/src/components/ui/label";
import {Input} from "@/src/components/ui/input";
import Link from "next/link";
import {Button} from "@/src/components/ui/button";
import PasswordInput from "@/src/components/password-input";
import {signUp} from "@/src/actions/auth.action";
import {useFormStatus} from "react-dom";
import {Loader2} from "lucide-react";

function SingUpForm(
  {
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">) {
  const [state, signUpAction] = useActionState(signUp, {
    username: '',
    password: '',
    secretQuestion: '',
    secretAnswer: '',
    errors: {
      username: '',
      password: '',
      secretQuestion: '',
      secretAnswer: '',
    }
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create your account with unique username and make a secret question and answer so you can change your
            password later if you forget it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signUpAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  defaultValue={state?.username}
                  placeholder="ex: john-doe"
                  required
                />
                {state?.errors.username && (<p className="text-destructive text-sm">{state.errors.username}</p>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput id="password" name="password" defaultValue={state?.password} placeholder={"***"}
                               required/>
                {state?.errors.password && (<p className="text-destructive text-sm">{state.errors.password}</p>)}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Secret Question</Label>
                <Input
                  id="secret-question"
                  name="secretQuestion"
                  type="text"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  defaultValue={state?.secretQuestion}
                  placeholder="ex: What is your best color?"
                  required
                />
                {state?.errors.secretQuestion && (
                  <p className="text-destructive text-sm">{state.errors.secretQuestion}</p>)}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Secret Answer</Label>
                <Input
                  id="secret-answer"
                  name="secretAnswer"
                  type="text"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  defaultValue={state?.secretAnswer}
                  placeholder="ex: Violet"
                  required
                />
                {state?.errors.secretAnswer && (
                  <p className="text-destructive text-sm">{state.errors.secretAnswer}</p>)}
              </div>
              <SubmitButton/>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const SubmitButton = (
  {
    className,
    ...props
  }: React.ComponentProps<typeof Button>) => {
  const {pending} = useFormStatus()
  return (
    <Button
      type="submit"
      className={cn(
        "w-full bg-primary text-primary-foreground hover:bg-primary/80",
        className
      )}
      disabled={pending}
      {...props}
    >
      {
        pending ? (
          <div className="flex items-center justify-center">
            <Loader2 className="size-4 animate-spin"/>
            <span className="ml-2">Submitting...</span>
          </div>
        ) : (
          'Submit'
        )
      }
    </Button>
  )
}

export default SingUpForm;