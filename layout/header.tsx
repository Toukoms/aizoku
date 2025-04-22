import {auth} from "@/src/lib/auth";
import SignOut from "@/components/sign-out";
import SignIn from "@/components/sign-in";
import {ThemeBtn} from "@/components/theme-btn";

const Header = async () => {
  const session = await auth()
  return (
    <header className="flex items-center justify-between border-b py-4 px-2 mb-4">
      <h1 className="font-bold text-primary text-xl">CSS-AI</h1>
      <nav className="flex items-center gap-4">
        {
          session?.user
            ? <SignOut/>
            : <SignIn/>
        }
        <ThemeBtn/>
      </nav>
    </header>
  );
};

export default Header;
