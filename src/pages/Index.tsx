import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TryOnStudio } from '@/components/TryOnStudio';
import { EcommerceIntegration } from '@/components/EcommerceIntegration';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TryOnStudio />
      <EcommerceIntegration />
    </div>
  );
};

export default Index;
