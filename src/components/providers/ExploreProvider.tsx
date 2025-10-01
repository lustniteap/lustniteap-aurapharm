"use client"

import { createContext, useCallback, useContext, useMemo, useState, PropsWithChildren } from "react"

type ExploreContextValue = {
  open: () => void
  close: () => void
  isOpen: boolean
}

const ExploreContext = createContext<ExploreContextValue | null>(null)

export function ExploreProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen])

  return (
    <ExploreContext.Provider value={value}>
      {children}
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-xl">
          <div className="absolute inset-0" onClick={close} />
          <div className="relative z-[61] max-w-5xl mx-auto mt-24 px-6">
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-8">
              <div className="flex items-start justify-between">
                <h3 className="text-3xl font-bold text-foreground">Explore AuraPharm</h3>
                <button
                  className="px-3 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={close}
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <a href="#artists" className="group block rounded-xl border border-border p-6 hover:border-primary transition">
                  <div className="text-sm text-muted-foreground mb-1">Section</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Artists</div>
                  <p className="text-muted-foreground">Discover Bay Area creators and their work.</p>
                </a>
                <a href="#features" className="group block rounded-xl border border-border p-6 hover:border-primary transition">
                  <div className="text-sm text-muted-foreground mb-1">Section</div>
                  <div className="text-xl font-semibold text-foreground mb-2">What We Do</div>
                  <p className="text-muted-foreground">Multimedia coverage, events, and services.</p>
                </a>
                <a href="#pricing" className="group block rounded-xl border border-border p-6 hover:border-primary transition">
                  <div className="text-sm text-muted-foreground mb-1">Section</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Services</div>
                  <p className="text-muted-foreground">Flexible plans for artists and brands.</p>
                </a>
                <a href="#testimonials" className="group block rounded-xl border border-border p-6 hover:border-primary transition">
                  <div className="text-sm text-muted-foreground mb-1">Section</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Voices</div>
                  <p className="text-muted-foreground">What creators are saying.</p>
                </a>
                <a href="#join" className="group block rounded-xl border border-border p-6 hover:border-primary transition">
                  <div className="text-sm text-muted-foreground mb-1">Section</div>
                  <div className="text-xl font-semibold text-foreground mb-2">Join</div>
                  <p className="text-muted-foreground">Get involved or submit your project.</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </ExploreContext.Provider>
  )
}

export function useExplore() {
  const ctx = useContext(ExploreContext)
  if (!ctx) throw new Error("useExplore must be used within ExploreProvider")
  return ctx
}
