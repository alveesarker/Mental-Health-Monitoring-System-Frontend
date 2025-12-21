import { useState, useMemo } from "react";
import { SessionRecord } from "@/data/mockSessionData";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface ProgressTableProps {
  data: SessionRecord[];
}

type SortKey = keyof SessionRecord;
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 5;

export const ProgressTable = ({ data }: ProgressTableProps) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>('stressLevel');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        session =>
          session.sessionID.toLowerCase().includes(searchLower) ||
          session.stability.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDirection === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return result;
  }, [data, search, sortKey, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStabilityBadge = (stability: SessionRecord['stability']) => {
    const styles = {
      stable: 'bg-primary/10 text-primary',
      improving: 'bg-success/15 text-success',
      declining: 'bg-warning/15 text-warning',
      critical: 'bg-danger/15 text-danger',
    };

    return (
      <span className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", styles[stability])}>
        {stability}
      </span>
    );
  };

  const getLevelIndicator = (value: number, isInverted: boolean = false) => {
    const effectiveValue = isInverted ? 10 - value : value;
    let colorClass = 'bg-success';

    if (effectiveValue <= 3) colorClass = 'bg-danger';
    else if (effectiveValue <= 5) colorClass = 'bg-warning';
    else if (effectiveValue <= 7) colorClass = 'bg-primary';

    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all duration-300", colorClass)}
            style={{ width: `${value * 10}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    );
  };

  const SortableHeader = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <TableHead
      className="cursor-pointer select-none transition-colors hover:bg-muted/50"
      onClick={() => handleSort(sortKeyName)}
    >
      <div className="flex items-center gap-1">
        {label}
        <span className="text-muted-foreground">
          {sortKey === sortKeyName ? (
            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4 opacity-30" />
          )}
        </span>
      </div>
    </TableHead>
  );

  return (
    <div className="rounded-xl border border-border bg-card shadow-card animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="border-b border-border p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Session Records</h3>
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedData.length} total sessions
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <SortableHeader label="Session" sortKeyName="sessionID" />
              <SortableHeader label="Stability" sortKeyName="stability" />
              <SortableHeader label="Depression" sortKeyName="depressionLevel" />
              <SortableHeader label="Stress" sortKeyName="stressLevel" />
              <SortableHeader label="Work" sortKeyName="workPerformance" />
              <SortableHeader label="Energy" sortKeyName="energyLevel" />
              <SortableHeader label="Fatigue" sortKeyName="fatigueLevel" />
              <TableHead className="min-w-[200px]">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((session) => (
              <TableRow key={session.sessionID} className="transition-colors">
                <TableCell className="font-medium text-foreground">
                  <div>
                    <span>{session.sessionID}</span>
                    <p className="text-xs text-muted-foreground">{session.date}</p>
                  </div>
                </TableCell>
                <TableCell>{getStabilityBadge(session.stability)}</TableCell>
                <TableCell>{getLevelIndicator(session.depressionLevel, true)}</TableCell>
                <TableCell>{getLevelIndicator(session.stressLevel, true)}</TableCell>
                <TableCell>{getLevelIndicator(session.workPerformance)}</TableCell>
                <TableCell>{getLevelIndicator(session.energyLevel)}</TableCell>
                <TableCell>{getLevelIndicator(session.fatigueLevel, true)}</TableCell>
                <TableCell>
                  <p className="line-clamp-2 max-w-[200px] text-sm text-muted-foreground">
                    {session.note}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedData.length)} of{' '}
          {filteredAndSortedData.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="min-w-[36px]"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
