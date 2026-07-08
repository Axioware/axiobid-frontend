import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  showAllProfiles: boolean;
  onToggleShowAllProfiles: (value: boolean) => void;
}

export function SettingsModal({
  open,
  onClose,
  showAllProfiles,
  onToggleShowAllProfiles,
}: SettingsModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-card/40 px-4 py-3">
          <div className="min-w-0">
            <Label htmlFor="show-all-profiles" className="text-sm font-medium">
              Show chats from all profiles
            </Label>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              When on, the sidebar lists bids from every profile. When off, only the
              active profile&apos;s bids are shown.
            </p>
          </div>
          <Switch
            id="show-all-profiles"
            checked={showAllProfiles}
            onCheckedChange={onToggleShowAllProfiles}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
