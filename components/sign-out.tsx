import {signOut} from "@/src/lib/auth"

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Logout</button>
    </form>
  )
}