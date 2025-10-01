import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const plans = [
  {
    name: "Starter Artist",
    price: "$49",
    period: "per month",
    description: "For emerging creators looking to grow their presence.",
    features: [
      "Profile on AuraPharm platform",
      "Access to blog & event coverage",
      "Community Q&As & info sessions",
      "Basic EPK kit",
      "Social media shoutouts"
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    name: "Pro Creator",
    price: "$149",
    period: "per month",
    description: "For established artists and brands ready to amplify their impact.",
    features: [
      "All Starter Artist features",
      "Custom content curation",
      "Event hosting & coverage",
      "Web & graphic design support",
      "Artist development sessions",
      "Priority event invites",
      "Feature in multimedia interviews"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "Collective Partner",
    price: "Custom",
    period: "contact us",
    description: "For collectives, agencies, and organizations seeking full creative partnership.",
    features: [
      "All Pro Creator features",
      "Dedicated creative direction",
      "Brand & campaign strategy",
      "Full event curation",
      "Recording/mixing/mastering",
      "Vendor pop-up support",
      "Avant AI decision support (beta)"
    ],
    popular: false,
    cta: "Contact AuraPharm"
  }
]

export function Pricing() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="text-center mb-16 px-4">
        <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
          Services & Memberships
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Creative Services for Artists & Brands
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your creative journey. All plans include access to our multimedia platform and community.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative h-full transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? 'border-primary shadow-lg scale-105' 
                : 'hover:border-primary/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-2">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <CardDescription className="text-base">{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Separator />
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Separator className="mt-6" />
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12 px-4">
        <p className="text-muted-foreground mb-4">
          Need a custom partnership or have a project in mind? Let’s collaborate.
        </p>
        <Button variant="outline" size="lg">
          Contact AuraPharm Team
        </Button>
      </div>
    </section>
  )
}
