
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Gift, Plus, Minus, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface GiftCard {
  code: string;
  balance: number;
  originalAmount: number;
}

const availableGiftCards: GiftCard[] = [
  { code: 'GIFT25', balance: 25, originalAmount: 25 },
  { code: 'GIFT50', balance: 50, originalAmount: 50 },
  { code: 'GIFT100', balance: 100, originalAmount: 100 },
  { code: 'WELCOME10', balance: 10, originalAmount: 10 },
];

interface GiftCardManagerProps {
  onGiftCardApplied: (amount: number, code: string) => void;
  onGiftCardRemoved: (code: string) => void;
  appliedGiftCards: { code: string; amount: number }[];
  cartTotal: number;
}

export const GiftCardManager = ({ 
  onGiftCardApplied, 
  onGiftCardRemoved, 
  appliedGiftCards,
  cartTotal 
}: GiftCardManagerProps) => {
  const [giftCardCode, setGiftCardCode] = useState('');
  const [customAmount, setCustomAmount] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  const applyGiftCard = async (code: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const giftCard = availableGiftCards.find(gc => 
      gc.code.toLowerCase() === code.toLowerCase()
    );
    
    if (!giftCard) {
      toast({
        title: "Invalid gift card",
        description: "The gift card code you entered is not valid.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (appliedGiftCards.find(gc => gc.code === giftCard.code)) {
      toast({
        title: "Already applied",
        description: "This gift card has already been applied to your order.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    const amountToApply = Math.min(giftCard.balance, cartTotal);
    onGiftCardApplied(amountToApply, giftCard.code);
    
    toast({
      title: "Gift card applied!",
      description: `$${amountToApply} has been applied to your order.`,
    });

    setGiftCardCode('');
    setIsLoading(false);
  };

  const purchaseGiftCard = (amount: number) => {
    toast({
      title: "Gift card added to cart",
      description: `$${amount} gift card added to your cart.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Gift Cards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Apply Gift Card */}
        <div className="space-y-3">
          <Label htmlFor="giftCardCode">Apply Gift Card</Label>
          <div className="flex gap-2">
            <Input
              id="giftCardCode"
              placeholder="Enter gift card code"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
            />
            <Button 
              onClick={() => applyGiftCard(giftCardCode)}
              disabled={!giftCardCode || isLoading}
            >
              {isLoading ? 'Applying...' : 'Apply'}
            </Button>
          </div>
          
          {/* Quick apply buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Quick apply:</span>
            {availableGiftCards.slice(0, 3).map((gc) => (
              <Button
                key={gc.code}
                variant="outline"
                size="sm"
                onClick={() => applyGiftCard(gc.code)}
                disabled={appliedGiftCards.find(agc => agc.code === gc.code) !== undefined}
              >
                {gc.code}
              </Button>
            ))}
          </div>
        </div>

        {/* Applied Gift Cards */}
        {appliedGiftCards.length > 0 && (
          <div className="space-y-2">
            <Label>Applied Gift Cards</Label>
            {appliedGiftCards.map((gc) => (
              <div key={gc.code} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{gc.code}</span>
                  <Badge variant="secondary">-${gc.amount}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGiftCardRemoved(gc.code)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Separator />

        {/* Purchase Gift Cards */}
        <div className="space-y-3">
          <Label>Purchase Gift Card</Label>
          <div className="grid grid-cols-3 gap-2">
            {[25, 50, 100].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => purchaseGiftCard(amount)}
              >
                ${amount}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              min={5}
              max={500}
            />
            <Button onClick={() => purchaseGiftCard(customAmount)}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
