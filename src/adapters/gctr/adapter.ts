// GCTR Adapter - Unified Browser API Integration
// Handles GCTR campaigns through the Jobs API

import type { 
  ExternalToolAdapter, 
  JobConfig, 
  JobStatusResponse, 
  JobResult, 
  HealthStatus 
} from '@/types';

const BASE_URL = 'https://anwgnjrawbsnirwwhrti.supabase.co/functions/v1/jobs-api';

export type CampaignType = 
  | 'gctr' 
  | 'direct' 
  | 'gmb-website-clicker' 
  | 'gctr-reformulation' 
  | 'gctr-exit' 
  | 'backlink';

export interface CampaignKeyword {
  keyword: string;
  dailyClicks: number;
}

export interface CreateCampaignRequest {
  name: string;
  targetUrl: string;
  type: CampaignType;
  locations?: string[];
  duration?: {
    length: number;
    unit: 'day' | 'month';
  };
  anonymousPercent?: number;
  keywords?: CampaignKeyword[];
  dailyVisits?: number;
  preventLinking?: boolean;
  createMode?: 'merge' | 'force-new';
}

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  targetUrl: string;
  status: 'active' | 'paused' | 'completed' | 'pending';
  keywords?: number;
  createdAt?: string;
}

export interface CreateCampaignResponse {
  success: boolean;
  deeplink: string;
  job: Campaign;
}

export class GCTRAdapter implements ExternalToolAdapter {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GCTR_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('GCTR_API_KEY is required');
    }
  }

  async connect(): Promise<void> {
    const isHealthy = await this.testConnection();
    if (!isHealthy) {
      throw new Error('GCTR connection failed');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.request('?id=test-verify-key');
      return true;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes('404') || msg.includes('not found')) {
        return true;
      }
      return false;
    }
  }

  async createJob(config: JobConfig): Promise<string> {
    const input = config.input as unknown as CreateCampaignRequest;
    
    // Validate
    if (!input.name || input.name.length < 1 || input.name.length > 200) {
      throw new Error('Campaign name must be 1-200 characters');
    }
    if (!input.targetUrl.startsWith('http://') && !input.targetUrl.startsWith('https://')) {
      throw new Error('Target URL must start with http:// or https://');
    }
    if (input.keywords && input.keywords.length > 50) {
      throw new Error('Maximum 50 keywords per campaign');
    }

    const response = await this.request<CreateCampaignResponse>('', {
      method: 'POST',
      body: JSON.stringify(input),
    });

    return response.job.id;
  }

  async getJobStatus(jobId: string): Promise<JobStatusResponse> {
    const response = await this.request<{ success: boolean; job: Campaign }>(
      `?id=${jobId}`
    );

    return {
      status: this.mapStatus(response.job.status),
      progress: response.job.status === 'active' ? 50 : response.job.status === 'completed' ? 100 : 0,
      message: `Campaign ${response.job.status}`,
    };
  }

  async getResult(jobId: string): Promise<JobResult> {
    const response = await this.request<{ success: boolean; job: Campaign; deeplink: string }>(
      `?id=${jobId}`
    );

    return {
      success: response.success,
      data: {
        campaign: response.job,
        deeplink: response.deeplink,
      },
    };
  }

  async cancelJob(jobId: string): Promise<void> {
    await this.request(`?id=${jobId}`, {
      method: 'DELETE',
    });
  }

  async healthCheck(): Promise<HealthStatus> {
    const isHealthy = await this.testConnection();
    return {
      status: isHealthy ? 'healthy' : 'disconnected',
      last_check: new Date().toISOString(),
      metrics: {
        api_url: BASE_URL,
      },
    };
  }

  // Helper: Create GCTR keyword campaign
  async createGCTRCampaign(
    name: string,
    targetUrl: string,
    keywords: CampaignKeyword[],
    locations: string[] = ['nl'],
    durationMonths: number = 1
  ): Promise<CreateCampaignResponse> {
    return this.request<CreateCampaignResponse>('', {
      method: 'POST',
      body: JSON.stringify({
        name,
        targetUrl,
        type: 'gctr',
        locations,
        keywords,
        duration: {
          length: durationMonths,
          unit: 'month',
        },
        anonymousPercent: 50,
      }),
    });
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const url = path ? `${BASE_URL}${path}` : BASE_URL;
    
    const res = await fetch(url, {
      ...init,
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
    });

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body?.error || `GCTR API ${res.status}`);
    }

    return body as T;
  }

  private mapStatus(status: string): JobStatusResponse['status'] {
    switch (status) {
      case 'active':
        return 'running';
      case 'completed':
        return 'completed';
      case 'pending':
        return 'queued';
      case 'paused':
        return 'cancelled';
      default:
        return 'queued';
    }
  }
}

// Singleton instance
let gctrInstance: GCTRAdapter | null = null;

export function getGCTRAdapter(apiKey?: string): GCTRAdapter {
  if (!gctrInstance) {
    gctrInstance = new GCTRAdapter(apiKey);
  }
  return gctrInstance;
}
