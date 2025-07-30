import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageComposer } from '@/components/ui/image-composer';
import { useResponsive } from '@/hooks/use-responsive';
import { 
  Download, 
  Share2, 
  ShoppingCart, 
  RotateCcw, 
  Sparkles,
  Zap,
  Camera,
  Eye,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface TryOnPreviewProps {
  userPhoto?: File;
  garment?: any;
  isProcessing?: boolean;
}

export const TryOnPreview = ({ userPhoto, garment, isProcessing = false }: TryOnPreviewProps) => {
  const [selectedView, setSelectedView] = useState<'front' | 'side'>('front');
  const { isMobile } = useResponsive();
  
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
      <Card className={`flex items-center justify-center border-dashed ${
        isMobile ? 'aspect-[4/3]' : 'aspect-[3/4]'
      }`}>
        <div className="text-center space-y-4 p-6">
          <div className={`mx-auto bg-gradient-primary/10 rounded-full flex items-center justify-center ${
            isMobile ? 'w-12 h-12' : 'w-16 h-16'
          }`}>
            <Sparkles className={`text-primary ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
          </div>
          <div className="space-y-2">
            <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>Ready for Magic!</p>
            <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {isMobile 
                ? 'Upload photo and select garment to see AI try-on'
                : 'Upload your photo and select a garment to see the AI try-on'
              }
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Use ImageComposer for real photo composition */}
      <ImageComposer 
        userPhoto={userPhoto}
        garmentUrl={garment?.image || null}
        isProcessing={isProcessing}
        className={isMobile ? 'aspect-[4/3]' : 'aspect-[3/4]'}
      />

      {/* Enhanced Action Buttons */}
      {garment && !isProcessing && (
        <div className="space-y-3">
          {isMobile ? (
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success('Viewing in AR mode!')}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                AR View
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => toast.success('Added to cart!')}
                className="gap-2 bg-gradient-primary"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success('Image downloaded!')}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success('Shared to social media!')}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => toast.success('Added to cart!')}
                className="gap-2 bg-gradient-primary"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          )}
          
          {/* Advanced Features */}
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => toast.success('Trying different size!')}
              className="flex-1 text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              {isMobile ? 'Different Size' : 'Try Different Size'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => toast.success('Saving to wardrobe!')}
              className="flex-1 text-xs"
            >
              {isMobile ? 'Save' : 'Save to Wardrobe'}
            </Button>
          </div>
        </div>
      )}

      {/* Enhanced Garment Details */}
      {garment && !isProcessing && (
        <Card className={`bg-gradient-subtle border ${isMobile ? 'p-3' : 'p-4'}`}>
          <div className="flex items-start gap-3">
            <div className="relative">
              <img 
                src={garment.image} 
                alt={garment.name}
                className={`object-cover rounded-lg ${isMobile ? 'w-12 h-12' : 'w-14 h-14'}`}
              />
              <div className={`absolute -top-1 -right-1 bg-gradient-primary rounded-full flex items-center justify-center ${
                isMobile ? 'w-4 h-4' : 'w-5 h-5'
              }`}>
                <Sparkles className={`text-white ${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`} />
              </div>
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
                {garment.name}
              </h4>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {garment.brand}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className={`font-bold text-primary ${isMobile ? 'text-base' : 'text-lg'}`}>
                  ${garment.price}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {garment.rating}★ ({Math.floor(Math.random() * 500) + 100})
                </Badge>
              </div>
              {garment.colors && (
                <div className="flex gap-1 mt-2">
                  {garment.colors?.slice(0, isMobile ? 2 : 3).map((color: string, index: number) => (
                    <div 
                      key={index}
                      className={`rounded-full border border-border ${
                        isMobile ? 'w-3 h-3' : 'w-4 h-4'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                  {garment.colors?.length > (isMobile ? 2 : 3) && (
                    <div className={`rounded-full bg-muted border border-border flex items-center justify-center text-xs ${
                      isMobile ? 'w-3 h-3' : 'w-4 h-4'
                    }`}>
                      +{garment.colors.length - (isMobile ? 2 : 3)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};