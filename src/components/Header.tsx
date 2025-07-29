import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Menu, 
  X, 
  User, 
  Settings, 
  HelpCircle,
  Zap
} from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            TryOnAI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            How it Works
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            For Retailers
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            API Docs
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Start Free
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="space-y-3">
              <a href="#" className="block py-2 text-foreground hover:text-primary transition-colors">
                How it Works
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-primary transition-colors">
                For Retailers
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-primary transition-colors">
                API Docs
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-primary transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" className="justify-start">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button variant="hero" className="justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Start Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};