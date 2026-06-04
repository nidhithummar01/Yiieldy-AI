import { useState } from 'react';
import { ClipboardList, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Zap, Clock, TrendingUp } from 'lucide-react';

const alertsWithPlans = [
  {
    id: 1,
    severity: 'high',
    flock: 'House B — Batch 12',
    issue: 'FCR increased by 12% above baseline',
    time: '2h ago',
    metric: { label: 'Current FCR', value: '2.02', delta: '+12%', bad: true },
    steps: [
      { num: 1, action: 'Check feeder height settings', detail: 'Adjust feeders to match bird age (Day 21 = 45cm). Incorrect height causes feed spillage and overuse.', urgency: 'Immediate' },
      { num: 2, action: 'Inspect feed quality and moisture', detail: 'Check latest batch for moisture content >14%. Spoiled or clumped feed reduces intake efficiency.', urgency: 'Within 2 hours' },
      { num: 3, action: 'Verify all water line functionality', detail: 'Low water intake directly causes FCR to spike. Check pressure, nipple flow rate, and line blockages.', urgency: 'Within 2 hours' },
      { num: 4, action: 'Review house temperature', detail: 'Temperature above 30°C increases heat stress and reduces feed conversion. Target 24–26°C at Day 21.', urgency: 'Today' },
      { num: 5, action: 'Monitor bird activity for 48 hours', detail: 'Observe feeding behavior at 6am, 12pm, 6pm. Flag any lethargy or reduced flock movement.', urgency: '48h window' },
    ],
    expected: { saving: '₹1,800/day', fcr: 'FCR target: 1.82 within 5 days', risk: 'Prevents ₹22,000 loss if uncorrected' },
  },
  {
    id: 2,
    severity: 'medium',
    flock: 'House A — Batch 11',
    issue: 'Water intake dropped 23% — possible drinker blockage',
    time: '5h ago',
    metric: { label: 'Water Intake Drop', value: '-23%', delta: 'vs avg', bad: true },
    steps: [
      { num: 1, action: 'Inspect Zone 3 drinker lines', detail: 'Last sensor reading shows Zone 3 as primary source of drop. Check nipple flow individually.', urgency: 'Immediate' },
      { num: 2, action: 'Flush water lines end-to-end', detail: 'Flush all lines to clear biofilm or mineral buildup. Use approved sanitizer at 1:500 ratio.', urgency: 'Today' },
      { num: 3, action: 'Check water pressure at header tank', detail: 'Low pressure = <15 PSI. Adjust regulator if below threshold.', urgency: 'Today' },
      { num: 4, action: 'Monitor hourly intake for 24 hours', detail: 'Set alert threshold at -10% from restored baseline. If intake does not recover, escalate to field vet.', urgency: '24h window' },
    ],
    expected: { saving: 'Prevent health risk', fcr: 'Stable FCR maintained', risk: 'Reduces mortality risk by ~60%' },
  },
  {
    id: 3,
    severity: 'low',
    flock: 'House C — Batch 10',
    issue: 'Temperature variance above normal at 3 AM',
    time: '8h ago',
    metric: { label: 'Temp Variance', value: '+3.2°C', delta: 'at 3am', bad: false },
    steps: [
      { num: 1, action: 'Check inlet fan controller settings', detail: 'Overnight temperature drops can indicate fan malfunction. Review controller logs for 12am–4am window.', urgency: 'Today' },
      { num: 2, action: 'Inspect curtain sealing on north wall', detail: 'Cold air infiltration through loose curtains is a common cause of 3am temperature spikes.', urgency: 'Today' },
      { num: 3, action: 'Review heating system setpoints', detail: 'For Day 40 birds, nighttime target should be 22°C. Verify setpoints match age chart.', urgency: 'This week' },
    ],
    expected: { saving: '+0.08kg/bird', fcr: 'Optimal finish weight protected', risk: 'Minor — resolved within 1 day' },
  },
];

const severityStyle = {
  high:   { text: '#DC2626', bg: '#FEF2F2', border: '#FECACA', badge: 'HIGH' },
  medium: { text: '#CA8A04', bg: '#FFFBEB', border: '#FDE68A', badge: 'MEDIUM' },
  low:    { text: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0', badge: 'LOW' },
};

const urgencyColor = { 'Immediate': '#DC2626', 'Within 2 hours': '#CA8A04', 'Today': '#1D4ED8', '24h window': '#7C3AED', '48h window': '#7C3AED', 'This week': '#6B7280' };

export default function ActionPlanPage() {
  const [expanded, setExpanded] = useState({ 1: true });

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>AI Action Plan Generator</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Every alert comes with a customized, step-by-step corrective action plan — no guesswork needed</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { v: alertsWithPlans.length, l: 'Active Action Plans', icon: ClipboardList },
          { v: '< 30s', l: 'Plan Generation Time', icon: Zap },
          { v: '5 steps', l: 'Avg Actions Per Alert', icon: CheckCircle },
          { v: '48h', l: 'Resolution Window', icon: Clock },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.l} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={14} color="#16A34A" />
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#16A34A', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{s.l}</div>
            </div>
          );
        })}
      </div>

      {/* Action Plans */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {alertsWithPlans.map(alert => {
          const sev = severityStyle[alert.severity];
          const isOpen = expanded[alert.id];
          return (
            <div key={alert.id} style={{ background: '#fff', border: `1px solid ${isOpen ? sev.border : 'var(--border)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              {/* Alert header */}
              <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', background: isOpen ? sev.bg : '#fff', transition: 'background 0.2s' }} onClick={() => toggle(alert.id)}>
                <AlertTriangle size={18} color={sev.text} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: sev.text, background: '#fff', border: `1px solid ${sev.border}`, borderRadius: 5, padding: '2px 8px' }}>{sev.badge}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{alert.flock}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted-l)' }}>· {alert.time}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{alert.issue}</div>
                </div>
                <div style={{ textAlign: 'center', flexShrink: 0, background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: alert.metric.bad ? '#DC2626' : '#16A34A' }}>{alert.metric.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{alert.metric.label}</div>
                </div>
                {isOpen ? <ChevronUp size={18} color="var(--muted)" /> : <ChevronDown size={18} color="var(--muted)" />}
              </div>

              {/* Action steps */}
              {isOpen && (
                <div style={{ padding: '0 20px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.8px', textTransform: 'uppercase', margin: '16px 0 12px' }}>AI Recommended Action Plan</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {alert.steps.map(step => (
                      <div key={step.num} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#16A34A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{step.num}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{step.action}</div>
                          <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>{step.detail}</div>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: urgencyColor[step.urgency] || '#6B7280', background: '#fff', border: `1px solid ${urgencyColor[step.urgency] || '#E5E7EB'}22`, borderRadius: 6, padding: '3px 9px', height: 'fit-content', flexShrink: 0, whiteSpace: 'nowrap' }}>{step.urgency}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expected outcomes */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
                    {[
                      { label: 'Cost Saving', value: alert.expected.saving },
                      { label: 'FCR Outcome', value: alert.expected.fcr },
                      { label: 'Risk Avoided', value: alert.expected.risk },
                    ].map(o => (
                      <div key={o.label} style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '12px 14px' }}>
                        <div style={{ fontSize: 11, color: '#16A34A', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{o.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{o.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
