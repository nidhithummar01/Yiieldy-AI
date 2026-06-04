import { useState } from 'react';
import { Building2, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, ChevronRight, Users } from 'lucide-react';

const farmNetwork = [
  { id: 1,  name: 'Farm Alpha',   region: 'Pune',       houses: 4,  birds: 72000,  fcr: 1.71, mortality: 0.2, score: 94, status: 'healthy',  alert: null },
  { id: 2,  name: 'Farm Delta',   region: 'Nashik',     houses: 3,  birds: 54000,  fcr: 1.74, mortality: 0.3, score: 91, status: 'healthy',  alert: null },
  { id: 3,  name: 'Farm Gamma',   region: 'Hyderabad',  houses: 5,  birds: 90000,  fcr: 1.78, mortality: 0.4, score: 88, status: 'healthy',  alert: null },
  { id: 4,  name: 'Farm Zeta',    region: 'Guntur',     houses: 4,  birds: 80000,  fcr: 1.80, mortality: 0.5, score: 85, status: 'healthy',  alert: null },
  { id: 5,  name: 'Farm Epsilon', region: 'Coimbatore', houses: 3,  birds: 60000,  fcr: 1.83, mortality: 0.6, score: 82, status: 'healthy',  alert: null },
  { id: 6,  name: 'Farm Beta',    region: 'Belgaum',    houses: 2,  birds: 40000,  fcr: 1.91, mortality: 0.9, score: 76, status: 'warning',  alert: 'FCR rising — up 9% this week' },
  { id: 7,  name: 'Farm Theta',   region: 'Rajkot',     houses: 3,  birds: 58000,  fcr: 1.96, mortality: 1.1, score: 72, status: 'warning',  alert: 'Mortality above 1% threshold' },
  { id: 8,  name: 'Farm Iota',    region: 'Bhopal',     houses: 2,  birds: 36000,  fcr: 2.08, mortality: 1.4, score: 65, status: 'critical', alert: 'FCR critical + water intake drop 28%' },
];

const statusStyle = {
  healthy:  { color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0', label: 'Healthy' },
  warning:  { color: '#CA8A04', bg: '#FFFBEB', border: '#FDE68A', label: 'Warning' },
  critical: { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', label: 'Critical' },
};

const scoreColor = (s) => s >= 85 ? '#16A34A' : s >= 75 ? '#CA8A04' : '#DC2626';

export default function IntegratorPage() {
  const [selected, setSelected] = useState(null);
  const healthy  = farmNetwork.filter(f => f.status === 'healthy').length;
  const warning  = farmNetwork.filter(f => f.status === 'warning').length;
  const critical = farmNetwork.filter(f => f.status === 'critical').length;
  const totalBirds = farmNetwork.reduce((s, f) => s + f.birds, 0);
  const avgFCR = (farmNetwork.reduce((s, f) => s + f.fcr, 0) / farmNetwork.length).toFixed(2);
  const avgMort = (farmNetwork.reduce((s, f) => s + f.mortality, 0) / farmNetwork.length).toFixed(2);

  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Integrator Management Portal</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Centralized visibility across your entire farm network — performance, alerts, rankings, and drill-down analytics</p>
      </div>

      {/* Network summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { v: farmNetwork.length, l: 'Total Farms', color: '#16A34A' },
          { v: totalBirds.toLocaleString(), l: 'Total Birds', color: '#1D4ED8' },
          { v: healthy, l: 'Healthy Farms', color: '#16A34A' },
          { v: warning, l: 'Warning Farms', color: '#CA8A04' },
          { v: critical, l: 'Critical Farms', color: '#DC2626' },
          { v: avgFCR, l: 'Network Avg FCR', color: '#16A34A' },
        ].map(s => (
          <div key={s.l} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{s.v}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Active alerts banner */}
      {(warning + critical) > 0 && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#DC2626', display: 'inline-block', animation: 'pulse-r 2s infinite', flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>{warning + critical} farms need immediate attention</span>
          <span style={{ fontSize: 13, color: '#DC2626' }}>— {critical} critical, {warning} warning</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
        {/* Farm directory */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Building2 size={16} color="#16A34A" />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Farm Directory</span>
            <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 'auto' }}>Click a farm to view details</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: '#F9FAFB' }}>
                  {['Farm', 'Region', 'Houses', 'Birds', 'FCR', 'Mortality', 'Score', 'Status', 'Alert'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {farmNetwork.map((f, i) => {
                  const st = statusStyle[f.status];
                  return (
                    <tr key={f.id} onClick={() => setSelected(selected?.id === f.id ? null : f)}
                      style={{ borderBottom: i < farmNetwork.length - 1 ? '1px solid var(--border-l)' : 'none', cursor: 'pointer', background: selected?.id === f.id ? '#F0FDF4' : 'transparent', transition: 'background 0.12s' }}
                      onMouseEnter={e => { if (selected?.id !== f.id) e.currentTarget.style.background = '#F9FAFB'; }}
                      onMouseLeave={e => { if (selected?.id !== f.id) e.currentTarget.style.background = 'transparent'; }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text)' }}>{f.name}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--muted)', fontSize: 12 }}>{f.region}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-2)' }}>{f.houses}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-2)' }}>{f.birds.toLocaleString()}</td>
                      <td style={{ padding: '12px 14px', color: f.fcr < 1.8 ? '#16A34A' : f.fcr < 2.0 ? '#CA8A04' : '#DC2626', fontWeight: 600 }}>{f.fcr}</td>
                      <td style={{ padding: '12px 14px', color: f.mortality < 0.6 ? '#16A34A' : f.mortality < 1.0 ? '#CA8A04' : '#DC2626', fontWeight: 600 }}>{f.mortality}%</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: scoreColor(f.score), fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{f.score}</span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: st.color, background: st.bg, border: `1px solid ${st.border}`, borderRadius: 6, padding: '3px 9px' }}>{st.label}</span>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 12, color: '#DC2626', maxWidth: 200 }}>
                        {f.alert ? <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><AlertTriangle size={11} />{f.alert}</span> : <span style={{ color: '#16A34A', display: 'flex', alignItems: 'center', gap: 5 }}><CheckCircle size={11} />No alerts</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Farm detail panel */}
        {selected && (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '22px', animation: 'fadeUp 0.18s ease', alignSelf: 'start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={18} color="#16A34A" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{selected.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{selected.region} · {selected.houses} houses</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 18 }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { l: 'Performance Score', v: selected.score, unit: '/100' },
                { l: 'Total Birds', v: selected.birds.toLocaleString(), unit: '' },
                { l: 'FCR', v: selected.fcr, unit: '' },
                { l: 'Mortality', v: `${selected.mortality}%`, unit: '' },
              ].map(m => (
                <div key={m.l} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, padding: '12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{m.l}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#16A34A', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{m.v}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--muted)' }}>{m.unit}</span></div>
                </div>
              ))}
            </div>

            {selected.alert && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 14px', marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <AlertTriangle size={14} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ fontSize: 13, color: '#DC2626' }}>{selected.alert}</div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['View Full Dashboard', 'Anomaly Alerts', 'Action Plan', 'Weekly Report'].map(action => (
                <button key={action} style={{ display: 'flex', alignItems: 'center', padding: '11px 14px', borderRadius: 9, border: '1px solid var(--border)', background: '#F9FAFB', color: 'var(--text-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                  onMouseLeave={e => e.currentTarget.style.background = '#F9FAFB'}>
                  {action}
                  <ChevronRight size={14} color="var(--muted)" style={{ marginLeft: 'auto' }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
