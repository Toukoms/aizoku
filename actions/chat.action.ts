"use server"

import ollama from "ollama";
import {prisma} from "@/src/lib/prisma";

export async function askOllama(messages: TMessage[], newMessage: TMessage) {
  return await ollama.chat({
    model: 'qwen2.5-coder:3b',
    messages: [...messages, newMessage],
  });
}

export async function sendMessageOrCreateChat(
  {
    chatId,
    content,
  }: {
    chatId?: string
    content: string
  }) {
  if (content === null || content.length === 0) {
    throw new Error("Message can't be empty")
  }

  if (chatId) {
    // Add the message to the existing chat
    const message = await prisma.message.create({
      data: {
        content,
        chatId,
        role: 'user'
      },
    })
    return {chatId, message}
  }

  // Create a new chat with the first message
  const chat = await prisma.chat.create({
    data: {
      title: content.slice(0, 30),
      messages: {
        create: [{content, role: 'user'}],
      },
    },
    include: {
      messages: true,
    },
  })

  return {chatId: chat.id, message: chat.messages[0]}
}

export async function getChatHistory() {
  return await prisma.chat.findMany({
    orderBy: {createdAt: 'desc'},
  })
}