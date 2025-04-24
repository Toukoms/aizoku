"use client"
import React from 'react';
import {Button} from "@/src/components/ui/button";
import {MessageSquareMore} from "lucide-react";
import {useRouter} from "next/navigation";
import {useChatStore} from "@/src/store/chat.store";

function NewChat() {
  const clearChat = useChatStore((state) => state.clearAll)
  const router = useRouter()

  return (
    <Button onClick={(e) => {
      e.preventDefault()
      clearChat()
      router.push("/")
    }}>
      New Chat
      <MessageSquareMore className={"size-4"}/>
    </Button>
  );
}

export default NewChat;