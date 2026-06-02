import { useState } from 'react';
import { Leaf, BarChart2, Brain, AlertTriangle, Zap, ArrowRight, Check, X, ChevronRight } from 'lucide-react';

const solutions = [
  {
    id: 'feed', num: '01', icon: Leaf, label: 'Feed Optimization AI',
    tagline: 'Cut feed waste by predicting the exact quantity and timing for each flock.',
    metrics: [{ v: '18%', l: 'Feed Waste Reduced' }, { v: '3 days', l: 'Ahead Prediction' }, { v: '₹420', l: 'Saved per Batch/Day' }],
    before: ['Manual feed logs updated once a day', 'Over-feeding common in growth weeks 3–5', 'No visibility into waste per house'],
    after:  ['AI predicts feed need per house every 6 hours', 'Dynamic adjustment by age, weight, FCR trend', 'Real-time waste tracking and alerts'],
    pitch:  `"Yiieldy's feed AI found we were overfeeding House B by 8% every week — that's ₹12,000 saved per cycle."`,
    pitchBy: 'Poultry Farm Owner, Maharashtra',
  },
  {
    id: 'dashboard', num: '02', icon: BarChart2, label: 'Performance Dashboard',
    tagline: 'Track flock health trends, FCR, body weight, and mortality in one clear view.',
    metrics: [{ v: '6 KPIs', l: 'Tracked per Flock' }, { v: 'Live', l: 'Data Sync' }, { v: '4 houses', l: 'Multi-Farm View' }],
    before: ['Paper records and Excel sheets', 'FCR calculated manually at week end', 'No comparison across batches'],
    after:  ['Auto-computed FCR, weight gain, mortality', 'Week-over-week trend charts per house', 'Color-coded alerts when metrics slip'],
    pitch:  `"For the first time I can see all 4 houses on one screen and know which batch is at risk before it's too late."`,
    pitchBy: 'Farm Manager, Andhra Pradesh',
  },
  {
    id: 'chatbot', num: '03', icon: Brain, label: 'Farm AI Assistant',
    tagline: 'Ask any farm question in plain language — get instant guidance inside the app.',
    metrics: [{ v: '<2s', l: 'Response Time' }, { v: '24/7', l: 'Available' }, { v: 'Hindi/EN', l: 'Language Support' }],
    before: ['Call the vet or wait for field officer', 'Farmers unsure of dosage or timing', 'No structured answer to common issues'],
    after:  ['Type: "FCR went up this week — what do I do?"', 'AI diagnoses likely cause and recommends steps', 'Links to protocols, dosage guides, checklists'],
    pitch:  '"I asked about high mortality on Day 21 and it gave me 3 possible causes and what to check — in Hindi."',
    pitchBy: 'Integrator Partner, Telangana',
  },
  {
    id: 'anomaly', num: '04', icon: AlertTriangle, label: 'Anomaly Detection',
    tagline: 'Catch production drops and health problems days before they become costly.',
    metrics: [{ v: '48h', l: 'Early Warning Window' }, { v: '92%', l: 'Detection Accuracy' }, { v: 'Push', l: 'Alert Delivery' }],
    before: ['Issues noticed only during weekly visits', 'Mortality spike catches farmer off guard', 'No pattern recognition across batches'],
    after:  ['ML flags FCR spike, water drop, temp variance', 'Push alerts with severity level (low/med/high)', 'Root cause hint in every alert message'],
    pitch:  '"We got an alert that water intake dropped 23% before any bird showed symptoms. We fixed the drinker line the same day."',
    pitchBy: 'Poultry Integrator, Gujarat',
  },
  {
    id: 'gpu', num: '05', icon: Zap, label: 'High-Performance AI Backend',
    tagline: 'GPU-optimized inference so every farm gets fast predictions even at scale.',
    metrics: [{ v: '10×', l: 'Faster than CPU' }, { v: '50k+', l: 'Birds Supported' }, { v: 'CUDA', l: 'Optimized Stack' }],
    before: ['Batch ML jobs run overnight on CPU servers', 'Predictions delayed by hours', 'Cannot scale to new integrator partners fast'],
    after:  ['NVIDIA GPU-powered inference in milliseconds', 'Same model runs across 50,000-bird farms in real time', 'Horizontal scaling ready for national rollout'],
    pitch:  '"The platform handles our entire integrator network — 40 farms, live data, instant predictions. No lag at all."',
    pitchBy: 'CTO, Poultry Integrator Network',
  },
];

