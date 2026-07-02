import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TagInput } from "./tag-input";
import type { GenerateBidPayload, Profile } from "@/lib/api";

interface NewBidFormProps {
  profiles: Profile[];
  activeProfileId: string | null;
  onSubmit: (payload: GenerateBidPayload) => void;
  isSubmitting: boolean;
}

const empty = {
  title: "",
  description: "",
  budget: "",
  skills: [] as string[],
  country: "",
  hireRate: "",
  reviews: "",
  totalSpent: "",
};

export function NewBidForm({ activeProfileId, onSubmit, isSubmitting }: NewBidFormProps) {
  const [form, setForm] = useState(empty);
  const [clientOpen, setClientOpen] = useState(false);

  const set = (patch: Partial<typeof empty>) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    const hasClient = form.country || form.hireRate || form.reviews || form.totalSpent;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      budget: form.budget.trim() || undefined,
      skills: form.skills,
      client_info: hasClient
        ? {
            country: form.country.trim() || undefined,
            hire_rate: form.hireRate.trim() || undefined,
            reviews: form.reviews ? parseFloat(form.reviews) : undefined,
            total_spent: form.totalSpent.trim() || undefined,
          }
        : undefined,
      profile_id: activeProfileId ?? undefined,
    });
  };

  return (
    <div className="soft-scrollbar app-canvas flex flex-1 flex-col items-center justify-start overflow-y-auto px-4 py-10 sm:py-14">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-[var(--primary-glow)] text-primary-foreground shadow-xl shadow-primary/20">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Generate a Bid</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Paste an Upwork job and get a tailored bid in seconds.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-panel space-y-5 rounded-2xl p-5 sm:p-6">
          <div className="space-y-1.5">
            <Label htmlFor="jt">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="jt"
              required
              maxLength={200}
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
              maxLength={10000}
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
                maxLength={50}
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

          {/* Client Info accordion */}
          <Collapsible open={clientOpen} onOpenChange={setClientOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-border bg-card/45 px-4 py-3 text-sm font-medium transition-colors hover:bg-card/70">
              <span className="text-muted-foreground">
                Client Info <span className="font-normal text-muted-foreground/60">(optional)</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${clientOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="grid gap-3 pt-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  maxLength={100}
                  value={form.country}
                  onChange={(e) => set({ country: e.target.value })}
                  placeholder="United States"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hire-rate">Hire Rate</Label>
                <Input
                  id="hire-rate"
                  maxLength={20}
                  value={form.hireRate}
                  onChange={(e) => set({ hireRate: e.target.value })}
                  placeholder="85%"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reviews">Reviews</Label>
                <Input
                  id="reviews"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.reviews}
                  onChange={(e) => set({ reviews: e.target.value })}
                  placeholder="4.8"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="total-spent">Total Spent</Label>
                <Input
                  id="total-spent"
                  maxLength={50}
                  value={form.totalSpent}
                  onChange={(e) => set({ totalSpent: e.target.value })}
                  placeholder="$12,000"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !form.title.trim() || !form.description.trim()}
              className="gap-2 px-8 shadow-xl shadow-primary/10"
            >
              <Sparkles className="h-4 w-4" />
              Generate Bid
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
