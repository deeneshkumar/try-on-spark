import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Download, Share2 } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

interface ImageComposerProps {
  userPhoto: File | null;
  garmentUrl: string | null;
  isProcessing: boolean;
  className?: string;
}

export const ImageComposer = ({ userPhoto, garmentUrl, isProcessing, className }: ImageComposerProps) => {
  const [composedImage, setComposedImage] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (userPhoto && garmentUrl && !isProcessing) {
      composeImages();
    }
  }, [userPhoto, garmentUrl, isProcessing]);

  const composeImages = async () => {
    if (!userPhoto || !garmentUrl || !canvasRef.current) return;

    setIsComposing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      setIsComposing(false);
      return;
    }

    try {
      // Load user photo
      const userImg = new Image();
      const userPhotoUrl = URL.createObjectURL(userPhoto);
      
      userImg.onload = () => {
        // Set canvas size based on user photo
        canvas.width = userImg.width;
        canvas.height = userImg.height;
        
        // Draw user photo as background
        ctx.drawImage(userImg, 0, 0);
        
        // Load and overlay garment
        const garmentImg = new Image();
        garmentImg.crossOrigin = 'anonymous';
        
        garmentImg.onload = () => {
          // Simple overlay positioning (in real app, this would use AI positioning)
          const garmentWidth = userImg.width * 0.8;
          const garmentHeight = (garmentImg.height * garmentWidth) / garmentImg.width;
          const x = (userImg.width - garmentWidth) / 2;
          const y = userImg.height * 0.15; // Position in upper torso area
          
          // Apply blend mode for realistic overlay
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = 0.7;
          ctx.drawImage(garmentImg, x, y, garmentWidth, garmentHeight);
          
          // Reset blend mode
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
          
          // Convert to data URL
          const composedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          setComposedImage(composedDataUrl);
          setIsComposing(false);
          
          // Clean up
          URL.revokeObjectURL(userPhotoUrl);
        };
        
        garmentImg.src = garmentUrl;
      };
      
      userImg.src = userPhotoUrl;
    } catch (error) {
      console.error('Error composing images:', error);
      setIsComposing(false);
      toast.error('Failed to compose try-on image');
    }
  };

  const handleDownload = () => {
    if (!composedImage) return;
    
    const link = document.createElement('a');
    link.download = 'virtual-tryon-result.jpg';
    link.href = composedImage;
    link.click();
    
    toast.success('Image downloaded successfully!');
  };

  const handleShare = async () => {
    if (!composedImage) return;
    
    try {
      // Convert data URL to blob
      const response = await fetch(composedImage);
      const blob = await response.blob();
      const file = new File([blob], 'virtual-tryon.jpg', { type: 'image/jpeg' });
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Check out my virtual try-on!',
          text: 'I tried on this outfit virtually - what do you think?',
          files: [file],
        });
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        toast.success('Image copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share image');
    }
  };

  if (isProcessing || isComposing) {
    return (
      <div className={cn(
        'aspect-[3/4] bg-muted rounded-lg flex items-center justify-center',
        className
      )}>
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <div className="space-y-2">
            <p className="text-sm font-medium">AI Processing</p>
            <p className="text-xs text-muted-foreground">
              {isComposing ? 'Composing final image...' : 'Analyzing pose and fitting garment...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!composedImage) {
    return (
      <div className={cn(
        'aspect-[3/4] bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center',
        className
      )}>
        <p className="text-sm text-muted-foreground text-center">
          Select a garment to see the try-on result
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-background border">
        <img
          src={composedImage}
          alt="Virtual try-on result"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <div className="bg-gradient-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
            AI Enhanced
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          onClick={handleDownload}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
      
      <canvas
        ref={canvasRef}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
};