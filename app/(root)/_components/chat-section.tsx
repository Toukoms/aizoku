"use client"
import React from 'react';
import InputChat from "@/app/(root)/_components/input-chat";
import {useSession} from "next-auth/react";
import {useChatStore} from "@/store/chat.store";
import Message from "@/components/message";
import {TriangleAlert} from "lucide-react";

const ChatSection = () => {
  const {data, status} = useSession();
  const error = useChatStore((state) => state.error)
  const loading = useChatStore((state) => state.loading)
  const messages = useChatStore((state) => state.messages)

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full px-2">
        {status === "authenticated" && data
          ? (
            <div className="flex flex-col items-center gap-8">
              {
                messages && messages.length > 0
                  ? <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
                    {messages.map((message, index) => (
                      <Message key={index} {...message}/>
                    ))}
                    {loading && <p>Loading...</p>}
                    {error && <p className={"text-xs text-destructive flex items-center gap-1"}><TriangleAlert
                        size={12}/> {error}</p>}
                  </div>
                  : <WelcomeMessage userName={data.user?.name!}/>
              }
              <InputChat/>
            </div>
          ) : <WelcomeMessage/>}
      </div>
    </div>
  );
};

const WelcomeMessage = ({userName}: { userName?: string }) => {
  return (
    userName
      ? (<div className="flex flex-col items-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">Welcome back, <span
          className="font-bold text-primary">{userName}</span>! 👋</p>
        <p className="text-lg md:text-xl text-muted-foreground">Great to see you again</p>
      </div>)
      : (<div className="flex flex-col items-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">Welcome to our platform! 👋</p>
        <p className="text-lg md:text-xl text-muted-foreground">Please sign in to get started</p>
      </div>)
  )
}

export default ChatSection;
