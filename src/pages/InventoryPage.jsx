import { useState } from 'react';
import { Package, AlertTriangle, CheckCircle, Plus, TrendingDown } from 'lucide-react';

const inventory = [
  { id: 1, name: 'Starter Feed',      category: 'feed',       stock: 5200, unit: 'kg', min: 2000, max: 10000, usage: 420, lastOrder: 'Jun 1', status: 'good' },
  { id: 2, name: 'Grower Feed',       category: 'feed',       stock: 1800, unit: 'kg', min: 2500, max: 12000, usage: 580, lastOrder: 'May 28', status: 'low' },
  { id: 3, name: 'Finisher Feed',     category: 'feed',       stock: 3400, unit: 'kg', min: 2000, max: 8000,  usage: 310, lastOrder: 'Jun 2', status: 'good' },
  { id: 4, name: 'Amoxicillin 20%',   category: 'medicine',   stock: 12,   unit: 'kg', min: 5,    max: 50,    usage: 0.8, lastOrder: 'May 15', status: 'good' },
  { id: 5, name: 'Vitamin E+Se Mix',  category: 'supplement', stock: 8,    unit: 'kg', min: 10,   max: 40,    usage: 1.2, lastOrder: 'May 20', status: 'low' },
  { id: 6, name: 'ND-IB Vaccine',     category: 'vaccine',    stock: 3,    unit: 'vials', min: 5, max: 20,   usage: 0,   lastOrder: 'Apr 30', status: 'critical' },
  { id: 7, name: 'Drinker Nipples',   category: 'equipment',  stock: 240,  unit: 'pcs', min: 100, max: 500,  usage: 4,   lastOrder: 'Mar 12', status: 'good' },
  { id: 8, name: 'Disinfectant Tabs', category: 'consumable', stock: 320,  unit: 'tabs', min: 200, max: 1000,usage: 28,  lastOrder: 'May 10', status: 'good' },
];

const catColor = {
  feed:       { color: '#16A34A', bg: '#F0FDF4', label: 'Feed' },
  medicine:   { color: '#1D4ED8', bg: '#EFF6FF', label: 'Medicine' },
  supplement: { color: '#7C3AED', bg: '#F5F3FF', label: 'Supplement' },
  vaccine:    { color: '#DC2626', bg: '#FEF2F2', label: 'Vaccine' },
  equipment:  { color: '#CA8A04', bg: '#FFFBEB', label: 'Equipment' },
  consumable: { color: '#6B7280', bg: '#F9FAFB', label: 'Consumable' },
};

const statusStyle = {
  good:     { color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0', label: 'In Stock' },
  low:      { color: '#CA8A04', bg: '#FFFBEB', border: '#FDE68A', label: 'Low Stock' },
  critical: { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', label: 'Critical' },
};

export default function InventoryPage() {
  const [filter, setFilter] = useState('all');
  const alerts = inventory.filter(i => i.status !== 'good');
  const filtered = filter === 'all' ? inventory : inventory.filter(i => i.category === filter);

  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Inventory Management</h1>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>Track feed, medicines, vaccines, supplements, and equipment — with auto low-stock alerts</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 20 }}>
        {[
          { v: inventory.length, l: 'Total Items', color: '#16A34A' },
          { v: inventory.filter(i => i.status === 'good').length, l: 'In Stock', color: '#16A34A' },
          { v: inventory.filter(i => i.status === 'low').length, l: 'Low Stock', color: '#CA8A04' },
          { v: inventory.filter(i => i.status === 'critical').length, l: 'Critical', color: '#DC2626' },
        ].map(s => (
          <div key={s.l} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 16px' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>{s.v}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <AlertTriangle size={15} color="#DC2626" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>Stock Alerts — {alerts.length} items need attention</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alerts.map(a => {
              const st = statusStyle[a.status];
              const daysLeft = a.usage > 0 ? Math.floor(a.stock / a.usage) : 999;
              return (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `1px solid ${st.border}`, borderRadius: 9, padding: '11px 14px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: st.color, background: st.bg, borderRadius: 5, padding: '2px 8px', flexShrink: 0 }}>{st.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flex: 1 }}>{a.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>Current: <strong style={{ color: 'var(--text-2)' }}>{a.stock} {a.unit}</strong></span>
                  {a.usage > 0 && <span style={{ fontSize: 12, color: st.color }}>~{daysLeft} days left</span>}
                  <button style={{ padding: '6px 13px', borderRadius: 7, border: '1px solid var(--border)', background: '#fff', fontSize: 12, fontWeight: 600, color: '#16A34A', cursor: 'pointer' }}>Order Now</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['all', 'feed', 'medicine', 'supplement', 'vaccine', 'equipment', 'consumable'].map(c => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ padding: '7px 16px', borderRadius: 20, border: `1px solid ${filter === c ? '#16A34A' : 'var(--border)'}`, background: filter === c ? '#F0FDF4' : '#fff', color: filter === c ? '#15803D' : 'var(--text-2)', fontSize: 12.5, fontWeight: filter === c ? 600 : 400, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s' }}>
            {c === 'all' ? 'All Items' : catColor[c]?.label || c}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 20, border: 'none', background: '#16A34A', color: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
          <Plus size={13} /> Add Item
        </button>
      </div>

      {/* Inventory table */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: '#F9FAFB' }}>
                {['Item', 'Category', 'Stock', 'Min Level', 'Daily Usage', 'Days Left', 'Last Order', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const cat = catColor[item.category];
                const st = statusStyle[item.status];
                const daysLeft = item.usage > 0 ? Math.floor(item.stock / item.usage) : '—';
                const pct = Math.min((item.stock / item.max) * 100, 100);
                return (
                  <tr key={item.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border-l)' : 'none' }}>
                    <td style={{ padding: '13px 14px', fontWeight: 600, color: 'var(--text)' }}>{item.name}</td>
                    <td style={{ padding: '13px 14px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: cat.color, background: cat.bg, borderRadius: 5, padding: '2px 8px' }}>{cat.label}</span>
                    </td>
                    <td style={{ padding: '13px 14px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-2)', marginBottom: 4 }}>{item.stock.toLocaleString()} {item.unit}</div>
                      <div style={{ width: 80, height: 4, background: '#F3F4F6', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: item.status === 'critical' ? '#DC2626' : item.status === 'low' ? '#CA8A04' : '#16A34A', borderRadius: 2, transition: 'width 0.3s' }} />
                      </div>
                    </td>
                    <td style={{ padding: '13px 14px', color: 'var(--muted)' }}>{item.min.toLocaleString()} {item.unit}</td>
                    <td style={{ padding: '13px 14px', color: 'var(--text-2)' }}>{item.usage} {item.unit}/day</td>
                    <td style={{ padding: '13px 14px', color: typeof daysLeft === 'number' && daysLeft < 7 ? '#DC2626' : typeof daysLeft === 'number' && daysLeft < 14 ? '#CA8A04' : '#16A34A', fontWeight: 600 }}>{typeof daysLeft === 'number' ? `${daysLeft}d` : daysLeft}</td>
                    <td style={{ padding: '13px 14px', color: 'var(--muted)', fontSize: 12 }}>{item.lastOrder}</td>
                    <td style={{ padding: '13px 14px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: st.color, background: st.bg, border: `1px solid ${st.border}`, borderRadius: 6, padding: '3px 9px' }}>{st.label}</span>
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
