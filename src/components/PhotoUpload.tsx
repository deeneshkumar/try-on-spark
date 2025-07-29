import { useState, useRef } from 'react';
import { Upload, Camera, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
}

export const PhotoUpload = ({ onPhotoSelect }: PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      className={`relative p-8 border-2 border-dashed transition-all duration-300 ${
        dragActive 
          ? 'border-primary bg-gradient-hero scale-105' 
          : 'border-border hover:border-primary/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Upload Your Photo</h3>
          <p className="text-muted-foreground">
            Drag and drop your full-body photo or click to browse
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Button 
            variant="hero" 
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Choose File
          </Button>
          
          <Button variant="glass" className="gap-2">
            <Camera className="w-4 h-4" />
            Take Photo
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Supported formats: JPG, PNG, WebP (max 10MB)</p>
          <p className="flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            Best results with full-body, well-lit photos
          </p>
        </div>
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