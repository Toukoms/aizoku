import React from 'react';
import {LoginForm} from "@/app/(auth)/auth/_components/forms/login.form";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/src/components/ui/tabs";
import SingUpForm from "@/app/(auth)/auth/_components/forms/sing-up.form";

const AuthPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm/>
          </TabsContent>
          <TabsContent value="signup">
            <SingUpForm/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
};

export default AuthPage;
