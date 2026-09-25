import { useState } from 'react';

type IconName = 'grid' | 'layers' | 'key' | 'flask' | 'queue' | 'check' | 'spark' | 'file' | 'plug' | 'settings' | 'search' | 'bell' | 'plus' | 'arrow' | 'more';

const icons: Record<IconName, string> = {
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  key: 'M15 7a4 4 0 1 0-7.75 1.5L3 13v4h4v-2h2v-2h2.5A4 4 0 0 0 15 7Zm0 0h.01',
  flask: 'M9 3h6m-5 0v6l-5.4 8.4A1 1 0 0 0 5.4 19h13.2a1 1 0 0 0 .8-1.6L14 9V3m-5 10h6',
  queue: 'M4 6h16M4 12h16M4 18h10',
  check: 'm5 12 4 4L19 6',
  spark: 'm12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3ZM19 17v4m2-2h-4',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M8 13h8M8 17h5',
  plug: 'M9 7V3m6 4V3M7 7h10v4a5 5 0 0 1-10 0V7Zm5 9v5',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.4-3.5a7.6 7.6 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a8 8 0 0 0-1.7-1L15 3h-4l-.4 2.1a8 8 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7.6 7.6 0 0 0-.1 1.9l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 1.7 1L11 21h4l.4-2.1a8 8 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z',
  search: 'm20 20-4.5-4.5M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4',
  plus: 'M12 5v14M5 12h14',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={icons[name]} /></svg>;
}

const navigation: Array<{ label: string; icon: IconName }> = [
  { label: 'Dashboard', icon: 'grid' }, { label: 'Projects', icon: 'layers' }, { label: 'Keywords', icon: 'key' },
  { label: 'Experiments', icon: 'flask' }, { label: 'Jobs / Queue', icon: 'queue' }, { label: 'Tasks', icon: 'check' },
  { label: 'Insights', icon: 'spark' }, { label: 'Logs', icon: 'file' }, { label: 'Integrations', icon: 'plug' },
];

const jobs = [
  { tool: 'GCTR', project: 'Example.com', kind: 'Campaign refresh', status: 'Running', progress: 62, age: '12 min', color: 'violet' },
  { tool: 'Mentions', project: 'BnbGeeks.org', kind: 'Brand scan', status: 'Queued', progress: 0, age: 'Waiting', color: 'blue' },
  { tool: 'GCTR', project: 'OtGeeks.org', kind: 'Keyword campaign', status: 'Retrying', progress: 38, age: '2 / 3 attempts', color: 'amber' },
];

const projects = [
  { name: 'Example.com', domain: 'example.com', initials: 'EX', modules: ['GCTR', 'Mentions', 'GSC'], activity: '12 jobs this week', score: '94', color: 'violet' },
  { name: 'BnbGeeks.org', domain: 'bnbgeeks.org', initials: 'BG', modules: ['GCTR', 'Mentions'], activity: '8 jobs this week', score: '87', color: 'blue' },
  { name: 'OtGeeks.org', domain: 'otgeeks.org', initials: 'OG', modules: ['GCTR', 'GSC'], activity: '5 jobs this week', score: '76', color: 'orange' },
];

function StatusDot({ tone = 'green' }: { tone?: 'green' | 'amber' | 'red' | 'blue' }) {
  return <span className={`status-dot ${tone}`} />;
}

