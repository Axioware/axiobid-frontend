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

// ─── User instruction line ──────────────────────────────────────────────────────

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
        <User className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="max-w-[80%] border-r-2 border-primary bg-secondary/40 px-4 py-2.5 text-right">
        <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}

// ─── AI manuscript panel ─────────────────────────────────────────────────────────

function AiBubble({ text, isStreaming = false }: { text: string; isStreaming?: boolean }) {
  return (
    <div className="flex gap-3 group">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/15 font-serif text-xs font-semibold text-primary">
        B
      </div>
      <div className="min-w-0 flex-1">
        {isStreaming && !text ? (
          <TypingDots />
        ) : (
          <>
            <div className="prose prose-sm prose-invert max-w-none border-l-2 border-border bg-card/40 px-4 py-3.5 text-foreground/90 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
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
    <div className="ml-11 space-y-3 border-l-2 border-dashed border-border bg-transparent px-4 py-3">
      <p className="font-serif text-[11px] italic tracking-wide text-muted-foreground/80">
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
      <div className="border-t border-border bg-background px-4 py-3">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-md border border-border bg-card/50 px-3 py-2 transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
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
