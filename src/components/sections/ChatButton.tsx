import { useEffect, useRef, useState, type FormEvent } from 'react'
import Icon from '../ui/Icon'

interface ChatMessage {
  id: number
  from: 'bot' | 'user'
  text: string
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    from: 'bot',
    text: "Hi! I'm the WXT assistant. Ask me about RewardForPromo, or leave a message and our team will get back to you.",
  },
]

function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: 'user', text },
      {
        id: Date.now() + 1,
        from: 'bot',
        text: 'Thanks for reaching out! One of our team members will follow up with you shortly.',
      },
    ])
    setInput('')
  }

  return (
    <>
      {isOpen && (
        <div className="animate-chat-pop fixed bottom-24 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container-lowest shadow-float">
          <div className="flex items-center justify-between gap-3 bg-secondary px-5 py-4 text-on-secondary">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-on-secondary/15">
                <Icon name="smart_toy" className="text-icon-20" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-label-lg text-label-lg font-semibold">WXT Assistant</span>
                <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-secondary/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button
              aria-label="Close chat"
              className="rounded-full p-1.5 transition-colors hover:bg-on-secondary/15"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <Icon name="close" className="text-icon-20" />
            </button>
          </div>

          <div className="flex max-h-96 flex-1 flex-col gap-3 overflow-y-auto bg-surface-container-low/40 px-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-body-sm text-body-sm ${
                    message.from === 'user'
                      ? 'rounded-br-sm bg-secondary text-on-secondary'
                      : 'rounded-bl-sm bg-surface-container-lowest text-on-surface shadow-sm'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="flex items-center gap-2 border-t border-outline-variant/20 p-3" onSubmit={handleSubmit}>
            <input
              className="flex-1 rounded-full bg-surface-container-low px-4 py-2.5 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              type="text"
              value={input}
            />
            <button
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary transition-colors hover:bg-on-secondary-fixed-variant disabled:opacity-40"
              disabled={!input.trim()}
              type="submit"
            >
              <Icon name="send" className="text-icon-18" />
            </button>
          </form>
        </div>
      )}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat' : 'Chat with us'}
        className="fixed bottom-6 right-6 z-50 group inline-flex items-center gap-2 p-4 sm:pl-4 sm:pr-5 sm:py-3 rounded-full bg-secondary text-on-secondary shadow-sm hover:shadow-float transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:scale-105 hover:bg-on-secondary-fixed-variant active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {isOpen ? (
          <Icon name="close" className="text-icon-22" />
        ) : (
          <svg
            aria-hidden="true"
            className="w-[length:var(--text-icon-22)] h-[length:var(--text-icon-22)] shrink-0"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 1.045-.166 2.545-.549 3.55-1.29A9.98 9.98 0 0 0 8 15z" />
          </svg>
        )}
        <span className="hidden font-label-lg text-label-lg sm:inline">{isOpen ? 'Close' : 'Chat with us'}</span>
      </button>
    </>
  )
}

export default ChatButton
