import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, RefreshCw, MessageSquare, User } from 'lucide-react';
import { Leaf } from 'lucide-react';

const QUICK = ['Reduce feed waste?', 'What is FCR?', 'Book a demo', 'Anomaly alerts?'];

const ANSWERS = {
  feed:    "**Feed Optimization AI** predicts the best quantity and timing for each flock:\n\n✓ Reduces feed waste by **18%** on average\n✓ Uses age, weight, FCR trend, and historical feed records\n✓ Alerts when overfeeding is likely",
  fcr:     "**FCR (Feed Conversion Ratio)** = feed consumed ÷ weight gained.\n\nA good FCR for broilers is **< 1.75**. Yiieldy AI:\n• Tracks FCR daily per house\n• Alerts when FCR trends up\n• Predicts week-end FCR 3 days ahead",
  demo:    "I'd love to set up a demo! Our team will walk you through all 5 AI software solutions using sample farm records.\n\nClick **Request demo →** in the top navbar. It takes 30 seconds and we respond within 1 hour.",
  anomaly: "**Anomaly Detection** flags issues before they become costly:\n\n🔴 High: FCR spike or mortality above threshold\n🟡 Medium: feed efficiency or weight trend change\n🟢 Low: minor performance trend shift\n\nAlerts appear with root cause hints based on recorded farm data.",
  default: "I can help with:\n• **Feed AI**: how it cuts waste\n• **FCR**: what it means and how we track it\n• **Anomaly detection**: early warning system\n• **Demo / pricing**: getting started\n\nWhat would you like to know?",
};

function getReply(t) {
  const l = t.toLowerCase();
  if (l.includes('feed') || l.includes('waste') || l.includes('quantity')) return ANSWERS.feed;
  if (l.includes('fcr') || l.includes('conversion') || l.includes('ratio')) return ANSWERS.fcr;
  if (l.includes('demo') || l.includes('contact') || l.includes('price') || l.includes('cost')) return ANSWERS.demo;
  if (l.includes('anomal') || l.includes('alert') || l.includes('detect') || l.includes('warning')) return ANSWERS.anomaly;
  return ANSWERS.default;
}

function renderText(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

function now() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ id: 1, from: 'bot', text: "Hi! 👋 I'm **Yiieldy AI**.\n\nAsk me about feed optimization, anomaly detection, or how to book a live demo.", time: now() }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setMsgs(p => [...p, { id: Date.now(), from: 'user', text: text.trim(), time: now() }]);
    setInput('');
    setLoading(true);
    const tid = Date.now() + 1;
    setMsgs(p => [...p, { id: tid, from: 'bot', typing: true, time: now() }]);
    await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
    setMsgs(p => p.filter(m => m.id !== tid).concat({ id: Date.now() + 2, from: 'bot', text: getReply(text), time: now() }));
    setLoading(false);
  };

  const reset = () => {
    setMsgs([{ id: Date.now(), from: 'bot', text: "Chat cleared! Ask me anything about Yiieldy AI.", time: now() }]);
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div style={{
          position: 'fixed', bottom: 86, right: 24, width: 350, zIndex: 9999,
          background: '#fff', borderRadius: 16, overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)',
          animation: 'chatPop 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          {/* Header */}
          <div style={{ padding: '14px 16px', background: 'linear-gradient(135deg, #16A34A, #15803D)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Leaf size={16} color="#fff" fill="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Yiieldy Farm AI</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#86EFAC', display: 'inline-block', animation: 'pulse-r 2s infinite' }} />
                Online · Farm intelligence ready
              </div>
            </div>
            <button onClick={reset} title="Clear" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', padding: 4, borderRadius: 5, display: 'flex' }}>
              <RefreshCw size={13} />
            </button>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', padding: 4, borderRadius: 5, display: 'flex' }}>
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ height: 320, overflowY: 'auto', padding: '14px 13px 8px', background: '#F9FAFB' }}>
            {msgs.map(msg => {
              const isBot = msg.from === 'bot';
              return (
                <div key={msg.id} style={{ display: 'flex', gap: 8, flexDirection: isBot ? 'row' : 'row-reverse', marginBottom: 12, animation: 'fadeUp 0.18s ease' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, background: isBot ? '#16A34A' : '#1F2937', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isBot ? <Leaf size={11} color="#fff" /> : <User size={12} color="#fff" />}
                  </div>
                  <div style={{ maxWidth: '78%', padding: '9px 13px', background: isBot ? '#fff' : '#16A34A', border: isBot ? '1px solid var(--border-l)' : 'none', borderRadius: isBot ? '4px 12px 12px 12px' : '12px 4px 12px 12px', boxShadow: isBot ? 'var(--shadow-sm)' : 'none' }}>
                    {msg.typing
                      ? <div style={{ display: 'flex', gap: 3, padding: '2px 0' }}>{[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#9CA3AF', animation: `typingDot 1.2s ${i*0.2}s infinite` }} />)}</div>
                      : <div style={{ fontSize: 12.5, lineHeight: 1.65, color: isBot ? 'var(--text-2)' : '#fff' }}>{renderText(msg.text)}</div>
                    }
                    {!msg.typing && <div style={{ fontSize: 10, color: isBot ? '#9CA3AF' : 'rgba(255,255,255,0.55)', marginTop: 4, textAlign: 'right' }}>{msg.time}</div>}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div style={{ padding: '6px 11px', background: '#fff', borderTop: '1px solid var(--border-l)', display: 'flex', gap: 5, overflowX: 'auto' }}>
            {QUICK.map(q => (
              <button key={q} onClick={() => send(q)}
                style={{ flexShrink: 0, fontSize: 11, color: 'var(--text-2)', background: '#F3F4F6', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 11px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
              >{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '9px 11px', background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(input); }}
              placeholder="Ask about feed, FCR, anomalies..."
              style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 8, padding: '8px 11px', fontSize: 12.5, color: 'var(--text)', background: '#F9FAFB', outline: 'none', transition: 'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor = '#16A34A'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button onClick={() => send(input)} disabled={!input.trim() || loading}
              style={{ width: 34, height: 34, borderRadius: 8, border: 'none', background: input.trim() && !loading ? '#16A34A' : '#F3F4F6', color: input.trim() && !loading ? '#fff' : '#9CA3AF', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setOpen(o => !o)} title="Ask Yiieldy AI"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9998,
          width: 54, height: 54, borderRadius: '50%', border: 'none',
          background: open ? '#1F2937' : 'linear-gradient(135deg, #16A34A, #15803D)', color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(22,163,74,0.45)',
          transition: 'all 0.18s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}
        {!open && (
          <span style={{ position: 'absolute', top: -1, right: -1, width: 16, height: 16, borderRadius: '50%', background: '#22C55E', border: '2px solid #fff', fontSize: 8, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AI</span>
        )}
      </button>
    </>
  );
}
