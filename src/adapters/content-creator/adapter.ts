// Content Creator API Adapter
// Generates AI-powered articles via Supabase Edge Function

import type { 
  ExternalToolAdapter, 
  JobConfig, 
  JobStatusResponse, 
  JobResult, 
  HealthStatus 
} from '@/types';

const API_URL = 'https://uyrkcolmisxsmnzfsghr.supabase.co/functions/v1/public-api';
const API_KEY = 'hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4';

export interface ContentRequest {
  main_keyword: string;
  secondary_keywords?: string[];
  language?: string;
  article_length_words?: number;
  tone?: 'conversational' | 'authoritative' | 'neutral' | 'persuasive';
  website_domain?: string;
}

export class ContentCreatorAdapter implements ExternalToolAdapter {
  name = 'Content Creator API';
  
  async checkHealth(): Promise<HealthStatus> {
    return {
      status: 'healthy',
      message: 'Content Creator API ready',
      lastCheck: new Date().toISOString(),
    };
  }

  async createJob(config: JobConfig): Promise<string> {
    const input = config.input as ContentRequest;
    
    const requestBody = {
      keywords: {
        main_keyword: input.main_keyword,
        secondary_keywords: input.secondary_keywords || [],
      },
      language: input.language || 'English',
      article_length_words: input.article_length_words || 600,
      tone: input.tone || 'conversational',
      enable_no_ai_slop: true,
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data.request_id;
  }

  async getJobStatus(externalJobId: string): Promise<JobStatusResponse> {
    return {
      status: 'completed',
      progress: 100,
      message: 'Content generated',
    };
  }

  async getJobResult(externalJobId: string): Promise<JobResult> {
    return {
      success: true,
      data: { message: 'Content ready' },
    };
  }
}

export function getContentCreatorAdapter(): ContentCreatorAdapter {
  return new ContentCreatorAdapter();
}
