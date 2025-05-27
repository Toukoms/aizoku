import {create} from "zustand/react";
import {subscribeWithSelector} from "zustand/middleware";
import {
  deleteChat,
  generateChatTitle,
  getChatById,
  getChatHistoryByUserId,
  getInstalledOllamaModels,
  getMessagesByChatId,
  renameChat,
  saveMessage,
  streamOllama,
  abortStreaming
} from "@/src/actions/chat.action";
import {Chat} from "@/src/generated/prisma/client"
import {getUserSession} from "@/src/actions/auth.action";

type ChatStore = {
  chatId?: string;
  message: string;
  newSending: boolean;
  messages: TMessage[];
  loading: boolean;
  error: string | null;
  chatHistory: Chat[];
  model: string;

  getModels: () => Promise<string[]>;
  setModel: (model: string) => void;
  getChat: (chatId:string) => Promise<Chat|undefined>;
  clearAll: () => void;
  getChatHistory: () => Promise<void>;
  setMessage: (msg: string) => void;
  setNewSending: (msgSent: boolean) => void;
  setChatId: (chatId: string) => void;
  loadMessagesFromDb: (chatId: string) => Promise<void>;
  sendMessage: () => Promise<void>;
  renameChat: (chatId: string, title: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
};

export const useChatStore = create<ChatStore>()(subscribeWithSelector((set, get) => ({
  chatId: undefined,
  message: "",
  messages: [],
  loading: false,
  error: null,
  newSending: false,
  chatHistory: [],
  model: "",

  getModels: async () => {
    try {
      return await getInstalledOllamaModels();
    } catch (error) {
      set({error: (error as Error).message});
      return [];
    }
  },
  setModel: (model) => set({model}),
  getChat: async (chatId) => {
    try {
      if (!chatId) throw new Error('Chat ID is not defined');
      const chat = await getChatById(chatId);
      if (!chat) throw new Error('Failed to get chat');
      return chat;
    } catch (error) {
      set({error: (error as Error).message});
    }
  },
  renameChat: async (chatId,title) => {
    try {
      const {getChatHistory} = get()
      if (!chatId) throw new Error('Chat ID is not defined');
      await renameChat(chatId, title);
      await getChatHistory()
    } catch (error) {
      set({error: (error as Error).message});
    }
  },
  deleteChat: async (chatId) => {
    try {
      const {getChatHistory} = get()
      if (!chatId) throw new Error('Chat ID is not defined');
      await deleteChat(chatId);
      await getChatHistory();
    } catch (error) {
      set({error: (error as Error).message});
    }
  },
  clearAll: () => set({chatId: undefined, message: "", messages: [], loading: false, error: null, newSending: false}),
  getChatHistory: async () => {
    const user = await getUserSession();
    if (!user) throw new Error('Failed to get user');
    const chats = await getChatHistoryByUserId(user.id);
    set({chatHistory: chats});
  },
  setMessage: (msg) => set({message: msg}),
  setNewSending: (msgSent) => set({newSending: msgSent}),
  setChatId: (chatId: string) => set({chatId}),

  loadMessagesFromDb: async (chatId: string) => {
    const messages = await getMessagesByChatId(chatId);
    set({messages: messages as TMessage[]});
  },

  sendMessage: async () => {
    const {chatId, message, messages, getChatHistory, model} = get();
    const trimmed = message.trim();
    if (!trimmed) {
      set({error: "Message can't be empty."});
      return;
    }

    const newUserMessage: TMessage = {role: "user", content: trimmed};
    let updatedMessages = [...messages, newUserMessage];
    set({loading: true, error: null, messages: [...updatedMessages]});

    try {
      if (!chatId) {
        throw new Error("Chat ID is not defined");
      }

      const res = await streamOllama(updatedMessages, model);

      let currentAiMessage = "";
      updatedMessages = [...updatedMessages, {role: "assistant", content: currentAiMessage}];
      set({messages: updatedMessages});

      for await (const part of res) {
        currentAiMessage += part.message.content;
        updatedMessages[updatedMessages.length - 1].content = currentAiMessage;
        set({messages: [...updatedMessages]});
      }

      await saveMessage(chatId, trimmed, "user");
      await saveMessage(chatId, currentAiMessage, "assistant");
      set({message: ""});

      if (updatedMessages.length === 2) {
        const chat = await generateChatTitle(chatId, updatedMessages, model);
        if (chat) {
          set({chatId: chat.id});
          await getChatHistory()
        }

      }
    } catch (err: unknown) {
      set({
        error: err instanceof Error ? err.message : "Something went wrong.",
        messages: updatedMessages.slice(0, -1)
      });
    } finally {
      set({loading: false, newSending: false});
    }
  },
})));

useChatStore.subscribe(
  (state) => state.chatId,
  (chatId, prevChatId) => {
    if (chatId && chatId !== prevChatId) {
      useChatStore.getState().loadMessagesFromDb(chatId);
      abortStreaming()
      if (useChatStore.getState().newSending) {
        useChatStore.getState().sendMessage();
      }
    }
  }
);

useChatStore.subscribe(
  (state) => state.newSending,
  (newSending) => {
    const chatId = useChatStore.getState().chatId;
    if (newSending && chatId) {
      useChatStore.getState().sendMessage();
    }
  }
);

