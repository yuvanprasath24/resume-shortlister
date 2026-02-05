"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { User } from "./store"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, company: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user for demo purposes
const mockUser: User = {
  id: "user-1",
  email: "demo@resumeai.com",
  name: "Alex Thompson",
  company: "TechCorp Inc.",
  role: "admin",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // For demo, accept any email/password
    if (email && password) {
      setUser({
        ...mockUser,
        email,
      })
      setIsLoading(false)
      return true
    }
    setIsLoading(false)
    return false
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string, company: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    if (email && password && name) {
      setUser({
        id: `user-${Date.now()}`,
        email,
        name,
        company: company || "My Company",
        role: "admin",
      })
      setIsLoading(false)
      return true
    }
    setIsLoading(false)
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
