import { anomalies, farmBatches } from '../data/mockData';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

const severityColor = { high: { text: '#DC2626', bg: '#FEF2F2', border: '#FECACA' }, medium: { text: '#CA8A04', bg: '#FFFBEB', border: '#FDE68A' }, low: { text: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' } };

export default function AnomalyPage() {
  const active = anomalies.filter(a => !a.resolved);
  const resolved = anomalies.filter(a => a.resolved);

  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Anomaly Detection</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Early warnings on production or health drops — before they become costly</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { v: active.length, l: 'Active Alerts', icon: AlertTriangle, color: '#DC2626' },
          { v: resolved.length, l: 'Resolved Today', icon: CheckCircle, color: '#16A34A' },
          { v: '48h', l: 'Avg Warning Window', icon: Clock, color: '#CA8A04' },
          { v: '92%', l: 'Detection Accuracy', icon: Zap, color: '#1D4ED8' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.l} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icon size={14} color={s.color} />
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{s.l}</div>
            </div>
          );
        })}
      </div>

      {/* Active alerts */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#DC2626', display: 'inline-block', animation: 'pulse-r 2s infinite' }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Active Alerts ({active.length})</span>
        </div>
        {active.map(a => {
          const c = severityColor[a.type];
          return (
            <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, marginBottom: 10 }}>
              <AlertTriangle size={16} color={c.text} style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{a.flock}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.4 }}>{a.msg}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.text, background: '#fff', border: `1px solid ${c.border}`, borderRadius: 6, padding: '3px 10px', display: 'block', marginBottom: 4 }}>{a.type.toUpperCase()}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{a.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resolved */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Resolved Alerts</div>
        {resolved.map(a => (
          <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 16px', background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, marginBottom: 8, opacity: 0.75 }}>
            <CheckCircle size={15} color="#16A34A" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-2)', marginBottom: 1 }}>{a.flock}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.4 }}>{a.msg}</div>
            </div>
            <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
