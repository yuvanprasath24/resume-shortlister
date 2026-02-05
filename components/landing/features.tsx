import { 
  Brain, 
  FileSearch, 
  Filter, 
  LineChart, 
  Shield, 
  Upload, 
  Users, 
  Zap 
} from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Bulk Resume Upload",
    description: "Drag and drop hundreds of PDF or DOCX resumes at once. Our system processes them in seconds.",
  },
  {
    icon: Brain,
    title: "AI-Powered Parsing",
    description: "Advanced NLP extracts skills, experience, education, and projects with 98% accuracy.",
  },
  {
    icon: LineChart,
    title: "Smart Matching Score",
    description: "Each candidate receives a 0-100 match score based on your custom skill weightings.",
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description: "Filter by skills, experience level, location, education, and match score.",
  },
  {
    icon: FileSearch,
    title: "Skill Gap Analysis",
    description: "Instantly see what skills each candidate is missing compared to your requirements.",
  },
  {
    icon: Shield,
    title: "Bias Reduction",
    description: "Optional toggle to anonymize candidate data and focus purely on qualifications.",
  },
  {
    icon: Users,
    title: "Duplicate Detection",
    description: "AI automatically identifies duplicate resumes across your candidate pool.",
  },
  {
    icon: Zap,
    title: "Instant Shortlisting",
    description: "One-click shortlist candidates and export to CSV or PDF for your team.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to hire faster
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed for modern HR teams who want to focus on people, not paperwork.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
