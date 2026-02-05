"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { FileText, Loader2, Eye, EyeOff, Check } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    const success = await signup(
      formData.email,
      formData.password,
      formData.name,
      formData.company
    )
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Failed to create account")
    }
  }

  const features = [
    "14-day free trial",
    "No credit card required",
    "Cancel anytime",
  ]

  return (
    <div className="flex min-h-screen">
      {/* Left side - Decorative */}
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
        <div className="relative flex h-full flex-col items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-primary-foreground">
              Start hiring smarter today
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join 500+ companies using ResumeAI to find top talent faster than ever.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">ResumeAI</span>
          </div>

          <h2 className="mt-8 text-2xl font-bold tracking-tight">Create your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start your free 14-day trial
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Smith"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company name (optional)</Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Acme Inc."
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="#" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
