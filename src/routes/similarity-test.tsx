import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, FlaskConical, Square } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { NewBidForm } from "@/components/new-bid-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  fetchProfiles,
  streamSimilarityTest,
  type GenerateBidPayload,
  type Profile,
} from "@/lib/api";

export const Route = createFileRoute("/similarity-test")({
  head: () => ({
    meta: [{ title: "Similarity Test — BidCraft" }],
  }),
  component: SimilarityTestPage,
});

const STORED_USER_KEY = "google_auth_user";

function storedUserExists() {
  try {
    const storedUser = localStorage.getItem(STORED_USER_KEY);
    if (!storedUser) return false;
    const user = JSON.parse(storedUser) as { id?: string };
    return Boolean(user.id);
  } catch {
    return false;
  }
}

function storedProfileId() {
  try {
    return localStorage.getItem("activeProfileId");
  } catch {
    return null;
  }
}

function SimilarityTestPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [profileError, setProfileError] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const hasUser = storedUserExists();
    setAuthenticated(hasUser);
    setAuthChecked(true);
    if (!hasUser) return;

    const savedProfileId = storedProfileId();
    setActiveProfileId(savedProfileId);
    fetchProfiles()
      .then((data) => {
        setProfiles(data);
        const profileId = data.some((profile) => profile.id === savedProfileId)
          ? savedProfileId
          : (data[0]?.id ?? null);
        setActiveProfileId(profileId);
        try {
          if (profileId) localStorage.setItem("activeProfileId", profileId);
        } catch {
          // The selected profile remains available for this page session.
        }
      })
      .catch(() => setProfileError("Could not load profiles. You can still test without one."));

    return () => abortRef.current?.abort();
  }, []);

  const handleSubmit = async (payload: GenerateBidPayload & { top_n?: number }) => {
    if (!Number.isInteger(payload.top_n) || !payload.top_n || payload.top_n < 1) {
      setError("Choose a valid number of projects to return.");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStreaming(true);
    setResult("");
    setError("");

    try {
      await streamSimilarityTest(
        { ...payload, top_n: payload.top_n },
        (event) => {
          if (event.type === "chunk" && event.content) {
            setResult((current) => current + event.content);
          }
        },
        controller.signal,
      );
    } catch (requestError) {
      if ((requestError as Error).name !== "AbortError") {
        setError(requestError instanceof Error ? requestError.message : "Similarity test failed.");
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setStreaming(false);
      }
    }
  };

  const resultPanel = (streaming || result || error) && (
    <section className="space-y-3 border-t border-border pt-5" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-lg font-semibold">Similarity Results</h2>
        {streaming && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={() => abortRef.current?.abort()}
          >
            <Square className="h-3.5 w-3.5 fill-current" />
            Stop
          </Button>
        )}
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">{error}</p>
      ) : result ? (
        <div className="prose prose-sm prose-invert max-w-none border-l-2 border-primary/50 bg-card/40 px-4 py-3 text-foreground/90">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Finding the closest reference projects...</p>
      )}
    </section>
  );

  return (
    <div className="app-canvas flex min-h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to BidCraft
        </a>
        <div className="flex items-center gap-2 text-sm font-medium">
          <FlaskConical className="h-4 w-4 text-primary" />
          Similarity Test
        </div>
        <ThemeToggle />
      </header>

      {!authChecked ? (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Checking sign-in...
        </div>
      ) : !authenticated ? (
        <div className="flex flex-1 items-center justify-center px-4 text-center">
          <div className="max-w-sm space-y-3">
            <h1 className="font-serif text-2xl font-semibold">Sign in to run a test</h1>
            <p className="text-sm text-muted-foreground">
              Similarity tests use the reference projects saved to your account.
            </p>
            <a href="/" className="inline-flex text-sm font-medium text-primary hover:underline">
              Go to sign in
            </a>
          </div>
        </div>
      ) : (
        <NewBidForm
          profiles={profiles}
          activeProfileId={activeProfileId}
          onSubmit={handleSubmit}
          isSubmitting={streaming}
          mode="similarity-test"
          footer={
            <div className="space-y-3">
              {profileError && <p className="text-xs text-muted-foreground">{profileError}</p>}
              {resultPanel}
            </div>
          }
        />
      )}
    </div>
  );
}