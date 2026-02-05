import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockCandidates } from "@/lib/store"

const recentActivity = [
  {
    type: "new_candidate",
    candidate: mockCandidates[0],
    action: "applied",
    time: "2 minutes ago",
  },
  {
    type: "shortlisted",
    candidate: mockCandidates[1],
    action: "was shortlisted",
    time: "15 minutes ago",
  },
  {
    type: "reviewed",
    candidate: mockCandidates[2],
    action: "was reviewed",
    time: "1 hour ago",
  },
  {
    type: "duplicate",
    candidate: mockCandidates[4],
    action: "flagged as duplicate",
    time: "2 hours ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivity.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg border border-border p-3"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-sm text-primary">
                {activity.candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {activity.candidate.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.action}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge
                variant={
                  activity.type === "duplicate"
                    ? "destructive"
                    : activity.type === "shortlisted"
                    ? "default"
                    : "secondary"
                }
                className="text-xs"
              >
                {activity.candidate.matchScore}%
              </Badge>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
