import React from 'react';
import {cn} from "@/src/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Label} from "@/src/components/ui/label";
import {Input} from "@/src/components/ui/input";
import Link from "next/link";
import {Button} from "@/src/components/ui/button";

function SingUpForm(
  {
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">) {
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="ex: john-doe"
                  required
                />
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
                <Input id="password" type="password" placeholder={"***"} required/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Secret Question</Label>
                <Input
                  id="secret-question"
                  type="text"
                  placeholder="ex: What is your best color?"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Secret Answer</Label>
                <Input
                  id="secret-answer"
                  type="text"
                  placeholder="ex: Violet"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingUpForm;