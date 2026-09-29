import { useState } from 'react';
import ImportWizardImproved from './components/ImportWizardImproved';

type IconName = 'file' | 'chart' | 'video' | 'megaphone' | 'browser';

const icons: Record<IconName, string> = {
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z M14 2v6h6M8 13h8M8 17h5',
  chart: 'M3 3v18h18M7 16l4-4 4 4 6-6',
  video: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z',
  megaphone: 'M3 11l18-5v12L3 13v-2z M12.2 13.4l-5.2 2.6v2l5.2-2.6v-2z',
  browser: 'M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z',
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  );
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={copy}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
    >
      {copied ? '✓ Copied!' : `📋 ${label || 'Copy'}`}
    </button>
  );
}

const navigation = [
  { label: 'Content', icon: 'file' as IconName },
  { label: 'GSC & GA', icon: 'chart' as IconName },
  { label: 'YouTube', icon: 'video' as IconName },
  { label: 'Mentions', icon: 'megaphone' as IconName },
  { label: 'Google & Traffic', icon: 'browser' as IconName },
];

export default function AppRedesigned() {
  const [active, setActive] = useState('Content');
  const [showImportWizard, setShowImportWizard] = useState(false);
  const [domain, setDomain] = useState('marketplacestudio.nl');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              W
            </div>
            <h1 className="text-xl font-bold text-gray-900">Wanda Central</h1>
          </div>
        </div>

        <nav className="flex-1 px-3">
          {navigation.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active === item.label
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <div className="font-medium mb-1">Current Domain</div>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Content Creator */}
        {active === 'Content' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Creator API</h1>
              <p className="text-gray-600">Generate SEO-optimized articles with statistics, human experiences, and multiple keywords</p>
            </div>

            {/* API Key Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">API Key</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Active
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-800">hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4</code>
                  <CopyButton text="hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4" label="Copy Key" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Rate Limit:</span>
                  <span className="ml-2 font-medium">200 requests/day</span>
                </div>
                <div>
                  <span className="text-gray-600">Remaining Today:</span>
                  <span className="ml-2 font-medium text-green-600">200</span>
                </div>
              </div>
            </div>

            {/* Endpoint */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">API Endpoint</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">POST</span>
                  <CopyButton text="https://wanda-central.vercel.app/api/content/generate" label="Copy URL" />
                </div>
                <code className="text-sm font-mono text-gray-800">
                  https://wanda-central.vercel.app/api/content/generate
                </code>
              </div>
            </div>

            {/* Example Code */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Example Code</h2>
                <CopyButton 
                  text={`fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    website_domain: '${domain}',
    main_keyword: 'your keyword here',
    enable_no_ai_slop: true,
    enable_seo_optimization: true
  })
})`}
                  label="Copy Code"
                />
              </div>
              <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm">
{`fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    website_domain: '${domain}',
    main_keyword: 'your keyword here',
    secondary_keywords: ['keyword 2', 'keyword 3'],
    enable_no_ai_slop: true,
    enable_seo_optimization: true,
    enable_first_hand_experience: true,
    first_hand_experience: 'Your real testing data here'
  })
})`}
              </pre>
            </div>

            {/* Features */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What You Get</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <div className="font-medium text-sm">SEO-Optimized Content</div>
                    <div className="text-xs text-gray-600">Title, meta, H1, sections, FAQs</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <div className="font-medium text-sm">JSON-LD Schemas</div>
                    <div className="text-xs text-gray-600">Article + FAQ structured data</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <div className="font-medium text-sm">No AI Slop</div>
                    <div className="text-xs text-gray-600">Removes 20+ AI patterns</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  <div>
                    <div className="font-medium text-sm">Statistics & Data</div>
                    <div className="text-xs text-gray-600">Add real testing numbers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GSC & GA */}
        {active === 'GSC & GA' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Google Search Console & Analytics</h1>
              <p className="text-gray-600">Import search data, track rankings, and find keyword opportunities</p>
            </div>

            {/* Setup Status */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Setup Status</h2>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                  Not Connected
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Connect your Google Search Console and Analytics to start importing data
              </p>
              <button
                onClick={() => setShowImportWizard(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Connect Google Account
              </button>
            </div>

            {/* How It Works */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📘 How It Works</h2>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <div className="font-medium">Click "Connect Google Account"</div>
                    <div className="text-gray-600">Opens the import wizard</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <div className="font-medium">Enter your domain: {domain}</div>
                    <div className="text-gray-600">Tell us which website to track</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <div className="font-medium">Sign in with the Google account that owns your GSC property</div>
                    <div className="text-gray-600">Use the account that has access to Search Console for {domain}</div>
                    <div className="text-gray-600 mt-1">Not sure? Check <a href="https://search.google.com/search-console" target="_blank" className="text-blue-600 underline">search.google.com/search-console</a></div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <div>
                    <div className="font-medium">Grant permissions</div>
                    <div className="text-gray-600">We request read-only access to your GSC and GA data</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <div>
                    <div className="font-medium">Data imports automatically</div>
                    <div className="text-gray-600">Syncs daily at 2 AM UTC</div>
                  </div>
                </li>
              </ol>
            </div>

            {/* API Endpoints (shown after setup) */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 opacity-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">API Endpoints (Available After Setup)</h2>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm">GET /api/gsc/:project_id/top-keywords</code>
                    <button disabled className="text-xs text-gray-400">Copy</button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm">GET /api/keywords/:project_id</code>
                    <button disabled className="text-xs text-gray-400">Copy</button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm">GET /api/recommendations/:project_id</code>
                    <button disabled className="text-xs text-gray-400">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* YouTube, Mentions, Google & Traffic pages would follow same pattern */}
        {/* For brevity, showing structure only */}
        
        {active === 'YouTube' && (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube Integration</h1>
            <p className="text-gray-600 mb-6">Track channel metrics and video performance</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-sm">Coming soon: Connect your YouTube channel to track views, subscribers, and engagement metrics.</p>
            </div>
          </div>
        )}

        {active === 'Mentions' && (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions Tracking</h1>
            <p className="text-gray-600 mb-6">Monitor brand mentions across the web</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-sm">Coming soon: Track when your brand is mentioned on websites, social media, and forums.</p>
            </div>
          </div>
        )}

        {active === 'Google & Traffic' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Google & Traffic (Remote Browser)</h1>
              <p className="text-gray-600">Automate browser sessions and generate organic traffic</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">API Key</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Active</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">JTYDA_7531D_98HGTR_YT154</code>
                  <CopyButton text="JTYDA_7531D_98HGTR_YT154" label="Copy Key" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">API Endpoint</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">POST</span>
                  <CopyButton text="http://65.21.199.228:3000/api/browser/start" />
                </div>
                <code className="text-sm font-mono">http://65.21.199.228:3000/api/browser/start</code>
              </div>
            </div>
          </div>
        )}
      </main>

      {showImportWizard && <ImportWizardImproved onClose={() => setShowImportWizard(false)} />}
    </div>
  );
}
