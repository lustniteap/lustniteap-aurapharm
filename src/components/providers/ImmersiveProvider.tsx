"use client"

import { createContext, useCallback, useContext, useMemo, useState, PropsWithChildren } from "react"

type ImmersiveContextValue = {
  immersive: boolean
  enable: () => void
  disable: () => void
  toggle: () => void
}

const ImmersiveContext = createContext<ImmersiveContextValue | null>(null)

export function ImmersiveProvider({ children }: PropsWithChildren) {
  const [immersive, setImmersive] = useState(false)
  const enable = useCallback(() => setImmersive(true), [])
  const disable = useCallback(() => setImmersive(false), [])
  const toggle = useCallback(() => setImmersive((v) => !v), [])

  const value = useMemo(() => ({ immersive, enable, disable, toggle }), [immersive, enable, disable, toggle])

  return <ImmersiveContext.Provider value={value}>{children}</ImmersiveContext.Provider>
}

export function useImmersive() {
  const ctx = useContext(ImmersiveContext)
  if (!ctx) throw new Error("useImmersive must be used within ImmersiveProvider")
  return ctx
}
