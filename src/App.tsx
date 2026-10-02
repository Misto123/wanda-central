import { useState } from 'react';
import BacklinkManager from './components/BacklinkManager';

export default function App() {
  const [activePage, setActivePage] = useState<'content' | 'gsc' | 'youtube' | 'mentions' | 'traffic' | 'backlinks'>('content');
  const [domain, setDomain] = useState('marketplacestudio.nl');

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 fixed h-full">
        <h1 className="text-2xl font-bold mb-8">Wanda Central</h1>
        
        {/* Domain Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Domain</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full"
            placeholder="yoursite.com"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <button
            onClick={() => setActivePage('content')}
            className={`w-full text-left px-4 py-2 rounded transition ${
              activePage === 'content'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}
          >
            📝 Content
          </button>
          <button
            onClick={() => setActivePage('gsc')}
            className={`w-full text-left px-4 py-2 rounded transition ${
              activePage === 'gsc'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}
          >
            🔍 GSC & GA
          </button>
          <button
            onClick={() => setActivePage('youtube')}
            className={`w-full text-left px-4 py-2 rounded transition ${
              activePage === 'youtube'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}
          >
            🎬 YouTube
          </button>
          <button
            onClick={() => setActivePage('mentions')}
            className={`w-full text-left px-4 py-2 rounded transition ${
              activePage === 'mentions'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}
          >
            🎯 Mentions
          </button>
          <button
            onClick={() => setActivePage('traffic')}
            className={`w-full text-left px-4 py-2 rounded transition ${
              activePage === 'traffic'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}
          >
            🌐 Google & Traffic
          </button>
          <button
            onClick={() => setActivePage('backlinks')}
            className={`w-full text-left px-4 py-2 rounded transition ${
              activePage === 'backlinks'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}
          >
            🔗 Backlinks
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {activePage === 'backlinks' && <BacklinkManager />}
        
        {activePage === 'content' && (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">Content Creator</h2>
            <div className="card">
              <p>Content Creator API integration coming soon...</p>
            </div>
          </div>
        )}

        {activePage === 'gsc' && (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">Google Search Console & Analytics</h2>
            <div className="card">
              <p>GSC integration coming soon...</p>
            </div>
          </div>
        )}

        {activePage === 'youtube' && (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">YouTube Automation</h2>
            <div className="card">
              <p>YouTube automation coming soon...</p>
            </div>
          </div>
        )}

        {activePage === 'mentions' && (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">MentionBuilder</h2>
            <div className="card">
              <p>MentionBuilder integration coming soon...</p>
            </div>
          </div>
        )}

        {activePage === 'traffic' && (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">Traffic Generation (SVB 3.0)</h2>
            <div className="card">
              <p>Traffic generation coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
