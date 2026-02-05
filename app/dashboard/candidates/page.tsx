"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockCandidates, mockJobs } from "@/lib/store"
import {
  Search,
  Download,
  Filter,
  MapPin,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

export default function AllCandidatesPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [jobFilter, setJobFilter] = useState("all")
  const [hideDuplicates, setHideDuplicates] = useState(false)

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || candidate.status === statusFilter
    const matchesJob = jobFilter === "all" || candidate.jobId === jobFilter
    const matchesDuplicate = !hideDuplicates || !candidate.isDuplicate
    return matchesSearch && matchesStatus && matchesJob && matchesDuplicate
  })

  const sortedCandidates = [...filteredCandidates].sort(
    (a, b) => b.matchScore - a.matchScore
  )

  const getJobTitle = (jobId: string) => {
    return mockJobs.find((j) => j.id === jobId)?.title || "Unknown"
  }

  const statusConfig = {
    new: { label: "New", variant: "secondary" as const },
    reviewed: { label: "Reviewed", variant: "outline" as const },
    shortlisted: { label: "Shortlisted", variant: "default" as const },
    rejected: { label: "Rejected", variant: "destructive" as const },
    interviewed: { label: "Interviewed", variant: "default" as const },
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col">
        <DashboardHeader
          title="All Candidates"
          description="View and manage all candidates across jobs"
        >
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </DashboardHeader>

        <div className="flex-1 space-y-6 p-6">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">{mockCandidates.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-accent">
                  {mockCandidates.filter((c) => c.status === "shortlisted").length}
                </p>
                <p className="text-sm text-muted-foreground">Shortlisted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-chart-3">
                  {Math.round(
                    mockCandidates.reduce((sum, c) => sum + c.matchScore, 0) /
                      mockCandidates.length
                  )}
                  %
                </p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-destructive">
                  {mockCandidates.filter((c) => c.isDuplicate).length}
                </p>
                <p className="text-sm text-muted-foreground">Duplicates</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label className="text-xs">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
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
              <Label className="text-xs">Job</Label>
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {mockJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          {/* Results */}
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCandidates.map((candidate) => {
                  const initials = candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()

                  return (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-xs text-primary">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{candidate.name}</span>
                              {candidate.isDuplicate && (
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {candidate.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/jobs/${candidate.jobId}`}
                          className="text-sm hover:text-primary hover:underline"
                        >
                          {getJobTitle(candidate.jobId)}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-lg font-bold ${
                            candidate.matchScore >= 80
                              ? "text-accent"
                              : candidate.matchScore >= 60
                              ? "text-chart-3"
                              : "text-muted-foreground"
                          }`}
                        >
                          {candidate.matchScore}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills
                            .filter((s) => s.matched)
                            .slice(0, 3)
                            .map((skill) => (
                              <span
                                key={skill.name}
                                className="inline-flex items-center rounded-md bg-accent/10 px-1.5 py-0.5 text-xs text-accent"
                              >
                                <CheckCircle className="mr-0.5 h-3 w-3" />
                                {skill.name}
                              </span>
                            ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusConfig[candidate.status].variant}>
                          {statusConfig[candidate.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/dashboard/jobs/${candidate.jobId}/candidates/${candidate.id}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {sortedCandidates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No candidates found</p>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}
