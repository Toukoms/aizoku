import {auth} from "@/src/lib/auth";
import SignOut from "@/components/sign-out";
import SignIn from "@/components/sign-in";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>
        {session?.user ? `Hello ${session?.user.name}` : "Hello World"}
      </h1>
      <div>
        {
          session?.user
            ? <SignOut/>
            : <SignIn/>
        }
      </div>
    </div>
  );
}
