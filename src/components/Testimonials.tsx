"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Jasmine Lee",
    role: "Visual Artist",
    company: "Oakland Creators Collective",
    avatar: "/avatars/jasmine.jpg",
    quote: "AuraPharm gave my art a voice in the Bay. Their platform is a true amplifier for local culture."
  },
  {
    name: "Carlos Rivera",
    role: "Music Producer",
    company: "Mission District Studios",
    avatar: "/avatars/carlos.jpg",
    quote: "From live events to digital content, AuraPharm connects artists and audiences like no one else."
  },
  {
    name: "Maya Patel",
    role: "Content Creator",
    company: "BayVibe Media",
    avatar: "/avatars/maya.jpg",
    quote: "The workshops and Q&As helped me grow my brand and understand the business side of art."
  },
  {
    name: "Andre Thompson",
    role: "Event Curator",
    company: "SoMa Pop-Ups",
    avatar: "/avatars/andre.jpg",
    quote: "AuraPharm’s team brings together the best of Bay Area music, art, and activism."
  },
  {
    name: "Sierra Nguyen",
    role: "DJ & Host",
    company: "Vibe Sessions Radio",
    avatar: "/avatars/sierra.jpg",
    quote: "Their coverage of underground shows and local politics is unmatched."
  },
  {
    name: "Marcus Green",
    role: "Cannabis Advocate",
    company: "Emerald Collective",
    avatar: "/avatars/marcusg.jpg",
    quote: "AuraPharm’s content bridges the gap between culture, wellness, and community."
  },
  {
    name: "Lila Kim",
    role: "Photographer",
    company: "Golden Gate Creatives",
    avatar: "/avatars/lila.jpg",
    quote: "I found collaborators and clients through AuraPharm’s network and events."
  },
  {
    name: "Devon Brooks",
    role: "Filmmaker",
    company: "Bay Area Indie Films",
    avatar: "/avatars/devon.jpg",
    quote: "Their vlogs and interviews capture the real stories behind the art."
  },
  {
    name: "Priya Shah",
    role: "Legal Consultant",
    company: "ArtLaw Bay Area",
    avatar: "/avatars/priya.jpg",
    quote: "AuraPharm’s info sessions on copyright and contracts are a must for every creative."
  },
  {
    name: "Tariq Johnson",
    role: "Rapper & Activist",
    company: "East Bay Voices",
    avatar: "/avatars/tariq.jpg",
    quote: "Healing the culture isn’t just a slogan—it’s what AuraPharm does every day."
  }
]

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !topRowRef.current || !bottomRowRef.current) return
    const topCards = topRowRef.current.querySelectorAll('.testimonial-card')
    const bottomCards = bottomRowRef.current.querySelectorAll('.testimonial-card')
    gsap.set(topCards, { y: 100, opacity: 0, autoAlpha: 0 })
    gsap.set(bottomCards, { y: 100, opacity: 0, autoAlpha: 0 })
    const trigger = {
      trigger: sectionRef.current,
      start: "top 80%",
      once: true
    }
    gsap.to(topCards, {
      y: 0,
      opacity: 1,
      autoAlpha: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.08,
      scrollTrigger: trigger
    })
    gsap.to(bottomCards, {
      y: 0,
      opacity: 1,
      autoAlpha: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.08,
      scrollTrigger: trigger
    })
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-muted/30 overflow-hidden">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          What Creators Are Saying
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Artists, curators, and innovators share how AuraPharm is healing the culture in the Bay Area and beyond.
        </p>
      </div>
      {/* Top row - moving left */}
      <div className="mb-8" ref={topRowRef}>
        <div className="flex animate-marquee-left">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={`top-${index}`} className="flex-shrink-0 mx-4 w-80 testimonial-card">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{testimonial.company}</p>
                      <p className="text-sm text-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom row - moving right */}
      <div ref={bottomRowRef}>
        <div className="flex animate-marquee-right">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={`bottom-${index}`} className="flex-shrink-0 mx-4 w-80 testimonial-card">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{testimonial.company}</p>
                      <p className="text-sm text-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
