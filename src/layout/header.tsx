import {auth} from "@/src/lib/auth";
import SignOut from "@/src/components/sign-out";
import SignIn from "@/src/components/sign-in";
import {ThemeBtn} from "@/src/components/theme-btn";
import {SidebarTrigger} from "@/src/components/ui/sidebar";

const Header = async () => {
  const session = await auth()
  return (
    <header className="flex items-center justify-between border-b p-4 mb-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className={"cursor-pointer"}/>
        <h1 className="font-bold text-primary text-2xl">AIZUKO</h1>
      </div>
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
