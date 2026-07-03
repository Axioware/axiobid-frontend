import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, SendHorizonal, Square, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Conversation, QuestionAnswer } from "@/lib/api";

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 animate-bounce rounded-full bg-primary"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="rounded-lg border border-transparent p-1.5 text-muted-foreground transition-colors hover:border-border hover:bg-card/70 hover:text-foreground"
      title="Copy bid"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

// ─── User bubble ──────────────────────────────────────────────────────────────

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end gap-3">
      <div className="max-w-[80%] rounded-2xl rounded-tr-md border border-primary/20 bg-linear-to-br from-primary/20 to-accent/30 px-4 py-3 shadow-lg shadow-black/10">
        <p className="text-sm text-foreground/90 whitespace-pre-wrap">{text}</p>
      </div>
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
        <User className="h-4 w-4 text-primary" />
      </div>
    </div>
  );
}

// ─── AI bubble ────────────────────────────────────────────────────────────────

function AiBubble({ text, isStreaming = false }: { text: string; isStreaming?: boolean }) {
  return (
    <div className="flex gap-3 group">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-[var(--primary-glow)] text-xs font-bold text-primary-foreground shadow-lg shadow-primary/10">
        AI
      </div>
      <div className="min-w-0 flex-1">
        {isStreaming && !text ? (
          <TypingDots />
        ) : (
          <>
            <div className="prose prose-sm prose-invert max-w-none rounded-2xl border border-border/70 bg-card/55 px-4 py-3 text-foreground/90 shadow-lg shadow-black/10 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
              {isStreaming && (
                <span className="cursor-blink ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-primary align-middle" />
              )}
            </div>
            {!isStreaming && (
              <div className="mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={text} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Screening questions card ───────────────────────────────────────────────────

function QuestionsCard({ answers }: { answers: QuestionAnswer[] }) {
  return (
    <div className="ml-11 space-y-3 rounded-2xl border border-border/60 bg-card/35 px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
        Client Questions
      </p>
      <div className="space-y-3">
        {answers.map((qa, i) => (
          <div key={i} className="space-y-1">
            <p className="text-sm font-medium text-foreground/90">{qa.question}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{qa.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ChatView ─────────────────────────────────────────────────────────────────

interface ChatViewProps {
  conversation: Conversation | null;
  conversationLoading: boolean;
  streaming: boolean;
  streamText: string;
  streamingUserMessage: string;
  latestBidId: string | null;
  onRevise: (instruction: string) => void;
  onCancelStream: () => void;
}

export function ChatView({
  conversation,
  conversationLoading,
  streaming,
  streamText,
  streamingUserMessage,
  latestBidId,
  onRevise,
  onCancelStream,
}: ChatViewProps) {
  const [instruction, setInstruction] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, streamText, streaming]);

  const canSubmit = !!latestBidId && instruction.trim().length > 0 && !streaming;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onRevise(instruction.trim());
    setInstruction("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="app-canvas flex flex-1 flex-col overflow-hidden">
      {/* Messages area */}
      <div className="soft-scrollbar flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {conversationLoading ? (
            <div className="flex justify-center py-20">
              <TypingDots />
            </div>
          ) : (
            <>
              {/* Loaded conversation messages */}
              {conversation?.messages.map((msg, i) => {
                const userText =
                  msg.memory_type === "bid_generation"
                    ? `Generate bid for: ${conversation.job.title}`
                    : (msg.user_instruction ?? "");
                return (
                  <div key={i} className="space-y-4">
                    <UserBubble text={userText} />
                    <AiBubble text={msg.bid.bid_text} />
                    {msg.bid.answers && msg.bid.answers.length > 0 && (
                      <QuestionsCard answers={msg.bid.answers} />
                    )}
                  </div>
                );
              })}

              {/* In-progress streaming message */}
              {(streaming || streamingUserMessage) && (
                <div className="space-y-4">
                  {streamingUserMessage && <UserBubble text={streamingUserMessage} />}
                  <AiBubble text={streamText} isStreaming={streaming} />
                </div>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Revision input */}
      <div className="border-t border-border/70 bg-background/90 px-4 py-3">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-2xl border border-border/80 bg-card/70 px-3 py-2 shadow-2xl shadow-black/15 transition-all focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
            <Textarea
              ref={textareaRef}
              value={instruction}
              maxLength={1000}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                latestBidId
                  ? "Edit this bid… (e.g. make it shorter, add more about React experience)"
                  : "Generate a bid to enable revisions"
              }
              disabled={!latestBidId || streaming}
              rows={1}
              className="max-h-[160px] min-h-[24px] flex-1 resize-none border-0 bg-transparent p-0 text-sm shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0"
            />
            {streaming ? (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={onCancelStream}
                title="Stop generating"
              >
                <Square className="h-4 w-4 fill-current" />
              </Button>
            ) : (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                disabled={!canSubmit}
                onClick={handleSubmit}
                title="Send revision"
              >
                <SendHorizonal className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="mt-1.5 text-center text-[11px] text-muted-foreground/50">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
