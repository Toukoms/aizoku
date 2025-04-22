"use client"
import React from 'react';
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {CornerDownLeft, Paperclip} from "lucide-react";
import {useChatStore} from "@/store/chat.store";

const InputChat = () => {
  const message = useChatStore((state) => state.message)
  const setMessage = useChatStore((state) => state.setMessage)
  const sendMessage = useChatStore((state) => state.sendMessage)

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await sendMessage()
    }} className={"w-5/6 mx-auto"}>
      <Textarea name="message" placeholder={"Ask something"} className={"resize-none h-20"} value={message}
                onChange={(e) => setMessage(e.target.value)}/>
      <div className={"flex items-center justify-between py-4 px-2"}>
        <Button variant={"ghost"}><Paperclip/></Button>
        <Button type={"submit"} disabled={message.length === 0}>Send Message <CornerDownLeft/> </Button>
      </div>
    </form>
  );
};

export default InputChat;
