"use client"
import React, {useEffect} from 'react';
import {useChatStore} from "@/src/store/chat.store";
import Message from "@/src/components/message";
import {TriangleAlert} from "lucide-react";
import {toast} from "sonner";

const Messages = ({chatId}: { chatId: string }) => {
  const error = useChatStore((state) => state.error)
  const loading = useChatStore((state) => state.loading)
  const messages = useChatStore((state) => state.messages)
  const setChatId = useChatStore((state) => state.setChatId)

  if (error) {
    toast.error(error)
  }

  useEffect(() => {
    setChatId(chatId)
    console.log(chatId)
  }, [])

  return (
    <div className={"flex flex-col gap-2 py-4 overflow-y-auto justify-end"}>
      {messages.map((message, index) => (
        <Message key={index} role={message.role as "user" | "assistant"} content={message.content}/>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p className={"text-sm text-destructive flex items-center gap-1 max-w-3/4"}><TriangleAlert
          size={12}/> {error}</p>}
    </div>
  );
};

export default Messages;
