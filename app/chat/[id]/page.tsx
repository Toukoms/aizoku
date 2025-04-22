import React from 'react';
import Messages from "@/app/chat/[id]/_components/messages";
import InputChat from "@/components/input-chat";
import {prisma} from "@/src/lib/prisma";

const ChatPage = async ({params}: TParams) => {
  const {id} = await params;

  const chat = await prisma.chat.findUnique({
    where: {id},
    include: {
      messages: {
        orderBy: {createdAt: 'asc'}
      }
    }
  })

  if (!chat) {
    return <p>Chat not found</p>
  }

  return (
    <div className={"w-full h-full"}>
      <div className={"max-w-5xl w-full mx-auto h-full p-2 flex flex-col justify-end"}>
        <Messages messages={chat.messages}/>
        <InputChat/>
      </div>
    </div>
  );
};

export default ChatPage;
