import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const footerLinks = {
  product: [
    { name: "Blog", href: "#" },
    { name: "Events", href: "#" },
    { name: "Streaming", href: "#" },
    { name: "Community", href: "#" }
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Mission", href: "#" },
    { name: "Team", href: "#" },
    { name: "Contact", href: "#" }
  ],
  support: [
    { name: "Info Sessions", href: "#" },
    { name: "Q&As", href: "#" },
    { name: "Artist Resources", href: "#" },
    { name: "Legal & Copyright", href: "#" }
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Community Guidelines", href: "#" },
    { name: "Accessibility", href: "#" }
  ]
}

const socialLinks = [
  { name: "Twitter", href: "#", icon: "𝕏" },
  { name: "Instagram", href: "#", icon: "📸" },
  { name: "YouTube", href: "#", icon: "📺" },
  { name: "TikTok", href: "#", icon: "🎵" }
]

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="py-16 px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12 max-w-7xl mx-auto">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-foreground">AuraPharm</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Healing the culture through multimedia, music, and community. AuraPharm amplifies Bay Area voices and empowers artists to connect, share, and disrupt the status quo.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-muted"
                  asChild
                >
                  <a href={social.href} aria-label={social.name}>
                    <span className="text-lg">{social.icon}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Product links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="mb-8 max-w-7xl mx-auto" />
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} AuraPharm. All rights reserved.</span>
            <Badge variant="outline" className="text-xs">
              Healing the Culture
            </Badge>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Bay Area & Beyond</span>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Community-Driven</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
