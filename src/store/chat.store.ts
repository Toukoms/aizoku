import {create} from "zustand/react";
import {subscribeWithSelector} from "zustand/middleware";
import {getMessagesByChatId, sendAndSaveMessage} from "@/src/actions/chat.action";

type ChatStore = {
  chatId?: string;
  message: string;
  newSending: boolean;
  messages: TMessage[];
  loading: boolean;
  error: string | null;

  setMessage: (msg: string) => void;
  setNewSending: (msgSent: boolean) => void;
  setChatId: (chatId: string) => void;
  loadMessagesFromDb: (chatId: string) => Promise<void>;
  sendMessage: () => Promise<void>;
};

export const useChatStore = create<ChatStore>()(subscribeWithSelector((set, get) => ({
  chatId: undefined,
  message: "",
  messages: [],
  loading: false,
  error: null,
  newSending: false,

  setMessage: (msg) => set({message: msg}),
  setNewSending: (msgSent) => set({newSending: msgSent}),
  setChatId: (chatId) =>
    set({chatId}),

  loadMessagesFromDb: async (chatId: string) => {
    const messages = await getMessagesByChatId(chatId);
    set({messages: messages as TMessage[]});
  },

  sendMessage: async () => {
    const {chatId, message, messages} = get();
    const trimmed = message.trim();
    if (!trimmed) {
      set({error: "Message can't be empty."});
      return
    }

    const newUserMessage: TMessage = {
      role: "user",
      content: trimmed,
    };

    const updatedMessages = [...messages, newUserMessage]
    set({
      loading: true,
      error: null,
      messages: updatedMessages,
    });

    try {
      if (!chatId) {
        throw new Error("Chat ID is not defined");
      }

      const result = await sendAndSaveMessage({
        chatId,
        content: trimmed,
        updatedMessages,
      });

      if (result.saved && result.savedAiMessage) {
        set({
          messages: [...updatedMessages, result.savedAiMessage],
          message: ""
        })
      } else {
        set({error: "Something went wrong."});
      }

    } catch (err: any) {
      set({error: err.message || "Something went wrong."});
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

