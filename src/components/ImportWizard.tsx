import { useState } from 'react';

interface Step1Props {
  onNext: (data: { projectName: string; domain: string }) => void;
}

function Step1({ onNext }: Step1Props) {
  const [projectName, setProjectName] = useState('');
  const [domain, setDomain] = useState('');

  return (
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
          type="url"
          placeholder="https://example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>

      <button
        className="primary-button"
        onClick={() => onNext({ projectName, domain })}
        disabled={!projectName || !domain}
      >
        Continue →
      </button>
    </div>
  );
}

interface Step2Props {
  onNext: (data: { gscEnabled: boolean; gaEnabled: boolean }) => void;
  onBack: () => void;
}

function Step2({ onNext, onBack }: Step2Props) {
  const [gscEnabled, setGscEnabled] = useState(true);
  const [gaEnabled, setGaEnabled] = useState(true);

  return (
    <div className="wizard-step">
      <h2>2. Select Data Sources</h2>
      <p>Choose which tools to connect</p>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={gscEnabled}
            onChange={(e) => setGscEnabled(e.target.checked)}
          />
          <strong>Google Search Console</strong>
          <small>Import clicks, impressions, keywords</small>
        </label>

        <label>
          <input
            type="checkbox"
            checked={gaEnabled}
            onChange={(e) => setGaEnabled(e.target.checked)}
          />
          <strong>Google Analytics</strong>
          <small>Import pageviews, sessions, traffic</small>
        </label>
      </div>

      <div className="button-group">
        <button className="secondary-button" onClick={onBack}>
          ← Back
        </button>
        <button
          className="primary-button"
          onClick={() => onNext({ gscEnabled, gaEnabled })}
          disabled={!gscEnabled && !gaEnabled}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

interface Step3Props {
  data: any;
  onBack: () => void;
  onComplete: () => void;
}

function Step3({ data, onBack, onComplete }: Step3Props) {
  const [importing, setImporting] = useState(false);

  async function handleImport() {
    setImporting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setImporting(false);
    onComplete();
  }

  return (
    <div className="wizard-step">
      <h2>3. Authenticate & Import</h2>
      <p>Connect your Google account</p>

      <div className="summary-box">
        <strong>{data.projectName}</strong>
        <span>{data.domain}</span>
        <div className="enabled-services">
          {data.gscEnabled && <span className="badge">GSC</span>}
          {data.gaEnabled && <span className="badge">GA</span>}
        </div>
      </div>

      {!importing ? (
        <>
          <button className="google-button" onClick={handleImport}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Sign in with Google
          </button>

          <button className="secondary-button" onClick={onBack}>
            ← Back
          </button>
        </>
      ) : (
        <div className="importing-state">
          <div className="spinner" />
          <p>Importing data from Google...</p>
          <small>This may take a minute</small>
        </div>
      )}
    </div>
  );
}

export default function ImportWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [wizardData, setWizardData] = useState<any>({});

  function handleStep1Next(data: any) {
    setWizardData({ ...wizardData, ...data });
    setStep(2);
  }

  function handleStep2Next(data: any) {
    setWizardData({ ...wizardData, ...data });
    setStep(3);
  }

  function handleComplete() {
    alert('✅ Import configured! Data will sync daily.');
    onClose();
  }

  return (
    <div className="wizard-overlay">
      <div className="wizard-modal">
        <div className="wizard-header">
          <h1>Import GSC & GA Data</h1>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="wizard-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="progress-line" />
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="progress-line" />
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        <div className="wizard-content">
          {step === 1 && <Step1 onNext={handleStep1Next} />}
          {step === 2 && <Step2 onNext={handleStep2Next} onBack={() => setStep(1)} />}
          {step === 3 && (
            <Step3
              data={wizardData}
              onBack={() => setStep(2)}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
