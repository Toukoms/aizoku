type TMessage = {
  role: 'user' | 'assistant'
  content: string,
  createdAt?: Date
}