// ======================
// SessionsFilterBar.tsx
// ======================
import { useState } from "react";
import { Filter, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Session } from "@/pages/SessionManagement";
import { format } from "date-fns";

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

export const SessionsFilterBar = ({
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

        <Select value={counsellor} onValueChange={setCounsellor}>
          <SelectTrigger>
            <SelectValue placeholder="Counsellor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {counsellors.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM dd")} -{" "}
                    {format(dateRange.to, "MMM dd")}
                  </>
                ) : (
                  format(dateRange.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Pick date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0">
            <DatePicker
              mode="range"
              // selected={dateRange}
              onSelect={(range) =>
                setDateRange(range ?? { from: undefined, to: undefined })
              }
            />
          </PopoverContent>
        </Popover>
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
