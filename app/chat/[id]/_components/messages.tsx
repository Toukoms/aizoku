"use client"
import React from 'react';
import {useChatStore} from "@/store/chat.store";
import Message from "@/components/message";
import {TriangleAlert} from "lucide-react";
import type {Message as MessageModel} from "@/src/generated/prisma/client"

const Messages = ({messages}: { messages: MessageModel[] }) => {
  const error = useChatStore((state) => state.error)
  const loading = useChatStore((state) => state.loading)
  return (
    <div className={"flex flex-col gap-2 py-4"}>
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
