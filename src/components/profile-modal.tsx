import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TagInput } from "./tag-input";
import {
  createProfile,
  updateProfile,
  deleteProfile,
  type Profile,
} from "@/lib/api";

interface ProfileModalProps {
  open: boolean;
  profile: Profile | null;
  onClose: () => void;
  onSave: (profile: Profile) => void;
  onDelete: (id: string) => void;
}

export function ProfileModal({
  open,
  profile,
  onClose,
  onSave,
  onDelete,
}: ProfileModalProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (open) {
      setName(profile?.name ?? "");
      setBio(profile?.bio ?? "");
      setSkills(profile?.skills ?? []);
    }
  }, [open, profile]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    try {
      const data = { name: name.trim(), bio: bio.trim() || undefined, skills };
      const saved = profile
        ? await updateProfile(profile.id, data)
        : await createProfile(data);
      onSave(saved);
      toast.success(profile ? "Profile updated" : "Profile created");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!profile) return;
    setDeleting(true);
    try {
      await deleteProfile(profile.id);
      onDelete(profile.id);
      toast.success("Profile deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete profile");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{profile ? "Edit Profile" : "New Profile"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="profile-name"
              value={name}
              maxLength={400}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Full-Stack Developer"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              value={bio}
              maxLength={4000}
              rows={3}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief description of your expertise..."
            />
          </div>

          <div className="space-y-1.5">
            <Label>Skills</Label>
            <TagInput
              value={skills}
              onChange={setSkills}
              placeholder="Add skills..."
            />
          </div>
        </div>

        <DialogFooter className="flex-row items-center justify-between gap-2 sm:justify-between">
          {profile && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-destructive hover:text-destructive"
                  disabled={deleting}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete profile?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{profile.name}". This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {deleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="ghost" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
              {profile ? "Save Changes" : "Create Profile"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
