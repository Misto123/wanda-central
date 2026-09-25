// Adapter registry for managing all external tool adapters

import type { ExternalToolAdapter } from '@/types';
import { getGCTRAdapter, GCTRAdapter } from './gctr/adapter';
import { getMentionsAdapter, MentionsAdapter } from './mentions/adapter';

export type AdapterType = 'gctr' | 'mentions' | 'gsc' | 'analytics' | 'trello';

class AdapterRegistry {
  private adapters: Map<AdapterType, ExternalToolAdapter> = new Map();

  register(type: AdapterType, adapter: ExternalToolAdapter): void {
    this.adapters.set(type, adapter);
  }

  get(type: AdapterType): ExternalToolAdapter | undefined {
    return this.adapters.get(type);
  }

  has(type: AdapterType): boolean {
    return this.adapters.has(type);
  }

  async initialize(): Promise<void> {
    // Initialize GCTR adapter if API key is available
    if (process.env.GCTR_API_KEY) {
      try {
        const gctr = getGCTRAdapter();
        await gctr.connect();
        this.register('gctr', gctr);
        console.log('✓ GCTR adapter initialized');
      } catch (error) {
        console.error('✗ GCTR adapter failed:', error);
      }
    }

    // Initialize Mentions adapter if credentials are available
    if (process.env.MENTIONS_API_KEY && process.env.MENTIONS_BASE_URL) {
      try {
        const mentions = getMentionsAdapter();
        await mentions.connect();
        this.register('mentions', mentions);
        console.log('✓ Mentions adapter initialized');
      } catch (error) {
        console.error('✗ Mentions adapter failed:', error);
      }
    }
  }

  async checkHealth(type: AdapterType) {
    const adapter = this.get(type);
    if (!adapter) {
      return {
        status: 'disconnected' as const,
        last_check: new Date().toISOString(),
        error: 'Adapter not registered',
      };
    }

    return adapter.healthCheck();
  }

  async checkAllHealth() {
    const results: Record<string, Awaited<ReturnType<ExternalToolAdapter['healthCheck']>>> = {};
    
    for (const [type, adapter] of this.adapters.entries()) {
      results[type] = await adapter.healthCheck();
    }

    return results;
  }
}

// Singleton instance
export const adapterRegistry = new AdapterRegistry();

// Export adapter classes for direct instantiation if needed
export { GCTRAdapter, MentionsAdapter };
