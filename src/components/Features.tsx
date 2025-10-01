import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SplitHeading } from "@/components/SplitHeading"

const features = [
  {
    title: "Multimedia News & Culture",
    description: "Blog posts, live events, and streaming that amplify Bay Area voices and global trends.",
    icon: "📰",
    category: "Coverage",
    highlight: true
  },
  {
    title: "Artist Empowerment",
    description: "Workshops, Q&As, and info sessions on music, art, business, and legal know-how.",
    icon: "🎤",
    category: "Community",
    highlight: false
  },
  {
    title: "Creative Direction",
    description: "Styling, curation, songwriting, and artist development for creators and innovators.",
    icon: "🎨",
    category: "Services",
    highlight: false
  },
  {
    title: "Digital Storytelling",
    description: "Trendsetting content, vlogs, interviews, and event coverage that shape culture.",
    icon: "📹",
    category: "Content",
    highlight: true
  },
  {
    title: "Design & Branding",
    description: "Web, graphic, and EPK kit design to help artists and brands stand out.",
    icon: "💻",
    category: "Design",
    highlight: false
  },
  {
    title: "Event Curation & Hosting",
    description: "Festivals, pop-ups, and performances that connect and celebrate the community.",
    icon: "🎶",
    category: "Events",
    highlight: false
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="text-center mb-16 px-4">
        <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
          What We Do
        </Badge>
        <SplitHeading
          text="Multimedia. Culture. Community."
          as="h2"
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AuraPharm blends digital marketing, music, and lifestyle content to spotlight the vibrant pulse of the Bay Area and beyond.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className={`h-full transition-all duration-300 hover:shadow-lg ${
              feature.highlight 
                ? 'border-primary/20 bg-gradient-to-br from-primary/5 to-transparent' 
                : 'hover:border-primary/20'
            }`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{feature.icon}</span>
                <Badge variant="outline" className="text-xs">
                  {feature.category}
                </Badge>
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
