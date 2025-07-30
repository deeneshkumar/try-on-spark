import { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, Smartphone, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useResponsive } from '@/hooks/use-responsive';
import { toast } from 'sonner';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
}

export const PhotoUpload = ({ onPhotoSelect }: PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useResponsive();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return;
    }

    onPhotoSelect(file);
    toast.success('Photo uploaded successfully!');
  };

  return (
    <Card 
      className={`transition-all duration-300 cursor-pointer ${
        isMobile ? 'aspect-[4/3] p-4' : 'aspect-[3/4] p-8'
      } border-2 border-dashed ${
        dragActive 
          ? 'border-primary bg-gradient-hero scale-105' 
          : 'border-border hover:border-primary/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
        <div className={`mx-auto bg-gradient-primary rounded-full flex items-center justify-center ${
          isMobile ? 'w-12 h-12' : 'w-16 h-16'
        }`}>
          {isMobile ? (
            <Smartphone className={`text-primary-foreground ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
          ) : (
            <Upload className={`text-primary-foreground ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
            {isMobile ? 'Upload or Take Photo' : 'Upload Your Photo'}
          </h3>
          <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {isMobile 
              ? 'Take a full-body selfie or upload from gallery'
              : 'Drag and drop your full-body photo or click to browse'
            }
          </p>
        </div>

        <div className={`w-full space-y-2 ${isMobile ? 'max-w-none' : 'max-w-xs'}`}>
          {isMobile ? (
            <>
              <Button 
                variant="hero" 
                size="sm"
                className="w-full h-11 gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const input = fileInputRef.current;
                  if (input) {
                    input.setAttribute('capture', 'user');
                    input.click();
                  }
                }}
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full h-11 gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const input = fileInputRef.current;
                  if (input) {
                    input.removeAttribute('capture');
                    input.click();
                  }
                }}
              >
                <ImageIcon className="w-4 h-4" />
                Choose from Gallery
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="hero" 
                onClick={() => fileInputRef.current?.click()}
                className="w-full gap-2"
              >
                <Upload className="w-4 h-4" />
                Choose File
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info('Camera feature coming soon!');
                }}
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </>
          )}
        </div>

        {!isMobile && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Supported formats: JPG, PNG, WebP (max 10MB)</p>
            <p className="flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              Best results with full-body, well-lit photos
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </Card>
  );
};