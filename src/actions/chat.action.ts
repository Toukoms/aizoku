"use server"

import ollama from "ollama";
import {prisma} from "@/src/lib/prisma";
import {getUserSession} from "@/src/actions/auth.action";

export async function askOllama(messages: TMessage[], model: string, maxLength?: number) {
  return await ollama.chat({
    model,
    messages,
    options: {
      num_predict: maxLength ?? -1
    }
  });
}

export async function streamOllama(messages: TMessage[], model: string) {
  return await ollama.chat({
    model,
    messages,
    stream: true
  });
}

export async function generateChatTitle(chatId: string, messages: TMessage[], model: string) {
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

  const res = await askOllama([...messages, prompt], model);
  const title = res.message.content.replace(/"/g, '');

  return prisma.chat.update({
    where: {id: chatId},
    data: {title}
  });
}

export async function createChat(userId: string, model: string) {
  return prisma.chat.create({
    data: {
      title: "New chat",
      userId,
      model
    },
  });
}

export async function getChatById(chatId: string) {
  const user = await getUserSession()
  if (!user) throw new Error('Failed to get user');
  return prisma.chat.findUnique({
    where: {id: chatId, userId: user.id},
  });
}

export async function renameChat(chatId: string, title: string) {
  return prisma.chat.update({
    where: {id: chatId},
    data: {title}
  });
}

export async function deleteChat(chatId: string) {
  await prisma.chat.delete({where: {id: chatId}});
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

export async function abortStreaming() {
    await ollama.abort()
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

export async function getInstalledOllamaModels() {
  const res = await ollama.list();
  return res.models.map(model => model.name);
}
