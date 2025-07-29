import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign,
  Code,
  Smartphone,
  Monitor,
  Globe,
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

export const EcommerceIntegration = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('shopify');

  const platforms = [
    {
      id: 'shopify',
      name: 'Shopify',
      logo: '🛍️',
      description: 'Leading ecommerce platform',
      integration: 'App Store Plugin',
      timeToLive: '2 minutes'
    },
    {
      id: 'woocommerce', 
      name: 'WooCommerce',
      logo: '🎪',
      description: 'WordPress ecommerce',
      integration: 'WordPress Plugin',
      timeToLive: '3 minutes'
    },
    {
      id: 'magento',
      name: 'Magento',
      logo: '🏪',
      description: 'Enterprise ecommerce',
      integration: 'Extension Marketplace',
      timeToLive: '5 minutes'
    },
    {
      id: 'api',
      name: 'Custom API',
      logo: '⚡',
      description: 'Any platform',
      integration: 'REST/GraphQL API',
      timeToLive: '10 minutes'
    }
  ];

  const integrationSteps = {
    shopify: [
      'Install TryOn Spark from Shopify App Store',
      'Connect your product catalog automatically',
      'Customize try-on button placement',
      'Go live with virtual try-on on all products!'
    ],
    woocommerce: [
      'Download TryOn Spark WordPress plugin',
      'Activate and configure in WP Admin',
      'Sync your WooCommerce products',
      'Enable try-on on product pages'
    ],
    magento: [
      'Install via Magento Marketplace',
      'Configure API settings',
      'Map product attributes',
      'Deploy across your store'
    ],
    api: [
      'Get your API key from dashboard',
      'Integrate our REST/GraphQL endpoints',
      'Send product data and user photos',
      'Receive AI-generated try-on results'
    ]
  };

  const codeExample = `// Integration Example - Any Platform
const tryOnResult = await fetch('https://api.tryonspark.com/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userPhoto: base64Image,
    productId: 'product-123',
    garmentType: 'dress',
    returnFormat: 'url'
  })
});

const result = await tryOnResult.json();
// Result includes: image_url, confidence_score, processing_time`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExample);
    toast.success('Code copied to clipboard!');
  };

  const stats = [
    { label: 'Avg Conversion Lift', value: '+47%', icon: TrendingUp },
    { label: 'Return Rate Reduction', value: '-23%', icon: DollarSign },
    { label: 'User Engagement', value: '+89%', icon: Users },
    { label: 'Processing Speed', value: '<3s', icon: Zap }
  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="secondary" className="gap-2">
            <Code className="w-4 h-4" />
            Ecommerce Integration
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Plug & Play Virtual Try-On
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform any ecommerce store with AI-powered virtual try-on in minutes, not months
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Platform Selection */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">Choose Your Platform</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {platforms.map((platform) => (
              <Card 
                key={platform.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlatform === platform.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : ''
                }`}
                onClick={() => setSelectedPlatform(platform.id)}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">{platform.logo}</div>
                  <h4 className="font-semibold">{platform.name}</h4>
                  <p className="text-xs text-muted-foreground">{platform.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {platform.timeToLive}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Integration Details */}
          <Tabs value={selectedPlatform} className="w-full">
            <TabsContent value={selectedPlatform}>
              <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Setup Steps */}
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      Setup Steps
                    </h4>
                    <div className="space-y-3">
                      {integrationSteps[selectedPlatform as keyof typeof integrationSteps].map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Live Features</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Smartphone className="w-4 h-4 text-primary" />
                        Mobile-optimized interface
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Monitor className="w-4 h-4 text-primary" />
                        Real-time AI processing
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-primary" />
                        Global CDN for speed
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Analytics & insights
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ShoppingCart className="w-4 h-4 text-primary" />
                        Direct checkout integration
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* API Example */}
          {selectedPlatform === 'api' && (
            <Card className="p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold">Integration Code</h4>
                <Button variant="outline" size="sm" onClick={handleCopyCode} className="gap-2">
                  <Copy className="w-4 h-4" />
                  Copy Code
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </Card>
          )}

          {/* CTA */}
          <div className="text-center mt-12">
            <Button size="lg" className="gap-2">
              <ExternalLink className="w-5 h-5" />
              Start Free Integration
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              No setup fees • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};