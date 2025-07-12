"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface AuthContextType {
  user: {
    username: string | null
    email: string | null
    avatar?: string | null
  } | null
  login: (username: string, email: string, avatar?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string | null; email: string | null; avatar?: string | null } | null>(
    null,
  )

  const login = (username: string, email: string, avatar?: string) => {
    setUser({ username, email, avatar })
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
