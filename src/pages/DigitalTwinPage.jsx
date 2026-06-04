import { useState } from 'react';
import { FlaskConical, TrendingDown, TrendingUp, Minus, Play, RotateCcw } from 'lucide-react';

const scenarios = [
  { id: 'feed-reduce', label: 'Reduce feed quantity by 5%' },
  { id: 'feed-increase', label: 'Increase feed quantity by 8%' },
  { id: 'freq-increase', label: 'Increase feeding frequency (+1/day)' },
  { id: 'temp-lower', label: 'Lower house temperature to 24°C' },
  { id: 'weight-target', label: 'Increase target weight to 2.6kg' },
];

const results = {
  'feed-reduce': {
    title: 'Reduce feed quantity by 5%',
    house: 'House B — Batch 12 (Day 21)',
    summary: 'Moderate feed reduction at this growth stage will save cost but may slightly impact final weight. Net positive for farms where FCR is already elevated.',
    metrics: [
      { label: 'Feed Cost Savings', value: '₹18,000', delta: '-5.0%', positive: true },
      { label: 'FCR Impact', value: '+0.03', delta: 'slight increase', positive: false },
      { label: 'Final Weight Change', value: '-0.05 kg', delta: 'per bird', positive: false },
      { label: 'Profit Impact (Net)', value: '+₹11,400', delta: 'per cycle', positive: true },
      { label: 'Mortality Risk', value: 'No change', delta: 'stable', positive: true },
      { label: 'Days to Market', value: '+0.5 days', delta: 'minor delay', positive: false },
    ],
    recommendation: 'Proceed with caution. Implement for 3 days and monitor FCR. If FCR does not exceed 2.10, continue for the full cycle.',
    confidence: 87,
  },
  'feed-increase': {
    title: 'Increase feed quantity by 8%',
    house: 'House B — Batch 12 (Day 21)',
    summary: 'Increasing feed at this stage risks overfeeding given the current FCR elevation. Higher intake may not convert to weight gain proportionally.',
    metrics: [
      { label: 'Feed Cost Increase', value: '₹28,800', delta: '+8.0%', positive: false },
      { label: 'FCR Impact', value: '+0.09', delta: 'worsens', positive: false },
      { label: 'Final Weight Change', value: '+0.03 kg', delta: 'per bird', positive: true },
      { label: 'Profit Impact (Net)', value: '-₹17,200', delta: 'per cycle', positive: false },
      { label: 'Waste Increase', value: '+12%', delta: 'estimated', positive: false },
      { label: 'Days to Market', value: 'No change', delta: 'stable', positive: true },
    ],
    recommendation: 'Not recommended at current FCR levels. Address FCR cause first before increasing feed volume.',
    confidence: 91,
  },
  'freq-increase': {
    title: 'Increase feeding frequency (+1 per day)',
    house: 'House A — Batch 11 (Day 32)',
    summary: 'Adding one feeding cycle distributes intake more evenly, reducing peak gut load and improving nutrient absorption efficiency.',
    metrics: [
      { label: 'Feed Cost Change', value: '+₹2,200', delta: 'labour cost', positive: false },
      { label: 'FCR Impact', value: '-0.04', delta: 'improves', positive: true },
      { label: 'Final Weight Change', value: '+0.08 kg', delta: 'per bird', positive: true },
      { label: 'Profit Impact (Net)', value: '+₹8,600', delta: 'per cycle', positive: true },
      { label: 'Mortality Risk', value: '-0.1%', delta: 'reduced', positive: true },
      { label: 'Days to Market', value: '-0.5 days', delta: 'faster finish', positive: true },
    ],
    recommendation: 'Recommended. High confidence outcome. Add a 10pm feeding cycle. Review after 7 days.',
    confidence: 94,
  },
  'temp-lower': {
    title: 'Lower house temperature to 24°C',
    house: 'House C — Batch 10 (Day 40)',
    summary: 'At Day 40, birds thrive at lower temperatures. Reducing temperature reduces heat stress and improves feed efficiency in final finishing week.',
    metrics: [
      { label: 'Energy Cost Change', value: '-₹3,100', delta: 'savings', positive: true },
      { label: 'FCR Impact', value: '-0.03', delta: 'improves', positive: true },
      { label: 'Final Weight Change', value: '+0.12 kg', delta: 'per bird', positive: true },
      { label: 'Profit Impact (Net)', value: '+₹14,200', delta: 'per cycle', positive: true },
      { label: 'Mortality Risk', value: 'No change', delta: 'stable', positive: true },
      { label: 'Days to Market', value: 'No change', delta: 'stable', positive: true },
    ],
    recommendation: 'Strongly recommended for Day 38–45 batches. Lower temperature to 24°C immediately.',
    confidence: 96,
  },
  'weight-target': {
    title: 'Increase target weight to 2.6kg',
    house: 'House A — Batch 11 (Day 32)',
    summary: 'Extending grow-out to hit 2.6kg increases revenue per bird but adds feed and housing cost. Projection depends on current trajectory.',
    metrics: [
      { label: 'Additional Feed Cost', value: '+₹36,000', delta: 'estimated', positive: false },
      { label: 'Revenue Increase', value: '+₹74,000', delta: 'at market price', positive: true },
      { label: 'FCR Impact', value: '+0.06', delta: 'slight increase', positive: false },
      { label: 'Profit Impact (Net)', value: '+₹38,000', delta: 'per cycle', positive: true },
      { label: 'Days to Market', value: '+4 days', delta: 'extended grow-out', positive: false },
      { label: 'Mortality Risk', value: '+0.2%', delta: 'slight increase', positive: false },
    ],
    recommendation: 'Recommended if market price supports premium weight bracket. Confirm buyer pricing before extending.',
    confidence: 83,
  },
};

