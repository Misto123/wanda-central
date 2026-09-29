import { useState } from 'react';

export default function ImportWizardImproved({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [domain, setDomain] = useState('');
  const [gscEnabled, setGscEnabled] = useState(false);
  const [gaEnabled, setGaEnabled] = useState(false);

  return (
    <div className="wizard-overlay" onClick={onClose}>
      <div className="wizard-modal" onClick={(e) => e.stopPropagation()}>
        <div className="wizard-header">
          <h1>Import GSC & GA Data</h1>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="wizard-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        <div className="wizard-content">
          {step === 1 && (
            <div className="wizard-step">
              <h2>1. Project Details</h2>
              <p>Enter your website information</p>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  placeholder="My Website"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Domain</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
              <div className="button-group">
                <button className="secondary-button" onClick={onClose}>Cancel</button>
                <button
                  className="primary-button"
                  onClick={() => setStep(2)}
                  disabled={!projectName || !domain}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="wizard-step">
              <h2>2. Select Data Sources</h2>
              <p>Choose which services to connect</p>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={gscEnabled}
                    onChange={(e) => setGscEnabled(e.target.checked)}
                  />
                  <div>
                    <strong>Google Search Console</strong>
                    <small>Import search queries, impressions, clicks, and positions</small>
                  </div>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={gaEnabled}
                    onChange={(e) => setGaEnabled(e.target.checked)}
                  />
                  <div>
                    <strong>Google Analytics</strong>
                    <small>Import page views, sessions, bounce rate, and user metrics</small>
                  </div>
                </label>
              </div>
              <div className="button-group">
                <button className="secondary-button" onClick={() => setStep(1)}>← Back</button>
                <button
                  className="primary-button"
                  onClick={() => setStep(3)}
                  disabled={!gscEnabled && !gaEnabled}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="wizard-step">
              <h2>3. Connect Google Account</h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '14px', color: '#6b7280' }}>
                Sign in with the Google account that owns your Search Console properties and Analytics accounts.
              </p>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1e40af' }}>
                  ℹ️ Which Account to Select
                </h3>
                <ul style={{ marginLeft: '1.5rem', fontSize: '0.875rem', color: '#1f2937' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>For Search Console:</strong> Use the Google account that has access to your GSC property for <strong>{domain}</strong>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>For Analytics:</strong> Use the account with "Edit" or "Administrator" permissions
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Not sure?</strong> Check <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>search.google.com/search-console</a> to see which account owns your property
                  </li>
                </ul>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#15803d' }}>
                  ✅ How It Works
                </h3>
                <ol style={{ marginLeft: '1.5rem', fontSize: '0.875rem', color: '#1f2937' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Click "Sign in with Google" below
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Google will ask you to select an account → Choose the account that owns <strong>{domain}</strong>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Review the permissions → We request read-only access to GSC and GA data
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Click "Allow" → Wanda Central will immediately import your data
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Daily sync → Data updates automatically at 2 AM UTC every day
                  </li>
                </ol>
              </div>

              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <strong>🔒 Privacy:</strong> We only read data. We cannot modify your GSC or GA settings, add/remove users, or make any changes to your accounts.
              </div>

              <button
                className="google-button"
                onClick={() => {
                  alert('Google OAuth integration not yet configured. This is a demo.\n\nIn production, this would:\n1. Open Google OAuth popup\n2. Request GSC & GA permissions\n3. Import your data\n4. Set up daily sync at 2 AM UTC');
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: '8px' }}>
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Sign in with Google
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', marginTop: '1rem' }}>
                By continuing, you agree to let Wanda Central access your Google Search Console and Analytics data
              </p>

              <div className="button-group" style={{ marginTop: '1.5rem' }}>
                <button className="secondary-button" onClick={() => setStep(2)}>← Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
