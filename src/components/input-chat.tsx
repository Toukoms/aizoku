"use client"

import React, {useEffect} from 'react';
import {Textarea} from "@/src/components/ui/textarea";
import {Button} from "@/src/components/ui/button";
import {CornerDownLeft, Paperclip} from "lucide-react";
import {useChatStore} from "@/src/store/chat.store";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/src/lib/utils";
import {createChat} from "@/src/actions/chat.action";
import {useAuthStore} from "@/src/store/auth.store";

const InputChat = ({className}: { className?: string }) => {
  const message = useChatStore((state) => state.message)
  const newSending = useChatStore((state) => state.newSending)
  const setMessage = useChatStore((state) => state.setMessage)
  const setNewSending = useChatStore((state) => state.setNewSending)
  const getChatHistory = useChatStore((state) => state.getChatHistory)
  const router = useRouter()
  const pathname = usePathname()
  const loading = useAuthStore((state) => state.isLoading)
  const user = useAuthStore((state) => state.user)
  const getUser = useAuthStore((state) => state.getUser)
  const model = useChatStore((state) => state.model)

  useEffect(() => {
    getUser()
  }, [getUser]);

  if (loading || !user) {
    return null
  }

  const chatIdFromUrl = pathname.startsWith('/chat/')
    ? pathname.split('/chat/')[1]
    : undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.length === 0) {
      throw new Error("Message can't be empty")
    }
    if (!chatIdFromUrl) {
      const chat = await createChat(user.id, model)
      const chatId = chat.id;
      if (chatId) {
        getChatHistory()
        router.push(`/chat/${chatId}`)
        setNewSending(true)
      }
    } else {
      setNewSending(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("mx-auto max-w-5xl bg-muted", {
      "w-5/6": !chatIdFromUrl,
      "w-full": chatIdFromUrl,
    }, className)}>
      <Textarea name="message" placeholder={"Ask something"} className={"resize-none h-20 bg-accent"} value={message}
                onChange={(e) => setMessage(e.target.value)} disabled={newSending}/>
      <div className={"flex items-center justify-between pt-2 px-2"}>
        <Button type={"button"} variant={"ghost"} disabled={message.length === 0 || newSending}><Paperclip/></Button>
        <Button type={"submit"} disabled={message.length === 0 || newSending}>Send Message <CornerDownLeft/> </Button>
      </div>
    </form>
  );
};

export default InputChat;
