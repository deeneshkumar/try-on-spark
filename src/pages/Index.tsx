import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TryOnStudio } from '@/components/TryOnStudio';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TryOnStudio />
    </div>
  );
};

export default Index;
