"use client"
import {cn} from "@/src/lib/utils"
import {Button} from "@/src/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/src/components/ui/card"
import {Input} from "@/src/components/ui/input"
import {Label} from "@/src/components/ui/label"
import Link from "next/link";
import PasswordInput from "@/src/components/password-input";
import {useActionState} from "react";
import {login} from "@/src/actions/auth.action";
import {Loader2} from "lucide-react";

export function LoginForm(
  {
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">) {
  const [state, loginAction, isLoading] = useActionState(login, {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
    }
  })
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  defaultValue={state?.username}
                  placeholder="username"
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
                <PasswordInput id="password" name="password" placeholder={"***"} defaultValue={state.password}
                               required/>
                {state?.errors.password && (<p className="text-destructive text-sm">{state.errors.password}</p>)}
              </div>
              <Button type="submit" className="w-full">
                {
                  isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="size-4 animate-spin"/>
                        <span className="ml-2">Checking...</span>
                      </div>
                    ) :
                    "Login"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
