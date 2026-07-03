import { useState } from "react";
import {
  ChevronDown,
  FileText,
  Folder,
  LogOut,
  MessageSquarePlus,
  Pencil,
  Plus,
  Settings,
  Sparkles,
  UserCircle,
} from "lucide-react";
import { formatDistanceToNow, isToday, isYesterday, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Job, Profile } from "@/lib/api";

interface SidebarProps {
  profiles: Profile[];
  activeProfileId: string | null;
  jobs: Job[];
  selectedJobId: string | null;
  onSelectProfile: (id: string) => void;
  onSelectJob: (id: string) => void;
  onNewBid: () => void;
  onNewProfile: () => void;
  onEditProfile: (profile: Profile) => void;
  onOpenProjects: () => void;
  onOpenPrompts: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

function groupJobs(jobs: Job[]) {
  const now = new Date();
  const weekAgo = subDays(now, 7);

  const groups: { label: string; jobs: Job[] }[] = [];
  const todayJobs = jobs.filter((j) => isToday(new Date(j.created_at)));
  const yesterdayJobs = jobs.filter((j) => isYesterday(new Date(j.created_at)));
  const weekJobs = jobs.filter((j) => {
    const d = new Date(j.created_at);
    return d >= weekAgo && !isToday(d) && !isYesterday(d);
  });
  const olderJobs = jobs.filter((j) => new Date(j.created_at) < weekAgo);

  if (todayJobs.length) groups.push({ label: "Today", jobs: todayJobs });
  if (yesterdayJobs.length) groups.push({ label: "Yesterday", jobs: yesterdayJobs });
  if (weekJobs.length) groups.push({ label: "Last 7 days", jobs: weekJobs });
  if (olderJobs.length) groups.push({ label: "Older", jobs: olderJobs });

  return groups;
}

export function Sidebar({
  profiles,
  activeProfileId,
  jobs,
  selectedJobId,
  onSelectProfile,
  onSelectJob,
  onNewBid,
  onNewProfile,
  onEditProfile,
  onOpenProjects,
  onOpenPrompts,
  onOpenSettings,
  onLogout,
}: SidebarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const activeProfile = profiles.find((p) => p.id === activeProfileId);
  const jobGroups = groupJobs(jobs);

  return (
    <aside className="flex w-72 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar/95 shadow-2xl shadow-black/25">
      <div className="border-b border-sidebar-border/80 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-[var(--primary-glow)] text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">BidCraft</p>
            <p className="truncate text-xs text-muted-foreground">AI bid workspace</p>
          </div>
        </div>
      </div>

      {/* Profile selector */}
      <div className="border-b border-sidebar-border/80 p-3">
        <Popover open={profileOpen} onOpenChange={setProfileOpen}>
          <PopoverTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-xl border border-sidebar-border/80 bg-sidebar-accent/30 px-3 py-2.5 text-sm font-medium text-sidebar-foreground shadow-sm transition-all hover:border-sidebar-ring/50 hover:bg-sidebar-accent">
              <UserCircle className="h-5 w-5 shrink-0 text-primary" />
              <span className="flex-1 truncate text-left">
                {activeProfile?.name ?? "Select profile"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="glass-panel w-64 rounded-xl p-1.5" side="bottom" align="start">
            {profiles.map((p) => (
              <div key={p.id} className="flex items-center gap-1 rounded-lg hover:bg-accent">
                <button
                  className="flex-1 truncate px-2.5 py-2 text-left text-sm"
                  onClick={() => {
                    onSelectProfile(p.id);
                    setProfileOpen(false);
                  }}
                >
                  {p.id === activeProfileId ? (
                    <span className="font-medium">{p.name}</span>
                  ) : (
                    p.name
                  )}
                </button>
                <button
                  className="mr-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-background/30 hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProfile(p);
                    setProfileOpen(false);
                  }}
                  aria-label={`Edit ${p.name}`}
                >
                  <Pencil className="h-3 w-3" />
                </button>
              </div>
            ))}
            {profiles.length > 0 && <div className="my-1 border-t border-border" />}
            <button
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => {
                onNewProfile();
                setProfileOpen(false);
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              New Profile
            </button>
          </PopoverContent>
        </Popover>
      </div>

      {/* New Bid button */}
      <div className="px-3 pt-3">
        <Button size="sm" className="h-10 w-full justify-start gap-2" onClick={onNewBid}>
          <MessageSquarePlus className="h-4 w-4" />
          New Bid
        </Button>
      </div>

      {/* Job list */}
      <div className="soft-scrollbar flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {jobGroups.length === 0 ? (
          <div className="rounded-2xl border border-sidebar-border/80 bg-sidebar-accent/20 px-4 py-6 text-center">
            <p className="text-sm font-medium text-sidebar-foreground">No bids yet</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Start a new bid and your conversations will collect here.
            </p>
          </div>
        ) : (
          jobGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <ul className="space-y-1">
                {group.jobs.map((job) => {
                  const active = job.id === selectedJobId;
                  return (
                    <li key={job.id}>
                      <button
                        onClick={() => onSelectJob(job.id)}
                        className={`w-full rounded-xl border px-3 py-2.5 text-left transition-all ${
                          active
                            ? "border-sidebar-ring/50 bg-sidebar-accent text-sidebar-foreground shadow-lg shadow-primary/5"
                            : "border-transparent text-sidebar-foreground/75 hover:border-sidebar-border hover:bg-sidebar-accent/55 hover:text-sidebar-foreground"
                        }`}
                      >
                        <p className="truncate text-sm leading-snug">{job.title}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {formatDistanceToNow(new Date(job.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Bottom actions */}
      <div className="space-y-1 border-t border-sidebar-border/80 p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 rounded-xl text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          onClick={onOpenProjects}
        >
          <Folder className="h-4 w-4" />
          Reference Projects
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 rounded-xl text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          onClick={onOpenPrompts}
        >
          <FileText className="h-4 w-4" />
          Prompts
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 rounded-xl text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          onClick={onOpenSettings}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
