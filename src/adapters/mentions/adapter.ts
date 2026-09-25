// Mentions Adapter - Stub implementation
// To be completed when Mentions API interface is defined

import type { 
  ExternalToolAdapter, 
  JobConfig, 
  JobStatusResponse, 
  JobResult, 
  HealthStatus 
} from '@/types';

export class MentionsAdapter implements ExternalToolAdapter {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl?: string) {
    this.apiKey = apiKey || process.env.MENTIONS_API_KEY || '';
    this.baseUrl = baseUrl || process.env.MENTIONS_BASE_URL || '';
    
    if (!this.apiKey) {
      throw new Error('MENTIONS_API_KEY is required');
    }
    if (!this.baseUrl) {
      throw new Error('MENTIONS_BASE_URL is required');
    }
  }

  async connect(): Promise<void> {
    const isHealthy = await this.testConnection();
    if (!isHealthy) {
      throw new Error('Mentions connection failed');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      // TODO: Implement actual health check endpoint call
      // For now, just check if credentials are configured
      return Boolean(this.apiKey && this.baseUrl);
    } catch {
      return false;
    }
  }

  async createJob(config: JobConfig): Promise<string> {
    // TODO: Implement actual Mentions job creation
    // This will depend on the Mentions API interface
    
    const jobId = `mentions-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Stub: Would make actual API call here
    console.log('Creating Mentions job:', config);
    
    return jobId;
  }

  async getJobStatus(jobId: string): Promise<JobStatusResponse> {
    // TODO: Implement actual status check
    
    // Stub response
    return {
      status: 'queued',
      progress: 0,
      message: 'Job queued',
    };
  }

  async getResult(jobId: string): Promise<JobResult> {
    // TODO: Implement actual result retrieval
    
    // Stub response
    return {
      success: false,
      data: {},
      error: 'Not implemented - Mentions adapter is a stub',
    };
  }

  async cancelJob(jobId: string): Promise<void> {
    // TODO: Implement actual job cancellation
    console.log('Cancel Mentions job:', jobId);
  }

  async healthCheck(): Promise<HealthStatus> {
    const isHealthy = await this.testConnection();
    return {
      status: isHealthy ? 'degraded' : 'disconnected',
      last_check: new Date().toISOString(),
      error: isHealthy ? 'Adapter not fully implemented' : 'Connection failed',
      metrics: {
        api_url: this.baseUrl,
        implementation_status: 'stub',
      },
    };
  }
}

// Singleton instance
let mentionsInstance: MentionsAdapter | null = null;

export function getMentionsAdapter(apiKey?: string, baseUrl?: string): MentionsAdapter {
  if (!mentionsInstance) {
    mentionsInstance = new MentionsAdapter(apiKey, baseUrl);
  }
  return mentionsInstance;
}
