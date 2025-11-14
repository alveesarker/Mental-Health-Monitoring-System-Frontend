import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, AlertTriangle, Activity } from "lucide-react";

const CounsellorDashboard = () => {
  const stats = [
    {
      title: "Total Assigned Users",
      value: "24",
      description: "Active patients under care",
      icon: Users,
      trend: "+2 this week",
      color: "text-primary",
    },
    {
      title: "High Risk Cases",
      value: "3",
      description: "Require immediate attention",
      icon: AlertTriangle,
      trend: "1 new alert",
      color: "text-destructive",
    },
    {
      title: "Average Mood Score",
      value: "7.2",
      description: "Out of 10 across all users",
      icon: Activity,
      trend: "+0.5 from last week",
      color: "text-success",
    },
    {
      title: "Improvement Rate",
      value: "68%",
      description: "Users showing positive trends",
      icon: TrendingUp,
      trend: "+5% this month",
      color: "text-secondary",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Monitor your assigned users and their mental health status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <p className={`text-xs mt-2 font-medium ${stat.color}`}>{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your assigned users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "Sarah Johnson", action: "Submitted daily log", time: "5 minutes ago", status: "neutral" },
              { user: "Michael Chen", action: "Risk level increased to High", time: "1 hour ago", status: "alert" },
              { user: "Emma Davis", action: "Mood improved significantly", time: "3 hours ago", status: "positive" },
              { user: "James Wilson", action: "Missed daily check-in", time: "1 day ago", status: "warning" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  activity.status === "alert" ? "bg-destructive" :
                  activity.status === "positive" ? "bg-success" :
                  activity.status === "warning" ? "bg-warning" :
                  "bg-muted-foreground"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounsellorDashboard;
