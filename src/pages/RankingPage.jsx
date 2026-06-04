import { Trophy, TrendingUp, TrendingDown, Minus, Award, AlertTriangle } from 'lucide-react';

const farms = [
  { rank: 1,  name: 'Farm Alpha',   location: 'Pune, MH',       score: 94, fcr: 1.71, mortality: 0.2, weightGain: 3.12, feedEff: 96, batchSuccess: 98, trend: 'up',   status: 'excellent' },
  { rank: 2,  name: 'Farm Delta',   location: 'Nashik, MH',     score: 91, fcr: 1.74, mortality: 0.3, weightGain: 3.08, feedEff: 94, batchSuccess: 96, trend: 'up',   status: 'excellent' },
  { rank: 3,  name: 'Farm Gamma',   location: 'Hyderabad, TS',  score: 88, fcr: 1.78, mortality: 0.4, weightGain: 3.01, feedEff: 91, batchSuccess: 94, trend: 'same', status: 'good' },
  { rank: 4,  name: 'Farm Zeta',    location: 'Guntur, AP',     score: 85, fcr: 1.80, mortality: 0.5, weightGain: 2.95, feedEff: 89, batchSuccess: 93, trend: 'up',   status: 'good' },
  { rank: 5,  name: 'Farm Epsilon', location: 'Coimbatore, TN', score: 82, fcr: 1.83, mortality: 0.6, weightGain: 2.88, feedEff: 87, batchSuccess: 91, trend: 'down', status: 'good' },
  { rank: 6,  name: 'Farm Beta',    location: 'Belgaum, KA',    score: 79, fcr: 1.87, mortality: 0.7, weightGain: 2.80, feedEff: 84, batchSuccess: 88, trend: 'same', status: 'average' },
  { rank: 7,  name: 'Farm Theta',   location: 'Rajkot, GJ',     score: 76, fcr: 1.91, mortality: 0.8, weightGain: 2.74, feedEff: 82, batchSuccess: 86, trend: 'down', status: 'average' },
  { rank: 8,  name: 'Farm Iota',    location: 'Bhopal, MP',     score: 72, fcr: 1.96, mortality: 1.0, weightGain: 2.62, feedEff: 78, batchSuccess: 82, trend: 'down', status: 'warning' },
];

const statusStyle = {
  excellent: { color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
  good:      { color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
  average:   { color: '#CA8A04', bg: '#FFFBEB', border: '#FDE68A' },
  warning:   { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
};

const scoreColor = (score) => score >= 90 ? '#16A34A' : score >= 80 ? '#1D4ED8' : score >= 70 ? '#CA8A04' : '#DC2626';

export default function RankingPage() {
  const top3 = farms.slice(0, 3);
  const rest = farms.slice(3);

  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Multi-Farm Ranking System</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Compare performance across all farms — identify top performers, spot problems early, and allocate resources smarter</p>
      </div>

      {/* Network overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { v: farms.length, l: 'Total Farms', color: '#16A34A' },
          { v: farms.filter(f => f.status === 'excellent').length, l: 'Excellent', color: '#16A34A' },
          { v: farms.filter(f => f.status === 'good').length, l: 'Good', color: '#1D4ED8' },
          { v: farms.filter(f => f.status === 'average' || f.status === 'warning').length, l: 'Need Attention', color: '#CA8A04' },
        ].map(s => (
          <div key={s.l} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{s.v}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Top 3 podium */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Trophy size={18} color="#CA8A04" />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Top Performers This Cycle</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {top3.map((farm, i) => (
            <div key={farm.rank} style={{ background: i === 0 ? '#FFFBEB' : '#F9FAFB', border: `1px solid ${i === 0 ? '#FDE68A' : 'var(--border)'}`, borderRadius: 12, padding: '20px', textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{farm.name}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>{farm.location}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: scoreColor(farm.score), fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{farm.score}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>Score</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <div style={{ background: '#fff', borderRadius: 6, padding: '6px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>{farm.fcr}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>FCR</div>
                </div>
                <div style={{ background: '#fff', borderRadius: 6, padding: '6px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>{farm.weightGain}kg</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Weight</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full ranking table */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '20px', overflow: 'hidden' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Full Network Ranking</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Rank', 'Farm', 'Score', 'FCR', 'Mortality', 'Weight', 'Feed Eff.', 'Batch Success', 'Trend', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {farms.map((f, i) => {
                const st = statusStyle[f.status];
                return (
                  <tr key={f.rank} style={{ borderBottom: i < farms.length - 1 ? '1px solid var(--border-l)' : 'none' }}>
                    <td style={{ padding: '12px 12px', fontWeight: 800, color: f.rank <= 3 ? '#CA8A04' : 'var(--muted)', fontSize: 14 }}>#{f.rank}</td>
                    <td style={{ padding: '12px 12px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)' }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{f.location}</div>
                    </td>
                    <td style={{ padding: '12px 12px' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: scoreColor(f.score), fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{f.score}</div>
                    </td>
                    <td style={{ padding: '12px 12px', color: f.fcr < 1.8 ? '#16A34A' : f.fcr < 1.9 ? '#CA8A04' : '#DC2626', fontWeight: 600 }}>{f.fcr}</td>
                    <td style={{ padding: '12px 12px', color: f.mortality < 0.5 ? '#16A34A' : f.mortality < 0.8 ? '#CA8A04' : '#DC2626', fontWeight: 600 }}>{f.mortality}%</td>
                    <td style={{ padding: '12px 12px', color: 'var(--text-2)' }}>{f.weightGain} kg</td>
                    <td style={{ padding: '12px 12px', color: 'var(--text-2)' }}>{f.feedEff}%</td>
                    <td style={{ padding: '12px 12px', color: 'var(--text-2)' }}>{f.batchSuccess}%</td>
                    <td style={{ padding: '12px 12px' }}>
                      {f.trend === 'up'   && <TrendingUp size={16} color="#16A34A" />}
                      {f.trend === 'down' && <TrendingDown size={16} color="#DC2626" />}
                      {f.trend === 'same' && <Minus size={16} color="#9CA3AF" />}
                    </td>
                    <td style={{ padding: '12px 12px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: st.color, background: st.bg, border: `1px solid ${st.border}`, borderRadius: 6, padding: '3px 9px' }}>{f.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
