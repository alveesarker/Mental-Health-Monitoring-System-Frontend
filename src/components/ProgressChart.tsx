/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { SessionRecord } from "@/data/mockSessionData";
import { cn } from "@/lib/utils";

interface ProgressChartProps {
  data: SessionRecord[];
}

type MetricKey = 'depressionLevel' | 'stressLevel' | 'workPerformance' | 'energyLevel' | 'fatigueLevel';

interface MetricConfig {
  key: MetricKey;
  label: string;
  color: string;
  colorVar: string;
}

const metrics: MetricConfig[] = [
  { key: 'depressionLevel', label: 'Depression', color: '#d97676', colorVar: 'hsl(0, 55%, 60%)' },
  { key: 'stressLevel', label: 'Stress', color: '#e5a54a', colorVar: 'hsl(35, 75%, 55%)' },
  { key: 'workPerformance', label: 'Work Performance', color: '#4a9aba', colorVar: 'hsl(200, 65%, 50%)' },
  { key: 'energyLevel', label: 'Energy', color: '#4aba8a', colorVar: 'hsl(155, 55%, 50%)' },
  { key: 'fatigueLevel', label: 'Fatigue', color: '#9a7aba', colorVar: 'hsl(270, 40%, 55%)' },
];

export const ProgressChart = ({ data }: ProgressChartProps) => {
  const [activeMetrics, setActiveMetrics] = useState<Set<MetricKey>>(
    new Set(['depressionLevel', 'stressLevel', 'energyLevel'])
  );

  const toggleMetric = (key: MetricKey) => {
    setActiveMetrics(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const chartData = data.map(session => ({
    name: session.sessionID,
    date: session.date,
    ...session
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const sessionData = data.find(s => s.sessionID === label);
      return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-elevated">
          <p className="mb-2 font-semibold text-foreground">
            Session {label}
          </p>
          <p className="mb-3 text-xs text-muted-foreground">
            {sessionData?.date}
          </p>
          <div className="space-y-1.5">
            {payload.map((entry: any) => (
              <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">{entry.name}:</span>
                <span className="font-medium text-foreground">{entry.value}/10</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Progress Over Time</h3>
        <p className="text-sm text-muted-foreground">Track patient metrics across sessions</p>
      </div>

      {/* Metric Toggles */}
      <div className="mb-6 flex flex-wrap gap-2">
        {metrics.map(metric => (
          <button
            key={metric.key}
            onClick={() => toggleMetric(metric.key)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              activeMetrics.has(metric.key)
                ? "bg-primary/10 text-primary shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-opacity",
                activeMetrics.has(metric.key) ? "opacity-100" : "opacity-40"
              )}
              style={{ backgroundColor: metric.color }}
            />
            {metric.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {metrics.map(metric => (
                <linearGradient
                  key={metric.key}
                  id={`gradient-${metric.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={metric.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={[0, 10]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            {metrics.map(metric => (
              activeMetrics.has(metric.key) && (
                <Area
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  name={metric.label}
                  stroke={metric.color}
                  strokeWidth={2.5}
                  fill={`url(#gradient-${metric.key})`}
                  dot={{
                    r: 4,
                    fill: metric.color,
                    strokeWidth: 2,
                    stroke: 'hsl(var(--card))'
                  }}
                  activeDot={{
                    r: 6,
                    fill: metric.color,
                    strokeWidth: 2,
                    stroke: 'hsl(var(--card))'
                  }}
                />
              )
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
