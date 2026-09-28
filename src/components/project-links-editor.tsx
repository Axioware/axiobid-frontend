import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectLinkInput, ProjectLinkType } from "@/lib/api";

const linkTypes: { value: ProjectLinkType; label: string }[] = [
  { value: "screenshot", label: "Screenshot" },
  { value: "live", label: "Live site" },
  { value: "loom", label: "Loom" },
];

interface ProjectLinksEditorProps {
  value: ProjectLinkInput[];
  onChange: (links: ProjectLinkInput[]) => void;
}

export function ProjectLinksEditor({ value, onChange }: ProjectLinksEditorProps) {
  const updateLink = (index: number, patch: Partial<ProjectLinkInput>) => {
    onChange(value.map((link, i) => (i === index ? { ...link, ...patch } : link)));
  };

  return (
    <section className="space-y-2" aria-labelledby="project-links-label">
      <div className="flex items-center justify-between gap-3">
        <Label id="project-links-label">Project Links</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 gap-1.5"
          onClick={() => onChange([...value, { link_type: "live", url: "" }])}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Link
        </Button>
      </div>

      {value.map((link, index) => (
        <div key={index} className="grid items-end gap-2 sm:grid-cols-[9rem_minmax(0,1fr)_auto]">
          <div className="space-y-1.5">
            <Label htmlFor={`project-link-type-${index}`}>Type</Label>
            <Select
              value={link.link_type}
              onValueChange={(link_type: ProjectLinkType) => updateLink(index, { link_type })}
            >
              <SelectTrigger id={`project-link-type-${index}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {linkTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={`project-link-url-${index}`}>URL</Label>
            <Input
              id={`project-link-url-${index}`}
              type="url"
              value={link.url}
              onChange={(event) => updateLink(index, { url: event.target.value })}
              placeholder="https://example.com"
            />
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-9 w-9 text-muted-foreground hover:text-destructive"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
            aria-label={`Remove ${linkTypes.find((type) => type.value === link.link_type)?.label ?? "project"} link`}
            title="Remove link"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </section>
  );
}