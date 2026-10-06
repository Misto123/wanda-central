import { useState, useEffect } from 'react';

interface MentionCampaign {
  domain: string;
  target_url: string;
  keywords: string[];
  platforms: string[];
  indexer_batch_size: number;
  indexer_interval_days: number;
}

interface Mention {
  id: string;
  platform: string;
  url: string;
  title: string;
  status: string;
  created_at: string;
  indexed: boolean;
}

export default function MentionBuilder() {
  const [activeTab, setActiveTab] = useState<'create' | 'mentions'>('create');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Form state
  const [domain, setDomain] = useState('marketplacestudio.nl');
  const [targetUrl, setTargetUrl] = useState('https://marketplacestudio.nl');
  const [keywords, setKeywords] = useState<string[]>(['Marketplace Platform', 'Best Marketplace Software', 'E-commerce Solutions']);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['reddit', 'quora', 'medium']);
  const [indexerBatchSize, setIndexerBatchSize] = useState(50);
  const [indexerIntervalDays, setIndexerIntervalDays] = useState(7);
  
  // Data state
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [totalTemplates, _setTotalTemplates] = useState(340);

  const API_BASE = 'https://wanda-central.vercel.app/api/mentions';

  useEffect(() => {
    const savedKey = localStorage.getItem('mention_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('mention_api_key', apiKey);
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

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const createCampaign = async () => {
    if (!apiKey) {
      setMessage({ type: 'error', text: 'Please enter your API key first' });
      return;
    }

    const filteredKeywords = keywords.filter(k => k.trim());
    if (filteredKeywords.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one keyword' });
      return;
    }

    if (selectedPlatforms.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one platform' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const campaign: MentionCampaign = {
      domain,
      target_url: targetUrl,
      keywords: filteredKeywords,
      platforms: selectedPlatforms,
      indexer_batch_size: indexerBatchSize,
      indexer_interval_days: indexerIntervalDays,
    };

    try {
      const response = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(campaign),
      });

      const data = await response.json();

      if (data.success) {
        const totalMentions = data.total_generated || totalTemplates;
        const batches = Math.ceil(totalMentions / indexerBatchSize);
        const totalWeeks = batches * (indexerIntervalDays / 7);
        
        setMessage({
          type: 'success',
          text: `Campaign created! Generated ${totalMentions} mentions across ${selectedPlatforms.length} platforms. Will send ${indexerBatchSize} mentions to indexer every ${indexerIntervalDays} days (${batches} batches over ${totalWeeks.toFixed(1)} weeks).`,
        });
        
        fetchMentions();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create campaign' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const fetchMentions = async () => {
    if (!apiKey) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/list?domain=${encodeURIComponent(domain)}`,
        {
          headers: {
            'x-api-key': apiKey,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setMentions(data.mentions || []);
      }
    } catch (error) {
      console.error('Failed to fetch mentions:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateEstimate = () => {
    const totalMentions = totalTemplates * selectedPlatforms.length;
    const batches = Math.ceil(totalMentions / indexerBatchSize);
    const totalWeeks = batches * (indexerIntervalDays / 7);
    
    return { totalMentions, batches, totalWeeks };
  };

  const estimate = calculateEstimate();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎯 MentionBuilder</h1>
        <p className="text-muted">Generate mentions on Reddit, Quora, and Medium</p>
      </div>

      {/* API Key Section */}
      {!apiKey && (
        <div className="alert alert-info mb-6">
          <h3 className="font-semibold mb-2">⚠️ API Key Required</h3>
          <p className="text-sm mb-4">Enter your MentionBuilder API key to get started.</p>
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
          onClick={() => {
            setActiveTab('mentions');
            fetchMentions();
          }}
          className={`pb-3 px-4 font-medium transition ${
            activeTab === 'mentions'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted hover:text-foreground'
          }`}
        >
          Generated Mentions
        </button>
      </div>

      {/* Create Campaign Tab */}
      {activeTab === 'create' && (
        <div className="grid gap-6">
          {/* Info Box */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)', borderColor: '#BFDBFE' }}>
            <h3 className="card-title mb-4">ℹ️ How It Works</h3>
            <div className="space-y-2 text-sm">
              <p><strong>1. Generate ALL mentions:</strong> Uses all {totalTemplates}+ templates across selected platforms</p>
              <p><strong>2. Smart indexing:</strong> Sends mentions to indexer in batches of {indexerBatchSize} every {indexerIntervalDays} days</p>
              <p><strong>3. Natural growth:</strong> Avoids spam detection with gradual indexing</p>
            </div>
          </div>

          {/* Domain & URL */}
          <div className="card">
            <h3 className="card-title mb-4">Target Domain</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Domain</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="marketplacestudio.nl"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Target URL</label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://marketplacestudio.nl"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="card">
            <h3 className="card-title mb-4">Keywords</h3>
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
          </div>

          {/* Platforms */}
          <div className="card">
            <h3 className="card-title mb-4">Platforms</h3>
            <div className="grid grid-3 gap-4">
              {[
                { id: 'reddit', name: 'Reddit', icon: '🔴' },
                { id: 'quora', name: 'Quora', icon: '🔵' },
                { id: 'medium', name: 'Medium', icon: '⚫' },
              ].map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`card p-4 text-center transition ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-primary border-2 bg-primary/5'
                      : 'hover:border-primary/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{platform.icon}</div>
                  <div className="font-semibold">{platform.name}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted mt-4">
              Selected {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Indexer Settings */}
          <div className="card">
            <h3 className="card-title mb-4">Indexer Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Batch Size (mentions per batch)
                </label>
                <input
                  type="number"
                  value={indexerBatchSize}
                  onChange={(e) => setIndexerBatchSize(parseInt(e.target.value))}
                  min="10"
                  max="100"
                  className="w-full"
                />
                <p className="text-xs text-muted mt-1">
                  Default: 50 mentions per batch (recommended)
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Interval (days between batches)
                </label>
                <input
                  type="number"
                  value={indexerIntervalDays}
                  onChange={(e) => setIndexerIntervalDays(parseInt(e.target.value))}
                  min="1"
                  max="30"
                  className="w-full"
                />
                <p className="text-xs text-muted mt-1">
                  Default: 7 days (1 week) between batches
                </p>
              </div>
            </div>
          </div>

          {/* Estimate */}
          <div className="card" style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}>
            <h3 className="card-title mb-4">📊 Campaign Estimate</h3>
            <div className="grid grid-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{estimate.totalMentions}</div>
                <div className="text-sm text-muted">Total Mentions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{estimate.batches}</div>
                <div className="text-sm text-muted">Index Batches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{estimate.totalWeeks.toFixed(1)}</div>
                <div className="text-sm text-muted">Weeks Duration</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded text-sm">
              <strong>Timeline:</strong> All {estimate.totalMentions} mentions will be generated immediately, 
              then sent to indexer in {estimate.batches} batches of {indexerBatchSize} every {indexerIntervalDays} days 
              (~{estimate.totalWeeks.toFixed(1)} weeks total).
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={createCampaign}
            disabled={loading || !apiKey}
            className="btn-primary w-full h-12 text-base"
          >
            {loading ? 'Creating Campaign...' : 'Generate All Mentions + Schedule Indexing'}
          </button>
        </div>
      )}

      {/* Generated Mentions Tab */}
      {activeTab === 'mentions' && (
        <div className="card">
          <h3 className="card-title mb-4">Generated Mentions</h3>
          {loading ? (
            <div className="text-center py-12 text-muted">Loading mentions...</div>
          ) : mentions.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <p>No mentions found for this domain</p>
              <p className="text-sm mt-2">Create a campaign to generate mentions</p>
            </div>
          ) : (
            <>
              <div className="mb-4 p-4 bg-muted rounded">
                <p className="font-semibold">Total Mentions: {mentions.length}</p>
                <p className="text-sm text-muted mt-1">
                  Indexed: {mentions.filter(m => m.indexed).length} | 
                  Pending: {mentions.filter(m => !m.indexed).length}
                </p>
              </div>
              <div className="space-y-3">
                {mentions.map((mention) => (
                  <div key={mention.id} className="card p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <a
                          href={mention.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:underline"
                        >
                          {mention.title}
                        </a>
                        <p className="text-sm text-muted">{mention.platform}</p>
                      </div>
                      <span className={`badge ${mention.indexed ? 'badge-default' : 'badge-secondary'}`}>
                        {mention.indexed ? 'Indexed' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-muted">
                      {new Date(mention.created_at).toLocaleDateString()}
                    </p>
                    <a
                      href={mention.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline mt-3 w-full text-sm"
                    >
                      View Mention →
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
