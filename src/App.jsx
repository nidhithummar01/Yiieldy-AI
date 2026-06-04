import { useState } from 'react';
import Navbar          from './components/Navbar';
import FloatingChatbot from './components/FloatingChatbot';
import HomePage        from './pages/HomePage';
import FeedPage        from './pages/FeedPage';
import DashboardPage   from './pages/DashboardPage';
import ChatbotPage     from './pages/ChatbotPage';
import AnomalyPage     from './pages/AnomalyPage';
import GPUPage         from './pages/GPUPage';
import ActionPlanPage  from './pages/ActionPlanPage';
import DigitalTwinPage from './pages/DigitalTwinPage';
import RankingPage     from './pages/RankingPage';
import ReportsPage     from './pages/ReportsPage';
import InventoryPage   from './pages/InventoryPage';
import IntegratorPage  from './pages/IntegratorPage';
import './index.css';

const PAGE_META = {
  // Core AI Solutions
  feed:          { title: 'Feed Optimization AI',           tag: 'Solution 01' },
  dashboard:     { title: 'Performance Dashboard',           tag: 'Solution 02' },
  chatbot:       { title: 'Farm AI Assistant',               tag: 'Solution 03' },
  anomaly:       { title: 'Anomaly Detection',               tag: 'Solution 04' },
  gpu:           { title: 'High-Performance AI Backend',     tag: 'Solution 05' },
  // Advanced Features
  'action-plan': { title: 'AI Action Plan Generator',        tag: 'Feature 01' },
  'digital-twin':{ title: 'Farm Digital Twin Simulator',     tag: 'Feature 02' },
  ranking:       { title: 'Multi-Farm Ranking System',       tag: 'Feature 03' },
  reports:       { title: 'AI Executive Reports',            tag: 'Feature 04' },
  inventory:     { title: 'Inventory Management',            tag: 'Feature 05' },
  integrator:    { title: 'Integrator Management Portal',    tag: 'Feature 06' },
};

function InnerPage({ pageId, children, onNav }) {
  const meta = PAGE_META[pageId] || {};
  const isFeature = meta.tag?.startsWith('Feature');
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#F9FAFB' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => onNav('home')} style={{ fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}>Home</button>
          <span style={{ color: 'var(--muted-l)', fontSize: 12 }}>/</span>
          <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{isFeature ? 'Advanced Features' : 'AI Solutions'}</span>
          <span style={{ color: 'var(--muted-l)', fontSize: 12 }}>/</span>
          <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{meta.title}</span>
          {meta.tag && (
            <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 700, color: isFeature ? '#7C3AED' : '#16A34A', background: isFeature ? '#F5F3FF' : '#F0FDF4', border: `1px solid ${isFeature ? '#DDD6FE' : '#BBF7D0'}`, borderRadius: 20, padding: '2px 10px' }}>{meta.tag}</span>
          )}
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');

  const handleNav = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (!PAGE_META[page]) {
      return <HomePage onNav={handleNav} />;
    }
    const inner = {
      feed:           <FeedPage />,
      dashboard:      <DashboardPage />,
      chatbot:        <ChatbotPage />,
      anomaly:        <AnomalyPage />,
      gpu:            <GPUPage />,
      'action-plan':  <ActionPlanPage />,
      'digital-twin': <DigitalTwinPage />,
      ranking:        <RankingPage />,
      reports:        <ReportsPage />,
      inventory:      <InventoryPage />,
      integrator:     <IntegratorPage />,
    };
    return <InnerPage pageId={page} onNav={handleNav}>{inner[page]}</InnerPage>;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Navbar onNav={handleNav} activePage={page} />
      {renderPage()}
      <FloatingChatbot />
    </div>
  );
}
