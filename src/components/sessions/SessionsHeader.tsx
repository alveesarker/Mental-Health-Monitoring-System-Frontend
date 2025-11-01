// SessionsHeader.tsx
import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCw } from "lucide-react";

interface SessionsHeaderProps {
  onRefresh: () => void;
  onAddSession: () => void; // 👈 New prop
}

export const SessionsHeader = ({
  onRefresh,
  onAddSession,
}: SessionsHeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-lg shadow-sm border border-border">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Session Management
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage all counseling sessions
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button size="sm" onClick={onAddSession}>
          <Plus className="h-4 w-4" />
          Add Session
        </Button>
      </div>
    </header>
  );
};
