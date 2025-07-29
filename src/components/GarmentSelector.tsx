import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shirt, Star, Heart, ShoppingBag } from 'lucide-react';
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
  
  const categories = ['All', 'Dresses', 'Jackets', 'Shirts', 'Pants', 'Accessories'];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Garment</h2>
        <p className="text-muted-foreground">
          Select from our curated collection to try on virtually
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "glass"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Garment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGarments.map((garment) => (
          <Card 
            key={garment.id}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 ${
              selectedGarment?.id === garment.id 
                ? 'ring-2 ring-primary shadow-glow' 
                : ''
            }`}
            onClick={() => onGarmentSelect(garment)}
          >
            <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
              <img 
                src={garment.image} 
                alt={garment.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 space-y-2">
                <Button
                  size="sm"
                  variant="glass"
                  className="w-8 h-8 p-0 rounded-full"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <Badge className="absolute top-3 left-3 bg-gradient-primary">
                AI Ready
              </Badge>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <h3 className="font-semibold line-clamp-1">{garment.name}</h3>
                <p className="text-sm text-muted-foreground">{garment.brand}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{garment.rating}</span>
                </div>
                <span className="text-lg font-bold">${garment.price}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {garment.colors.slice(0, 3).map((color, index) => (
                    <div 
                      key={index}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                  {garment.colors.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{garment.colors.length - 3}
                    </span>
                  )}
                </div>
                
                <Button size="sm" variant="ghost" className="gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  Try On
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};