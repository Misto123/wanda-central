import { useState } from 'react';
import ImportWizard from './components/ImportWizard';

type IconName = 'grid' | 'layers' | 'queue' | 'plug' | 'settings' | 'search' | 'bell' | 'upload' | 'arrow' | 'more' | 'check';

const icons: Record<IconName, string> = {
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  queue: 'M4 6h16M4 12h16M4 18h10',
  plug: 'M9 7V3m6 4V3M7 7h10v4a5 5 0 0 1-10 0V7Zm5 9v5',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.4-3.5a7.6 7.6 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a8 8 0 0 0-1.7-1L15 3h-4l-.4 2.1a8 8 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7.6 7.6 0 0 0-.1 1.9l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 1.7 1L11 21h4l.4-2.1a8 8 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z',
  search: 'm20 20-4.5-4.5M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4',
  upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  check: 'm5 12 4 4L19 6',
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  );
}

const navigation = [
  { label: 'Dashboard', icon: 'grid' as IconName },
  { label: 'Projects', icon: 'layers' as IconName },
  { label: 'Jobs', icon: 'queue' as IconName },
  { label: 'Integrations', icon: 'plug' as IconName },
];

export default function App() {
  const [active, setActive] = useState('Dashboard');
  const [showImportWizard, setShowImportWizard] = useState(false);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">W</div>
          <h1>Wanda Central</h1>
        </div>
        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <button
              key={item.label}
              className={active === item.label ? 'active' : ''}
              onClick={() => setActive(item.label)}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
              {item.label === 'Jobs' && <b className="nav-count">2</b>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Wanda Central</span>
            <span>/</span>
            <strong>{active}</strong>
          </div>
          <div className="top-actions">
            <button className="icon-button"><Icon name="search" /></button>
            <button className="icon-button notification"><Icon name="bell" /><i /></button>
            <div className="top-avatar">BR</div>
          </div>
        </header>

        <div className="page-wrap">
          <section className="page-intro">
            <div>
              <p className="eyebrow">Friday, September 29, 2026</p>
              <h1>Good morning, Bram <span>↗</span></h1>
              <p className="intro-copy">SEO operations command center.</p>
            </div>
            <div className="intro-actions">
              <button className="primary-button" onClick={() => setShowImportWizard(true)}>
                <Icon name="upload" size={16} /> Import GSC/GA Data
              </button>
            </div>
          </section>

          <section className="metrics-overview">
            <div className="metric-card">
              <b className="metric-number">2</b>
              <span className="metric-label">Active Projects</span>
              <p className="metric-delta positive">+2 this week</p>
            </div>
            <div className="metric-card">
              <b className="metric-number">2</b>
              <span className="metric-label">Completed Jobs</span>
              <p className="metric-delta">Remote Browser</p>
            </div>
            <div className="metric-card">
              <b className="metric-number">4</b>
              <span className="metric-label">Integrations</span>
              <p className="metric-delta positive">2 active, 2 setup needed</p>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="main-column">
              <div className="queue-panel panel">
                <div className="panel-header">
                  <h3>Recent Jobs</h3>
                  <button className="icon-button"><Icon name="more" size={20} /></button>
                </div>
                <div className="queue-list">
                  <div className="queue-item running">
                    <div className="queue-status"></div>
                    <div className="queue-info">
                      <strong>Remote Browser Session #2</strong>
                      <span>QA Test - Remote Browser</span>
                      <div className="queue-meta">
                        <span className="queue-tool">Remote Browser</span>
                        <span className="queue-time">Completed 5m ago</span>
                      </div>
                    </div>
                    <div className="queue-progress">
                      <div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}></div></div>
                      <span className="progress-text">✓ Completed</span>
                    </div>
                  </div>
                  <div className="queue-item running">
                    <div className="queue-status"></div>
                    <div className="queue-info">
                      <strong>Remote Browser Session #1</strong>
                      <span>QA Test - Remote Browser</span>
                      <div className="queue-meta">
                        <span className="queue-tool">Remote Browser</span>
                        <span className="queue-time">Completed 15m ago</span>
                      </div>
                    </div>
                    <div className="queue-progress">
                      <div className="progress-bar"><div className="progress-fill" style={{width: '100%'}}></div></div>
                      <span className="progress-text">✓ Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="projects-panel panel">
                <div className="panel-header">
                  <h3>Active Projects</h3>
                  <button className="icon-button"><Icon name="more" size={20} /></button>
                </div>
                <div className="project-list">
                  <div className="project-card">
                    <div className="project-info">
                      <strong>QA Test - Remote Browser</strong>
                      <span>example.com</span>
                    </div>
                    <div className="project-stats">
                      <span className="project-badge active">Active</span>
                      <span className="project-jobs">2 jobs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="side-column">
              <div className="integrations-panel panel">
                <div className="panel-header">
                  <h3>Connected Integrations</h3>
                  <button className="icon-button"><Icon name="settings" size={16} /></button>
                </div>
                <div className="integration-list">
                  <div className="integration-item healthy">
                    <div className="integration-status"></div>
                    <div className="integration-info">
                      <strong>Remote Browser API</strong>
                      <span className="integration-url">http://65.21.199.228:3000</span>
                      <small>Puppeteer, AdsPower, BAS</small>
                    </div>
                    <span className="integration-badge">✓ Active</span>
                  </div>
                  <div className="integration-item healthy">
                    <div className="integration-status"></div>
                    <div className="integration-info">
                      <strong>Supabase Database</strong>
                      <span className="integration-url">mouycpybovknqrhknoiv.supabase.co</span>
                      <small>PostgreSQL 15 • 15 tables • 4 records</small>
                    </div>
                    <span className="integration-badge">✓ Active</span>
                  </div>
                  <div className="integration-item disconnected">
                    <div className="integration-status"></div>
                    <div className="integration-info">
                      <strong>Google Search Console</strong>
                      <span className="integration-url">Not configured</span>
                      <small>Click "Import GSC/GA Data" above</small>
                    </div>
                    <span className="integration-badge">⚙ Setup</span>
                  </div>
                  <div className="integration-item disconnected">
                    <div className="integration-status"></div>
                    <div className="integration-info">
                      <strong>Google Analytics</strong>
                      <span className="integration-url">Not configured</span>
                      <small>Click "Import GSC/GA Data" above</small>
                    </div>
                    <span className="integration-badge">⚙ Setup</span>
                  </div>
                </div>
              </div>

              <div className="insights-panel panel">
                <div className="panel-header">
                  <h3>Recent Activity</h3>
                </div>
                <div className="insight-list">
                  <div className="insight-item">
                    <div className="insight-icon">✅</div>
                    <div className="insight-content">
                      <strong>Browser session #2 completed</strong>
                      <span>10 second test run successful</span>
                      <time>5 minutes ago</time>
                    </div>
                  </div>
                  <div className="insight-item">
                    <div className="insight-icon">✅</div>
                    <div className="insight-content">
                      <strong>Browser session #1 completed</strong>
                      <span>QA test passed successfully</span>
                      <time>15 minutes ago</time>
                    </div>
                  </div>
                  <div className="insight-item">
                    <div className="insight-icon">🚀</div>
                    <div className="insight-content">
                      <strong>Project created</strong>
                      <span>QA Test - Remote Browser</span>
                      <time>20 minutes ago</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {showImportWizard && <ImportWizard onClose={() => setShowImportWizard(false)} />}
    </div>
  );
}

// Content Creator integration coming soon
