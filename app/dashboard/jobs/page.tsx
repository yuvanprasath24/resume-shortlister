"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { mockJobs } from "@/lib/store"
import {
  Plus,
  Search,
  MapPin,
  Users,
  Calendar,
  MoreHorizontal,
  Briefcase,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

export default function JobsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col">
        <DashboardHeader title="Jobs" description="Manage your job listings">
          <Button asChild>
            <Link href="/dashboard/jobs/new" className="gap-2">
              <Plus className="h-4 w-4" />
              New Job
            </Link>
          </Button>
        </DashboardHeader>

        <div className="flex-1 space-y-6 p-6">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Jobs Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="group relative overflow-hidden transition-all hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/jobs/${job.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Link href={`/dashboard/jobs/${job.id}`} className="block mt-4">
                    <h3 className="font-semibold hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.department}
                    </p>
                  </Link>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {job.candidateCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.requiredSkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant={
                        job.status === "active"
                          ? "default"
                          : job.status === "paused"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {job.status}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/jobs/${job.id}`}>
                        View Candidates
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or create a new job.
              </p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/jobs/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Job
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}
