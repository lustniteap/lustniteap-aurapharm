"use client"

import { Button } from "@/components/ui/button"
import { useExplore } from "@/components/providers/ExploreProvider"
import Link from "next/link"
import { useImmersive } from "@/components/providers/ImmersiveProvider"

export function Navbar() {
  const { open } = useExplore()
  const { immersive, toggle } = useImmersive()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary interactive-hover">AuraPharm</Link>
          </div>

          {/* Primary Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#artists" className="text-foreground/80 hover:text-foreground transition-colors interactive-hover">
                Artists
              </a>
              <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors interactive-hover">
                What We Do
              </a>
              <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors interactive-hover">
                Services
              </a>
              <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors interactive-hover">
                Voices
              </a>
              <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors interactive-hover">
                About
              </Link>
              <Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors interactive-hover">
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" className="interactive-hover" onClick={toggle}>
              {immersive ? "Standard View" : "Immersive View"}
            </Button>
            <Button variant="outline" size="sm" className="interactive-hover" onClick={open}>
              Explore
            </Button>
            <Button size="sm" className="btn-glow interactive-hover">
              Join up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
