import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { JobSummary } from "@/components/dashboard/job-summary"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Dashboard"
        description="Overview of your recruitment pipeline"
      >
        <Button asChild>
          <Link href="/dashboard/jobs/new" className="gap-2">
            <Plus className="h-4 w-4" />
            New Job
          </Link>
        </Button>
      </DashboardHeader>

      <div className="flex-1 space-y-6 p-6">
        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <JobSummary />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
