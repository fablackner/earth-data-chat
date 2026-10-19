'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';

import Message from './Message';

const SUGGESTIONS = [
  'Biggest earthquakes in the last day?',
  'Any active red or orange disaster alerts?',
  'Is there a geomagnetic storm right now?',
  'Weather and air quality in Athens',
];

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error, stop } = useChat();
  const busy = status === 'submitted' || status === 'streaming';
  const bottom = useRef(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, status]);

  function send(text) {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput('');
  }

  return (
    <main>
      <header>
        <img src="/icon.svg" alt="" width="28" height="28" />
        <h1>earth-data-chat</h1>
      </header>

      <div className="messages">
        {messages.length === 0 && (
          <div className="empty">
            <p>Live Earth observation and natural hazard data, in plain language.</p>
            <div className="suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}

        {status === 'submitted' && <div className="msg assistant thinking">…</div>}
        {error && <div className="error">Something went wrong: {error.message}</div>}
        <div ref={bottom} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about earthquakes, weather, volcanoes, space weather…"
          autoFocus
        />
        {busy ? (
          <button type="button" onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()}>
            Send
          </button>
        )}
      </form>
    </main>
  );
}
