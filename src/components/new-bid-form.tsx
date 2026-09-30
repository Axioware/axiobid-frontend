import { useState, type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "./tag-input";
import type { GenerateBidPayload, Profile } from "@/lib/api";

interface NewBidFormProps {
  profiles: Profile[];
  activeProfileId: string | null;
  onSubmit: (payload: GenerateBidPayload & { top_n?: number }) => void;
  isSubmitting: boolean;
  mode?: "bid" | "similarity-test";
  footer?: ReactNode;
}

const empty = {
  title: "",
  description: "",
  budget: "",
  skills: [] as string[],
  questions: "",
  topN: "5",
};

function parseQuestions(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function NewBidForm({
  activeProfileId,
  onSubmit,
  isSubmitting,
  mode = "bid",
  footer,
}: NewBidFormProps) {
  const [form, setForm] = useState(empty);

  const set = (patch: Partial<typeof empty>) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    const questions = parseQuestions(form.questions);
    const topN = Number(form.topN);

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      budget: form.budget.trim() || undefined,
      skills: form.skills,
      questions: questions.length > 0 ? questions : undefined,
      profile_id: activeProfileId ?? undefined,
      ...(mode === "similarity-test" ? { top_n: topN } : {}),
    });
  };

  const isSimilarityTest = mode === "similarity-test";
  const topNValue = Number(form.topN);

  return (
    <div className="soft-scrollbar app-canvas flex flex-1 flex-col items-center justify-start overflow-y-auto px-4 py-10 sm:py-14">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <p className="mb-3 font-serif text-xs italic tracking-wide text-primary">
            {isSimilarityTest ? "Reference Project Search" : "New Proposal"}
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight">
            {isSimilarityTest ? "Test project similarity" : "Draft a winning bid"}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {isSimilarityTest
              ? "Compare a job against your reference projects and inspect the closest matches."
              : "Paste an Upwork job below and BidCraft will write a tailored proposal in seconds."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-panel space-y-5 rounded-md p-5 sm:p-6">
          <div className="space-y-1.5">
            <Label htmlFor="jt">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="jt"
              required
              maxLength={800}
              value={form.title}
              onChange={(e) => set({ title: e.target.value })}
              placeholder="e.g. Full-stack developer for SaaS dashboard"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="jd">
              Job Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="jd"
              required
              rows={8}
              maxLength={40000}
              value={form.description}
              onChange={(e) => set({ description: e.target.value })}
              placeholder="Paste the full Upwork job description here..."
              className="resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                maxLength={200}
                value={form.budget}
                onChange={(e) => set({ budget: e.target.value })}
                placeholder="$500–800"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Required Skills</Label>
              <TagInput
                value={form.skills}
                onChange={(skills) => set({ skills })}
                placeholder="Add skills..."
              />
            </div>
          </div>

          {isSimilarityTest && (
            <div className="max-w-xs space-y-1.5">
              <Label htmlFor="top-n">Number of projects to return</Label>
              <Input
                id="top-n"
                type="number"
                min={1}
                max={50}
                step={1}
                required
                value={form.topN}
                onChange={(e) => set({ topN: e.target.value })}
              />
            </div>
          )}

          {/* Screening questions */}
          <div className="space-y-1.5">
            <Label htmlFor="questions">
              Screening Questions <span className="font-normal text-muted-foreground/60">(optional)</span>
            </Label>
            <Textarea
              id="questions"
              rows={4}
              maxLength={16000}
              value={form.questions}
              onChange={(e) => set({ questions: e.target.value })}
              placeholder={"Paste each question the client asked on its own line...\ne.g.\nHow many years of React experience do you have?\nCan you start immediately?"}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground/60">
              One question per line. We&apos;ll generate an answer for each alongside your bid.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting ||
                !form.title.trim() ||
                !form.description.trim() ||
                (isSimilarityTest && (!Number.isInteger(topNValue) || topNValue < 1 || topNValue > 50))
              }
              className="gap-2 px-8 shadow-xl shadow-primary/10"
            >
              <Sparkles className="h-4 w-4" />
              {isSimilarityTest ? "Run Similarity Test" : "Generate Bid"}
            </Button>
          </div>
        </form>
        {footer}
      </div>
    </div>
  );
}