export default function App() {
  const [active, setActive] = useState('Dashboard');
  const [project, setProject] = useState('All projects');
  const [showToast, setShowToast] = useState(false);

  function launchJob() {
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2400);
  }

  return (
    <div className="wanda-app">
      <aside className="sidebar">
        <div className="brand-lockup"><div className="brand-mark">W</div><div><strong>wanda</strong><span>central</span></div></div>
        <div className="workspace-switcher"><div className="workspace-avatar">WC</div><div><small>Workspace</small><strong>Wanda Operations</strong></div><span className="chevron">⌄</span></div>
        <div className="nav-label">Workspace</div>
        <nav>{navigation.map((item) => <button key={item.label} className={`nav-item ${active === item.label ? 'active' : ''}`} onClick={() => setActive(item.label)}><Icon name={item.icon} size={17} /><span>{item.label}</span>{item.label === 'Jobs / Queue' && <b className="nav-count">3</b>}</button>)}</nav>
        <div className="sidebar-spacer" />
        <button className="nav-item"><Icon name="settings" size={17} /><span>Settings</span></button>
        <div className="sidebar-user"><div className="user-avatar">BR</div><div><strong>Bram Roos</strong><span>Owner</span></div><Icon name="more" size={18} /></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumbs"><span>Wanda Central</span><span>/</span><strong>{active}</strong></div><div className="top-actions"><button className="icon-button"><Icon name="search" /></button><button className="icon-button notification"><Icon name="bell" /><i /></button><div className="top-avatar">BR</div></div></header>
        <div className="page-wrap">
          <section className="page-intro"><div><p className="eyebrow">Friday, September 25, 2026</p><h1>Good morning, Bram <span>↗</span></h1><p className="intro-copy">Here&apos;s what&apos;s moving across your SEO operations.</p></div><div className="intro-actions"><select value={project} onChange={(e) => setProject(e.target.value)}><option>All projects</option>{projects.map((item) => <option key={item.name}>{item.name}</option>)}</select><button className="primary-button" onClick={launchJob}><Icon name="plus" size={16} /> Launch job</button></div></section>

          <div className="metric-grid">
            <article className="metric-card"><div className="metric-top"><span>Active projects</span><span className="metric-icon violet-bg"><Icon name="layers" size={16} /></span></div><strong>12</strong><div className="metric-bottom positive"><span>↗ 8.3%</span><small>vs. last month</small></div></article>
            <article className="metric-card"><div className="metric-top"><span>Jobs in motion</span><span className="metric-icon blue-bg"><Icon name="queue" size={16} /></span></div><strong>08</strong><div className="metric-bottom"><span className="neutral">4 queued · 4 running</span></div></article>
            <article className="metric-card"><div className="metric-top"><span>Success rate</span><span className="metric-icon green-bg"><Icon name="check" size={16} /></span></div><strong>96.4<span className="unit">%</span></strong><div className="metric-bottom positive"><span>↗ 2.1%</span><small>last 30 days</small></div></article>
            <article className="metric-card"><div className="metric-top"><span>Needs attention</span><span className="metric-icon orange-bg"><Icon name="spark" size={16} /></span></div><strong>03</strong><div className="metric-bottom warning"><span>2 retries · 1 error</span></div></article>
          </div>

          <div className="section-grid">
            <section className="panel queue-panel"><div className="panel-heading"><div><p className="eyebrow">Execution layer</p><h2>Live queue</h2></div><button className="text-button" onClick={() => setActive('Jobs / Queue')}>View queue <Icon name="arrow" size={15} /></button></div><div className="queue-list">{jobs.map((job) => <div className="job-row" key={`${job.tool}-${job.project}`}><div className={`tool-badge ${job.color}`}>{job.tool === 'GCTR' ? 'G' : 'M'}</div><div className="job-details"><div className="job-title"><strong>{job.kind}</strong><span className="job-id">{job.tool} · {job.project}</span></div><div className="job-progress"><div className="progress-track"><span className={job.color} style={{ width: `${job.progress || 9}%` }} /></div><span>{job.progress ? `${job.progress}%` : 'Next'}</span></div></div><div className="job-status"><span className={`pill ${job.status.toLowerCase()}`}><StatusDot tone={job.status === 'Retrying' ? 'amber' : job.status === 'Queued' ? 'blue' : 'green'} />{job.status}</span><small>{job.age}</small></div><button className="row-more"><Icon name="more" /></button></div>)}</div></section>

            <section className="panel health-panel"><div className="panel-heading"><div><p className="eyebrow">External tools</p><h2>Integration health</h2></div><button className="row-more"><Icon name="more" /></button></div><div className="health-summary"><div className="health-ring"><span>98<span>%</span></span><small>healthy</small></div><div className="health-copy"><strong>All systems operational</strong><p>Last checked just now</p><div className="health-legend"><span><StatusDot /> 2 healthy</span><span><StatusDot tone="amber" /> 1 degraded</span></div></div></div><div className="integration-list"><div><span className="integration-logo gctr">G</span><span><strong>GCTR</strong><small>Unified Browser API</small></span><b className="health-state"><StatusDot /> Healthy</b></div><div><span className="integration-logo mentions">M</span><span><strong>Mentions</strong><small>Brand monitoring</small></span><b className="health-state degraded"><StatusDot tone="amber" /> Degraded</b></div><div><span className="integration-logo gsc">G</span><span><strong>Google Search Console</strong><small>Search performance</small></span><b className="health-state"><StatusDot /> Healthy</b></div></div></section>
          </div>

          <div className="section-grid lower-grid">
            <section className="panel projects-panel"><div className="panel-heading"><div><p className="eyebrow">Portfolio</p><h2>Projects</h2></div><button className="text-button" onClick={() => setActive('Projects')}>Manage projects <Icon name="arrow" size={15} /></button></div><div className="project-list">{projects.map((item) => <div className="project-row" key={item.name}><div className={`project-avatar ${item.color}`}>{item.initials}</div><div className="project-name"><strong>{item.name}</strong><span>{item.domain}</span></div><div className="module-tags">{item.modules.map((module) => <span key={module}>{module}</span>)}</div><div className="project-activity"><strong>{item.score}</strong><span>health score</span></div><div className="row-more"><Icon name="arrow" size={15} /></div></div>)}</div></section>
            <section className="panel insight-panel"><div className="panel-heading"><div><p className="eyebrow">Signal desk</p><h2>Recent insights</h2></div><button className="text-button" onClick={() => setActive('Insights')}>See all <Icon name="arrow" size={15} /></button></div><div className="insight-list"><div className="insight-item"><span className="insight-symbol purple"><Icon name="spark" size={15} /></span><div><strong>GCTR activity is up 18%</strong><p>Example.com · Compared with last week</p></div><time>2h</time></div><div className="insight-item"><span className="insight-symbol orange"><Icon name="file" size={15} /></span><div><strong>Mentions workflow needs review</strong><p>12 outstanding results to process</p></div><time>5h</time></div><div className="insight-item"><span className="insight-symbol blue"><Icon name="queue" size={15} /></span><div><strong>3 jobs are approaching retry limit</strong><p>Open the queue to inspect attempts</p></div><time>1d</time></div></div></section>
          </div>

          <section className="activity-strip"><div className="activity-heading"><div><p className="eyebrow">Traceability</p><h2>Latest activity</h2></div><button className="text-button" onClick={() => setActive('Logs')}>Open logs <Icon name="arrow" size={15} /></button></div><div className="activity-items"><div><StatusDot /><span><strong>Job completed</strong> · GCTR campaign refresh for Example.com</span><time>09:42</time></div><div><StatusDot tone="blue" /><span><strong>Job queued</strong> · Mentions scan for BnbGeeks.org</span><time>09:35</time></div><div><StatusDot tone="amber" /><span><strong>Retry scheduled</strong> · GCTR keyword campaign for OtGeeks.org</span><time>09:18</time></div></div></section>
        </div>
      </main>
      {showToast && <div className="toast"><span className="toast-icon"><Icon name="check" size={15} /></span><div><strong>Job added to queue</strong><small>GCTR execution created for {project === 'All projects' ? 'Example.com' : project}</small></div></div>}
    </div>
  );
}
