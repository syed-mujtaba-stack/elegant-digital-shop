
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });

    setEmail('');
    setIsLoading(false);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
      <CardContent className="p-8 text-center">
        <Mail className="h-12 w-12 mx-auto mb-4 text-white" />
        <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
        <p className="text-blue-100 mb-6">
          Subscribe to our newsletter and be the first to know about new products, 
          exclusive offers, and special promotions.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white text-gray-900"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Newsletter;
