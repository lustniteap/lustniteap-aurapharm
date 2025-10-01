"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable)
}

const items = [
  {
    title: "Underground Sounds",
    kicker: "Feature",
    desc: "Weekly selects from Bay Area artists.",
    color: "from-primary/20 to-transparent",
  },
  {
    title: "Viral Trends",
    kicker: "Editorial",
    desc: "Culture shifts decoded by creators.",
    color: "from-accent/20 to-transparent",
  },
  {
    title: "Cannabis Culture",
    kicker: "Docu-Series",
    desc: "Stories at the intersection of art and wellness.",
    color: "from-secondary/30 to-transparent",
  },
  {
    title: "City Politics",
    kicker: "Coverage",
    desc: "Local voices weighing in on policy and art.",
    color: "from-chart-1/30 to-transparent",
  },
  {
    title: "Creator School",
    kicker: "Sessions",
    desc: "Q&As, legal, finance, and growth playbooks.",
    color: "from-chart-2/30 to-transparent",
  },
]

export function ExploreStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const wrap = wrapRef.current
    if (!track || !wrap) return

    let draggable: Draggable[] | null = null
    // Set width based on children
    const totalWidth = Array.from(track.children).reduce((acc, el) => acc + (el as HTMLElement).offsetWidth + 32, 0)
    track.style.width = `${totalWidth}px`

    // create draggable
    draggable = Draggable.create(track, {
      type: "x",
      inertia: true,
      cursor: "grab",
      bounds: wrap,
      edgeResistance: 0.85,
      dragClickables: true,
    })

    return () => {
      if (draggable && draggable[0]) draggable[0].kill()
    }
  }, [])

  return (
    <section id="artists" className="relative py-12 sm:py-16 bg-background">
      <div className="flex items-center justify-between px-6 sm:px-8 mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Drag to Explore</h2>
        <p className="text-sm text-muted-foreground">Touch & drag • Inertia enabled</p>
      </div>
      <div ref={wrapRef} className="overflow-hidden w-full">
        <div ref={trackRef} className="flex gap-8 px-6 sm:px-8 select-none will-change-transform">
          {items.map((item, i) => (
            <article
              key={i}
              className="relative h-[320px] w-[280px] sm:w-[360px] lg:w-[440px] flex-shrink-0 rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-foreground/[0.04] via-transparent to-transparent" />
              <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{item.kicker}</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
