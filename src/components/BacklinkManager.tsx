import { useState, useEffect } from 'react';

interface Keyword {
  keyword: string;
}

interface Campaign {
  target_url: string;
  keywords: Keyword[];
  placement_type: string;
  max_domains?: number;
  schedule?: {
    domains_per_day: number;
    total_days: number;
    start_date?: string;
  };
}

interface Placement {
  id: string;
  blog_url: string;
  domain_name: string;
  domain_url: string;
  post_title: string;
  post_slug: string;
  target_url: string;
  anchor_text: string;
  placement_type: string;
  injected_at: string;
}

interface Job {
  id: string;
  target_url: string;
  domains_per_day: number;
  total_days: number;
  status: string;
  domains_completed: number;
  next_run_at: string;
  created_at: string;
}

export default function BacklinkManager() {
  const [activeTab, setActiveTab] = useState<'create' | 'campaigns' | 'placements'>('create');
  const [campaignType, setCampaignType] = useState<'instant' | 'scheduled'>('instant');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form state
  const [targetUrl, setTargetUrl] = useState('https://marketplacestudio.nl');
  const [keywords, setKeywords] = useState<string[]>(['Marketplace Platform', 'Best Marketplace Software', 'E-commerce Solutions']);
  const [placementType, setPlacementType] = useState('mixed');
  const [maxDomains, setMaxDomains] = useState(50);
  const [domainsPerDay, setDomainsPerDay] = useState(5);
  const [totalDays, setTotalDays] = useState(60);
  const [startDate, setStartDate] = useState('');
  
  // Data state
  const [jobs, _setJobs] = useState<Job[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [apiKey, setApiKey] = useState('');

  const API_BASE = 'https://ppiumdjsoymgaodrkgga.supabase.co/functions/v1/etsygeeks_backlink_api';

  useEffect(() => {
    // Load API key from localStorage
    const savedKey = localStorage.getItem('backlink_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('backlink_api_key', apiKey);
    setMessage({ type: 'success', text: 'API key saved!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const addKeyword = () => {
    setKeywords([...keywords, '']);
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const createCampaign = async () => {
    if (!apiKey) {
      setMessage({ type: 'error', text: 'Please enter your API key first' });
      return;
    }

    if (!targetUrl) {
      setMessage({ type: 'error', text: 'Please enter a target URL' });
      return;
    }

    const filteredKeywords = keywords.filter(k => k.trim());
    if (filteredKeywords.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one keyword' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const campaign: Campaign = {
      target_url: targetUrl,
      keywords: filteredKeywords.map(k => ({ keyword: k })),
      placement_type: placementType,
    };

    if (campaignType === 'instant') {
      campaign.max_domains = maxDomains;
    } else {
      campaign.schedule = {
        domains_per_day: domainsPerDay,
        total_days: totalDays,
        ...(startDate && { start_date: startDate }),
      };
    }

    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(campaign),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: campaignType === 'instant'
            ? `Successfully injected ${data.injected} backlinks!`
            : `Scheduled campaign created! Job ID: ${data.job_id}`,
        });
        
        // Refresh data
        if (campaignType === 'scheduled') {
          fetchJobs();
        }
        fetchPlacements(targetUrl);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create campaign' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    if (!apiKey) return;
    
    try {
      // Note: This would need a jobs list endpoint
      // For now, we'll skip this
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const fetchPlacements = async (url?: string) => {
    if (!apiKey) return;
    
    const targetUrlToFetch = url || targetUrl;
    if (!targetUrlToFetch) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/placements?target_url=${encodeURIComponent(targetUrlToFetch)}`,
        {
          headers: {
            'X-API-Key': apiKey,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setPlacements(data.placements || []);
      }
    } catch (error) {
      console.error('Failed to fetch placements:', error);
    } finally {
      setLoading(false);
    }
  };

  const pauseJob = async (jobId: string) => {
    if (!apiKey) return;

    try {
      const response = await fetch(`${API_BASE}/pause`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ job_id: jobId }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Job paused successfully' });
        fetchJobs();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to pause job' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🔗 Backlink Manager</h1>
        <p className="text-muted">Build backlinks across 113+ domains in the AI-Blogger network</p>
      </div>

      {/* API Key Section */}
      {!apiKey && (
        <div className="alert alert-info mb-6">
          <h3 className="font-semibold mb-2">⚠️ API Key Required</h3>
          <p className="text-sm mb-4">Enter your EtsyGeeks Backlink API key to get started.</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <button onClick={saveApiKey} className="btn-primary">
              Save Key
            </button>
          </div>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-warning'} mb-6`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab('create')}
          className={`pb-3 px-4 font-medium transition ${
            activeTab === 'create'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted hover:text-foreground'
          }`}
        >
          Create Campaign
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`pb-3 px-4 font-medium transition ${
            activeTab === 'campaigns'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted hover:text-foreground'
          }`}
        >
          Active Campaigns
        </button>
        <button
          onClick={() => {
            setActiveTab('placements');
            fetchPlacements();
          }}
          className={`pb-3 px-4 font-medium transition ${
            activeTab === 'placements'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted hover:text-foreground'
          }`}
        >
          Placements
        </button>
      </div>

      {/* Create Campaign Tab */}
      {activeTab === 'create' && (
        <div className="grid gap-6">
          {/* Campaign Type */}
          <div className="card">
            <h3 className="card-title mb-4">Campaign Type</h3>
            <div className="grid grid-2 gap-4">
              <button
                onClick={() => setCampaignType('instant')}
                className={`card p-4 text-left ${
                  campaignType === 'instant' ? 'border-primary border-2' : ''
                }`}
              >
                <h4 className="font-semibold mb-2">⚡ Instant Injection</h4>
                <p className="text-sm text-muted">
                  Inject backlinks across up to 100 domains immediately
                </p>
              </button>
              <button
                onClick={() => setCampaignType('scheduled')}
                className={`card p-4 text-left ${
                  campaignType === 'scheduled' ? 'border-primary border-2' : ''
                }`}
              >
                <h4 className="font-semibold mb-2">📅 Scheduled</h4>
                <p className="text-sm text-muted">
                  Build links gradually over time (natural SEO)
                </p>
              </button>
            </div>
          </div>

          {/* Target URL */}
          <div className="card">
            <h3 className="card-title mb-4">Target URL</h3>
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://yoursite.com"
              className="w-full"
            />
            <p className="text-xs text-muted mt-2">
              The URL you want to boost with backlinks (can be homepage or specific page)
            </p>
          </div>

          {/* Keywords */}
          <div className="card">
            <h3 className="card-title mb-4">Anchor Text Keywords</h3>
            <div className="space-y-3">
              {keywords.map((keyword, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => updateKeyword(index, e.target.value)}
                    placeholder={`Keyword ${index + 1}`}
                    className="flex-1"
                  />
                  {keywords.length > 1 && (
                    <button
                      onClick={() => removeKeyword(index)}
                      className="btn-ghost text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addKeyword} className="btn-outline w-full">
                + Add Keyword
              </button>
            </div>
            <p className="text-xs text-muted mt-2">
              Provide 3-5 keyword variations for a natural link profile
            </p>
          </div>

          {/* Placement Type */}
          <div className="card">
            <h3 className="card-title mb-4">Placement Type</h3>
            <select
              value={placementType}
              onChange={(e) => setPlacementType(e.target.value)}
              className="w-full"
            >
              <option value="mixed">Mixed (50% content, 30% sidebar, 20% footer)</option>
              <option value="content">Content Only (best for SEO)</option>
              <option value="sidebar">Sidebar Only</option>
              <option value="footer">Footer Only</option>
              <option value="interlink">Interlink (traffic circulation)</option>
            </select>
          </div>

          {/* Campaign Settings */}
          {campaignType === 'instant' ? (
            <div className="card">
              <h3 className="card-title mb-4">Instant Injection Settings</h3>
              <label className="block mb-2 text-sm font-medium">
                Maximum Domains
              </label>
              <input
                type="number"
                value={maxDomains}
                onChange={(e) => setMaxDomains(parseInt(e.target.value))}
                min="1"
                max="113"
                className="w-full"
              />
              <p className="text-xs text-muted mt-2">
                Number of domains to inject into (max: 113)
              </p>
            </div>
          ) : (
            <div className="card">
              <h3 className="card-title mb-4">Schedule Settings</h3>
              <div className="grid grid-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Domains Per Day
                  </label>
                  <input
                    type="number"
                    value={domainsPerDay}
                    onChange={(e) => setDomainsPerDay(parseInt(e.target.value))}
                    min="1"
                    max="20"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Total Days
                  </label>
                  <input
                    type="number"
                    value={totalDays}
                    onChange={(e) => setTotalDays(parseInt(e.target.value))}
                    min="1"
                    max="365"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Start Date (optional)
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="mt-4 p-4 bg-muted rounded">
                <p className="text-sm">
                  <strong>Total backlinks:</strong> {domainsPerDay * totalDays}
                </p>
                <p className="text-xs text-muted mt-1">
                  {domainsPerDay} links/day × {totalDays} days
                </p>
              </div>
            </div>
          )}

          {/* Create Button */}
          <button
            onClick={createCampaign}
            disabled={loading || !apiKey}
            className="btn-primary w-full h-12 text-base"
          >
            {loading ? 'Creating...' : `Create ${campaignType === 'instant' ? 'Instant' : 'Scheduled'} Campaign`}
          </button>
        </div>
      )}

      {/* Active Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="card">
          <h3 className="card-title mb-4">Active Scheduled Campaigns</h3>
          {jobs.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <p>No active campaigns</p>
              <p className="text-sm mt-2">Create a scheduled campaign to see it here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="card p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{job.target_url}</h4>
                      <p className="text-sm text-muted">Job ID: {job.id}</p>
                    </div>
                    <span className={`badge ${job.status === 'active' ? 'badge-default' : 'badge-secondary'}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="grid grid-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted">Progress</p>
                      <p className="font-semibold">
                        {job.domains_completed} / {job.domains_per_day * job.total_days}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted">Per Day</p>
                      <p className="font-semibold">{job.domains_per_day}</p>
                    </div>
                    <div>
                      <p className="text-muted">Next Run</p>
                      <p className="font-semibold">{new Date(job.next_run_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => pauseJob(job.id)}
                    className="btn-outline mt-4 w-full"
                  >
                    Pause Campaign
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Placements Tab */}
      {activeTab === 'placements' && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title">Backlink Placements</h3>
            <div className="flex gap-2">
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="Filter by URL..."
                className="w-64"
              />
              <button onClick={() => fetchPlacements()} className="btn-primary">
                Search
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted">Loading placements...</div>
          ) : placements.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <p>No placements found for this URL</p>
              <p className="text-sm mt-2">Create a campaign to start building backlinks</p>
            </div>
          ) : (
            <>
              <div className="mb-4 p-4 bg-muted rounded">
                <p className="font-semibold">
                  Total Placements: {placements.length}
                </p>
                <p className="text-sm text-muted mt-1">
                  Backlinks across {new Set(placements.map(p => p.domain_name)).size} unique domains
                </p>
              </div>
              <div className="space-y-3">
                {placements.map((placement) => (
                  <div key={placement.id} className="card p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <a
                          href={placement.blog_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:underline"
                        >
                          {placement.post_title}
                        </a>
                        <p className="text-sm text-muted">{placement.domain_name}</p>
                      </div>
                      <span className="badge badge-secondary">{placement.placement_type}</span>
                    </div>
                    <div className="text-sm">
                      <p>
                        <strong>Anchor:</strong> {placement.anchor_text}
                      </p>
                      <p>
                        <strong>Target:</strong> {placement.target_url}
                      </p>
                      <p className="text-muted">
                        {new Date(placement.injected_at).toLocaleDateString()}
                      </p>
                    </div>
                    <a
                      href={placement.blog_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline mt-3 w-full text-sm"
                    >
                      View Live Link →
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
