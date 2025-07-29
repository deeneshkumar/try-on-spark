import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Share2, 
  ShoppingCart, 
  RotateCcw, 
  Sparkles,
  Zap,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';
import demoPerson from '@/assets/demo-person.jpg';

interface TryOnPreviewProps {
  userPhoto?: File;
  garment?: any;
  isProcessing?: boolean;
}

export const TryOnPreview = ({ userPhoto, garment, isProcessing = false }: TryOnPreviewProps) => {
  const [selectedView, setSelectedView] = useState<'front' | 'side'>('front');
  
  const handleDownload = () => {
    toast.success('High-resolution image downloaded!');
  };

  const handleShare = () => {
    toast.success('Shared to social media!');
  };

  const handleAddToCart = () => {
    toast.success(`${garment?.name} added to cart!`);
  };

  const handleRetry = () => {
    toast.info('Regenerating with improved AI...');
  };

  if (!userPhoto && !garment) {
    return (
      <Card className="aspect-[3/4] flex items-center justify-center border-dashed">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">AI Try-On Preview</h3>
            <p className="text-muted-foreground text-sm">
              Upload your photo and select a garment to see the magic happen
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Preview Card */}
      <Card className="relative overflow-hidden">
        <div className="aspect-[3/4] relative">
          {isProcessing ? (
            <div className="w-full h-full bg-gradient-subtle flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-primary rounded-full animate-ping opacity-30"></div>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">AI Processing...</p>
                  <p className="text-sm text-muted-foreground">
                    Analyzing pose and fitting garment
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <img 
              src={demoPerson} 
              alt="Virtual try-on result"
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Overlay badges */}
          {!isProcessing && (
            <>
              <Badge className="absolute top-4 left-4 bg-gradient-primary gap-1">
                <Zap className="w-3 h-3" />
                AI Enhanced
              </Badge>
              
              <div className="absolute top-4 right-4 space-y-2">
                <Button
                  size="sm"
                  variant="glass"
                  onClick={handleRetry}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* View selector */}
        {!isProcessing && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex bg-background/80 backdrop-blur-sm rounded-full p-1 border">
              <Button
                size="sm"
                variant={selectedView === 'front' ? 'default' : 'ghost'}
                className="rounded-full px-4"
                onClick={() => setSelectedView('front')}
              >
                Front
              </Button>
              <Button
                size="sm"
                variant={selectedView === 'side' ? 'default' : 'ghost'}
                className="rounded-full px-4"
                onClick={() => setSelectedView('side')}
              >
                Side
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Action buttons */}
      {!isProcessing && (
        <div className="grid grid-cols-3 gap-3">
          <Button variant="glass" onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          
          <Button variant="glass" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          
          {garment && (
            <Button variant="hero" onClick={handleAddToCart} className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Buy Now
            </Button>
          )}
        </div>
      )}

      {/* Garment info */}
      {garment && !isProcessing && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{garment.name}</h4>
              <p className="text-sm text-muted-foreground">{garment.brand}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">${garment.price}</p>
              <p className="text-xs text-muted-foreground">In Stock</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};