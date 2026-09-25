// Core TypeScript types for Wanda Central

export type JobStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled' | 'retrying';
export type ProjectStatus = 'active' | 'inactive' | 'archived';
export type IntegrationStatus = 'healthy' | 'degraded' | 'disconnected';
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled';
export type LogLevel = 'debug' | 'info' | 'warning' | 'error' | 'critical';
export type Priority = 'low' | 'normal' | 'high' | 'urgent';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  domain?: string;
  status: ProjectStatus;
  owner_id: string;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ProjectModule {
  id: string;
  project_id: string;
  module_name: string;
  enabled: boolean;
  config: Record<string, unknown>;
  created_at: string;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: IntegrationStatus;
  last_check?: string;
  last_error?: string;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  project_id: string;
  tool: string;
  type: string;
  status: JobStatus;
  priority: number;
  input: Record<string, unknown>;
  external_job_id?: string;
  progress: number;
  result?: Record<string, unknown>;
  error?: string;
  retry_count: number;
  max_retries: number;
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

export interface JobAttempt {
  id: string;
  job_id: string;
  attempt_number: number;
  status: string;
  error?: string;
  started_at: string;
  completed_at?: string;
}

export interface JobEvent {
  id: string;
  job_id: string;
  event_type: string;
  severity: LogLevel;
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Experiment {
  id: string;
  project_id: string;
  name: string;
  type?: string;
  hypothesis?: string;
  target_urls?: string[];
  config: Record<string, unknown>;
  status: string;
  start_date?: string;
  end_date?: string;
  baseline?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assignee_id?: string;
  due_date?: string;
  source?: string;
  external_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  category?: string;
  severity: LogLevel;
  source_job_id?: string;
  source_data: Record<string, unknown>;
  created_at: string;
}

export interface Log {
  id: string;
  project_id?: string;
  tool?: string;
  job_id?: string;
  level: LogLevel;
  action: string;
  status?: string;
  message?: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// Adapter interfaces
export interface ExternalToolAdapter {
  connect(): Promise<void>;
  testConnection(): Promise<boolean>;
  createJob(config: JobConfig): Promise<string>;
  getJobStatus(jobId: string): Promise<JobStatusResponse>;
  getResult(jobId: string): Promise<JobResult>;
  cancelJob(jobId: string): Promise<void>;
  healthCheck(): Promise<HealthStatus>;
}

export interface JobConfig {
  project_id: string;
  type: string;
  input: Record<string, unknown>;
  priority?: number;
}

export interface JobStatusResponse {
  status: JobStatus;
  progress?: number;
  message?: string;
}

export interface JobResult {
  success: boolean;
  data: Record<string, unknown>;
  error?: string;
}

export interface HealthStatus {
  status: IntegrationStatus;
  last_check: string;
  error?: string;
  metrics?: Record<string, unknown>;
}
