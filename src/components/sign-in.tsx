import {signIn} from "@/src/lib/auth"
import {Button} from "@/src/components/ui/button";
import {Github} from "lucide-react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <Button type="submit">
        <Github/>
        Sign-in
      </Button>
    </form>
  )
}