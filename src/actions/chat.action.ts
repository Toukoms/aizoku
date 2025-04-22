"use server"

import ollama from "ollama";
import {prisma} from "@/src/lib/prisma";

export async function askOllama(messages: TMessage[]) {
  return await ollama.chat({
    model: 'qwen2.5-coder:3b',
    messages,
  });
}

export async function createChat(userId: string) {
  return await prisma.chat.create({
    data: {
      title: "New chat",
      userId
    },
  });
}

export async function saveMessage(chatId: string, content: string, role: "user" | "assistant") {
  return await prisma.message.create({
    data: {
      chatId,
      content,
      role,
    },
  })
}

export async function sendAndSaveMessage(
  {
    chatId,
    content,
    messages
  }: {
    chatId: string;
    content: string;
    messages?: TMessage[];
  }): Promise<{
  chatId: string | undefined;
  saved: boolean;
  savedUserMessage: TMessage;
  savedAiMessage?: TMessage;
}> {
  if (!content || content.trim() === "") {
    throw new Error("Message can't be empty");
  }

  const userMessage: TMessage = {
    role: "user",
    content,
  };

  const result = await askOllama(messages ? [...messages, userMessage] : [userMessage]);

  const aiContent = result.message?.content ?? "";

  if (!aiContent.trim()) {
    return {
      chatId,
      saved: false,
      savedUserMessage: userMessage,
      savedAiMessage: undefined,
    };
  }

  const savedUserMessage = (await saveMessage(chatId, content, "user")) as TMessage;
  const savedAiMessage = (await saveMessage(chatId, aiContent, "assistant")) as TMessage;

  return {
    chatId,
    saved: true,
    savedUserMessage,
    savedAiMessage,
  };
}

export async function getChatHistory() {
  return await prisma.chat.findMany({
    orderBy: {createdAt: "desc"},
  });
}

export async function getMessagesByChatId(chatId: string) {
  return await prisma.message.findMany({
    where: {chatId},
    orderBy: {createdAt: "asc"},
  });
}
