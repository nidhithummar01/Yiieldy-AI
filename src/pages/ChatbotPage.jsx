import { useState, useRef, useEffect } from 'react';
import { Bot, Send, RefreshCw, User, Leaf } from 'lucide-react';

const QUICK = ['High FCR this week?', 'Mortality alert setup', 'Reduce feed cost', 'Water intake low', 'Day 21 weight check'];

const ANSWERS = {
  fcr:      "**High FCR** usually means one of:\n\n1. **Overfeeding** — check if feed quantity was increased recently\n2. **Health issue** — water intake drops often precede FCR spikes\n3. **Feed quality** — moisture or spoilage in feed bins\n\n👉 Recommended: Run the Feed Optimization scan for today and compare against Day-14 baseline.",
  mortali:  "**Mortality Alert** setup:\n\n• Threshold: > 0.5% per day triggers a **High** alert\n• > 0.3% triggers a **Medium** alert\n• Alerts sent via push notification + app dashboard\n\nYou can customize thresholds per house in Settings → Alerts.",
  feed:     "**Reducing Feed Cost:**\n\n✓ Use the 3-day predictive schedule (not fixed daily quantity)\n✓ Check House B — FCR trend suggests 8% overfeeding\n✓ Review wastage at feed lines after each cycle\n\nEstimated saving: **₹380–₹440/day** across 4 houses.",
  water:    "**Low Water Intake** is a key early warning sign:\n\n• Drop > 20% for 2+ days → check drinker lines for blockage\n• Drop > 30% → possible illness or heat stress\n• Sudden drop overnight → equipment fault likely\n\n👉 House A shows -23% this cycle. Check Zone 3 drinker lines today.",
  weight:   "**Day 21 Weight Check:**\n\nTarget for broilers at Day 21: **750–820g**\n\nYour current batches:\n• House A (Day 32): 2.38 kg ✓\n• House B (Day 21): 1.62 kg ⚠ Slightly below target\n• House D (Day 7): 0.42 kg ✓ On track\n\nHouse B may need protein supplement review.",
  default:  "I can help with:\n• **FCR analysis** — why it went up and what to do\n• **Mortality alerts** — setup and thresholds\n• **Feed cost** — optimization steps\n• **Water intake** — diagnosing low intake\n• **Weight targets** — by age and breed\n\nWhat's your question?",
};

function getReply(t) {
  const l = t.toLowerCase();
  if (l.includes('fcr') || l.includes('conversion') || l.includes('high fcr')) return ANSWERS.fcr;
  if (l.includes('mortal') || l.includes('death') || l.includes('alert')) return ANSWERS.mortali;
  if (l.includes('feed') || l.includes('cost') || l.includes('reduc')) return ANSWERS.feed;
  if (l.includes('water') || l.includes('drink') || l.includes('intake')) return ANSWERS.water;
  if (l.includes('weight') || l.includes('day 21') || l.includes('21')) return ANSWERS.weight;
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

export default function ChatbotPage() {
  const [msgs, setMsgs] = useState([
    { id: 1, from: 'bot', text: "Hi! 👋 I'm your **Farm AI Assistant**.\n\nAsk me anything about your flock — FCR, feed, mortality, water intake, or weight targets.", time: now() }
  ]);
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
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
    setMsgs(p => p.filter(m => m.id !== tid).concat({ id: Date.now() + 2, from: 'bot', text: getReply(text), time: now() }));
    setLoading(false);
  };

  const reset = () => {
    setMsgs([{ id: Date.now(), from: 'bot', text: "Chat cleared! What farm question can I help with?", time: now() }]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Farm AI Assistant</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Instant guidance for any farm question — in plain language</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        {/* Left info panel */}
        <div>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>What This Solves</div>
            {['Ask in plain language — no forms', 'Get FCR analysis and action steps', 'Diagnose water, weight, mortality issues', 'Hindi and English supported', '< 2 second response time'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 9, color: '#16A34A' }}>✓</span>
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Try Asking</div>
            {QUICK.map(q => (
              <button key={q} onClick={() => send(q)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 6, borderRadius: 8, border: '1px solid var(--border)', background: '#fff', fontSize: 12.5, color: 'var(--text-2)', cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >{q}</button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 560 }}>
          {/* Header */}
          <div style={{ padding: '14px 16px', background: 'linear-gradient(135deg, #16A34A, #15803D)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={16} color="#fff" fill="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Yiieldy Farm AI</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#86EFAC', display: 'inline-block', animation: 'pulse-r 2s infinite' }} />
                Online · Responds in seconds
              </div>
            </div>
            <button onClick={reset} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', padding: 4, borderRadius: 5, display: 'flex' }}>
              <RefreshCw size={13} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 13px 8px', background: '#F9FAFB' }}>
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
                      : <div style={{ fontSize: 13, lineHeight: 1.65, color: isBot ? 'var(--text-2)' : '#fff' }}>{renderText(msg.text)}</div>
                    }
                    {!msg.typing && <div style={{ fontSize: 10, color: isBot ? '#9CA3AF' : 'rgba(255,255,255,0.55)', marginTop: 4, textAlign: 'right' }}>{msg.time}</div>}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div style={{ padding: '8px 12px', background: '#fff', borderTop: '1px solid var(--border-l)', display: 'flex', gap: 5, overflowX: 'auto' }}>
            {QUICK.map(q => (
              <button key={q} onClick={() => send(q)}
                style={{ flexShrink: 0, fontSize: 11, color: 'var(--text-2)', background: '#F3F4F6', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 11px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
              >{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(input); }}
              placeholder="Ask about FCR, mortality, feed, water intake..."
              style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: 'var(--text)', background: '#F9FAFB', outline: 'none', transition: 'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor = '#16A34A'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button onClick={() => send(input)} disabled={!input.trim() || loading}
              style={{ width: 36, height: 36, borderRadius: 8, border: 'none', background: input.trim() && !loading ? '#16A34A' : '#F3F4F6', color: input.trim() && !loading ? '#fff' : '#9CA3AF', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
