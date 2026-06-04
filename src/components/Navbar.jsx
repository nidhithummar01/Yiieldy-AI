import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Leaf, BarChart2, Brain, AlertTriangle, Zap, ArrowRight,
         ClipboardList, FlaskConical, Trophy, FileText, Package, Building2 } from 'lucide-react';

const solutions = [
  { icon: Leaf,          id: 'feed',      label: 'Feed Optimization AI',       desc: 'Predict feed quantity and timing to cut waste' },
  { icon: BarChart2,     id: 'dashboard', label: 'Performance Dashboard',       desc: 'Flock health trends and simple farm alerts' },
  { icon: Brain,         id: 'chatbot',   label: 'Farm AI Assistant',           desc: 'Instant guidance for farmers inside the app' },
  { icon: AlertTriangle, id: 'anomaly',   label: 'Anomaly Detection',           desc: 'Early warnings on production or health drops' },
  { icon: Zap,           id: 'gpu',       label: 'High-Performance AI Backend', desc: 'GPU-optimized models for fast, scalable AI' },
];

const features = [
  { icon: ClipboardList, id: 'action-plan',  label: 'AI Action Plan Generator',    desc: 'Turn alerts into step-by-step corrective actions' },
  { icon: FlaskConical,  id: 'digital-twin', label: 'Farm Digital Twin Simulator', desc: 'Test farm decisions virtually before applying them' },
  { icon: Trophy,        id: 'ranking',      label: 'Multi-Farm Ranking System',   desc: 'Compare and rank farms across your network' },
  { icon: FileText,      id: 'reports',      label: 'AI Executive Reports',        desc: 'Auto-generate management summaries and forecasts' },
  { icon: Package,       id: 'inventory',    label: 'Inventory Management',        desc: 'Track feed, medicines, vaccines and stock levels' },
  { icon: Building2,     id: 'integrator',   label: 'Integrator Management Portal',desc: 'Centralized portal for managing 100+ farms' },
];

export default function Navbar({ onNav }) {
  const [solOpen, setSolOpen]   = useState(false);
  const [featOpen, setFeatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hov, setHov]           = useState(null);
  const solRef  = useRef(null);
  const featRef = useRef(null);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);
  useEffect(() => {
    const h = (e) => {
      if (solRef.current  && !solRef.current.contains(e.target))  setSolOpen(false);
      if (featRef.current && !featRef.current.contains(e.target)) setFeatOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const link = (id, label) => (
    <button key={id} onClick={() => onNav(id)}
      onMouseEnter={() => setHov(id)} onMouseLeave={() => setHov(null)}
      style={{ padding: '7px 13px', borderRadius: 7, border: 'none', background: hov === id ? '#F3F4F6' : 'transparent', color: 'var(--text-2)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
      {label}
    </button>
  );

  const Dropdown = ({ items, open, label, dropKey, onToggle, sectionLabel, showAllId }) => (
    <div ref={dropKey === 'sol' ? solRef : featRef} style={{ position: 'relative' }}>
      <button onClick={onToggle}
        onMouseEnter={() => setHov(dropKey)} onMouseLeave={() => setHov(null)}
        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 13px', borderRadius: 7, border: 'none', background: open || hov === dropKey ? '#F3F4F6' : 'transparent', color: 'var(--text-2)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
        {label}
        <ChevronDown size={13} color="var(--muted)" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#fff', borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', padding: '6px', width: 390, animation: 'fadeUp 0.15s ease', zIndex: 100 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted-l)', letterSpacing: '0.8px', textTransform: 'uppercase', padding: '6px 10px 8px' }}>{sectionLabel}</div>
          {items.map(s => {
            const Icon = s.icon;
            return (
              <button key={s.id} onClick={() => { onNav(s.id); onToggle(); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '10px 10px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={15} color="#16A34A" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 1 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.desc}</div>
                </div>
              </button>
            );
          })}
          <div style={{ borderTop: '1px solid var(--border-l)', margin: '6px 4px 4px', paddingTop: 6 }}>
            <button onClick={() => { onNav('home'); onToggle(); }}
              style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: 'none', background: '#F3F4F6', color: 'var(--text-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              See full overview <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 64,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition: 'all 0.25s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: '100%', display: 'flex', alignItems: 'center', gap: 4 }}>

        {/* Logo */}
        <button onClick={() => onNav('home')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', marginRight: 16, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #16A34A, #22C55E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>
            Yiieldy <span style={{ color: '#16A34A', fontWeight: 400, fontSize: 13 }}>AI</span>
          </span>
        </button>

        {/* AI Solutions dropdown */}
        <Dropdown
          items={solutions}
          open={solOpen}
          label="AI Solutions"
          dropKey="sol"
          onToggle={() => { setSolOpen(o => !o); setFeatOpen(false); }}
          sectionLabel="5 AI-Powered Solutions"
        />

        {/* Advanced Features dropdown */}
        <Dropdown
          items={features}
          open={featOpen}
          label="Advanced Features"
          dropKey="feat"
          onToggle={() => { setFeatOpen(o => !o); setSolOpen(false); }}
          sectionLabel="6 Advanced Platform Features"
        />

        {link('poultry',   'Poultry')}
        {link('company',   'Company')}

        <div style={{ flex: 1 }} />

        <button onMouseEnter={() => setHov('signin')} onMouseLeave={() => setHov(null)}
          style={{ padding: '7px 16px', borderRadius: 7, border: '1px solid var(--border)', background: hov === 'signin' ? '#F9FAFB' : '#fff', color: 'var(--text-2)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
          Sign in
        </button>
        <button onClick={() => onNav('demo')}
          onMouseEnter={() => setHov('demo')} onMouseLeave={() => setHov(null)}
          style={{ padding: '8px 20px', borderRadius: 7, border: 'none', background: '#16A34A', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', boxShadow: hov === 'demo' ? '0 4px 14px rgba(22,163,74,0.4)' : '0 2px 8px rgba(22,163,74,0.25)' }}>
          Request demo →
        </button>
      </div>
    </nav>
  );
}
