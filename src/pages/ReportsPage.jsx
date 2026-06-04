import { useState } from 'react';
import { FileText, Download, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weeklyFCR = [
  { week: 'W1', fcr: 1.88 }, { week: 'W2', fcr: 1.85 }, { week: 'W3', fcr: 1.86 },
  { week: 'W4', fcr: 1.84 }, { week: 'W5', fcr: 1.82 }, { week: 'W6', fcr: 1.79 },
];
const feedCost = [
  { week: 'W1', cost: 84000 }, { week: 'W2', cost: 82000 }, { week: 'W3', cost: 83000 },
  { week: 'W4', cost: 79000 }, { week: 'W5', cost: 78000 }, { week: 'W6', cost: 77000 },
];

const reports = [
  { id: 1, title: 'Weekly Executive Summary — Week 23', date: 'Jun 2, 2025', type: 'weekly', status: 'ready' },
  { id: 2, title: 'Monthly Performance Report — May 2025', date: 'Jun 1, 2025', type: 'monthly', status: 'ready' },
  { id: 3, title: 'FCR Deep Dive — House B Batch 12', date: 'May 29, 2025', type: 'analysis', status: 'ready' },
  { id: 4, title: 'Mortality Risk Assessment — Q2 2025', date: 'May 25, 2025', type: 'risk', status: 'ready' },
];

const typeStyle = {
  weekly:   { color: '#1D4ED8', bg: '#EFF6FF', label: 'Weekly' },
  monthly:  { color: '#7C3AED', bg: '#F5F3FF', label: 'Monthly' },
  analysis: { color: '#CA8A04', bg: '#FFFBEB', label: 'Analysis' },
  risk:     { color: '#DC2626', bg: '#FEF2F2', label: 'Risk' },
};

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    setGenerating(true);
    setGenerated(false);
    await new Promise(r => setTimeout(r, 1800));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>AI Executive Reports</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Auto-generated management summaries with FCR analysis, feed trends, recommendations, and profit forecasts</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* This Week's AI Summary */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={15} color="#16A34A" />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI Generated · Week 23</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Executive Summary</div>
            </div>
          </div>

          <div style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>This Week</div>
            {[
              { icon: TrendingDown, color: '#16A34A', text: 'Feed cost decreased by 7% vs last week' },
              { icon: TrendingUp,   color: '#16A34A', text: 'FCR improved from 1.86 → 1.79 across active batches' },
              { icon: TrendingDown, color: '#16A34A', text: 'Mortality reduced by 1.2% across all houses' },
              { icon: AlertTriangle,color: '#CA8A04', text: 'House B requires monitoring — declining weight gain' },
              { icon: CheckCircle,  color: '#16A34A', text: 'Feed Optimization AI saved ₹31,000 this week' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 8 }}>
                  <Icon size={13} color={item.color} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.4 }}>{item.text}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { l: 'Avg FCR (Week)', v: '1.82', good: true },
              { l: 'Feed Cost Saved', v: '₹31,000', good: true },
              { l: 'Mortality (Avg)', v: '0.31%', good: true },
              { l: 'Projected Profit', v: '+₹1.4L', good: true },
            ].map(m => (
              <div key={m.l} style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 9, padding: '12px' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#16A34A', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{m.v}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FCR Trend Chart */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '22px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>FCR Trend (6-Week View)</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Consistent improvement driven by Feed Optimization AI</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weeklyFCR}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[1.75, 1.92]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }} />
              <Area type="monotone" dataKey="fcr" stroke="#16A34A" fill="#F0FDF4" strokeWidth={2.5} name="FCR" />
            </AreaChart>
          </ResponsiveContainer>

          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4, marginTop: 20 }}>Feed Cost Trend (₹/week)</div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={feedCost}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }} formatter={v => [`₹${v.toLocaleString()}`, 'Feed Cost']} />
              <Bar dataKey="cost" fill="#BBF7D0" radius={[4, 4, 0, 0]} name="Cost (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Generate new report */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Generate New Report</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {['Weekly Summary', 'Monthly Review', 'FCR Deep Dive', 'Profit Forecast', 'Risk Assessment'].map(t => (
            <span key={t} style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid var(--border)', background: '#F9FAFB', fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500 }}>{t}</span>
          ))}
          <div style={{ flex: 1 }} />
          <button onClick={generate} disabled={generating}
            style={{ padding: '10px 22px', borderRadius: 8, border: 'none', background: generating ? '#9CA3AF' : '#16A34A', color: '#fff', fontSize: 13, fontWeight: 600, cursor: generating ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.15s' }}>
            {generating ? (
              <><div style={{ width: 13, height: 13, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />Generating…</>
            ) : (
              <><FileText size={14} />Generate Report</>
            )}
          </button>
        </div>
        {generated && (
          <div style={{ marginTop: 14, padding: '12px 16px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.2s ease' }}>
            <CheckCircle size={16} color="#16A34A" />
            <span style={{ fontSize: 13, color: '#15803D', fontWeight: 600 }}>Report generated! "AI Weekly Summary — Week 24" is ready to download.</span>
            <button style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px', borderRadius: 7, border: '1px solid #BBF7D0', background: '#fff', fontSize: 12, fontWeight: 600, color: '#16A34A', cursor: 'pointer' }}>
              <Download size={12} /> Download PDF
            </button>
          </div>
        )}
      </div>

      {/* Previous reports */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '22px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Previous Reports</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {reports.map(r => {
            const ts = typeStyle[r.type];
            return (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: ts.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={16} color={ts.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.date}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: ts.color, background: ts.bg, borderRadius: 6, padding: '3px 9px' }}>{ts.label}</span>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 13px', borderRadius: 7, border: '1px solid var(--border)', background: '#fff', fontSize: 12, fontWeight: 500, color: 'var(--text-2)', cursor: 'pointer' }}>
                  <Download size={12} /> PDF
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
