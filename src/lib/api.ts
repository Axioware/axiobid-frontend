export const API_BASE: string = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE ?? "";

const STORED_USER_KEY = "google_auth_user";

type StoredGoogleUser = {
  id?: string;
};

function currentUserId() {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(STORED_USER_KEY);
    if (!value) return null;
    const user = JSON.parse(value) as StoredGoogleUser;
    return user.id || null;
  } catch {
    return null;
  }
}

function authHeaders(headers?: HeadersInit) {
  const userId = currentUserId();
  if (!userId) throw new Error("No logged-in user found");

  const nextHeaders = new Headers(headers);
  nextHeaders.set("X-User-Id", userId);
  return nextHeaders;
}

function jsonHeaders(headers?: HeadersInit) {
  const nextHeaders = authHeaders(headers);
  nextHeaders.set("Content-Type", "application/json");
  return nextHeaders;
}

async function apiFetch(path: string, init: RequestInit = {}) {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: authHeaders(init.headers),
  });
}

async function apiJsonFetch(path: string, init: RequestInit = {}) {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: jsonHeaders(init.headers),
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  user_id?: string;
  name: string;
  bio?: string;
  skills?: string[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id?: string;
  profile_id: string;
  title: string;
  description: string;
  skills?: string[];
  tech_stack?: string[];
  outcome?: string;
  created_at: string;
}

export interface ClientInfo {
  country?: string;
  hire_rate?: string;
  reviews?: number | null;
  total_spent?: string;
}

export interface Job {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  budget?: string;
  skills: string[];
  client_info?: ClientInfo;
  profile_id?: string;
  created_at: string;
}

export interface Bid {
  id: string;
  user_id?: string;
  job_id: string;
  bid_text: string;
  is_manual: boolean;
  created_at: string;
}

export interface ConversationMessage {
  memory_type: "bid_generation" | "bid_revision";
  bid: Bid;
  user_instruction?: string;
}

export interface Conversation {
  job: Job;
  messages: ConversationMessage[];
}

export interface StreamEvent {
  type: "chunk" | "done";
  content?: string;
  bid_id?: string;
  job_id?: string;
}

export interface GenerateBidPayload {
  title: string;
  description: string;
  budget?: string;
  skills?: string[];
  client_info?: ClientInfo;
  profile_id?: string;
}

// ─── Streaming helper ─────────────────────────────────────────────────────────

async function consumeStream(res: Response, onEvent: (e: StreamEvent) => void): Promise<void> {
  if (!res.body) throw new Error("No response body");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data) continue;
      try {
        onEvent(JSON.parse(data) as StreamEvent);
      } catch {
        // ignore malformed events
      }
    }
  }
}

// ─── Profile APIs ─────────────────────────────────────────────────────────────

export async function fetchProfiles(): Promise<Profile[]> {
  const res = await apiFetch("/api/v1/profiles");
  if (!res.ok) throw new Error("Failed to fetch profiles");
  return res.json();
}

export async function createProfile(data: {
  name: string;
  bio?: string;
  skills?: string[];
}): Promise<Profile> {
  const res = await apiJsonFetch("/api/v1/profiles", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create profile");
  return res.json();
}

export async function updateProfile(
  id: string,
  data: { name?: string; bio?: string; skills?: string[] },
): Promise<Profile> {
  const res = await apiJsonFetch(`/api/v1/profiles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

export async function deleteProfile(id: string): Promise<void> {
  const res = await apiFetch(`/api/v1/profiles/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete profile");
}

// ─── Prompt type ─────────────────────────────────────────────────────────────

export interface Prompt {
  id: string;
  user_id?: string | null;
  type: string;
  prompt: string;
  created_at: string;
  updated_at: string;
}

// ─── Project APIs ─────────────────────────────────────────────────────────────

export async function fetchProjects(profileId?: string): Promise<Project[]> {
  const params = new URLSearchParams();
  if (profileId) params.set("profile_id", profileId);
  const query = params.toString();
  const res = await apiFetch(`/api/v1/projects${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(data: {
  title: string;
  description: string;
  skills?: string[];
  tech_stack?: string[];
  outcome?: string;
  profile_id: string;
}): Promise<Project> {
  const res = await apiJsonFetch("/api/v1/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProject(
  id: string,
  data: {
    title?: string;
    description?: string;
    skills?: string[];
    tech_stack?: string[];
    outcome?: string;
    profile_id?: string;
  },
): Promise<Project> {
  const res = await apiJsonFetch(`/api/v1/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id: string): Promise<void> {
  const res = await apiFetch(`/api/v1/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
}

// ─── Prompt APIs ──────────────────────────────────────────────────────────────

export async function fetchPrompts(): Promise<Prompt[]> {
  const res = await apiFetch("/api/v1/prompts");
  if (!res.ok) throw new Error("Failed to fetch prompts");
  return res.json();
}

export async function updatePrompt(id: string, prompt: string): Promise<Prompt> {
  const res = await apiJsonFetch(`/api/v1/prompts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error("Failed to update prompt");
  return res.json();
}

export async function createPrompt(type: string, prompt: string): Promise<Prompt> {
  const res = await apiJsonFetch("/api/v1/prompts", {
    method: "POST",
    body: JSON.stringify({ type, prompt }),
  });
  if (!res.ok) throw new Error("Failed to create prompt");
  return res.json();
}

// ─── Job APIs ─────────────────────────────────────────────────────────────────

export async function fetchJobs(profileId?: string, limit = 50): Promise<Job[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (profileId) params.set("profile_id", profileId);
  const res = await apiFetch(`/api/v1/jobs?${params}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function fetchJobConversation(jobId: string): Promise<Conversation> {
  const res = await apiFetch(`/api/v1/jobs/${jobId}/conversation`);
  if (!res.ok) throw new Error("Failed to fetch conversation");
  return res.json();
}

// ─── Streaming APIs ───────────────────────────────────────────────────────────

export async function streamGenerateBid(
  payload: GenerateBidPayload,
  onEvent: (e: StreamEvent) => void,
  signal: AbortSignal,
): Promise<void> {
  const res = await apiJsonFetch("/api/v1/jobs/generate-bid", {
    method: "POST",
    body: JSON.stringify(payload),
    signal,
  });
  if (!res.ok || !res.body) throw new Error("Failed to start bid stream");
  await consumeStream(res, onEvent);
}

export async function streamRevision(
  jobId: string,
  bidId: string,
  instruction: string,
  onEvent: (e: StreamEvent) => void,
  signal: AbortSignal,
): Promise<void> {
  const res = await apiJsonFetch(`/api/v1/jobs/${jobId}/bids/${bidId}/revise`, {
    method: "POST",
    body: JSON.stringify({ instruction }),
    signal,
  });
  if (!res.ok || !res.body) throw new Error("Failed to start revision stream");
  await consumeStream(res, onEvent);
}
