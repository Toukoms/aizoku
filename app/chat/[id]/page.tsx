import React from 'react';
import Messages from "@/app/chat/[id]/_components/messages";
import InputChat from "@/src/components/input-chat";

const ChatPage = async ({params}: TParams) => {
  const {id} = await params;

  return (
    <div className="w-full max-h-[86vh] flex flex-col gap-4">
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <Messages chatId={id}/>
      </div>
      <div className="pt-6 border-t px-4">
        <InputChat/>
      </div>
    </div>
  );
};

export default ChatPage;
