import React from 'react';
import Messages from "@/app/chat/[id]/_components/messages";
import InputChat from "@/src/components/input-chat";

const ChatPage = async ({params}: TParams) => {
  const {id} = await params;

  return (
    <div className={"w-full h-full"}>
      <div className={"max-w-5xl w-full mx-auto h-full p-2 flex flex-col justify-end"}>
        <Messages chatId={id}/>
        <InputChat/>
      </div>
    </div>
  );
};

export default ChatPage;
