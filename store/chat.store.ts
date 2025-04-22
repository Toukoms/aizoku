import {create} from 'zustand'
import {askOllama} from '@/actions/chat.action'

type ChatStore = {
  message: string
  messages: TMessage[]
  loading: boolean
  error: string | null

  setMessage: (msg: string) => void
  clearChat: () => void
  sendMessage: () => Promise<void>
}

export const useChatStore = create<ChatStore>((set, get) => ({
  message: '',
  messages: [],
  loading: false,
  error: null,

  setMessage: (msg) => set({message: msg}),

  clearChat: () =>
    set({
      message: '',
      messages: [],
      error: null,
    }),

  sendMessage: async () => {
    const {message, messages} = get()
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    const newMessage: TMessage = {role: 'user', content: trimmedMessage}
    const updatedMessages = [...messages, newMessage]

    set({loading: true, error: null, messages: updatedMessages})

    try {
      const result = await askOllama(updatedMessages, newMessage)
      if (result.message?.content) {
        const assistantMessage: TMessage = {
          role: 'assistant',
          content: result.message.content,
        }
        set((state) => ({
          messages: [...state.messages, assistantMessage],
        }))
      }
    } catch (err: any) {
      set({error: err?.message || 'Something went wrong.'})
    } finally {
      set({loading: false, message: ''})
    }
  },
}))
