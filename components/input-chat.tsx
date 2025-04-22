"use client"

import React from 'react';
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {CornerDownLeft, Paperclip} from "lucide-react";
import {useChatStore} from "@/store/chat.store";
import {usePathname, useRouter} from "next/navigation";
import {sendMessageOrCreateChat} from "@/actions/chat.action";
import {cn} from "@/src/lib/utils";

const InputChat = () => {
  const message = useChatStore((state) => state.message)
  const setMessage = useChatStore((state) => state.setMessage)
  const sendMessage = useChatStore((state) => state.sendMessage)
  const router = useRouter()
  const pathname = usePathname()

  const chatIdFromUrl = pathname.startsWith('/chat/')
    ? pathname.split('/chat/')[1]
    : undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.length === 0) {
      throw new Error("Message can't be empty")
    }

    const {chatId} = await sendMessageOrCreateChat({
      chatId: chatIdFromUrl,
      content: message,
    })

    if (!chatIdFromUrl) {
      router.push(`/chat/${chatId}`)
    }

    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className={cn("mx-auto", {
      "w-5/6": !chatIdFromUrl,
      "w-full": chatIdFromUrl,
    })}>
      <Textarea name="message" placeholder={"Ask something"} className={"resize-none h-20"} value={message}
                onChange={(e) => setMessage(e.target.value)}/>
      <div className={"flex items-center justify-between py-4 px-2"}>
        <Button type={"button"} variant={"ghost"}><Paperclip/></Button>
        <Button type={"submit"} disabled={message.length === 0}>Send Message <CornerDownLeft/> </Button>
      </div>
    </form>
  );
};

export default InputChat;
