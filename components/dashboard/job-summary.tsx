import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockJobs } from "@/lib/store"
import { ArrowRight, MapPin, Users } from "lucide-react"

export function JobSummary() {
  const activeJobs = mockJobs.filter((job) => job.status === "active")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Active Jobs</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/jobs" className="gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeJobs.slice(0, 3).map((job) => (
          <Link
            key={job.id}
            href={`/dashboard/jobs/${job.id}`}
            className="block rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium truncate">{job.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {job.candidateCount} candidates
                  </span>
                </div>
              </div>
              <Badge
                variant={job.status === "active" ? "default" : "secondary"}
                className="shrink-0"
              >
                {job.status}
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.requiredSkills.slice(0, 3).map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs"
                >
                  {skill.name}
                </span>
              ))}
              {job.requiredSkills.length > 3 && (
                <span className="inline-flex items-center text-xs text-muted-foreground">
                  +{job.requiredSkills.length - 3} more
                </span>
              )}
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
