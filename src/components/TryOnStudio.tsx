import { useState } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { GarmentSelector } from './GarmentSelector';
import { TryOnPreview } from './TryOnPreview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Sparkles,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

export const TryOnStudio = () => {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'upload' | 'select' | 'preview'>('upload');

  const handlePhotoSelect = (file: File) => {
    setUserPhoto(file);
    setStep('select');
  };

  const handleGarmentSelect = (garment: any) => {
    setSelectedGarment(garment);
    setStep('preview');
    
    // Simulate AI processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('AI try-on complete! Looking amazing! ✨');
    }, 3000);
  };

  const handleStartOver = () => {
    setUserPhoto(null);
    setSelectedGarment(null);
    setIsProcessing(false);
    setStep('upload');
  };

  const steps = [
    { id: 'upload', label: 'Upload Photo', completed: !!userPhoto },
    { id: 'select', label: 'Choose Garment', completed: !!selectedGarment },
    { id: 'preview', label: 'AI Try-On', completed: !!selectedGarment && !isProcessing }
  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="secondary" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Try On Studio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Experience the Future of Fashion
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload your photo, choose a garment, and see yourself wearing it in seconds
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  stepItem.completed 
                    ? 'bg-gradient-primary text-primary-foreground' 
                    : step === stepItem.id
                      ? 'bg-primary/20 border-2 border-primary'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {stepItem.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  stepItem.completed || step === stepItem.id 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }`}>
                  {stepItem.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Step 1: Photo Upload */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">1. Your Photo</h3>
              {userPhoto && (
                <Button variant="ghost" size="sm" onClick={handleStartOver}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              )}
            </div>
            
            {userPhoto ? (
              <Card className="p-4">
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={URL.createObjectURL(userPhoto)} 
                    alt="Your photo"
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-gradient-primary">
                    Ready!
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Photo uploaded successfully
                </p>
              </Card>
            ) : (
              <PhotoUpload onPhotoSelect={handlePhotoSelect} />
            )}
          </div>

          {/* Step 2: Garment Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">2. Select Garment</h3>
            
            {step === 'upload' ? (
              <Card className="aspect-[3/4] flex items-center justify-center border-dashed">
                <div className="text-center space-y-2">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Upload your photo first
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                <GarmentSelector 
                  onGarmentSelect={handleGarmentSelect}
                  selectedGarment={selectedGarment}
                />
              </div>
            )}
          </div>

          {/* Step 3: AI Preview */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">3. AI Try-On Result</h3>
            
            <TryOnPreview 
              userPhoto={userPhoto}
              garment={selectedGarment}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </section>
  );
};