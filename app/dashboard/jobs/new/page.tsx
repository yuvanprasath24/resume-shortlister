"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { X, Plus, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface SkillInput {
  name: string
  weight: number
}

export default function NewJobPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    description: "",
    minExperience: 0,
    education: "",
  })
  const [skills, setSkills] = useState<SkillInput[]>([
    { name: "", weight: 20 },
  ])
  const [newSkill, setNewSkill] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && skills.length < 10) {
      setSkills([...skills, { name: newSkill.trim(), weight: 20 }])
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const updateSkillWeight = (index: number, weight: number) => {
    const newSkills = [...skills]
    newSkills[index].weight = weight
    setSkills(newSkills)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/dashboard/jobs")
  }

  const totalWeight = skills.reduce((sum, skill) => sum + skill.weight, 0)

  return (
    <div className="flex flex-col">
      <DashboardHeader title="Create New Job" description="Define job requirements and skills">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/jobs" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </DashboardHeader>

      <form onSubmit={handleSubmit} className="flex-1 p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="e.g. Engineering"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the role, responsibilities, and what makes it great..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minExperience">Minimum Experience (years)</Label>
                  <Input
                    id="minExperience"
                    name="minExperience"
                    type="number"
                    min="0"
                    placeholder="e.g. 3"
                    value={formData.minExperience || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education Requirement</Label>
                  <Input
                    id="education"
                    name="education"
                    placeholder="e.g. Bachelor's in Computer Science"
                    value={formData.education}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills & Weightings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Add skills and assign importance weights. Total should equal 100%.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Skill Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g. React, Python, Leadership)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                />
                <Button type="button" onClick={addSkill} disabled={!newSkill.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {skills.filter(s => s.name).map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border border-border p-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{skill.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Weight: {skill.weight}%
                      </p>
                    </div>
                    <div className="w-32">
                      <Slider
                        value={[skill.weight]}
                        onValueChange={(value) => updateSkillWeight(index, value[0])}
                        max={100}
                        step={5}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkill(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {skills.filter(s => s.name).length === 0 && (
                <div className="rounded-lg border border-dashed border-border py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No skills added yet. Add skills that candidates should have.
                  </p>
                </div>
              )}

              {/* Total Weight */}
              {skills.filter(s => s.name).length > 0 && (
                <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                  <span className="text-sm font-medium">Total Weight</span>
                  <span
                    className={`text-lg font-bold ${
                      totalWeight === 100
                        ? "text-accent"
                        : totalWeight > 100
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {totalWeight}%
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/jobs">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading || !formData.title}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Job"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
