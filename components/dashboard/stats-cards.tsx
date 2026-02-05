import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, CheckCircle, Clock, TrendingUp, Zap } from "lucide-react"
import { analyticsData } from "@/lib/store"

const stats = [
  {
    name: "Total Candidates",
    value: analyticsData.totalCandidates.toString(),
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Shortlisted",
    value: analyticsData.shortlisted.toString(),
    change: "+8%",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    name: "Avg Match Score",
    value: `${analyticsData.averageMatchScore}%`,
    change: "+3%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    name: "Processing Time",
    value: analyticsData.processingTime,
    change: "-0.5s",
    changeType: "positive" as const,
    icon: Clock,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  stat.changeType === "positive"
                    ? "bg-accent/10 text-accent"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
