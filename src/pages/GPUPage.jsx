import { Zap, Server, Clock, TrendingUp } from 'lucide-react';

const specs = [
  { label: 'GPU Architecture', value: 'NVIDIA CUDA' },
  { label: 'Inference Speed', value: '< 50ms' },
  { label: 'Throughput', value: '10,000 req/min' },
  { label: 'Model Precision', value: 'FP16 optimized' },
  { label: 'Max Flock Size', value: '50,000+ birds' },
  { label: 'Concurrent Farms', value: 'Unlimited' },
];

const benchmarks = [
  { label: 'Feed prediction (1 house)', cpu: '2,400ms', gpu: '48ms', speedup: '50×' },
  { label: 'Anomaly scan (full farm)', cpu: '8,200ms', gpu: '210ms', speedup: '39×' },
  { label: 'FCR forecast (7-day)', cpu: '3,900ms', gpu: '95ms', speedup: '41×' },
  { label: 'Batch weight estimate', cpu: '1,100ms', gpu: '28ms', speedup: '39×' },
];

export default function GPUPage() {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>High-Performance AI Backend</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>GPU-optimized inference so every farm gets fast, accurate predictions at any scale</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { v: '10×', l: 'Faster than CPU', icon: Zap },
          { v: '< 50ms', l: 'Inference Latency', icon: Clock },
          { v: '50k+', l: 'Birds per Farm', icon: Server },
          { v: '99.9%', l: 'Uptime SLA', icon: TrendingUp },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.l} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={14} color="#16A34A" />
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#16A34A', fontFamily: "'Playfair Display', serif" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{s.l}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Tech specs */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Technical Specifications</div>
          {specs.map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-l)' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{s.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Benchmarks */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>CPU vs GPU Benchmark</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px 16px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
            <span>Task</span><span>CPU</span><span>GPU</span><span>Speedup</span>
          </div>
          {benchmarks.map(b => (
            <div key={b.label} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px 16px', padding: '10px 0', borderBottom: '1px solid var(--border-l)', alignItems: 'center' }}>
              <span style={{ fontSize: 12.5, color: 'var(--text-2)' }}>{b.label}</span>
              <span style={{ fontSize: 12, color: '#DC2626', fontWeight: 500 }}>{b.cpu}</span>
              <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>{b.gpu}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 5, padding: '2px 8px' }}>{b.speedup}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture note */}
      <div style={{ marginTop: 20, background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '24px 28px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Architecture Overview</div>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 0 }}>
          Yiieldy's AI backend runs on NVIDIA GPU instances with CUDA-optimized inference pipelines. All 5 AI models (feed prediction, FCR forecasting, anomaly detection, weight estimation, chatbot NLP) share a single GPU cluster with model parallelism. Data from IoT sensors, feed dispensers, and weighing scales feeds into a real-time stream processor before hitting the inference layer — delivering farm insights in under 50ms end-to-end.
        </p>
      </div>
    </div>
  );
}
