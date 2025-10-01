"use client"

import { useEffect, useRef } from "react"
import * as PIXI from "pixi.js"
import { Viewport } from "pixi-viewport"
import { usePanel } from "@/components/providers/PanelProvider"

// Fallback remote images (CORS-friendly)
const images = [
  { src: "https://picsum.photos/seed/aura1/600/600", title: "Jasmine Lee" },
  { src: "https://picsum.photos/seed/aura2/600/600", title: "Carlos Rivera" },
  { src: "https://picsum.photos/seed/aura3/600/600", title: "Maya Patel" },
  { src: "https://picsum.photos/seed/aura4/600/600", title: "Andre Thompson" },
  { src: "https://picsum.photos/seed/aura5/600/600", title: "Sierra Nguyen" },
  { src: "https://picsum.photos/seed/aura6/600/600", title: "Lila Kim" },
  { src: "https://picsum.photos/seed/aura7/600/600", title: "Devon Brooks" },
  { src: "https://picsum.photos/seed/aura8/600/600", title: "Tariq Johnson" },
]

export function ImmersiveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<PIXI.Application | null>(null)
  const viewportRef = useRef<Viewport | null>(null)
  const { openPanel } = usePanel()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let destroyed = false

    ;(async () => {
      const app = new PIXI.Application()
      await app.init({ resizeTo: container, backgroundAlpha: 0, antialias: true })
      if (destroyed) {
        app.destroy()
        return
      }
      appRef.current = app
      const canvasEl = app.canvas as any
      container.appendChild(canvasEl)

      // Subtle backdrop so sprites stand out on white
      const backdrop = new PIXI.Graphics()
      backdrop.rect(0, 0, 4000, 3000).fill(0x000000, 0.03)

      const viewport = new Viewport({
        screenWidth: container.clientWidth,
        screenHeight: container.clientHeight,
        worldWidth: 4000,
        worldHeight: 3000,
        events: app.renderer.events,
      })
      viewportRef.current = viewport
      app.stage.addChild(viewport)
      viewport.addChild(backdrop)

      viewport.drag({ wheel: false }).pinch().wheel().decelerate({ friction: 0.95 })

      // Preload images with Pixi Assets
      const textures = await Promise.all(
        images.map((img) => PIXI.Assets.load(img.src).catch(() => null))
      )

      const padding = 320
      const cols = 4
      const baseSize = 220

      images.forEach((item, i) => {
        const tex = textures[i]
        if (!tex) return
        const sprite = new PIXI.Sprite(tex)
        const scale = 0.9 + Math.random() * 0.6
        sprite.width = baseSize * scale
        sprite.height = baseSize * scale
        const row = Math.floor(i / cols)
        const col = i % cols
        sprite.x = col * (baseSize + padding) + (Math.random() * 120 - 60)
        sprite.y = row * (baseSize + padding) + (Math.random() * 120 - 60)
        sprite.anchor.set(0.5)
        sprite.x += sprite.width / 2
        sprite.y += sprite.height / 2
        sprite.eventMode = "static"
        sprite.cursor = "pointer"
        sprite.on("pointertap", () => {
          openPanel({
            type: "artist",
            title: item.title,
            subtitle: "Immersive View",
            image: item.src,
            description:
              "Discover the artist’s world through an immersive canvas. Drag, zoom, and explore.",
            meta: { City: "Bay Area", Followers: Math.floor(1000 + Math.random() * 9000) },
            ctaLabel: "Follow Artist",
          })
        })
        sprite.on("pointerover", () => sprite.scale.set(1.08))
        sprite.on("pointerout", () => sprite.scale.set(1))

        viewport.addChild(sprite)
      })

      const onResize = () => {
        viewport.resize(container.clientWidth, container.clientHeight, viewport.worldWidth, viewport.worldHeight)
      }
      window.addEventListener("resize", onResize)

      // Cleanup with safe order
      const cleanup = () => {
        window.removeEventListener("resize", onResize)
        try {
          viewport.destroy({ children: true })
        } catch {}
        if (container.contains(canvasEl)) container.removeChild(canvasEl)
        try {
          app.destroy()
        } catch {}
      }

      if (destroyed) cleanup()
      else (app as any).__cleanup = cleanup
    })()

    return () => {
      destroyed = true
      const app = appRef.current as any
      if (app && app.__cleanup) app.__cleanup()
    }
  }, [openPanel])

  return <div ref={containerRef} className="relative w-full h-[80vh] sm:h-[88vh]" />
}
