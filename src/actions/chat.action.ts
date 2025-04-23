"use server"

import ollama from "ollama";
import {prisma} from "@/src/lib/prisma";

export async function askOllama(messages: TMessage[], maxLength?: number) {
  return await ollama.chat({
    model: 'qwen2.5-coder:3b',
    messages,
    options: {
      num_predict: maxLength ?? -1
    }
  });
}

export async function streamOllama(messages: TMessage[]) {
  return await ollama.chat({
    model: 'qwen2.5-coder:3b',
    messages,
    stream: true
  });
}

export async function renameChat(chatId: string, messages: TMessage[]) {
  const messageCount = await prisma.message.count({
    where: {chatId}
  });

  if (messageCount !== 2) {
    return null;
  }

  const prompt: TMessage = {
    role: "user",
    content: "Generate a short, concise title (max 32 characters) for this chat based on the past messages. Respond with the title only."
  };

  const res = await askOllama([...messages, prompt]);
  console.log(res);
  const title = res.message.content;

  return await prisma.chat.update({
    where: {id: chatId},
    data: {title}
  })
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
