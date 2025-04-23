"use client"
import React, {useEffect, useRef} from 'react';
import {useChatStore} from "@/src/store/chat.store";
import Message from "@/src/components/message";
import {TriangleAlert} from "lucide-react";
import {toast} from "sonner";
import {useTheme} from "next-themes";
import {PuffLoader} from "react-spinners";

const Messages = ({chatId}: { chatId: string }) => {
  const error = useChatStore((state) => state.error)
  const loading = useChatStore((state) => state.loading)
  const messages = useChatStore((state) => state.messages)
  const setChatId = useChatStore((state) => state.setChatId)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };
  const {theme} = useTheme()

  useEffect(() => {
    if (error) {
      toast.error(error)
      useChatStore.setState({error: null})
    }
  }, [error])

  useEffect(() => {
    setChatId(chatId)
    scrollToBottom()
  }, [chatId, setChatId])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className={"max-w-5xl w-full mx-auto py-4 h-full space-y-1"}>
      <div className={"flex flex-col space-y-4"}>
        <div className={"flex-grow"}/>
        {messages.map((message, index) => (
          <Message key={index} role={message.role as "user" | "assistant"} content={message.content}/>
        ))}
        <div ref={messagesEndRef}/>
      </div>
      {loading && <PuffLoader color={theme === "light" ? "black" : "white"} size={16}/>}
      {error && <p className={"text-sm text-destructive flex items-center gap-1 max-w-3/4"}><TriangleAlert
          size={16}/>{error}</p>}
    </div>
  );
};

export default Messages;
