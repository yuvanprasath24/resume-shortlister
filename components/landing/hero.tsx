import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Upload, Users, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">AI-Powered Recruitment</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find the perfect candidates{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              in seconds
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Upload hundreds of resumes and let our AI instantly parse, analyze, and rank candidates 
            based on your exact requirements. Save hours of manual screening.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-4 w-4 text-primary" />
              </div>
              <span>Bulk Upload</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span>Smart Ranking</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mt-16">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50 blur-2xl" />
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-chart-3/60" />
              <div className="h-3 w-3 rounded-full bg-accent/60" />
              <span className="ml-2 text-xs text-muted-foreground">ResumeAI Dashboard</span>
            </div>
            <div className="grid grid-cols-12 gap-4 p-6">
              {/* Sidebar Preview */}
              <div className="col-span-3 space-y-3">
                <div className="h-8 w-full rounded-md bg-primary/10" />
                <div className="h-6 w-3/4 rounded-md bg-muted" />
                <div className="h-6 w-2/3 rounded-md bg-muted" />
                <div className="h-6 w-4/5 rounded-md bg-muted" />
                <div className="h-6 w-1/2 rounded-md bg-muted" />
              </div>
              {/* Main Content Preview */}
              <div className="col-span-9 space-y-4">
                <div className="flex gap-4">
                  <div className="h-24 flex-1 rounded-lg bg-primary/5 p-4">
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="mt-2 h-8 w-1/3 rounded bg-primary/20" />
                  </div>
                  <div className="h-24 flex-1 rounded-lg bg-accent/5 p-4">
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="mt-2 h-8 w-1/3 rounded bg-accent/20" />
                  </div>
                  <div className="h-24 flex-1 rounded-lg bg-chart-3/5 p-4">
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="mt-2 h-8 w-1/3 rounded bg-chart-3/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20" />
                    <div className="flex-1">
                      <div className="h-4 w-1/3 rounded bg-muted" />
                      <div className="mt-1 h-3 w-1/2 rounded bg-muted/50" />
                    </div>
                    <div className="h-6 w-16 rounded-full bg-accent/20" />
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20" />
                    <div className="flex-1">
                      <div className="h-4 w-2/5 rounded bg-muted" />
                      <div className="mt-1 h-3 w-1/3 rounded bg-muted/50" />
                    </div>
                    <div className="h-6 w-16 rounded-full bg-primary/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
