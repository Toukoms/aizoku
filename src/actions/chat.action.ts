"use server"

import ollama from "ollama";
import {prisma} from "@/src/lib/prisma";
import {redirect} from "next/navigation";

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

export async function generateChatTitle(chatId: string, messages: TMessage[]) {
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
  const title = res.message.content.replace("\"", "");

  return prisma.chat.update({
    where: {id: chatId},
    data: {title}
  });
}

export async function createChat(userId: string) {
  return prisma.chat.create({
    data: {
      title: "New chat",
      userId,
      model: 'qwen2.5-coder:3b',
    },
  });
}

export async function getChatById(chatId: string) {
  return prisma.chat.findUnique({
    where: {id: chatId},
  });
}

export async function renameChat(chatId: string, title: string) {
  return prisma.chat.update({
    where: {id: chatId},
    data: {title}
  });
}

export async function deleteChat(chatId: string) {
  const chat = await prisma.chat.delete({where: {id: chatId}});
  if (chat) {
    redirect("/chat")
  }
}

export async function saveMessage(chatId: string, content: string, role: "user" | "assistant") {
  return prisma.message.create({
    data: {
      chatId,
      content,
      role,
    },
  });
}

export async function getChatHistoryByUserId(userId: string) {
  return prisma.chat.findMany({
    where: {userId},
    orderBy: {createdAt: "desc"},
  });
}

export async function getMessagesByChatId(chatId: string) {
  return prisma.message.findMany({
    where: {chatId},
    orderBy: {createdAt: "asc"},
  });
}
