import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { feedTrend, recommendations } from '../data/mockData';
import { Check, X, TrendingDown, Clock, AlertCircle } from 'lucide-react';

const stats = [
  { v: '18%', l: 'Feed Waste Reduced', icon: TrendingDown },
  { v: '₹420', l: 'Saved per Batch/Day', icon: Check },
  { v: '3 days', l: 'Prediction Horizon', icon: Clock },
  { v: '6×/day', l: 'Feed Schedule Updates', icon: AlertCircle },
];

export default function FeedPage() {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Feed Optimization AI</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Predict exact feed quantity and timing to cut waste and improve FCR</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.l} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={14} color="#16A34A" />
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#16A34A', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{s.l}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Feed Trend Chart */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Feed Consumption vs Prediction (kg/day)</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={feedTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[360, 460]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="actual" stroke="#16A34A" fill="#F0FDF4" strokeWidth={2} name="Actual (kg)" connectNulls={false} />
              <Area type="monotone" dataKey="predicted" stroke="#22C55E" fill="transparent" strokeWidth={2} strokeDasharray="5 3" name="Predicted (kg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Chart */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Daily Feed Waste (kg)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={feedTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }} />
              <ReferenceLine y={30} stroke="#CA8A04" strokeDasharray="4 3" label={{ value: 'Target', position: 'right', fontSize: 10, fill: '#CA8A04' }} />
              <Bar dataKey="waste" fill="#FCA5A5" radius={[4, 4, 0, 0]} name="Waste (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>AI Feed Recommendations</div>
        <div style={{ display: 'grid', gap: 10 }}>
          {recommendations.map(r => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10 }}>
              <span style={{ fontSize: 22 }}>{r.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{r.action}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{r.flock}: {r.reason}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: r.priority === 'high' ? '#DC2626' : r.priority === 'medium' ? '#CA8A04' : '#16A34A', background: r.priority === 'high' ? '#FEF2F2' : r.priority === 'medium' ? '#FFFBEB' : '#F0FDF4', border: `1px solid ${r.priority === 'high' ? '#FECACA' : r.priority === 'medium' ? '#FDE68A' : '#BBF7D0'}`, borderRadius: 6, padding: '3px 10px' }}>{r.priority}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#16A34A' }}>{r.saving}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
