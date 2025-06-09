
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, Truck, MapPin, Check } from 'lucide-react';

interface OrderStatus {
  id: string;
  step: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: Date;
  location?: string;
}

interface Order {
  id: string;
  status: string;
  estimatedDelivery: Date;
  trackingNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  shippingAddress: string;
  timeline: OrderStatus[];
}

const sampleOrder: Order = {
  id: "ORD-2024-001",
  status: "In Transit",
  estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  trackingNumber: "TRK789456123",
  items: [
    { name: "Premium Wireless Headphones", quantity: 1, price: 199.99 },
    { name: "Phone Case", quantity: 2, price: 24.99 }
  ],
  shippingAddress: "123 Main St, New York, NY 10001",
  timeline: [
    {
      id: "1",
      step: "Order Placed",
      status: "completed",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      location: "Online"
    },
    {
      id: "2",
      step: "Order Processed",
      status: "completed",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      location: "Warehouse - New York"
    },
    {
      id: "3",
      step: "In Transit",
      status: "current",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      location: "Distribution Center - Philadelphia"
    },
    {
      id: "4",
      step: "Out for Delivery",
      status: "pending",
      location: "Local Facility"
    },
    {
      id: "5",
      step: "Delivered",
      status: "pending"
    }
  ]
};

export const OrderTracker = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const trackOrder = async () => {
    if (!trackingNumber) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (trackingNumber === sampleOrder.trackingNumber) {
      setOrder(sampleOrder);
    } else {
      setOrder(null);
    }
    setIsLoading(false);
  };

  const getProgressPercentage = () => {
    if (!order) return 0;
    const completedSteps = order.timeline.filter(step => step.status === 'completed').length;
    const currentStep = order.timeline.find(step => step.status === 'current') ? 1 : 0;
    return ((completedSteps + currentStep * 0.5) / order.timeline.length) * 100;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'current':
        return <Truck className="h-4 w-4 text-blue-600" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tracking Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Track Your Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="tracking">Tracking Number</Label>
              <Input
                id="tracking"
                placeholder="Enter tracking number (try: TRK789456123)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <Button onClick={trackOrder} disabled={isLoading} className="mt-6">
              {isLoading ? 'Tracking...' : 'Track Order'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      {order && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Order {order.id}</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  Tracking: {order.trackingNumber}
                </p>
              </div>
              <Badge className={
                order.status === 'Delivered' ? 'bg-green-600' :
                order.status === 'In Transit' ? 'bg-blue-600' :
                'bg-yellow-600'
              }>
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Delivery Progress</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(getProgressPercentage())}% Complete
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>

            {/* Estimated Delivery */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(order.estimatedDelivery)} to {order.shippingAddress}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold">Tracking Timeline</h3>
              <div className="space-y-3">
                {order.timeline.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      step.status === 'current'
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                        : step.status === 'completed'
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div className="mt-0.5">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        step.status === 'current' ? 'text-blue-700 dark:text-blue-300' :
                        step.status === 'completed' ? 'text-green-700 dark:text-green-300' :
                        'text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.step}
                      </h4>
                      {step.location && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {step.location}
                        </p>
                      )}
                      {step.timestamp && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {formatDate(step.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              <h3 className="font-semibold">Order Items</h3>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <span>{item.name}</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity}
                    </span>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {trackingNumber && !order && !isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              No order found with tracking number: {trackingNumber}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Please check your tracking number and try again
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
