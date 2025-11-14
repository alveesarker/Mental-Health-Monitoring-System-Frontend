// ======================
// SessionsFilterBar.tsx
// ======================
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Session } from "@/pages/SessionManagement";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface SessionsFilterBarProps {
  onFilter: (filters: {
    search: string;
    counsellor: string;
    user: string;
    status: string;
    dateRange: { from?: Date; to?: Date };
  }) => void;
  sessions: Session[];
}

export const CounsellorSessionFilter = ({
  onFilter,
  sessions,
}: SessionsFilterBarProps) => {
  const [search, setSearch] = useState("");
  const [counsellor, setCounsellor] = useState("all");
  const [user, setUser] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const counsellors = Array.from(
    new Set(sessions.map((s) => s.counsellor))
  ).filter(Boolean);
  const users = Array.from(new Set(sessions.map((s) => s.userName))).filter(
    Boolean
  );

  const handleApplyFilter = () => {
    onFilter({ search, counsellor, user, status, dateRange });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCounsellor("all");
    setUser("all");
    setStatus("all");
    setDateRange({});
    onFilter({
      search: "",
      counsellor: "all",
      user: "all",
      status: "all",
      dateRange: {},
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
        <Filter className="h-4 w-4" />
        <span>Filter Sessions</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          placeholder="Search by user, counsellor, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={user} onValueChange={setUser}>
          <SelectTrigger>
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {users.map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleApplyFilter} size="sm">
          <Filter className="h-4 w-4 mr-1" /> Apply
        </Button>
        <Button onClick={handleClearFilters} size="sm" variant="outline">
          <X className="h-4 w-4 mr-1" /> Clear
        </Button>
      </div>
    </div>
  );
};
