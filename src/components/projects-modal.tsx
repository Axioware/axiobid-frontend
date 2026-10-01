import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "./tag-input";
import { ProjectLinksEditor } from "./project-links-editor";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
  type ProjectLinkInput,
  type ProjectLinkType,
  type Profile,
} from "@/lib/api";

type ModalView = "list" | "new" | { type: "edit"; project: Project };

interface ProjectsModalProps {
  open: boolean;
  profiles: Profile[];
  activeProfileId: string | null;
  onClose: () => void;
}

interface FormState {
  title: string;
  description: string;
  skills: string[];
  techStack: string;
  outcome: string;
  links: ProjectLinkInput[];
  profileId: string;
}

function emptyForm(defaultProfileId: string): FormState {
  return {
    title: "",
    description: "",
    skills: [],
    techStack: "",
    outcome: "",
    links: [],
    profileId: defaultProfileId,
  };
}

function formFromProject(p: Project): FormState {
  return {
    title: p.title,
    description: p.description,
    skills: p.skills ?? [],
    techStack: p.tech_stack ?? "",
    outcome: p.outcome ?? "",
    links: (p.links ?? []).map(({ link_type, url }) => ({ link_type, url })),
    profileId: p.profile_id,
  };
}

function projectLinksPayload(links: ProjectLinkInput[]): ProjectLinkInput[] {
  return links
    .filter((link) => link.url.trim())
    .map((link) => ({ ...link, url: link.url.trim() }));
}

const linkTypeLabels: Record<ProjectLinkType, string> = {
  screenshot: "Screenshot",
  live: "Live site",
  loom: "Loom",
};

export function ProjectsModal({
  open,
  profiles,
  activeProfileId,
  onClose,
}: ProjectsModalProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<ModalView>("list");
  const [filterProfileId, setFilterProfileId] = useState<string>("all");
  const [form, setForm] = useState<FormState>(emptyForm(""));
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setView("list");
    setFilterProfileId("all");
    loadProjects();
  }, [open]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    filterProfileId === "all"
      ? projects
      : projects.filter((p) => p.profile_id === filterProfileId);

  const profileName = (id: string) =>
    profiles.find((p) => p.id === id)?.name ?? id;

  const goNew = () => {
    setForm(emptyForm(activeProfileId ?? profiles[0]?.id ?? ""));
    setView("new");
  };

  const goEdit = (project: Project) => {
    setForm(formFromProject(project));
    setView({ type: "edit", project });
  };

  const goList = () => setView("list");

  const handleSave = async () => {
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.description.trim()) return toast.error("Description is required");
    if (!form.profileId) return toast.error("Please select a profile");

    setSaving(true);
    try {
      if (view === "new") {
        const created = await createProject({
          title: form.title.trim(),
          description: form.description.trim(),
          skills: form.skills,
          tech_stack: form.techStack.trim() || undefined,
          outcome: form.outcome.trim() || undefined,
          links: projectLinksPayload(form.links),
          profile_id: form.profileId,
        });
        setProjects((prev) => [created, ...prev]);
        toast.success("Project added");
      } else if (typeof view === "object" && view.type === "edit") {
        const updated = await updateProject(view.project.id, {
          title: form.title.trim(),
          description: form.description.trim(),
          skills: form.skills,
          tech_stack: form.techStack.trim(),
          outcome: form.outcome.trim() || undefined,
          links: projectLinksPayload(form.links),
          profile_id: form.profileId,
        });
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        );
        toast.success("Project updated");
      }
      goList();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProject(deleteId);
      setProjects((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleteId(null);
    }
  };

  const isFormView = view === "new" || (typeof view === "object" && view.type === "edit");
  const formTitle = view === "new" ? "New Reference Project" : "Edit Reference Project";

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="sm:max-w-2xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              {isFormView && (
                <button
                  onClick={goList}
                  className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors -ml-1"
                  aria-label="Back to list"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <DialogTitle>
                {isFormView ? formTitle : "Reference Projects"}
              </DialogTitle>
            </div>
            {!isFormView && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Past projects used as RAG context to improve bid quality.
              </p>
            )}
          </DialogHeader>

          {/* List view */}
          {!isFormView && (
            <>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border shrink-0">
                {profiles.length > 1 && (
                  <Select
                    value={filterProfileId}
                    onValueChange={setFilterProfileId}
                  >
                    <SelectTrigger className="h-8 w-44 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Profiles</SelectItem>
                      {profiles.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button
                  size="sm"
                  className="ml-auto h-8 gap-1.5"
                  onClick={goNew}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add New
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-2 text-center px-4">
                    <p className="text-sm text-muted-foreground">
                      No reference projects yet.
                    </p>
                    <Button size="sm" variant="secondary" onClick={goNew}>
                      Add your first project
                    </Button>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {filteredProjects.map((project) => (
                      <li
                        key={project.id}
                        className="group flex items-start gap-3 px-4 py-4 hover:bg-accent/30 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-foreground truncate">
                              {project.title}
                            </span>
                            {profiles.length > 1 && (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground shrink-0">
                                {profileName(project.profile_id)}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                          {project.skills?.length ? (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.skills.slice(0, 6).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          {project.tech_stack && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              <span className="font-medium text-foreground/80">Tech stack:</span>{" "}
                              {project.tech_stack}
                            </p>
                          )}
                          {project.links?.length ? (
                            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                              {project.links.map((link) => (
                                <a
                                  key={link.id}
                                  href={link.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-primary underline-offset-4 hover:underline"
                                >
                                  {linkTypeLabels[link.link_type]}
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => goEdit(project)}
                            className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            aria-label="Edit project"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteId(project.id)}
                            className="rounded p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            aria-label="Delete project"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {/* Form view (new / edit) */}
          {isFormView && (
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="proj-title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="proj-title"
                  value={form.title}
                  maxLength={16000}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. E-commerce platform rebuild"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-desc">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="proj-desc"
                  value={form.description}
                  maxLength={400000}
                  rows={4}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="What you built, the problem it solved, your role..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Skills Used</Label>
                  <TagInput
                    value={form.skills}
                    onChange={(v) => setForm((f) => ({ ...f, skills: v }))}
                    placeholder="Add skills..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="proj-tech-stack">Tech Stack</Label>
                  <Input
                    id="proj-tech-stack"
                    value={form.techStack}
                    maxLength={40000}
                    onChange={(e) => setForm((f) => ({ ...f, techStack: e.target.value }))}
                    placeholder="React, FastAPI, PostgreSQL"
                  />
                </div>
              </div>

              <ProjectLinksEditor
                value={form.links}
                onChange={(links) => setForm((f) => ({ ...f, links }))}
              />

              <div className="space-y-1.5">
                <Label htmlFor="proj-outcome">Outcome</Label>
                <Textarea
                  id="proj-outcome"
                  value={form.outcome}
                  maxLength={80000}
                  rows={2}
                  onChange={(e) => setForm((f) => ({ ...f, outcome: e.target.value }))}
                  placeholder="Results, metrics, client feedback..."
                />
              </div>

              {profiles.length > 1 && (
                <div className="space-y-1.5">
                  <Label>Profile</Label>
                  <Select
                    value={form.profileId}
                    onValueChange={(v) => setForm((f) => ({ ...f, profileId: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={goList} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving && (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  )}
                  {view === "new" ? "Add Project" : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the project from your reference
              library. Existing bids are not affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
