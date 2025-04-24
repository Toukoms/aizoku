import {ThemeBtn} from "@/src/components/theme-btn";
import {SidebarTrigger} from "@/src/components/ui/sidebar";
import NewChat from "@/src/components/new-chat";

const Header = async () => {
  return (
    <header className="flex items-center justify-between border-b p-4 z-50 bg-muted">
      <div className="flex items-center gap-2">
        <SidebarTrigger className={"cursor-pointer"}/>
        <h1 className="font-bold text-primary text-2xl">AIZUKO</h1>
      </div>
      <nav className="flex items-center gap-4">
        <NewChat/>
        <ThemeBtn/>
      </nav>
    </header>
  );
};

export default Header;
