/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Calendar,
  UserCog,
  Users,
} from "lucide-react";
import { StatCard } from "../components/admin/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({});
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setActivities(data.activities);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          System overview based on real-time database data
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
        />
        <StatCard
          title="Patients"
          value={stats.totalPatients}
          icon={Users}
        />
        <StatCard
          title="Counsellors"
          value={stats.totalCounsellors}
          icon={UserCog}
        />
        <StatCard
          title="Pending Sessions"
          value={stats.pendingSessions}
          icon={Calendar}
          variant="success"
        />
        <StatCard
          title="Active Crisis Alerts"
          value={stats.activeAlerts}
          icon={AlertTriangle}
          variant="danger"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No recent activity found
              </p>
            )}

            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div>
                  <p className="text-sm font-medium">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.time).toLocaleString()}
                  </p>
                </div>

                <Badge
                  variant={
                    activity.type === "alert"
                      ? "destructive"
                      : "secondary"
                  }
                  className="capitalize"
                >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
