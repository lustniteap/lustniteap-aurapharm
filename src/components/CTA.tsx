import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              Join the Movement
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Amplify Your Art. Shape the Culture.
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Become part of AuraPharm’s creative community. Share your story, connect with artists, and help us heal the culture—one project at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-4 btn-glow interactive-hover">
                Get Involved
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Submit Your Project
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Open to all creators
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Bay Area & beyond
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Community-driven
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
