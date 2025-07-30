import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/use-responsive';
import { Shirt, Star, Heart, ShoppingBag, Filter } from 'lucide-react';
import garmentsCollection from '@/assets/garments-collection.jpg';

interface Garment {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  colors: string[];
}

const mockGarments: Garment[] = [
  {
    id: '1',
    name: 'Elegant Evening Dress',
    brand: 'LuxeFashion',
    price: 299,
    category: 'Dresses',
    rating: 4.8,
    image: garmentsCollection,
    colors: ['Black', 'Navy', 'Burgundy']
  },
  {
    id: '2',
    name: 'Classic Blazer',
    brand: 'ModernStyle',
    price: 189,
    category: 'Jackets',
    rating: 4.6,
    image: garmentsCollection,
    colors: ['Black', 'Gray', 'Camel']
  },
  {
    id: '3',
    name: 'Designer Casual Shirt',
    brand: 'TrendCo',
    price: 89,
    category: 'Shirts',
    rating: 4.5,
    image: garmentsCollection,
    colors: ['White', 'Blue', 'Pink']
  }
];

interface GarmentSelectorProps {
  onGarmentSelect: (garment: Garment) => void;
  selectedGarment?: Garment;
}

export const GarmentSelector = ({ onGarmentSelect, selectedGarment }: GarmentSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isMobile } = useResponsive();
  
  const categories = ['All', 'Dresses', 'Jackets', 'Shirts', 'Pants', 'Accessories'];

  const filteredGarments = selectedCategory === 'All' 
    ? mockGarments 
    : mockGarments.filter(garment => garment.category === selectedCategory);

  return (
    <div className="space-y-4 sm:space-y-6">
      {!isMobile && (
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Choose Your Garment</h2>
          <p className="text-muted-foreground">
            Select from our curated collection to try on virtually
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className={`${
        isMobile 
          ? 'flex gap-2 overflow-x-auto pb-2 -mx-4 px-4' 
          : 'flex flex-wrap gap-2 justify-center'
      }`}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`${isMobile ? 'flex-shrink-0' : 'rounded-full'}`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Garment Grid */}
      <div className={`grid gap-3 sm:gap-6 ${
        isMobile 
          ? 'grid-cols-2' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {filteredGarments.map((garment) => (
          <Card 
            key={garment.id}
            className={`group cursor-pointer transition-all duration-300 ${
              isMobile ? 'hover:shadow-soft' : 'hover:shadow-elegant hover:-translate-y-1'
            } ${
              selectedGarment?.id === garment.id 
                ? 'ring-2 ring-primary shadow-glow scale-105' 
                : ''
            }`}
            onClick={() => onGarmentSelect(garment)}
          >
            <div className={`relative overflow-hidden rounded-t-lg ${
              isMobile ? 'aspect-[3/4]' : 'aspect-[3/4]'
            }`}>
              <img 
                src={garment.image} 
                alt={garment.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Selection overlay */}
              {selectedGarment?.id === garment.id && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-gradient-primary text-primary-foreground rounded-full p-2">
                    <Heart className={`fill-current ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  </div>
                </div>
              )}
              
              {!isMobile && (
                <div className="absolute top-3 right-3 space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 rounded-full bg-background/80 hover:bg-background"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <Badge className={`absolute top-3 left-3 bg-gradient-primary ${
                isMobile ? 'text-xs px-2 py-1' : ''
              }`}>
                AI Ready
              </Badge>
            </div>
            
            <div className={`space-y-3 ${isMobile ? 'p-2' : 'p-4'}`}>
              <div className="space-y-1">
                <h3 className={`font-semibold line-clamp-1 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  {garment.name}
                </h3>
                <p className={`text-muted-foreground ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  {garment.brand}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                {!isMobile && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{garment.rating}</span>
                  </div>
                )}
                <span className={`font-bold ${
                  isMobile ? 'text-sm' : 'text-lg'
                }`}>
                  ${garment.price}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {garment.colors.slice(0, isMobile ? 2 : 3).map((color, index) => (
                    <div 
                      key={index}
                      className={`rounded-full border border-border ${
                        isMobile ? 'w-3 h-3' : 'w-4 h-4'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                  {garment.colors.length > (isMobile ? 2 : 3) && (
                    <span className="text-xs text-muted-foreground">
                      +{garment.colors.length - (isMobile ? 2 : 3)}
                    </span>
                  )}
                </div>
                
                {!isMobile && (
                  <Button size="sm" variant="ghost" className="gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    Try On
                  </Button>
                )}
              </div>
              
              {isMobile && (
                <div className="flex items-center justify-center gap-1 pt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{garment.rating}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};