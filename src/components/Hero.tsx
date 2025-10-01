"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Declare global types for UnicornStudio
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

export function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run on client side to avoid hydration issues
    if (typeof window !== 'undefined') {
      // Check if UnicornStudio is already loaded
      if (!window.UnicornStudio) {
        window.UnicornStudio = { 
          isInitialized: false,
          init: () => {} // Placeholder until script loads
        };
        
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
        script.onload = function() {
          if (!window.UnicornStudio.isInitialized && window.UnicornStudio.init) {
            window.UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
          }
        };
        document.head.appendChild(script);
      }
    }

    // GSAP Animation for headline
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char');
      
      // Set initial state
      gsap.set(chars, { y: 100, opacity: 0 });
      
      // Animate characters in with stagger
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.05,
        delay: 0.2
      });
    }

    // Parallax background
    const bg = document.getElementById("unicorn-background")
    if (bg && sectionRef.current) {
      gsap.to(bg, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }
  }, []);

  // New AuraPharm headline and subheadline
  const headline = "HEALING THE CULTURE";
  const subheadline = "Aura is the Best Medicine";
  const words = headline.split(' ');

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-end">
      {/* Background div for unicorn.studio interactive element */}
      <div 
        id="unicorn-background"
        className="absolute inset-0 z-0 w-full h-full"
        aria-label="Interactive background element - unicorn.studio"
      >
        <div 
          data-us-project="osSUcakhr1l8pfBz0kmu" 
          style={{width: '100%', height: '100%'}}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl">
          <h1 
            ref={headlineRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-foreground hero-text-shadow"
          >
            {words.map((word, wordIndex) => (
              <div 
                key={wordIndex} 
                className="inline-block overflow-hidden"
                style={{ marginRight: wordIndex < words.length - 1 ? '0.2em' : '0' }}
              >
                {word.split('').map((char, charIndex) => (
                  <span 
                    key={charIndex} 
                    className="char inline-block"
                    style={{ whiteSpace: 'pre' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            ))}
          </h1>
          <div className="mt-4 mb-8">
            <p className="text-2xl md:text-3xl font-medium text-muted-foreground">
              {subheadline}
            </p>
          </div>
          <div className="mt-8">
            <Button size="lg" className="text-lg px-8 py-4 btn-glow interactive-hover">
              Explore Bay Area Culture
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
