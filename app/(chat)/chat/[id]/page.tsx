import React from 'react';
import Messages from "@/app/(chat)/chat/[id]/_components/messages";
import InputChat from "@/src/components/input-chat";
import {notFound} from "next/navigation";
import {ScrollArea} from "@/src/components/ui/scroll-area";

const ChatPage = async ({params}: TParams) => {
  const {id} = await params;

  if (!id) {
    notFound()
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
