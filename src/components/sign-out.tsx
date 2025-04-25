"use client"
import {LogOutIcon} from "lucide-react";
import {useAuthStore} from "@/src/store/auth.store";

export default function SignOut() {
  const logout = useAuthStore((state) => state.logout)
  return (
    <button type={"button"} onClick={(e) => {
      e.preventDefault()
      logout()
    }} className={"w-full flex items-center gap-2 cursor-pointer"}>
      <LogOutIcon/>
      Logout
    </button>
  )
}