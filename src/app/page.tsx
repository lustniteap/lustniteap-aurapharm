"use client"

import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { ArtistCarousel } from "@/components/ArtistCarousel"
import { ExploreStrip } from "@/components/ExploreStrip"
import { ImmersiveCanvas } from "@/components/ImmersiveCanvas"
import { Features } from "@/components/Features"
import { Testimonials } from "@/components/Testimonials"
import { Pricing } from "@/components/Pricing"
import { CTA } from "@/components/CTA"
import { Footer } from "@/components/Footer"
import { useImmersive } from "@/components/providers/ImmersiveProvider"

export default function Home() {
  const { immersive } = useImmersive()
  return (
    <div className="page-wrapper">
      <main className="min-h-screen bg-background text-foreground m-0 p-0 w-full">
        <Navbar />
        <Hero />
        {immersive ? (
          <ImmersiveCanvas />
        ) : (
          <>
            <ArtistCarousel />
            <ExploreStrip />
          </>
        )}
        {!immersive && (
          <>
            <Features />
            <Testimonials />
            <Pricing />
            <CTA />
          </>
        )}
        <Footer />
      </main>
    </div>
  )
}
