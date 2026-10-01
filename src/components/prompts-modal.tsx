import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchPrompts, updatePrompt, createPrompt, type Prompt } from "@/lib/api";

interface PromptsModalProps {
  open: boolean;
  onClose: () => void;
}

export function PromptsModal({ open, onClose }: PromptsModalProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // "new" mode state
  const [isCreating, setIsCreating] = useState(false);
  const [newType, setNewType] = useState("");
  const [newPromptText, setNewPromptText] = useState("");

  useEffect(() => {
    if (!open) return;
    setIsCreating(false);
    setLoading(true);
    fetchPrompts()
      .then((data) => {
        setPrompts(data);
        if (data.length > 0) {
          setSelectedId(data[0].id);
          setEditContent(data[0].prompt);
        }
      })
      .catch(() => toast.error("Failed to load prompts"))
      .finally(() => setLoading(false));
  }, [open]);

  const selectedPrompt = prompts.find((p) => p.id === selectedId);

  const handleSelect = (p: Prompt) => {
    setIsCreating(false);
    setSelectedId(p.id);
    setEditContent(p.prompt);
  };

  const handleNewClick = () => {
    setIsCreating(true);
    setSelectedId(null);
    setNewType("");
    setNewPromptText("");
  };

  const handleCancelNew = () => {
    setIsCreating(false);
    if (prompts.length > 0) {
      setSelectedId(prompts[0].id);
      setEditContent(prompts[0].prompt);
    }
  };

  const handleCreate = async () => {
    if (!newType.trim()) return toast.error("Type is required");
    if (!newPromptText.trim()) return toast.error("Prompt text is required");
    setSaving(true);
    try {
      const created = await createPrompt(newType.trim(), newPromptText.trim());
      setPrompts((prev) => [...prev, created]);
      setIsCreating(false);
      setSelectedId(created.id);
      setEditContent(created.prompt);
      toast.success("Prompt created");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create prompt");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!selectedId) return;
    setSaving(true);
    try {
      const updated = await updatePrompt(selectedId, editContent);
      setPrompts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
      );
      toast.success("Prompt saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save prompt");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border shrink-0">
          <DialogTitle>System Prompts</DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Universal — apply to all profiles
          </p>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-1 min-h-0">
            {/* Left: prompt list */}
            <div className="w-44 shrink-0 border-r border-border flex flex-col">
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Prompts
                </span>
                <button
                  onClick={handleNewClick}
                  className="rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label="New prompt"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {isCreating && (
                  <div className="px-4 py-3 text-sm font-medium bg-accent text-accent-foreground">
                    New Prompt
                  </div>
                )}
                {prompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                      !isCreating && selectedId === p.id
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    {p.type}
                  </button>
                ))}
                {prompts.length === 0 && !isCreating && (
                  <p className="px-4 py-4 text-xs text-muted-foreground">
                    No prompts yet.
                  </p>
                )}
              </div>
            </div>

            {/* Right: editor */}
            <div className="flex flex-1 flex-col min-w-0 p-4 gap-3">
              {isCreating ? (
                <>
                  <div className="shrink-0 space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="new-type">Type</Label>
                      <Input
                        id="new-type"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        placeholder="e.g. bid_generation"
                        maxLength={8000}
                      />
                    </div>
                    <Label>Prompt</Label>
                  </div>
                  <div className="flex-1 min-h-0">
                    <Textarea
                      className="h-full resize-none font-mono text-xs leading-relaxed"
                      value={newPromptText}
                      onChange={(e) => setNewPromptText(e.target.value)}
                      placeholder="Write the system prompt..."
                    />
                  </div>
                  <div className="flex justify-end gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelNew}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={saving} size="sm">
                      {saving && (
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      )}
                      Create
                    </Button>
                  </div>
                </>
              ) : selectedPrompt ? (
                <>
                  <div className="shrink-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {selectedPrompt.type}
                    </h3>
                  </div>
                  <div className="flex-1 min-h-0">
                    <Textarea
                      className="h-full resize-none font-mono text-xs leading-relaxed"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end shrink-0">
                    <Button onClick={handleSave} disabled={saving} size="sm">
                      {saving && (
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      )}
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Select a prompt to edit
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
