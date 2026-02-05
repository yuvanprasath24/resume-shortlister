import { Check } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Create a Job Role",
    description: "Define the position, required skills, and assign importance weights to each skill.",
    highlights: ["Custom skill weightings", "Experience requirements", "Education preferences"],
  },
  {
    step: "02",
    title: "Upload Resumes",
    description: "Drag and drop your candidate resumes in bulk. We support PDF and DOCX formats.",
    highlights: ["Bulk upload support", "Automatic parsing", "Progress tracking"],
  },
  {
    step: "03",
    title: "AI Analysis",
    description: "Our AI instantly parses each resume and calculates match scores based on your criteria.",
    highlights: ["98% parsing accuracy", "Skill extraction", "Experience matching"],
  },
  {
    step: "04",
    title: "Review & Shortlist",
    description: "Browse ranked candidates, read AI insights, and build your shortlist with one click.",
    highlights: ["Smart ranking", "AI explanations", "Export options"],
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in minutes. Our streamlined workflow helps you find top talent fast.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-px w-full bg-gradient-to-r from-border via-primary/50 to-border lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
                <ul className="mt-4 space-y-2">
                  {step.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
