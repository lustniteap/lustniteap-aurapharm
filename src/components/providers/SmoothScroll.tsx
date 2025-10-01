"use client"

import { PropsWithChildren, useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const lenis = new Lenis({})

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // keep ScrollTrigger in sync
    lenis.on("scroll", ScrollTrigger.update)

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return children as any
}
