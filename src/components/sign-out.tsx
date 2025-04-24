import {Button} from "@/src/components/ui/button";
import {LogOutIcon} from "lucide-react";

export default function SignOut() {
  return (
    <form>
      <Button variant="secondary" type="submit">
        <LogOutIcon/>
        Logout
      </Button>
    </form>
  )
}