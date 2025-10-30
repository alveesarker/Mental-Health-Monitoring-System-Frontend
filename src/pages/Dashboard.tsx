import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Calendar,
  FileText,
  UserCog,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "../components/admin/StatCard";

const moodData = [
  { day: "Mon", mood: 6.5 },
  { day: "Tue", mood: 6.8 },
  { day: "Wed", mood: 6.2 },
  { day: "Thu", mood: 7.1 },
  { day: "Fri", mood: 6.9 },
  { day: "Sat", mood: 7.5 },
  { day: "Sun", mood: 7.2 },
];

const stressData = [
  { level: "Low", count: 245 },
  { level: "Moderate", count: 156 },
  { level: "High", count: 89 },
];

const engagementData = [
  { name: "Regular", value: 65 },
  { name: "Occasional", value: 25 },
  { name: "Inactive", value: 10 },
];

const COLORS = ["#4c6ef5", "#51cf66", "#ff6b6b", "#ffd43b", "#845ef7"];

const recentActivity = [
  {
    type: "signup",
    user: "Sarah Johnson",
    time: "5 min ago",
    status: "success",
  },
  { type: "alert", user: "Michael Chen", time: "12 min ago", status: "danger" },
  {
    type: "session",
    user: "Emma Davis",
    time: "23 min ago",
    status: "default",
  },
  {
    type: "counsellor",
    user: "Dr. Robert Wilson",
    time: "1 hour ago",
    status: "success",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Monitor mental health system performance and user wellbeing
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Users"
          value="1,284"
          icon={Users}
          trend={{ value: "+12% from last month", isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Active Counsellors"
          value="42"
          icon={UserCog}
          trend={{ value: "+3 this week", isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Ongoing Sessions"
          value="18"
          icon={Calendar}
          variant="default"
        />
        <StatCard
          title="AI Alerts Triggered"
          value="7"
          icon={AlertTriangle}
          variant="default"
        />
        <StatCard
          title="Daily Logs Submitted"
          value="342"
          icon={FileText}
          trend={{ value: "+18% today", isPositive: true }}
          variant="default"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mood Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart width={600} height={300} data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="day" stroke="#aaa" />
                <YAxis domain={[0, 10]} stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e1e",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#646cffaa" // <-- use real color so we can SEE it
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#646cffaa" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Stress Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stressData} barCategoryGap={100}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="level" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  cursor={false} // <-- removes hover highlight
                />

                <Bar
                  dataKey="count"
                  fill="#646cffaa" // <-- Your color here
                  radius={[8, 8, 0, 0]}
                  animationDuration={600}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card transition hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        activity.status === "danger"
                          ? "destructive"
                          : activity.status === "success"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs rounded-full px-3 py-1 capitalize"
                    >
                      {activity.type}
                    </Badge>

                    <div>
                      <p className="text-sm font-medium leading-tight">
                        {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
