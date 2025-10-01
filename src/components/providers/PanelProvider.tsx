"use client"

import { createContext, useCallback, useContext, useMemo, useState, PropsWithChildren } from "react"
import { AnimatePresence, motion } from "framer-motion"

export type PanelItem = {
  type: "artist" | "product"
  title: string
  subtitle?: string
  image?: string
  meta?: Record<string, string | number>
  description?: string
  ctaLabel?: string
}

type PanelContextValue = {
  openPanel: (item: PanelItem) => void
  closePanel: () => void
  isOpen: boolean
  item: PanelItem | null
}

const PanelContext = createContext<PanelContextValue | null>(null)

export function PanelProvider({ children }: PropsWithChildren) {
  const [item, setItem] = useState<PanelItem | null>(null)

  const openPanel = useCallback((payload: PanelItem) => setItem(payload), [])
  const closePanel = useCallback(() => setItem(null), [])

  const value = useMemo(() => ({ openPanel, closePanel, isOpen: !!item, item }), [openPanel, closePanel, item])

  return (
    <PanelContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {item && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[70] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
            />
            {/* Drawer */}
            <motion.aside
              key="panel"
              className="fixed right-0 top-0 bottom-0 z-[71] w-full sm:w-[420px] md:w-[480px] bg-card border-l border-border shadow-2xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.28 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{item.type === "artist" ? "Artist" : "Product"}</div>
                    <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                    {item.subtitle && <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>}
                  </div>
                  <button
                    className="px-3 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    onClick={closePanel}
                  >
                    Close
                  </button>
                </div>
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-xl border border-border mb-4" />
                )}
                {item.description && (
                  <p className="text-sm leading-relaxed text-foreground/90 mb-4">{item.description}</p>
                )}
                {item.meta && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(item.meta).map(([k, v]) => (
                      <div key={k} className="rounded-lg border border-border p-3">
                        <div className="text-xs text-muted-foreground">{k}</div>
                        <div className="text-sm text-foreground font-medium">{String(v)}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90">
                    {item.ctaLabel || (item.type === "artist" ? "Follow Artist" : "Buy Now")}
                  </button>
                  {item.type === "artist" && (
                    <button className="px-4 py-2 rounded bg-accent text-accent-foreground hover:bg-accent/80">View Portfolio</button>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </PanelContext.Provider>
  )
}

export function usePanel() {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error("usePanel must be used within PanelProvider")
  return ctx
}
