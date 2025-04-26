import React from 'react';
import Messages from "@/app/(chat)/chat/[id]/_components/messages";
import InputChat from "@/src/components/input-chat";
import { redirect} from "next/navigation";
import {ScrollArea} from "@/src/components/ui/scroll-area";
import {getChatById} from "@/src/actions/chat.action";

const ChatPage = async ({params}: TParams) => {
  const {id} = await params;
  const chat = await getChatById(id);

  if (!chat) {
    redirect("/chat")
  }

  return (
    <div className="w-full max-h-[84vh] flex flex-col gap-4">
      <ScrollArea className={"flex-1 min-h-0 px-4"}>
        <Messages chatId={id}/>
      </ScrollArea>
      <div className="pt-6 border-t px-4">
        <InputChat/>
      </div>
    </div>
  );
};

export default ChatPage;
