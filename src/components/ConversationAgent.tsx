import { useState, useRef, useEffect } from 'react'
import { useConversation } from '@elevenlabs/react'

const AGENT_ID = 'agent_9501k9sww8s7eq1rm8906n9asr8j'

type MessageRole = 'user' | 'agent'

interface Message {
  id: string
  role: MessageRole
  text: string
  timestamp: Date
}

type Status = 'idle' | 'connecting' | 'connected' | 'error'

export default function ConversationAgent() {
  const [status, setStatus] = useState<Status>('idle')
  const [messages, setMessages] = useState<Message[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  const conversation = useConversation({
    onConnect: () => {
      setStatus('connected')
      setErrorMsg(null)
    },
    onDisconnect: () => {
      setStatus('idle')
    },
    onMessage: (message) => {
      const role: MessageRole =
        message.source === 'user' ? 'user' : 'agent'
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          role,
          text: message.message,
          timestamp: new Date(),
        },
      ])
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error)
      setErrorMsg(typeof error === 'string' ? error : 'An error occurred.')
      setStatus('error')
    },
  })

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startConversation = async () => {
    setErrorMsg(null)
    setStatus('connecting')
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'webrtc',
      })
    } catch (err) {
      console.error('Failed to start conversation:', err)
      setErrorMsg(
        err instanceof Error ? err.message : 'Failed to access microphone.'
      )
      setStatus('error')
    }
  }

  const endConversation = async () => {
    await conversation.endSession()
  }

  const toggleMute = () => {
    const next = !isMuted
    setIsMuted(next)
    conversation.setVolume({ volume: next ? 0 : 1 })
  }

  const isConnected = status === 'connected'
  const isConnecting = status === 'connecting'

  return (
    <div className="agent-card">
      <div className="agent-identity">
        <div className="avatar">
          <span>ME</span>
        </div>
        <div className="agent-info">
          <h2>Margaret Ellis</h2>
          <p className="agent-status">
            {status === 'idle' && 'Ready to connect'}
            {status === 'connecting' && 'Connecting…'}
            {status === 'connected' &&
              (conversation.isSpeaking ? 'Speaking' : 'Listening')}
            {status === 'error' && 'Connection error'}
          </p>
        </div>
        {isConnected && (
          <div
            className={`speaking-indicator ${
              conversation.isSpeaking ? 'speaking' : 'listening'
            }`}
          />
        )}
      </div>

      {errorMsg && <div className="error-banner">{errorMsg}</div>}

      <div className="transcript">
        {messages.length === 0 && (
          <p className="transcript-empty">
            {isConnected
              ? 'Start speaking—Margaret is listening.'
              : 'Start a conversation to begin.'}
          </p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`message message-${msg.role}`}>
            <span className="message-role">
              {msg.role === 'user' ? 'You' : 'Margaret'}
            </span>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
        <div ref={transcriptEndRef} />
      </div>

      <div className="controls">
        {!isConnected && !isConnecting && (
          <button className="btn btn-primary" onClick={startConversation}>
            Start Conversation
          </button>
        )}
        {isConnecting && (
          <button className="btn btn-primary" disabled>
            <span className="spinner" /> Connecting…
          </button>
        )}
        {isConnected && (
          <>
            <button
              className={`btn ${isMuted ? 'btn-muted' : 'btn-secondary'}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '\uD83D\uDD07 Muted' : '\uD83D\uDD0A Mute'}
            </button>
            <button className="btn btn-danger" onClick={endConversation}>
              End Call
            </button>
          </>
        )}
      </div>
    </div>
  )
}
