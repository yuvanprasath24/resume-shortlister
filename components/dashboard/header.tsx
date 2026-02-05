"use client"

import React from "react"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function DashboardHeader({ title, description, children }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search candidates, jobs..."
            className="w-64 pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-3">
              <p className="text-sm font-medium">Notifications</p>
            </div>
            <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3">
              <p className="text-sm">New candidate match (94%)</p>
              <p className="text-xs text-muted-foreground">Sarah Chen for Senior Frontend Developer</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3">
              <p className="text-sm">Duplicate resume detected</p>
              <p className="text-xs text-muted-foreground">1 potential duplicate found</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 px-4 py-3">
              <p className="text-sm">Processing complete</p>
              <p className="text-xs text-muted-foreground">15 resumes processed successfully</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {children}
      </div>
    </header>
  )
}
