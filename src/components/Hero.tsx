import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Zap, 
  Users, 
  TrendingUp 
} from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
        <div className="space-y-6">
          <Badge variant="secondary" className="gap-2 px-4 py-2">
            <Sparkles className="w-4 h-4" />
            AI-Powered Virtual Try-On Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Try Before You Buy
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              With AI Magic
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionary virtual try-on technology that works for e-commerce and retail. 
            Boost conversions by 40% and reduce returns by 60%.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="gap-2 text-lg px-8 py-6">
            <Zap className="w-5 h-5" />
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button variant="glass" size="lg" className="gap-2 text-lg px-8 py-6">
            <Play className="w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">10M+</span>
            </div>
            <p className="text-muted-foreground">Virtual Try-Ons</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">40%</span>
            </div>
            <p className="text-muted-foreground">Conversion Boost</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">60%</span>
            </div>
            <p className="text-muted-foreground">Return Reduction</p>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
    </section>
  );
};