import SignOut from "@/src/components/sign-out";
import SignIn from "@/src/components/sign-in";
import {ThemeBtn} from "@/src/components/theme-btn";
import {SidebarTrigger} from "@/src/components/ui/sidebar";

const Header = async () => {
  const data = "Login"
  return (
    <header className="flex items-center justify-between border-b p-4 z-50 bg-muted">
      <div className="flex items-center gap-2">
        <SidebarTrigger className={"cursor-pointer"}/>
        <h1 className="font-bold text-primary text-2xl">AIZUKO</h1>
      </div>
      <nav className="flex items-center gap-4">
        {
          data
            ? <SignOut/>
            : <SignIn/>
        }
        <ThemeBtn/>
      </nav>
    </header>
  );
};

export default Header;
