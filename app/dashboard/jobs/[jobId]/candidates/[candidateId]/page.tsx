"use client"

import { use } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { mockJobs, mockCandidates } from "@/lib/store"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Download,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  Brain,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Code,
  ExternalLink,
} from "lucide-react"

export default function CandidateDetailPage({
  params,
}: {
  params: Promise<{ jobId: string; candidateId: string }>
}) {
  const { jobId, candidateId } = use(params)
  const job = mockJobs.find((j) => j.id === jobId)
  const candidate = mockCandidates.find((c) => c.id === candidateId)

  if (!job || !candidate) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Candidate not found</h2>
          <Button asChild className="mt-4">
            <Link href={`/dashboard/jobs/${jobId}`}>Back to Job</Link>
          </Button>
        </div>
      </div>
    )
  }

  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const matchedSkills = candidate.skills.filter((s) => s.matched)
  const unmatchedSkills = candidate.skills.filter((s) => !s.matched)

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
    <div className="flex flex-col">
      <DashboardHeader title="Candidate Profile">
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/jobs/${jobId}`} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Candidates
          </Link>
        </Button>
      </DashboardHeader>

      <div className="flex-1 p-6 space-y-6">
        {/* Candidate Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{candidate.name}</h2>
                <Badge variant={statusConfig[candidate.status].variant}>
                  {statusConfig[candidate.status].label}
                </Badge>
                {candidate.isDuplicate && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Duplicate
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {candidate.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {candidate.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {candidate.location}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Resume
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Mail className="h-4 w-4" />
                  Contact
                </Button>
                <Button size="sm" className="gap-2">
                  <Star className="h-4 w-4" />
                  Shortlist
                </Button>
              </div>
            </div>
          </div>

          {/* Score Card */}
          <Card className="lg:min-w-72">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-5xl font-bold ${scoreColor}`}>
                    {candidate.matchScore}
                  </p>
                  <p className="text-sm text-muted-foreground">Match Score</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>AI Confidence</span>
                  <span className="font-medium">{candidate.aiConfidence}%</span>
                </div>
                <Progress value={candidate.aiConfidence} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Panel */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <CardTitle>Why This Candidate?</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {candidate.whyThisCandidate}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="experience">
              <TabsList>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="experience" className="mt-4 space-y-4">
                {candidate.experience.map((exp, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                          <Briefcase className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {exp.company}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {exp.duration}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {candidate.experience.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No experience data available
                  </p>
                )}
              </TabsContent>

              <TabsContent value="education" className="mt-4 space-y-4">
                {candidate.education.map((edu, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                          <GraduationCap className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-sm text-muted-foreground">
                            {edu.institution}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {edu.year}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="projects" className="mt-4 space-y-4">
                {candidate.projects.map((project, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                          <Code className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {project.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md bg-secondary px-2 py-0.5 text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {candidate.projects.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No projects data available
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Matched Skills */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Matched Skills ({matchedSkills.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {matchedSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between rounded-lg bg-accent/10 px-3 py-2"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    {skill.yearsOfExperience && (
                      <span className="text-xs text-muted-foreground">
                        {skill.yearsOfExperience}y exp
                      </span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skill Gaps */}
            {candidate.skillGaps.length > 0 && (
              <Card className="border-destructive/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <XCircle className="h-4 w-4 text-destructive" />
                    Skill Gaps ({candidate.skillGaps.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {candidate.skillGaps.map((gap) => (
                    <div
                      key={gap}
                      className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2"
                    >
                      <XCircle className="h-4 w-4 text-destructive shrink-0" />
                      <span className="text-sm">{gap}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Other Skills */}
            {unmatchedSkills.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Other Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {unmatchedSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-md bg-secondary px-2 py-1 text-xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Application Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Application Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applied For</span>
                  <Link
                    href={`/dashboard/jobs/${jobId}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {job.title}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applied On</span>
                  <span>
                    {new Date(candidate.appliedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={statusConfig[candidate.status].variant}>
                    {statusConfig[candidate.status].label}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
