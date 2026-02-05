"use client"

import { useState, use } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { ResumeUploader } from "@/components/dashboard/resume-uploader"
import { CandidateCard } from "@/components/dashboard/candidate-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { mockJobs, mockCandidates } from "@/lib/store"
import {
  ArrowLeft,
  Search,
  Upload,
  Download,
  Filter,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = use(params)
  const job = mockJobs.find((j) => j.id === jobId)
  const candidates = mockCandidates.filter((c) => c.jobId === jobId)

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [minScore, setMinScore] = useState(0)
  const [hideDuplicates, setHideDuplicates] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const searchParams = useSearchParams()

  if (!job) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Job not found</h2>
          <Button asChild className="mt-4">
            <Link href="/dashboard/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    )
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || candidate.status === statusFilter
    const matchesScore = candidate.matchScore >= minScore
    const matchesDuplicate = !hideDuplicates || !candidate.isDuplicate
    return matchesSearch && matchesStatus && matchesScore && matchesDuplicate
  })

  const sortedCandidates = [...filteredCandidates].sort(
    (a, b) => b.matchScore - a.matchScore
  )

  const duplicateCount = candidates.filter((c) => c.isDuplicate).length
  const shortlistedCount = candidates.filter(
    (c) => c.status === "shortlisted"
  ).length

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col">
        <DashboardHeader title={job.title} description={job.department}>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/jobs" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </DashboardHeader>

        <div className="flex-1 p-6 space-y-6">
          {/* Job Info Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{candidates.length}</p>
                  <p className="text-xs text-muted-foreground">Total Candidates</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Briefcase className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{shortlistedCount}</p>
                  <p className="text-xs text-muted-foreground">Shortlisted</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                  <MapPin className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm font-medium truncate">{job.location}</p>
                  <p className="text-xs text-muted-foreground">{job.type}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <Calendar className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium">{duplicateCount} Duplicates</p>
                  <p className="text-xs text-muted-foreground">Detected</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="candidates" className="space-y-4">
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <Label className="text-xs">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="w-full sm:w-40 space-y-2">
                <Label className="text-xs">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48 space-y-2">
                <Label className="text-xs">Min Score: {minScore}%</Label>
                <Slider
                  value={[minScore]}
                  onValueChange={(v) => setMinScore(v[0])}
                  max={100}
                  step={5}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="hide-duplicates"
                  checked={hideDuplicates}
                  onCheckedChange={setHideDuplicates}
                />
                <Label htmlFor="hide-duplicates" className="text-xs whitespace-nowrap">
                  Hide Duplicates
                </Label>
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {sortedCandidates.length} of {candidates.length} candidates
              </p>
            </div>

            {/* Candidate List */}
            <div className="space-y-3">
              {sortedCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  jobId={jobId}
                />
              ))}
            </div>

            {sortedCandidates.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
                <Users className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No candidates found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your filters or upload more resumes.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Skills & Weightings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {job.requiredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${skill.weight}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {skill.weight}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Experience Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{job.minExperience}+ years</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.education}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  )
}
