import ConversationAgent from './components/ConversationAgent'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Encountive</h1>
        <p className="app-subtitle">Powered by ElevenLabs Conversational AI</p>
      </header>
      <main className="app-main">
        <ConversationAgent />
      </main>
    </div>
  )
}