export default function DigitalTwinPage() {
  const [selected, setSelected] = useState('feed-reduce');
  const [simulated, setSimulated] = useState(false);
  const [running, setRunning] = useState(false);
  const result = results[selected];

  const runSim = async () => {
    setSimulated(false);
    setRunning(true);
    await new Promise(r => setTimeout(r, 1400));
    setRunning(false);
    setSimulated(true);
  };

  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Farm Digital Twin Simulator</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Test any farm decision virtually and see predicted outcomes before changing anything on the real farm</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
        {/* Scenario selector */}
        <div>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Select a Scenario</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Choose a farm decision to simulate</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {scenarios.map(s => (
                <button key={s.id} onClick={() => { setSelected(s.id); setSimulated(false); }}
                  style={{ padding: '11px 14px', borderRadius: 9, border: `1px solid ${selected === s.id ? '#16A34A' : 'var(--border)'}`, background: selected === s.id ? '#F0FDF4' : '#fff', color: selected === s.id ? '#15803D' : 'var(--text-2)', fontSize: 13, fontWeight: selected === s.id ? 600 : 400, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Farm Model Inputs</div>
            {[
              { l: 'Batch Age', v: '21 days' },
              { l: 'Current FCR', v: '2.02' },
              { l: 'Avg Weight', v: '1.62 kg' },
              { l: 'Birds', v: '20,000' },
              { l: 'House', v: 'House B' },
              { l: 'Mortality Rate', v: '0.3%' },
            ].map(r => (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-l)', fontSize: 12.5 }}>
                <span style={{ color: 'var(--muted)' }}>{r.l}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>{r.v}</span>
              </div>
            ))}
          </div>

          <button onClick={runSim} disabled={running}
            style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: running ? '#9CA3AF' : '#16A34A', color: '#fff', fontSize: 14, fontWeight: 700, cursor: running ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.15s' }}>
            {running ? (
              <>
                <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                Running simulation…
              </>
            ) : (
              <><Play size={15} /> Run Simulation</>
            )}
          </button>
        </div>

        {/* Results panel */}
        <div>
          {!simulated && !running && (
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '48px 32px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <FlaskConical size={40} color="#D1D5DB" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--muted)', marginBottom: 8 }}>No simulation run yet</div>
              <div style={{ fontSize: 13, color: 'var(--muted-l)' }}>Select a scenario and click Run Simulation to see predicted outcomes</div>
            </div>
          )}

          {running && (
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '48px 32px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 40, border: '3px solid #F0FDF4', borderTop: '3px solid #16A34A', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 20 }} />
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Running farm simulation…</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>AI is modelling outcomes using historical batch data</div>
            </div>
          )}

          {simulated && result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Result header */}
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FlaskConical size={17} color="#16A34A" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Simulation Complete · {result.confidence}% Confidence</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{result.title}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Applied to: {result.house}</div>
                <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>{result.summary}</p>
              </div>

              {/* Predicted metrics */}
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Predicted Outcomes</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  {result.metrics.map(m => (
                    <div key={m.label} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 14px' }}>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>{m.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: m.positive ? '#16A34A' : '#DC2626', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", marginBottom: 3 }}>{m.value}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                        {m.positive ? <TrendingUp size={11} color="#16A34A" /> : <TrendingDown size={11} color="#DC2626" />}
                        <span style={{ color: m.positive ? '#16A34A' : '#DC2626' }}>{m.delta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: '18px 24px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FlaskConical size={15} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>AI Recommendation</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{result.recommendation}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
