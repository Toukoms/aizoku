import { LoginForm } from "@/app/(main)/(auth)/auth/_components/forms/login.form";
import SingUpForm from "@/app/(main)/(auth)/auth/_components/forms/sing-up.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

const AuthPage = () => {
  return (
    <div className="flex flex-col gap-8 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">Welcome to our platform! 👋</p>
        <p className="text-lg md:text-xl text-muted-foreground">Please sign in to get started</p>
      </div>
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