const stats = [
  { v: '18%',   l: 'Average Feed Waste Reduction' },
  { v: '5+ hrs', l: 'Saved Per Farm Per Week' },
  { v: '48h',   l: 'Early Anomaly Warning Window' },
  { v: '10×',   l: 'Faster AI with GPU Backend' },
];

const impact = [
  { icon: '🌾', label: 'Feed cost down', sub: '18% average reduction across farms' },
  { icon: '📈', label: 'FCR improved', sub: 'Reach 1.75 target faster' },
  { icon: '🐔', label: 'Mortality reduced', sub: 'Early detection saves birds' },
  { icon: '⚡', label: 'Decisions faster', sub: 'AI replaces hours of manual work' },
];

export default function HomePage({ onNav }) {
  const [active, setActive] = useState(0);
  const [hov, setHov] = useState(null);
  const sol = solutions[active];
  const Icon = sol.icon;

  return (
    <div style={{ paddingTop: 64 }}>

      {/* Hero */}
      <section style={{ background: '#fff', padding: '80px 28px 72px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 20, padding: '5px 14px', marginBottom: 28 }}>
            <Leaf size={12} color="#16A34A" />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#15803D', letterSpacing: '0.3px' }}>Precision Agriculture · Poultry AI</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5.5vw, 60px)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.12, letterSpacing: '-1px', marginBottom: 22 }}>
            Turn Farm Data Into<br />
            <span style={{ color: '#16A34A' }}>Smarter Decisions</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 36, maxWidth: 600, margin: '0 auto 36px' }}>
            Yiieldy's AI suite predicts feed needs, detects health anomalies early, and gives farmers instant guidance — so every flock performs at its best.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNav('demo')}
              onMouseEnter={() => setHov('hero-demo')} onMouseLeave={() => setHov(null)}
              style={{ padding: '13px 28px', borderRadius: 8, border: 'none', background: '#16A34A', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: hov === 'hero-demo' ? '0 6px 20px rgba(22,163,74,0.45)' : '0 3px 10px rgba(22,163,74,0.3)', transition: 'all 0.15s' }}>
              Request a Demo →
            </button>
            <button onClick={() => onNav('feed')}
              onMouseEnter={() => setHov('hero-explore')} onMouseLeave={() => setHov(null)}
              style={{ padding: '13px 28px', borderRadius: 8, border: '1px solid var(--border)', background: hov === 'hero-explore' ? '#F9FAFB' : '#fff', color: 'var(--text-2)', fontSize: 15, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
              Explore Solutions
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#F9FAFB', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '36px 28px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: '#16A34A', letterSpacing: '-1px', fontFamily: "'Playfair Display', serif" }}>{s.v}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 AI Solutions */}
      <section style={{ padding: '80px 28px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>5 AI-Powered Capabilities</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>Everything Your Farm Needs</h2>
          </div>

          {/* Tab selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            {solutions.map((s, i) => {
              const TabIcon = s.icon;
              return (
                <button key={s.id} onClick={() => setActive(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 8, border: `1px solid ${active === i ? '#16A34A' : 'var(--border)'}`, background: active === i ? '#F0FDF4' : '#fff', color: active === i ? '#15803D' : 'var(--muted)', fontSize: 13, fontWeight: active === i ? 600 : 500, cursor: 'pointer', transition: 'all 0.15s' }}>
                  <TabIcon size={14} />
                  <span style={{ display: 'none' }}>{s.num} </span>{s.label}
                </button>
              );
            })}
          </div>

          {/* Active solution card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            {/* Left */}
            <div style={{ padding: '40px 36px', background: '#fff', borderRight: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color="#16A34A" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', letterSpacing: '1px', textTransform: 'uppercase' }}>Solution {sol.num}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginTop: 1 }}>{sol.label}</div>
                </div>
              </div>
              <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 28 }}>{sol.tagline}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
                {sol.metrics.map(m => (
                  <div key={m.l} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#16A34A', fontFamily: "'Playfair Display', serif" }}>{m.v}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>{m.l}</div>
                  </div>
                ))}
              </div>
              <blockquote style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderLeft: '3px solid #16A34A', borderRadius: 8, padding: '14px 16px', marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 8 }}>{sol.pitch}</p>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>— {sol.pitchBy}</span>
              </blockquote>
              <button onClick={() => onNav(sol.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 8, border: 'none', background: '#16A34A', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                See Live Demo <ArrowRight size={13} />
              </button>
            </div>

            {/* Right — Before/After */}
            <div style={{ padding: '40px 36px', background: '#F9FAFB' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 20 }}>Before vs. After Yiieldy AI</div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#FEE2E2', border: '1px solid #FECACA', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><X size={9} color="#DC2626" /></span>
                  WITHOUT AI
                </div>
                {sol.before.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 10 }}>
                    <X size={13} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#DCFCE7', border: '1px solid #BBF7D0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Check size={9} color="#16A34A" /></span>
                  WITH YIIELDY AI
                </div>
                {sol.after.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 10 }}>
                    <Check size={13} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Impact */}
      <section style={{ padding: '72px 28px', background: '#F9FAFB', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px', marginBottom: 12 }}>Combined Farm Impact</h2>
            <p style={{ fontSize: 15, color: 'var(--muted)' }}>All 5 solutions working together for a complete transformation</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {impact.map(i => (
              <div key={i.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{i.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>{i.label}</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.4 }}>{i.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Poultry Section */}
      <section style={{ padding: '72px 28px', background: '#fff', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#16A34A', marginBottom: 12 }}>Built for Poultry Farmers</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 18 }}>
              From Chick Placement to Market Day
            </h2>
            <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
              Every AI model in Yiieldy is trained on poultry-specific data — broiler growth curves, FCR benchmarks, mortality baselines, and feed cost patterns for Indian farms. No generic predictions.
            </p>
            {['Broiler & layer support', 'FCR benchmarks by breed', 'Multi-house farm management', 'Integrator network ready', 'Hindi & English support'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={11} color="#16A34A" />
                </div>
                <span style={{ fontSize: 13.5, color: 'var(--text-2)' }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Flock Age Tracked', value: 'Day 1–45' },
              { label: 'Feed Cycles/Day', value: '4–6 times' },
              { label: 'FCR Target', value: '< 1.75' },
              { label: 'Mortality Alert', value: '> 0.5%/day' },
            ].map(c => (
              <div key={c.label} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 16px' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#16A34A', fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>{c.value}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 28px', background: '#0D1117', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #16A34A, #22C55E)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Leaf size={22} color="#fff" fill="#fff" />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 16 }}>
            Ready to See It on Your Farm?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 36 }}>
            Book a 30-minute live demo and we'll show all 5 AI solutions running on real farm data — no setup required.
          </p>
          <button onClick={() => onNav('demo')}
            onMouseEnter={() => setHov('cta')} onMouseLeave={() => setHov(null)}
            style={{ padding: '14px 36px', borderRadius: 8, border: 'none', background: '#16A34A', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: hov === 'cta' ? '0 8px 24px rgba(22,163,74,0.5)' : '0 4px 14px rgba(22,163,74,0.35)', transition: 'all 0.15s' }}>
            Book a Free Demo →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0D1117', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 28px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #16A34A, #22C55E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf size={13} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Yiieldy <span style={{ color: '#22C55E', fontWeight: 400, fontSize: 12 }}>AI</span></span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>Precision agriculture AI for poultry and crop farmers.</p>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 14 }}>AI Solutions</div>
              {['Feed Optimization', 'Performance Dashboard', 'Farm AI Assistant', 'Anomaly Detection', 'GPU Backend'].map(l => (
                <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 14 }}>Platform</div>
              {['Poultry', 'Crops', 'Integrators', 'API Docs', 'Pricing'].map(l => (
                <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 14 }}>Company</div>
              {['About', 'Blog', 'Careers', 'Contact', 'Privacy'].map(l => (
                <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2025 Yiieldy. All rights reserved.</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Built with Jashom AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
