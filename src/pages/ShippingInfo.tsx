
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Truck, MapPin, Clock, Package, Shield, Globe } from 'lucide-react';
import { useState } from 'react';

const ShippingInfo = () => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const shippingOptions = [
    {
      name: "Standard Shipping",
      price: "Free",
      time: "5-7 business days",
      description: "Free shipping on orders over $50",
      icon: Truck
    },
    {
      name: "Express Shipping",
      price: "$9.99",
      time: "2-3 business days",
      description: "Faster delivery for urgent orders",
      icon: Clock
    },
    {
      name: "Overnight Shipping",
      price: "$24.99",
      time: "1 business day",
      description: "Next day delivery for same-day orders placed before 2 PM",
      icon: Package
    },
    {
      name: "International Shipping",
      price: "$19.99+",
      time: "7-14 business days",
      description: "Worldwide delivery to most countries",
      icon: Globe
    }
  ];

  const shippingZones = [
    {
      zone: "Zone 1 (Local)",
      areas: "Same city/state",
      standardTime: "1-2 days",
      expressTime: "Same day"
    },
    {
      zone: "Zone 2 (Regional)",
      areas: "Neighboring states",
      standardTime: "2-3 days",
      expressTime: "1-2 days"
    },
    {
      zone: "Zone 3 (National)",
      areas: "Nationwide",
      standardTime: "3-5 days",
      expressTime: "2-3 days"
    },
    {
      zone: "Zone 4 (International)",
      areas: "Worldwide",
      standardTime: "7-14 days",
      expressTime: "3-7 days"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Packaging",
      description: "All items are carefully packaged to ensure safe delivery"
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Track your package from our warehouse to your doorstep"
    },
    {
      icon: Truck,
      title: "Carbon Neutral",
      description: "We offset 100% of shipping emissions for all deliveries"
    }
  ];

  const handleTrackPackage = () => {
    if (trackingNumber.trim()) {
      // Simulate tracking functionality
      alert(`Tracking package: ${trackingNumber}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-black dark:bg-white text-white dark:text-black text-lg px-6 py-2">
              Shipping Information
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              Fast & Reliable Shipping
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We offer multiple shipping options to get your products to you quickly and safely. 
              Track your orders in real-time and enjoy our premium delivery experience.
            </p>
          </div>
        </div>
      </section>

      {/* Package Tracking */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-black dark:text-white">Track Your Package</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">Enter your tracking number to see real-time updates</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter tracking number (e.g., ES123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
                <Button 
                  onClick={handleTrackPackage}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Track Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Shipping Options</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose the delivery speed that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <option.icon className="h-12 w-12 text-black dark:text-white mx-auto mb-2" />
                  <CardTitle className="text-lg text-black dark:text-white">{option.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-2xl font-bold text-black dark:text-white">{option.price}</div>
                  <div className="text-gray-600 dark:text-gray-400">{option.time}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Shipping Zones & Times</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Delivery times vary by location
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 text-black dark:text-white font-semibold">Zone</th>
                  <th className="text-left py-4 px-6 text-black dark:text-white font-semibold">Coverage</th>
                  <th className="text-left py-4 px-6 text-black dark:text-white font-semibold">Standard</th>
                  <th className="text-left py-4 px-6 text-black dark:text-white font-semibold">Express</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-6 font-medium text-black dark:text-white">{zone.zone}</td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{zone.areas}</td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{zone.standardTime}</td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{zone.expressTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Why Choose Our Shipping?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Premium features included with every order
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8">
                  <feature.icon className="h-12 w-12 text-black dark:text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Policy */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-black dark:text-white">Shipping Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Processing Time</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Orders are typically processed within 1-2 business days. Orders placed after 2 PM on Friday 
                  will be processed on the next business day.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Shipping Restrictions</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We currently ship to all 50 US states and over 100 countries worldwide. Some restrictions 
                  may apply to certain products or destinations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Delivery Confirmation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All packages require a signature upon delivery. If you're not available, the carrier will 
                  leave a notice and attempt redelivery or hold the package for pickup.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ShippingInfo;
