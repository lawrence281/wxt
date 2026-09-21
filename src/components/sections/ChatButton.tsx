import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Icon from '../ui/Icon'
import { cn } from '../../lib/cn'

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

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

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
        <div
          aria-label="WXT Assistant chat"
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm animate-chat-pop flex-col overflow-hidden rounded-md border border-line-strong bg-raised text-fg shadow-float sm:right-6"
          role="dialog"
        >
          <div className="flex items-center justify-between gap-3 bg-ink px-5 py-4 text-paper">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-pill bg-paper/10">
                <Icon className="text-icon-20" name="smart_toy" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-title">WXT Assistant</span>
                <span className="mt-1 flex items-center gap-1.5 font-mono text-label uppercase text-paper/70">
                  <span className="size-1.5 animate-pulse rounded-pill bg-live" />
                  Online
                </span>
              </div>
            </div>
            <button
              aria-label="Close chat"
              className="grid size-9 place-items-center rounded-pill transition-base hover:bg-paper/15"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <Icon className="text-icon-20" name="close" />
            </button>
          </div>

          <div aria-live="polite" className="flex max-h-96 min-h-48 flex-1 flex-col gap-3 overflow-y-auto bg-ground px-4 py-4">
            {messages.map((message) => (
              <div className={cn('flex', message.from === 'user' ? 'justify-end' : 'justify-start')} key={message.id}>
                <p
                  className={cn(
                    'max-w-[82%] px-4 py-2.5 text-small',
                    message.from === 'user'
                      ? 'rounded-md rounded-br-xs bg-accent text-on-accent'
                      : 'rounded-md rounded-bl-xs border border-line bg-raised text-fg',
                  )}
                >
                  {message.text}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="flex items-center gap-2 border-t border-line p-3" onSubmit={handleSubmit}>
            <input
              aria-label="Type your message"
              className="min-h-11 flex-1 border-b border-line-strong bg-transparent px-2 text-small text-fg transition-base placeholder:text-fg-mute focus:border-signal focus:outline-none"
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              type="text"
              value={input}
            />
            <button
              aria-label="Send message"
              className="grid size-11 shrink-0 place-items-center rounded-sm bg-ink text-paper transition-base hover:bg-accent disabled:opacity-40 disabled:hover:bg-ink"
              disabled={!input.trim()}
              type="submit"
            >
              <Icon className="text-icon-18" name="send" />
            </button>
          </form>
        </div>
      )}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat' : 'Chat with us'}
        className="fixed bottom-4 right-4 z-50 inline-flex min-h-14 items-center gap-3 rounded-pill bg-accent p-4 text-on-accent shadow-float transition-base hover:-translate-y-0.5 hover:bg-accent-strong active:translate-y-0 sm:bottom-6 sm:right-6 sm:px-6"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {isOpen ? (
          <Icon className="text-icon-24" name="close" />
        ) : (
          <svg aria-hidden="true" className="size-6 shrink-0" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 1.045-.166 2.545-.549 3.55-1.29A9.98 9.98 0 0 0 8 15z" />
          </svg>
        )}
        <span className="hidden text-small font-semibold sm:inline">{isOpen ? 'Close' : 'Chat with us'}</span>
      </button>
    </>
  )
}

export default ChatButton
