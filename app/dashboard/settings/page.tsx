"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import {
  User,
  Building,
  Bell,
  Shield,
  Palette,
  Brain,
  Download,
  Trash2,
  Loader2,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    // Profile
    name: user?.name || "",
    email: user?.email || "",
    company: user?.company || "",
    
    // Notifications
    emailNotifications: true,
    newCandidateAlerts: true,
    weeklyDigest: true,
    duplicateAlerts: true,
    
    // AI Settings
    biasReduction: true,
    autoShortlistThreshold: 85,
    confidenceThreshold: 70,
    duplicateDetection: true,
    
    // Export
    exportFormat: "csv",
    includeContactInfo: true,
    includeAiInsights: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U"

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      >
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Saved
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </DashboardHeader>

      <div className="flex-1 space-y-6 p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Profile</CardTitle>
              </div>
              <CardDescription>
                Your personal information and company details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-xl text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) =>
                      setSettings({ ...settings, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={settings.company}
                  onChange={(e) =>
                    setSettings({ ...settings, company: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize how the app looks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      theme === "light"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Sun className="h-6 w-6" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      theme === "dark"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Moon className="h-6 w-6" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                      theme === "system"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Monitor className="h-6 w-6" />
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Settings Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle>AI Settings</CardTitle>
              </div>
              <CardDescription>
                Configure how AI analyzes and ranks candidates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Bias Reduction Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Anonymize candidate data during initial screening to reduce unconscious bias
                  </p>
                </div>
                <Switch
                  checked={settings.biasReduction}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, biasReduction: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Duplicate Detection</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically detect and flag duplicate resumes
                  </p>
                </div>
                <Switch
                  checked={settings.duplicateDetection}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, duplicateDetection: checked })
                  }
                />
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Auto-Shortlist Threshold</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically shortlist candidates above this score
                  </p>
                  <Select
                    value={settings.autoShortlistThreshold.toString()}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        autoShortlistThreshold: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="95">95% (Very Strict)</SelectItem>
                      <SelectItem value="90">90% (Strict)</SelectItem>
                      <SelectItem value="85">85% (Recommended)</SelectItem>
                      <SelectItem value="80">80% (Moderate)</SelectItem>
                      <SelectItem value="75">75% (Lenient)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>AI Confidence Threshold</Label>
                  <p className="text-xs text-muted-foreground">
                    Flag results below this confidence level for review
                  </p>
                  <Select
                    value={settings.confidenceThreshold.toString()}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        confidenceThreshold: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="70">70% (Recommended)</SelectItem>
                      <SelectItem value="60">60%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Choose what updates you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Candidate Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when high-match candidates apply
                  </p>
                </div>
                <Switch
                  checked={settings.newCandidateAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, newCandidateAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Duplicate Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when duplicates are detected
                  </p>
                </div>
                <Switch
                  checked={settings.duplicateAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, duplicateAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of activity
                  </p>
                </div>
                <Switch
                  checked={settings.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, weeklyDigest: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Export Settings Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                <CardTitle>Export Settings</CardTitle>
              </div>
              <CardDescription>
                Configure default export options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Export Format</Label>
                <Select
                  value={settings.exportFormat}
                  onValueChange={(value) =>
                    setSettings({ ...settings, exportFormat: value })
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Include Contact Information</Label>
                  <p className="text-sm text-muted-foreground">
                    Include email and phone in exports
                  </p>
                </div>
                <Switch
                  checked={settings.includeContactInfo}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, includeContactInfo: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Include AI Insights</Label>
                  <p className="text-sm text-muted-foreground">
                    Include AI analysis and explanations
                  </p>
                </div>
                <Switch
                  checked={settings.includeAiInsights}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, includeAiInsights: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Delete All Data</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete all candidates and jobs
                  </p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Data
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
