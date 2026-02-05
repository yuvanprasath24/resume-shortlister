"use client"

import Link from "next/link"
import type { Candidate } from "@/lib/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MapPin,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Star,
  Mail,
  ExternalLink,
} from "lucide-react"

interface CandidateCardProps {
  candidate: Candidate
  jobId: string
}

export function CandidateCard({ candidate, jobId }: CandidateCardProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const matchedSkills = candidate.skills.filter((s) => s.matched)
  const scoreColor =
    candidate.matchScore >= 80
      ? "text-accent"
      : candidate.matchScore >= 60
      ? "text-chart-3"
      : "text-muted-foreground"

  const statusConfig = {
    new: { label: "New", variant: "secondary" as const },
    reviewed: { label: "Reviewed", variant: "outline" as const },
    shortlisted: { label: "Shortlisted", variant: "default" as const },
    rejected: { label: "Rejected", variant: "destructive" as const },
    interviewed: { label: "Interviewed", variant: "default" as const },
  }

  return (
    <Card className={`group relative ${candidate.isDuplicate ? "border-destructive/50" : ""}`}>
      {candidate.isDuplicate && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
            <AlertTriangle className="h-3 w-3" />
            Duplicate
          </div>
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Link
                  href={`/dashboard/jobs/${jobId}/candidates/${candidate.id}`}
                  className="font-semibold hover:text-primary transition-colors"
                >
                  {candidate.name}
                </Link>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {candidate.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className={`text-2xl font-bold ${scoreColor}`}>
                    {candidate.matchScore}
                  </div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/jobs/${jobId}/candidates/${candidate.id}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Star className="mr-2 h-4 w-4" />
                      Shortlist
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Reviewed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {candidate.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill.name}
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ${
                    skill.matched
                      ? "bg-accent/10 text-accent"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {skill.matched && <CheckCircle className="mr-1 h-3 w-3" />}
                  {skill.name}
                </span>
              ))}
              {candidate.skills.length > 5 && (
                <span className="text-xs text-muted-foreground">
                  +{candidate.skills.length - 5} more
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between">
              <Badge variant={statusConfig[candidate.status].variant}>
                {statusConfig[candidate.status].label}
              </Badge>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>AI Confidence: {candidate.aiConfidence}%</span>
                {candidate.skillGaps.length > 0 && (
                  <span className="text-destructive">
                    {candidate.skillGaps.length} skill gap{candidate.skillGaps.length !== 1 && "s"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
