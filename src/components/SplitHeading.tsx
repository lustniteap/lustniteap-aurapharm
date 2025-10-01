"use client"

import { useEffect, useRef } from "react"
import SplitType from "split-type"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  text: string
  as?: keyof JSX.IntrinsicElements
  className?: string
  stagger?: number
  delay?: number
}

export function SplitHeading({ text, as = "h2", className, stagger = 0.03, delay = 0 }: Props) {
  const elRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!elRef.current) return
    const split = new SplitType(elRef.current, { types: "words, chars" })

    gsap.set(split.chars, { yPercent: 120, opacity: 0 })
    gsap.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger,
      delay,
      scrollTrigger: {
        trigger: elRef.current,
        start: "top 85%",
        once: true,
      },
    })

    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach((t) => t.refresh())
    }
  }, [stagger, delay])

  const Tag = as as any
  return (
    <Tag ref={elRef as any} className={className}>
      {text}
    </Tag>
  )
}
