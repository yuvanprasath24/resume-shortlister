const stats = [
  { value: "Unlimited", label: "Resumes You Can Upload" },
  { value: "98%", label: "AI Parsing Accuracy" },
  { value: "100%", label: "Features Unlocked Free" },
  { value: "Zero", label: "Hidden Costs" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border bg-primary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary-foreground">{stat.value}</div>
              <div className="mt-2 text-sm text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
