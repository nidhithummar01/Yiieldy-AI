import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { flockHealth, kpis, farmBatches } from '../data/mockData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Performance Dashboard</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Flock health trends, KPIs, and multi-house overview in one view</p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", marginBottom: 4 }}>{k.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>Target: {k.target}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: k.up ? '#16A34A' : '#DC2626', background: k.up ? '#F0FDF4' : '#FEF2F2', borderRadius: 4, padding: '1px 6px' }}>{k.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Weight chart */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Body Weight Progression (kg)</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={flockHealth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }} />
              <Line type="monotone" dataKey="weight" stroke="#16A34A" strokeWidth={2.5} dot={{ fill: '#16A34A', r: 4 }} name="Avg Weight (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* FCR chart */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>FCR Trend by Week</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={flockHealth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[1.5, 2.1]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }} />
              <Line type="monotone" dataKey="fcr" stroke="#CA8A04" strokeWidth={2.5} dot={{ fill: '#CA8A04', r: 4 }} name="FCR" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Farm Batches Table */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Active Farm Batches</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['House', 'Batch', 'Age (days)', 'Birds', 'FCR', 'Weight (kg)', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {farmBatches.map((b, i) => (
                <tr key={b.id} style={{ borderBottom: i < farmBatches.length - 1 ? '1px solid var(--border-l)' : 'none' }}>
                  <td style={{ padding: '12px 12px', fontWeight: 600, color: 'var(--text)' }}>{b.house}</td>
                  <td style={{ padding: '12px 12px', color: 'var(--muted)' }}>{b.batch}</td>
                  <td style={{ padding: '12px 12px', color: 'var(--text-2)' }}>Day {b.age}</td>
                  <td style={{ padding: '12px 12px', color: 'var(--text-2)' }}>{b.birds.toLocaleString()}</td>
                  <td style={{ padding: '12px 12px', color: b.fcr > 1.9 ? '#DC2626' : b.fcr > 1.8 ? '#CA8A04' : '#16A34A', fontWeight: 600 }}>{b.fcr}</td>
                  <td style={{ padding: '12px 12px', color: 'var(--text-2)' }}>{b.weight} kg</td>
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: b.status === 'good' ? '#16A34A' : b.status === 'warning' ? '#CA8A04' : '#6B7280', background: b.status === 'good' ? '#F0FDF4' : b.status === 'warning' ? '#FFFBEB' : '#F9FAFB', border: `1px solid ${b.status === 'good' ? '#BBF7D0' : b.status === 'warning' ? '#FDE68A' : '#E5E7EB'}`, borderRadius: 6, padding: '3px 10px' }}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
