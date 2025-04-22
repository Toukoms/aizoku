"use server"

import ollama from "ollama";

export async function sendMessages(messages: TMessage[], newMessage: TMessage) {
  return await ollama.chat({
    model: 'qwen2.5-coder:3b',
    messages: [...messages, newMessage],
  });
}