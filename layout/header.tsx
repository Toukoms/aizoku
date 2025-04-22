import {auth} from "@/src/lib/auth";
import SignOut from "@/components/sign-out";
import SignIn from "@/components/sign-in";
import {ThemeBtn} from "@/components/theme-btn";
import {SidebarTrigger} from "@/components/ui/sidebar";

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
