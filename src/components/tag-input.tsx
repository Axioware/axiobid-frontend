import { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  maxTagLength?: number;
  className?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder = "Type and press Enter",
  maxTags = 30,
  maxTagLength = 50,
  className = "",
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const tag = draft.trim();
    if (!tag || value.includes(tag) || value.length >= maxTags) return;
    onChange([...value, tag]);
    setDraft("");
  };

  const remove = (tag: string) => onChange(value.filter((t) => t !== tag));

  return (
    <div
      className={`flex min-h-10 flex-wrap gap-1.5 rounded-md border border-input bg-input/60 px-2 py-1.5 transition-colors hover:border-ring/40 focus-within:ring-1 focus-within:ring-ring ${className}`}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-sm border border-primary/25 bg-primary/10 px-2 py-0.5 text-xs text-primary"
        >
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Remove ${tag}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value.slice(0, maxTagLength))}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={add}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
