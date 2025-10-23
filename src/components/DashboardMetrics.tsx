import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Star, TrendingUp } from "lucide-react";

const metrics = [
  {
    title: "Total Sessions This Month",
    value: "24",
    icon: Calendar,
    trend: "+12%",
    color: "text-blue-500",
    bgColor: "from-blue-100/50 to-blue-200/40",
  },
  {
    title: "Progress",
    value: "4.8",
    icon: TrendingUp,
    trend: "+0.3",
    color: "text-amber-500",
    bgColor: "from-amber-100/50 to-amber-200/40",
  },
  {
    title: "Next Session In",
    value: "45 min",
    icon: Clock,
    trend: "Today",
    color: "text-emerald-500",
    bgColor: "from-emerald-100/50 to-emerald-200/40",
  },
  {
    title: "Session Completed",
    value: "9",
    icon: Star,
    trend: "+5%",
    color: "text-purple-500",
    bgColor: "from-purple-100/50 to-purple-200/40",
  },
];

export const DashboardMetrics = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
      {metrics.map((metric, index) => (
        <Card
          key={metric.title}
          className="overflow-hidden border border-border/40 bg-gradient-to-br from-white/90 to-background/60 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl backdrop-blur-sm"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor} opacity-60`}
              >
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {metric.title}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-foreground">
                  {metric.value}
                </h3>
                <span className={`text-sm font-medium ${metric.color}`}>
                  {metric.trend}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
