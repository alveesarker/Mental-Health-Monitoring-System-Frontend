import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  delay?: number;
}

export const SummaryCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  delay = 0
}: SummaryCardProps) => {
  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-success-light border-success/20',
    warning: 'bg-warning-light border-warning/20',
    danger: 'bg-danger-light border-danger/20',
  };

  const iconStyles = {
    default: 'bg-primary/10 text-primary',
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-warning',
    danger: 'bg-danger/15 text-danger',
  };

  const valueStyles = {
    default: 'text-foreground',
    success: 'text-success-foreground',
    warning: 'text-warning-foreground',
    danger: 'text-danger-foreground',
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 shadow-card transition-all duration-300 hover:shadow-elevated animate-slide-up",
        variantStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-3xl font-bold tracking-tight", valueStyles[variant])}>
              {value}
            </span>
            {trend && trend !== 'neutral' && (
              <span className={cn(
                "text-sm font-medium",
                trend === 'up' ? 'text-success' : 'text-danger'
              )}>
                {trend === 'up' ? '↑' : '↓'}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn("rounded-xl p-3", iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
