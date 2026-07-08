import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { ChatView } from "@/components/chat-view";
import { NewBidForm } from "@/components/new-bid-form";
import { ProfileModal } from "@/components/profile-modal";
import { ProjectsModal } from "@/components/projects-modal";
import { PromptsModal } from "@/components/prompts-modal";
import { SettingsModal } from "@/components/settings-modal";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  fetchJobConversation,
  fetchJobs,
  fetchProfiles,
  streamGenerateBid,
  streamRevision,
  type Conversation,
  type GenerateBidPayload,
  type Job,
  type Profile,
} from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "BidCraft — AI Bid Generator" }],
  }),
  component: AuthenticatedChatApp,
});

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleUser = {
  id: string;
  google_sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  provider: string;
  last_login_at: string;
  created_at: string;
  updated_at: string;
};

type GoogleAuthResponse = {
  user: GoogleUser;
  message: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          disableAutoSelect?: () => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              type?: "standard" | "icon";
              shape?: "rectangular" | "pill" | "circle" | "square";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              width?: number;
            },
          ) => void;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const STORED_USER_KEY = "google_auth_user";

function readStoredUser() {
  try {
    const value = localStorage.getItem(STORED_USER_KEY);
    return value ? (JSON.parse(value) as GoogleUser) : null;
  } catch {
    return null;
  }
}

function AuthenticatedChatApp() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setHasCheckedStorage(true);
  }, []);

  if (!hasCheckedStorage) {
    return <div className="app-canvas min-h-screen" />;
  }

  if (!user) {
    return <GoogleAuthPage onAuthSuccess={setUser} />;
  }

  return <ChatApp onLogout={() => setUser(null)} />;
}

