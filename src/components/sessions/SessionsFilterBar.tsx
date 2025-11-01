import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
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

interface SessionsFilterBarProps {
  onFilter: (filters: {
    search: string;
    counsellor: string;
    specialization: string;
    status: string;
    dateRange: { from?: Date; to?: Date };
  }) => void;
  sessions: Session[];
}

export const SessionsFilterBar = ({ onFilter, sessions }: SessionsFilterBarProps) => {
  const [search, setSearch] = useState("");
  const [counsellor, setCounsellor] = useState("all");
  const [specialization, setSpecialization] = useState("all");
  const [status, setStatus] = useState("all");

  const counsellors = Array.from(new Set(sessions.map((s) => s.counsellor)));
  const specializations = Array.from(new Set(sessions.map((s) => s.specialization)));

  const handleApplyFilter = () => {
    onFilter({
      search,
      counsellor,
      specialization,
      status,
      dateRange: {},
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCounsellor("all");
    setSpecialization("all");
    setStatus("all");
    onFilter({
      search: "",
      counsellor: "all",
      specialization: "all",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by user, counsellor, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={counsellor} onValueChange={setCounsellor}>
          <SelectTrigger>
            <SelectValue placeholder="Select Counsellor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Counsellors</SelectItem>
            {counsellors.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={specialization} onValueChange={setSpecialization}>
          <SelectTrigger>
            <SelectValue placeholder="Select Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            {specializations.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Session Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleApplyFilter} size="sm">
          <Filter className="h-4 w-4" />
          Apply Filters
        </Button>
        <Button onClick={handleClearFilters} variant="outline" size="sm">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};
