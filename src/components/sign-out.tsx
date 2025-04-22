import {signOut} from "@/src/lib/auth"
import {Button} from "@/src/components/ui/button";
import {LogOutIcon} from "lucide-react";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button variant="secondary" type="submit">
        <LogOutIcon/>
        Logout
      </Button>
    </form>
  )
}