function GoogleAuthPage({ onAuthSuccess }: { onAuthSuccess: (user: GoogleUser) => void }) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const googleClientId = import.meta.env.GOOGLE_CLIENT_ID as string | undefined;
  const apiBase = import.meta.env.VITE_API_BASE as string | undefined;

  useEffect(() => {
    if (!googleClientId) {
      setError("Google client ID is not configured.");
      return;
    }

    if (!apiBase) {
      setError("API base URL is not configured.");
      return;
    }

    let cancelled = false;

    const handleCredential = async (response: GoogleCredentialResponse) => {
      const credential = response.credential;
      if (!credential) {
        setError("Google did not return a credential.");
        return;
      }

      setIsSubmitting(true);
      setError("");

      try {
        const res = await fetch(`${apiBase}/api/v1/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential }),
        });

        if (!res.ok) {
          throw new Error("Google sign-in failed.");
        }

        const data = (await res.json()) as GoogleAuthResponse;

        try {
          localStorage.setItem(STORED_USER_KEY, JSON.stringify(data.user));
        } catch {
          // The in-memory auth state still lets the user enter the app.
        }

        onAuthSuccess(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Google sign-in failed.");
      } finally {
        setIsSubmitting(false);
      }
    };

    const renderGoogleButton = () => {
      if (cancelled || !buttonRef.current || !window.google) return;

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredential,
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        type: "standard",
        shape: "rectangular",
        text: "signin_with",
        width: 280,
      });
    };

    if (window.google) {
      renderGoogleButton();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_SCRIPT_SRC}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", renderGoogleButton, { once: true });
      return () => {
        cancelled = true;
        existingScript.removeEventListener("load", renderGoogleButton);
      };
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = renderGoogleButton;
    script.onerror = () => setError("Could not load Google sign-in.");
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      script.onload = null;
      script.onerror = null;
    };
  }, [apiBase, googleClientId, onAuthSuccess]);

  return (
    <main className="app-canvas relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="ambient-grid" />
      <ThemeToggle className="absolute right-5 top-5 z-20 border-border bg-card/60" />
      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-background/95 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden min-h-[36rem] flex-col justify-between overflow-hidden border-r border-border p-10 lg:flex">
          <div className="auth-orbit" />
          <div className="relative z-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/30 bg-primary text-primary-foreground">
              <span className="font-serif text-lg font-semibold leading-none">B</span>
            </div>
          </div>

          <div className="relative z-10 max-w-sm">
            <p className="mb-3 font-serif text-sm italic text-primary">Est. for freelancers</p>
            <h2 className="font-serif text-[2.35rem] font-semibold leading-[1.08] tracking-tight">
              Turn job posts into proposals clients actually read.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              BidCraft studies your profile and past work, then drafts a bid pitched exactly at
              the job in front of you — ready to revise line by line.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-6 border-t border-border pt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <span>Profiles</span>
            <span className="h-3 w-px bg-border" />
            <span>Reference Projects</span>
            <span className="h-3 w-px bg-border" />
            <span>Revisions</span>
          </div>
        </section>

        <section className="flex min-h-[34rem] flex-col justify-center px-6 py-10 sm:px-10">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-md border border-primary/30 bg-primary text-primary-foreground lg:hidden">
                <span className="font-serif text-lg font-semibold leading-none">B</span>
              </div>
              <p className="mb-2 font-serif text-sm italic text-primary">Welcome back</p>
              <h1 className="font-serif text-3xl font-semibold tracking-tight">
                Sign in to your workspace
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Continue with Google to access your profiles, reference projects, prompts, and bid
                conversations.
              </p>
            </div>

            <div className="glass-panel rounded-md p-5">
              <div ref={buttonRef} aria-label="Sign in with Google" />
              {isSubmitting ? (
                <p className="mt-4 text-sm text-muted-foreground">Signing in...</p>
              ) : null}
              {error ? (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground/75">
              Google authentication only. No password forms, no extra signup flow.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function ChatApp({ onLogout }: { onLogout: () => void }) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(() => {
    try {
      return localStorage.getItem("activeProfileId");
    } catch {
      return null;
    }
  });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [conversationLoading, setConversationLoading] = useState(false);

  const [showNewBidForm, setShowNewBidForm] = useState(true);

  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [streamingUserMessage, setStreamingUserMessage] = useState("");

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const [promptsModalOpen, setPromptsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [showAllProfiles, setShowAllProfiles] = useState(() => {
    try {
      return localStorage.getItem("showAllProfiles") === "true";
    } catch {
      return false;
    }
  });

  const abortRef = useRef<AbortController | null>(null);

  // ── Persistence ────────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      if (activeProfileId) localStorage.setItem("activeProfileId", activeProfileId);
      else localStorage.removeItem("activeProfileId");
    } catch {
      /* ignore */
    }
  }, [activeProfileId]);

  useEffect(() => {
    try {
      localStorage.setItem("showAllProfiles", String(showAllProfiles));
    } catch {
      /* ignore */
    }
  }, [showAllProfiles]);

  // ── Data loading ───────────────────────────────────────────────────────────
  useEffect(() => {
    fetchProfiles()
      .then((data) => {
        setProfiles(data);
        // If stored profile no longer exists, fallback to first
        if (data.length > 0) {
          setActiveProfileId((prev) => {
            if (prev && data.find((p) => p.id === prev)) return prev;
            return data[0].id;
          });
        }
      })
      .catch(() => toast.error("Failed to load profiles"));
  }, []);

  useEffect(() => {
    if (!showAllProfiles && !activeProfileId) return;
    fetchJobs(showAllProfiles ? undefined : (activeProfileId ?? undefined))
      .then(setJobs)
      .catch(() => toast.error("Failed to load jobs"));
  }, [activeProfileId, showAllProfiles]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const loadConversation = async (jobId: string) => {
    setConversationLoading(true);
    try {
      const conv = await fetchJobConversation(jobId);
      setConversation(conv);
    } catch {
      toast.error("Failed to load conversation");
    } finally {
      setConversationLoading(false);
    }
  };

  const reloadJobs = async () => {
    if (!showAllProfiles && !activeProfileId) return;
    try {
      const data = await fetchJobs(showAllProfiles ? undefined : (activeProfileId ?? undefined));
      setJobs(data);
    } catch {
      /* silent */
    }
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSelectProfile = (id: string) => {
    abortRef.current?.abort();
    setActiveProfileId(id);
    setSelectedJobId(null);
    setConversation(null);
    setShowNewBidForm(true);
    setStreaming(false);
    setStreamText("");
    setStreamingUserMessage("");
  };

  const handleSelectJob = (jobId: string) => {
    if (streaming) abortRef.current?.abort();
    setSelectedJobId(jobId);
    setConversation(null);
    setShowNewBidForm(false);
    setStreaming(false);
    setStreamText("");
    setStreamingUserMessage("");
    loadConversation(jobId);
  };

  const handleNewBid = () => {
    if (streaming) abortRef.current?.abort();
    setSelectedJobId(null);
    setConversation(null);
    setShowNewBidForm(true);
    setStreaming(false);
    setStreamText("");
    setStreamingUserMessage("");
  };

  const handleLogout = () => {
    abortRef.current?.abort();
    try {
      localStorage.removeItem(STORED_USER_KEY);
      localStorage.removeItem("activeProfileId");
      window.google?.accounts.id.disableAutoSelect?.();
    } catch {
      /* ignore */
    }
    onLogout();
  };

  const handleGenerateBid = async (payload: GenerateBidPayload) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setShowNewBidForm(false);
    setSelectedJobId(null);
    setConversation(null);
    setStreaming(true);
    setStreamText("");
    setStreamingUserMessage(`Generate bid for: ${payload.title}`);

    let finalJobId: string | undefined;

    try {
      await streamGenerateBid(
        payload,
        (evt) => {
          if (evt.type === "chunk" && evt.content) {
            setStreamText((prev) => prev + evt.content);
          } else if (evt.type === "done") {
            finalJobId = evt.job_id;
          }
        },
        ctrl.signal,
      );

      if (finalJobId) {
        setSelectedJobId(finalJobId);
        await reloadJobs();
        const conv = await fetchJobConversation(finalJobId);
        setConversation(conv);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast.error(err instanceof Error ? err.message : "Failed to generate bid");
        setShowNewBidForm(true);
      }
    } finally {
      if (abortRef.current === ctrl) {
        setStreaming(false);
        setStreamText("");
        setStreamingUserMessage("");
        abortRef.current = null;
      }
    }
  };

  const handleRevise = async (instruction: string) => {
    if (!selectedJobId || !conversation) return;
    const latestBid = conversation.messages[conversation.messages.length - 1]?.bid;
    if (!latestBid) return;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setStreaming(true);
    setStreamText("");
    setStreamingUserMessage(instruction);

    try {
      await streamRevision(
        selectedJobId,
        latestBid.id,
        instruction,
        (evt) => {
          if (evt.type === "chunk" && evt.content) {
            setStreamText((prev) => prev + evt.content);
          }
        },
        ctrl.signal,
      );

      const jobId = selectedJobId;
      const conv = await fetchJobConversation(jobId);
      setConversation(conv);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast.error(err instanceof Error ? err.message : "Revision failed");
      }
    } finally {
      if (abortRef.current === ctrl) {
        setStreaming(false);
        setStreamText("");
        setStreamingUserMessage("");
        abortRef.current = null;
      }
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const latestBidId = conversation?.messages[conversation.messages.length - 1]?.bid?.id ?? null;

  const showChat = !showNewBidForm || streaming || !!selectedJobId;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        profiles={profiles}
        activeProfileId={activeProfileId}
        jobs={jobs}
        selectedJobId={selectedJobId}
        onSelectProfile={handleSelectProfile}
        onSelectJob={handleSelectJob}
        onNewBid={handleNewBid}
        onNewProfile={() => {
          setEditingProfile(null);
          setProfileModalOpen(true);
        }}
        onEditProfile={(p) => {
          setEditingProfile(p);
          setProfileModalOpen(true);
        }}
        onOpenProjects={() => setProjectsModalOpen(true)}
        onOpenPrompts={() => setPromptsModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {showChat ? (
          <ChatView
            conversation={conversation}
            conversationLoading={conversationLoading}
            streaming={streaming}
            streamText={streamText}
            streamingUserMessage={streamingUserMessage}
            latestBidId={latestBidId}
            onRevise={handleRevise}
            onCancelStream={() => abortRef.current?.abort()}
          />
        ) : (
          <NewBidForm
            profiles={profiles}
            activeProfileId={activeProfileId}
            onSubmit={handleGenerateBid}
            isSubmitting={streaming}
          />
        )}
      </div>

      <ProfileModal
        open={profileModalOpen}
        profile={editingProfile}
        onClose={() => setProfileModalOpen(false)}
        onSave={(saved) => {
          setProfiles((prev) =>
            editingProfile ? prev.map((p) => (p.id === saved.id ? saved : p)) : [...prev, saved],
          );
          if (!editingProfile) setActiveProfileId(saved.id);
          setProfileModalOpen(false);
        }}
        onDelete={(id) => {
          setProfiles((prev) => prev.filter((p) => p.id !== id));
          if (activeProfileId === id) {
            const remaining = profiles.filter((p) => p.id !== id);
            setActiveProfileId(remaining[0]?.id ?? null);
          }
          setProfileModalOpen(false);
        }}
      />

      <ProjectsModal
        open={projectsModalOpen}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onClose={() => setProjectsModalOpen(false)}
      />

      <PromptsModal open={promptsModalOpen} onClose={() => setPromptsModalOpen(false)} />

      <SettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        showAllProfiles={showAllProfiles}
        onToggleShowAllProfiles={setShowAllProfiles}
      />
    </div>
  );
}
