import { GraduationCap, Code, Sparkles, Heart } from "lucide-react"

const highlights = [
  {
    icon: GraduationCap,
    title: "Student Project",
    description:
      "Built as an academic demonstration of modern web development and AI integration techniques.",
  },
  {
    icon: Code,
    title: "Open Source",
    description:
      "All features are freely available with no restrictions. Explore, learn, and experiment.",
  },
  {
    icon: Sparkles,
    title: "Full AI Features",
    description:
      "Complete AI-powered resume parsing, matching, and analysis with no limitations.",
  },
  {
    icon: Heart,
    title: "Built for Learning",
    description:
      "Designed to demonstrate best practices in HR technology and machine learning applications.",
  },
]

const techStack = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "AI/ML Integration",
  "shadcn/ui",
]

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About This Project
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ResumeAI is a student project demonstrating enterprise-grade AI-powered
            resume filtering. All features are completely free and unrestricted.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="relative rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Technology Stack</h3>
            <p className="mt-2 text-muted-foreground">
              Built with modern, industry-standard technologies
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-primary/5 p-8 text-center">
          <p className="text-lg font-medium">
            This is a demonstration project for educational purposes.
          </p>
          <p className="mt-2 text-muted-foreground">
            No payment required. No feature restrictions. No usage limits.
            <br />
            Explore the full capabilities of AI-powered resume filtering.
          </p>
        </div>
      </div>
    </section>
  )
}
